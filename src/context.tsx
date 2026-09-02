import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Question, Quiz } from "../types";
import general from "./data/general";
import history from "./data/history";
import javascript from "./data/javascript";
import math from "./data/math";
import python from "./data/python";
import science from "./data/science";
import { randomSelect } from "./helpers";

export type Topic = "javascript" | "python" | "history" | "science" | "math" | "general";

interface QuizContent {
  topic: Topic | null;
  quiz: Quiz | null;

  selectTopic: (t: Topic | null) => void;
  generateQuiz(): void;
}

const QuizContext = createContext<QuizContent>({} as QuizContent);
const questions = { javascript, python, history, science, math, general };

export default function QuizProvider({ children }: { children: ReactNode }) {
  const [topic, setTopic] = useState<Topic | null>(null);
  const [quiz, setQuiz] = useState<Quiz | null>(null);

  useEffect(() => {
    if (!topic || !questions[topic]) return;
    generateQuiz();
  }, [topic]);

  function generateQuiz() {
    if (!topic) return;

    const quiz: Quiz = {
      id: crypto.randomUUID().split("-").join("").slice(0, 10),
      questions: randomSelect<Question>(questions[topic], 10),
      createdAt: new Date(),
      lastAttemptAt: new Date(),
      score: 0,
      duration: 0,
    };

    setQuiz(quiz);
  }
  const selectTopic = (t: Topic | null) => setTopic(t);

  // const nextQuestion = (index: number | null = 0) => ({ question: quiz?.questions[index || 0], index: index ? index + 1 : index });

  const value = { topic, quiz, selectTopic, generateQuiz };
  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error("useQuiz can not be accessed outside QuizProvider");
  return ctx;
}
