// ===========================
// USER & AUTH
// ===========================

export interface User {
  id: number;
  fullName: string;
  email: string;
  college: string;
  aptitudePassed: boolean;
  technicalPassed: boolean;
  interviewUnlocked: boolean;
}

// ===========================
// ATTEMPTS & PROGRESS
// ===========================

export interface Attempt {
  id: number;
  userId: number;
  companyName: string;
  totalQuestions: number;
  correctAnswers: number;
  percentage: number;
  passed: boolean;
  attemptedAt: string;
}

// ===========================
// QUESTIONS
// ===========================

export interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

// ===========================
// COMPANIES
// ===========================

export interface Company {
  id: number;
  name: string;
  role: string;
  logo: string;
  color: string;
  isImage: boolean;
}

// ===========================
// API RESPONSES
// ===========================

export interface AptitudeEvalResult {
  passed: boolean;
  correct: number;
  total: number;
  percentage: number;
  message: string;
}

export interface TechnicalEvalResult {
  passed: boolean;
  correct: number;
  total: number;
  percentage: number;
  message: string;
  interviewUnlocked: boolean;
}

export interface LoginResponse {
  token: string;
  user: User;
}