export type UserRole = "student" | "teacher" | "admin";

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  phone?: string;
  avatar_url?: string;
  enrolled_class?: string;
  shift?: "Morning" | "Evening";
  status: "active" | "pending" | "suspended";
  created_at: string;
}

export interface ShiftInfo {
  name: "Morning Shift" | "Evening Shift";
  time: string;
  duration: string;
  bestSuitedFor: string;
}

export interface AcademicClass {
  id: string;
  category: "pre-primary" | "middle" | "matric" | "intermediate" | "bachelor" | "entry-test";
  name: string;
  grades: string;
  groups?: string[];
  subjects: string[];
  monthlyFee?: number;
  packageFee?: number;
  description: string;
}

export interface SubjectFee {
  subject: string;
  class9?: number;
  class10?: number;
  class11?: number;
  class12?: number;
  monthlyFee?: number;
}

export interface CourseProgram {
  id: string;
  title: string;
  category: "digital-skills" | "language" | "competitive" | "entry-test";
  duration: string;
  fee: number;
  feeType: "one-time" | "monthly" | "lump-sum";
  shiftOptions: string[];
  toolsOrModules: string[];
  description: string;
  popular?: boolean;
}

export interface FeeCategory {
  title: string;
  section: string;
  description: string;
  items: Array<{
    name: string;
    duration?: string;
    fee: number | string;
    note?: string;
    details?: string;
  }>;
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  class_name: string;
  teacher_id: string;
  teacher_name: string;
  description: string;
  due_date: string;
  max_score: number;
  created_at: string;
}

export interface Submission {
  id: string;
  assignment_id: string;
  student_id: string;
  student_name: string;
  submission_text: string;
  file_name?: string;
  submitted_at: string;
  score?: number;
  feedback?: string;
  status: "pending" | "graded";
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct_index: number;
  explanation?: string;
}

export interface Quiz {
  id: string;
  title: string;
  subject: string;
  class_name: string;
  teacher_name: string;
  duration_minutes: number;
  questions: QuizQuestion[];
  created_at: string;
}

export interface QuizAttempt {
  id: string;
  quiz_id: string;
  quiz_title: string;
  student_id: string;
  student_name: string;
  score: number;
  total_questions: number;
  percentage: number;
  answers: number[];
  completed_at: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author_name: string;
  target_audience: "all" | "students" | "teachers";
  priority: "normal" | "urgent";
  date: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant" | "system";
  text: string;
  timestamp: string;
  sources?: string[];
}

export interface KnowledgeChunk {
  id: string;
  section: string;
  title: string;
  category: string;
  content: string;
  keywords: string[];
}
