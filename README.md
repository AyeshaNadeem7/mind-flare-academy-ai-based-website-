<div align="center">

# 🎓 Mind Flare Academy

### *Where Potential Sparks, and Excellence Flames.*

[![Next.js](https://img.shields.io/badge/Next.js-14.2.15-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Groq AI](https://img.shields.io/badge/Groq_AI-RAG_Chatbot-F7941E?style=for-the-badge&logo=openai&logoColor=white)](https://groq.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL_&_Auth-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

<p align="center">
  A state-of-the-art, full-stack web platform and integrated Learning Management System (LMS) for <strong>Mind Flare Academy</strong> in <strong>Jhanda Chichi, Rawalpindi, Pakistan</strong>.
</p>

[Explore Website](#-features--pages) • [LMS Portals](#-role-based-lms-portals) • [AI Chatbot](#-ai-academic-counselor-rag) • [Setup Guide](#-local-installation--setup) • [Deployment](#-deployment-guide)

</div>

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Key Features & Modules](#-key-features--modules)
- [AI Academic Counselor (RAG)](#-ai-academic-counselor-rag)
- [Role-Based LMS Portals](#-role-based-lms-portals)
- [Design System & Palette](#-design-system--palette)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Local Installation & Setup](#-local-installation--setup)
- [Supabase Database Setup](#-supabase-database-setup)
- [Deployment Guide (Vercel)](#-deployment-guide-vercel)
- [Campus & Contact Information](#-campus--contact-information)

---

## 🏛️ Overview

**Mind Flare Academy** is a premier coaching institute providing concept-based learning from Montessori/Primary through Matric, Intermediate, BS degree tutoring, MDCAT/ECAT entrance test preparation, and digital short courses.

This project delivers:
1. **Interactive Single-Page Showcase**: Fast, responsive presentation of academic programs, schedules, fee structures, admissions, and faculty.
2. **AI RAG Academic Counselor**: Powered by **Groq API** (`openai/gpt-oss-120b`) for instant, grounded student and parent inquiries.
3. **Multi-Role LMS Engine**: Dynamic role-based dashboards for **Students**, **Teachers**, and **Administrators** with real-time assignment submissions, quiz evaluations, and telemetry monitoring.

---

## ✨ Key Features & Modules

### 1. 🌐 Landing Experience & Smooth Navigation
- **Hero Section**: High-impact banner with instant CTA buttons (*Portal Login*, *Enroll Now*, *WhatsApp Inquiry*, *Ask AI*).
- **About Academy**: Institutional mission, vision, dual-shift model (**Morning 8:00 AM – 12:00 PM** & **Evening 3:00 PM – 7:00 PM**), and 9 core academic pillars.
- **Classes & Coaching**: Comprehensive view of programs from Nursery to BS/Entry tests with direct links to the fee schedule.
- **Digital Short Courses**: 10 high-income skill programs (Graphic Design, Web Development, Python & AI, Data Science, Freelancing, IELTS, Spoken English, and CSS/PMS).
- **Transparent Fee Schedule**: Interactive category tables with a live **10% Sibling Concession Calculator**.
- **6-Step Admission Roadmap**: Clear application timeline with automated WhatsApp inquiry generation.
- **FAQ Accordion**: Instant search and collapsible answers answering curriculum, shift timing, tests, and discount policies.

### 2. ⚡ Floating Utilities
- **💬 WhatsApp Action**: Launches direct WhatsApp chat with pre-formatted inquiry text (`0317-5790206`).
- **🔥 Mind Flare AI Assistant Drawer**: Intelligent slide-out counselor drawer answering all academy queries 24/7.

---

## 🤖 AI Academic Counselor (RAG)

The platform embeds a custom Retrieval-Augmented Generation (RAG) system:

```
[ User Query ] ──▶ [ TF-IDF Vector Search ] ──▶ [ Academy Knowledge Base ]
                            │                               │
                            ▼                               ▼
                 [ Top Context Chunks ] ──▶ [ System Prompt Injection ]
                                                    │
                                                    ▼
                                         [ Groq Cloud LLM ]
                                     (openai/gpt-oss-120b)
                                                    │
                                                    ▼
                                    [ Clean Formatted Stream ]
```

- **Knowledge Grounding**: Uses verbatim institutional facts (fees, shifts, board syllabi, rules).
- **Natural Markdown Formatting**: Outputs bulleted points and bold headings without raw syntax issues or broken tables.
- **Streaming Response**: Near-instant token delivery via Next.js Edge routes.

---

## 🎓 Role-Based LMS Portals

| Role | Access Level | Key Capabilities |
| :--- | :--- | :--- |
| **Student** | Student Portal (`/dashboard/student`) | View assignments, submit homework, take timed MCQ quizzes with instant scoring & confetti feedback, track attendance, and read notices. |
| **Teacher** | Faculty Portal (`/dashboard/teacher`) | Publish assignments, grade student submissions with custom feedback, create MCQ quizzes, and post broadcasts. |
| **Admin** | Governance Portal (`/dashboard/admin`) | Manage student & teacher accounts, activate/suspend/delete users, inspect AI telemetry logs, and oversee fee catalogs. |

> **Official Administrator Access:**
> - **Email**: `jawerianadeem93@gmail.com`
> - **Password**: `admin`

---

## 🎨 Design System & Palette

Derived from the official Mind Flare Academy brand identity:

```
┌────────────────────────────────────────────────────────────────────────┐
│  Primary Navy     #1E2A44  ████████████  Headers, Navigation, Badges   │
│  Flame Orange     #F7941E  ████████████  Primary Gradient CTA, Buttons │
│  Flame Yellow     #FFC93C  ████████████  Warm Glow & Focus Highlights  │
│  Teal Accent      #2BA8C4  ████████████  Links, Active Indicators      │
│  Cream Canvas     #FAF3E3  ████████████  Background, Cards, Surfaces   │
└────────────────────────────────────────────────────────────────────────┘
```

- **Typography**: `Playfair Display` (Serif Headings) + `Inter` (Sans-Serif Body).
- **Component Styling**: Glassmorphism cards with smooth hover micro-animations.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **AI RAG Engine**: [Groq SDK](https://groq.com/)
- **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL with RLS + Local Client-Side Fallback)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 📁 Project Architecture

```
mind-flare-academy/
├── public/
│   ├── logo.svg              # Brand vector graphics
│   └── favicon.ico           # Website icon
├── src/
│   ├── app/
│   │   ├── api/chat/route.ts # Groq RAG AI Streaming Endpoint
│   │   ├── dashboard/
│   │   │   ├── admin/        # Admin Management Dashboard
│   │   │   ├── student/      # Student Learning Dashboard
│   │   │   └── teacher/      # Teacher LMS Dashboard
│   │   ├── globals.css       # Design tokens & custom utilities
│   │   ├── layout.tsx        # App root layout with metadata
│   │   └── page.tsx          # Single-page smooth-scroll portal
│   ├── components/
│   │   ├── About.tsx         # Mission, shifts, and 9 pillars
│   │   ├── AdmissionSection.tsx # 6-step admissions & WhatsApp inquiry
│   │   ├── AuthModal.tsx     # Sign In & Sign Up with password toggle
│   │   ├── ChatbotDrawer.tsx # AI Counselor drawer interface
│   │   ├── ClassesSection.tsx# Academic coaching categories
│   │   ├── ContactFooter.tsx # Contact details, map, social channels
│   │   ├── CoursesSection.tsx# 10 digital skills short courses
│   │   ├── FaqSection.tsx    # Searchable academy FAQ accordion
│   │   ├── FeeStructureSection.tsx # Fee tables & discount calculator
│   │   ├── Hero.tsx          # Main header showcase
│   │   ├── Logo.tsx          # Multi-size adaptive logo component
│   │   └── Navbar.tsx        # Sticky header navigation
│   ├── lib/
│   │   ├── demo-data.ts      # Structured courses, classes & mock data
│   │   ├── groq.ts           # Groq API streaming client configuration
│   │   ├── knowledge-base.ts # Institutional knowledge chunks & TF-IDF search
│   │   └── supabase.ts       # Supabase client & persistent LocalStore engine
│   └── types/
│       └── index.ts          # Type definitions (User, Quiz, Assignment, etc.)
├── supabase/
│   ├── schema.sql            # PostgreSQL schema with RLS policies
│   └── seed.sql              # Master course catalog & fees
├── .env.example              # Environment variables template
├── package.json              # Project dependencies & scripts
└── tailwind.config.ts        # Tailwind theme extensions
```

---

## 💻 Local Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/mind-flare-academy.git
cd mind-flare-academy
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the project root:
```bash
cp .env.example .env.local
```

Fill in your configuration:
```env
# Groq API (Required for AI Chatbot)
GROQ_API_KEY=gsk_your_groq_api_key_here
GROQ_MODEL=openai/gpt-oss-120b

# Supabase (Optional for local persistent mode; required for cloud database)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_public_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run Development Server
```bash
npm run dev
```

Visit **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🗄️ Supabase Database Setup

To link a live PostgreSQL backend on [Supabase](https://supabase.com/):

1. Create a new free project on the [Supabase Dashboard](https://supabase.com/dashboard).
2. Go to the **SQL Editor** tab.
3. Copy and run the contents of [`supabase/schema.sql`](supabase/schema.sql) to set up tables and Row-Level Security.
4. Run [`supabase/seed.sql`](supabase/seed.sql) to populate initial academy programs and fee catalogs.
5. Copy your **Project URL** and **Anon Key** from *Project Settings ➔ API* into `.env.local`.

---

## 🚀 Deployment Guide (Vercel)

This application is fully optimized for the **Vercel Free Tier**:

1. Push your code to **GitHub**:
   ```bash
   git add .
   git commit -m "Deploy Mind Flare Academy"
   git push origin main
   ```
2. Log in to [Vercel](https://vercel.com/) and click **"New Project"**.
3. Import your GitHub repository.
4. Add the following **Environment Variables** in the Vercel dashboard:
   - `GROQ_API_KEY`
   - `GROQ_MODEL`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
5. Click **"Deploy"**.

---

## 📍 Campus & Contact Information

| Detail | Information |
| :--- | :--- |
| **Campus Address** | House DD1, Street # 6, Jhanda Chichi, Rawalpindi, Pakistan |
| **WhatsApp / Phone** | [0317-5790206](https://wa.me/923175790206) |
| **Email** | [mindflareacademy@gmail.com](mailto:mindflareacademy@gmail.com) |
| **Instagram** | [@mind_flare_academy](https://instagram.com/mind_flare_academy) |
| **Shift Timings** | **Morning:** 8:00 AM – 12:00 PM \| **Evening:** 3:00 PM – 7:00 PM |

---

<div align="center">
  <sub>Built with ❤️ for Mind Flare Academy • © 2026 All Rights Reserved.</sub>
</div>
