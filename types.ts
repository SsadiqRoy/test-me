export interface Question {
  question: string;
  options: {
    a: string | number;
    b: string | number;
    c: string | number;
    d: string | number;
  };
  answer: "a" | "b" | "c" | "d";
  explanation: string;
}

export interface Quiz {
  id: string;
  createdAt: Date;
  lastAttemptAt: Date;
  questions: Question[];
  score: number;
  duration: number;
}

export type AnyObject = Record<string, any>;
export type AnswerStatus = "none" | "selected" | "correct" | "wrong";
export type AnswerType = keyof Question["options"] | null;
