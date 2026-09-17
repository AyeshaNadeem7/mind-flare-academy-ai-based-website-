-- =======================================================
-- MIND FLARE ACADEMY - SUPABASE POSTGRES SCHEMA
-- =======================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles & Roles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL CHECK (role IN ('student', 'teacher', 'admin')),
  phone TEXT,
  enrolled_class TEXT,
  shift TEXT CHECK (shift IN ('Morning', 'Evening')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'pending', 'suspended')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Classes & Courses Table
CREATE TABLE IF NOT EXISTS public.academic_programs (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  grades TEXT,
  subjects JSONB DEFAULT '[]'::jsonb,
  monthly_fee NUMERIC,
  package_fee NUMERIC,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Short Digital Courses Table
CREATE TABLE IF NOT EXISTS public.short_courses (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  duration TEXT NOT NULL,
  fee NUMERIC NOT NULL,
  fee_type TEXT DEFAULT 'one-time',
  shift_options JSONB DEFAULT '[]'::jsonb,
  tools_modules JSONB DEFAULT '[]'::jsonb,
  description TEXT,
  popular BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Assignments Table
CREATE TABLE IF NOT EXISTS public.assignments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  subject TEXT NOT NULL,
  class_name TEXT NOT NULL,
  teacher_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  teacher_name TEXT NOT NULL,
  description TEXT NOT NULL,
  due_date DATE NOT NULL,
  max_score INTEGER DEFAULT 20,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Submissions Table
CREATE TABLE IF NOT EXISTS public.submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  assignment_id UUID REFERENCES public.assignments(id) ON DELETE CASCADE,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  student_name TEXT NOT NULL,
  submission_text TEXT,
  file_url TEXT,
  score NUMERIC,
  feedback TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'graded')),
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Quizzes Table
CREATE TABLE IF NOT EXISTS public.quizzes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  subject TEXT NOT NULL,
  class_name TEXT NOT NULL,
  teacher_name TEXT NOT NULL,
  duration_minutes INTEGER DEFAULT 15,
  questions JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Quiz Attempts Table
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  quiz_id UUID REFERENCES public.quizzes(id) ON DELETE CASCADE,
  quiz_title TEXT NOT NULL,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  student_name TEXT NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  percentage NUMERIC NOT NULL,
  answers JSONB NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. Announcements Table
CREATE TABLE IF NOT EXISTS public.announcements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_name TEXT NOT NULL,
  target_audience TEXT DEFAULT 'all' CHECK (target_audience IN ('all', 'students', 'teachers')),
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('normal', 'urgent')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. AI Chatbot Telemetry Logs Table
CREATE TABLE IF NOT EXISTS public.chat_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_ip TEXT,
  query TEXT NOT NULL,
  response TEXT NOT NULL,
  retrieved_sources JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Row Level Security (RLS) Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

-- Public read access for course catalog, announcements, quizzes
CREATE POLICY "Public read for academic programs" ON public.academic_programs FOR SELECT USING (true);
CREATE POLICY "Public read for short courses" ON public.short_courses FOR SELECT USING (true);
CREATE POLICY "Public read for announcements" ON public.announcements FOR SELECT USING (true);
CREATE POLICY "Public read for quizzes" ON public.quizzes FOR SELECT USING (true);
CREATE POLICY "Public read for assignments" ON public.assignments FOR SELECT USING (true);

-- Submissions access: Students can view/insert own submissions, Teachers can view/grade
CREATE POLICY "Student insert submission" ON public.submissions FOR INSERT WITH CHECK (auth.uid() = student_id);
CREATE POLICY "User view own submission" ON public.submissions FOR SELECT USING (auth.uid() = student_id OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('teacher', 'admin')));
