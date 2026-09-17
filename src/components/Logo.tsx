import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  onDark?: boolean;
}

export default function Logo({ className = "", size = "lg", onDark = false }: LogoProps) {
  const sizeMap = {
    sm: { height: 46 },
    md: { height: 64 },
    lg: { height: 86 },
    xl: { height: 115 },
  };

  const currentSize = sizeMap[size];

  return (
    <div
      className={`inline-flex items-center justify-center select-none group transition-all duration-300 hover:scale-105 ${
        onDark
          ? "bg-cream-100 px-3.5 py-1.5 rounded-2xl shadow-md border border-cream-300/80"
          : ""
      } ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.svg"
        alt="Mind Flare Academy Logo"
        style={{ height: `${currentSize.height}px`, width: "auto" }}
        className="object-contain drop-shadow-sm transition-all"
      />
    </div>
  );
}
