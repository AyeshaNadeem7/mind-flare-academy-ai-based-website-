import { NextRequest, NextResponse } from "next/server";
import { groq, DEFAULT_MODEL, FALLBACK_MODEL, buildSystemPrompt } from "@/lib/groq";
import { retrieveRelevantChunks } from "@/lib/knowledge-base";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { message, history = [] } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Query message is required" }, { status: 400 });
    }

    // 1. RAG Retrieval Step: Retrieve top matching chunks from the Academy Knowledge Base
    const matchingChunks = retrieveRelevantChunks(message, 3);
    const systemPrompt = buildSystemPrompt(matchingChunks);

    // 2. Format message history for Groq completion
    const formattedMessages: any[] = [
      { role: "system", content: systemPrompt },
      ...history.map((h: any) => ({
        role: h.role === "assistant" ? "assistant" : "user",
        content: h.content,
      })),
      { role: "user", content: message },
    ];

    // 3. Request streaming completion from Groq
    let chatStream;
    try {
      chatStream = await groq.chat.completions.create({
        model: DEFAULT_MODEL,
        messages: formattedMessages,
        temperature: 0.3,
        max_tokens: 800,
        stream: true,
      });
    } catch (primaryErr: any) {
      console.warn(`Primary model ${DEFAULT_MODEL} failed, falling back to ${FALLBACK_MODEL}:`, primaryErr.message);
      chatStream = await groq.chat.completions.create({
        model: FALLBACK_MODEL,
        messages: formattedMessages,
        temperature: 0.3,
        max_tokens: 800,
        stream: true,
      });
    }

    // 4. Stream response to client
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of chatStream) {
            const content = chunk.choices[0]?.delta?.content || "";
            if (content) {
              controller.enqueue(encoder.encode(content));
            }
          }
        } catch (streamErr) {
          console.error("Streaming error:", streamErr);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
      },
    });
  } catch (err: any) {
    console.error("API /api/chat error:", err);
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
