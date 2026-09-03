import type { Quiz } from "../../types";

export default class UserQuizes {
  private storageKey: string;

  constructor(storageKey: string = "QUIZES") {
    this.storageKey = storageKey;
  }

  getQuizes(): Quiz[] {
    const raw = window.localStorage.getItem(this.storageKey);
    if (!raw) return [];
    return JSON.parse(raw);
  }

  saveQuizes(quizes: Quiz[]): Quiz[] {
    window.localStorage.setItem(this.storageKey, JSON.stringify(quizes));
    return quizes;
  }

  addQuiz(quiz: Quiz) {
    let all = this.getQuizes();
    all = all.filter((q) => q.id !== quiz.id);

    all.unshift(quiz);
    this.saveQuizes(all);
    return quiz;
  }

  removeQuiz(id: string) {
    const all = this.getQuizes();
    const left = all.filter((q) => q.id !== id);
    this.saveQuizes(left);
    return left;
  }
  getQuiz(id: string) {
    const all = this.getQuizes();
    return all.find((q) => q.id !== id);
  }

  clear() {
    const allow = window.confirm("You are about to clear records of all your quizes.\nAre you sure");
    if (!allow) return false;
    window.localStorage.removeItem(this.storageKey);
    return true;
  }
}
