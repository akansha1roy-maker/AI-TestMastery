
export interface Lesson {
  id: string;
  title: string;
  content: string; // Markdown-like string or HTML
  duration: string;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  image: string;
  modules: Module[];
  tags: string[];
}

export interface ToolGuide {
  id: string;
  name: string;
  description: string;
  icon: string;
  features: string[];
  link: string;
  summaryContent?: string;
  relatedCourseId?: string;
  docLink?: string;
  repoLink?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
  content?: string;
}

export interface TestLog {
  id: number;
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'success';
  message: string;
}

export interface InterviewQuestion {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Playwright' | 'AI Agents' | 'Strategy' | 'MCP';
}
