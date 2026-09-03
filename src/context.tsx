import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Question, Quiz, Topic } from "../types";
import general from "./data/general";
import history from "./data/history";
import javascript from "./data/javascript";
import math from "./data/math";
import python from "./data/python";
import science from "./data/science";
import { randomSelect } from "./lib/helpers";
import UserQuizes from "./lib/quizManager";

interface QuizContent {
  topic: Topic | null;
  quiz: Quiz | null;
  quizManager: UserQuizes;
  selectTopic: (t: Topic | null) => void;
  saveQuiz(duration: number, score: number): void;
  retakeQuiz(quizOrId: string | Quiz): boolean;
}

const QuizContext = createContext<QuizContent>({} as QuizContent);
const questions = { javascript, python, history, science, math, general };
const quizManager = new UserQuizes();

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
      topic,
      id: crypto.randomUUID().split("-").join("").slice(0, 10),
      questions: randomSelect<Question>(questions[topic], 10),
      createdAt: new Date(),
      lastAttemptAt: new Date(),
      score: 0,
      duration: 0,
      attempts: 0,
    };

    setQuiz(quiz);
  }
  function saveQuiz(duration: number, score: number) {
    if (!quiz) return;
    quiz.duration = duration;
    quiz.score = score;
    quiz.attempts = quiz.attempts + 1;
    quizManager.addQuiz(quiz);
  }
  function retakeQuiz(quizOrId: string | Quiz) {
    const quiz = typeof quizOrId == "string" ? quizManager.getQuiz(quizOrId) : quizOrId;
    if (!quiz) return false;

    setTopic(quiz.topic);
    setTimeout(() => setQuiz(quiz), 500);
    return true;
  }

  const selectTopic = (t: Topic | null) => setTopic(t);

  const value = { topic, quiz, quizManager, selectTopic, saveQuiz, retakeQuiz };
  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error("useQuiz can not be accessed outside QuizProvider");
  return ctx;
}
