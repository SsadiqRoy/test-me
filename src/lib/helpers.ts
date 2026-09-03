export function randomSelect<T>(items: T[], quantity: number): T[] {
  if (quantity < 0 || quantity > items.length) {
    throw new Error("Quantity must be between 0 and the array length");
  }

  const shuffled = [...items];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, quantity);
}

export function formatTime(seconds: number): string {
  if (seconds < 60) {
    return `${seconds}s`;
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  return `${minutes}:${String(secs).padStart(2, "0")}`;
}

export function getRelativeDate(date: Date | string): string {
  const now = new Date();
  const target = new Date(date);

  const diffMs = now.getTime() - target.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) {
    return "less than a minute ago";
  }

  if (diffMinutes < 60) {
    return `${diffMinutes} ${diffMinutes === 1 ? "minute" : "minutes"} ago`;
  }

  if (diffHours < 24) {
    return `${diffHours} ${diffHours === 1 ? "hour" : "hours"} ago`;
  }

  if (diffDays <= 30) {
    return `${diffDays} ${diffDays === 1 ? "day" : "days"} ago`;
  }

  const sameYear = target.getFullYear() === now.getFullYear();

  return target.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    ...(sameYear ? {} : { year: "numeric" }),
  });
}

export function getTestStreak(dates: (Date | string)[]): string {
  if (dates.length === 0) {
    return "🌱 Start Your Streak";
  }

  // Normalize dates to YYYY-MM-DD and remove duplicates
  const days = [
    ...new Set(
      dates.map((date) => {
        const d = new Date(date);

        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      }),
    ),
  ].sort();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const latestDay = new Date(days[days.length - 1]);
  latestDay.setHours(0, 0, 0, 0);

  const daysSinceLatest = Math.floor((today.getTime() - latestDay.getTime()) / (1000 * 60 * 60 * 24));

  // Streak has already ended
  if (daysSinceLatest > 1) {
    return "🔥 Streak Broken";
  }

  let streak = 1;

  for (let i = days.length - 1; i > 0; i--) {
    const current = new Date(days[i]);
    const previous = new Date(days[i - 1]);

    const difference = Math.floor((current.getTime() - previous.getTime()) / (1000 * 60 * 60 * 24));

    if (difference !== 1) {
      break;
    }

    streak++;
  }

  if (streak === 1) {
    return "🔥 1 Day Streak";
  }

  return `🔥 ${streak} Day Streak`;
}

export class ScoreUtils {
  private percentage: number = 0;

  constructor(percent: number) {
    this.percentage = percent;
  }

  get status(): string {
    if (this.percentage >= 90) return "Excellent";
    if (this.percentage >= 75) return "Very Good";
    if (this.percentage >= 60) return "Good";
    if (this.percentage >= 50) return "Pass";
    return "Failed";
  }

  get message(): string {
    if (this.percentage >= 90) return "Excellent effort!";
    if (this.percentage >= 75) return "Great effort!";
    if (this.percentage >= 60) return "Good effort!";
    if (this.percentage >= 50) return "Nice effort!";
    return "Good attempt!";
  }

  get feedback(): string {
    if (this.percentage >= 90) return "Outstanding Understanding";
    if (this.percentage >= 75) return "Strong Understanding";
    if (this.percentage >= 60) return "Solid Understanding";
    if (this.percentage >= 50) return "Developing Understanding";
    return "Needs More Practice";
  }

  get color(): string {
    if (this.percentage >= 75) return "green";
    if (this.percentage >= 60) return "blue";
    if (this.percentage >= 50) return "orange";
    return "pink";
  }

  get comment(): string {
    if (this.percentage >= 90) {
      return "Outstanding work! You've demonstrated an excellent grasp of the concepts. Keep pushing yourself to reach that elite 100% bracket.";
    }

    if (this.percentage >= 75) {
      return "Great job! You've got a very solid grasp of the core concepts. Keep practicing to push yourself toward that elite 100% bracket.";
    }

    if (this.percentage >= 60) {
      return "Good work! You've built a solid foundation, but there's still room to grow. Keep practicing to strengthen your understanding.";
    }

    if (this.percentage >= 50) {
      return "Nice effort! You understand some of the key concepts. Keep practicing and reviewing the areas you missed to build more confidence.";
    }

    return "Good attempt! Don't be discouraged. Review the core concepts and keep practicing—each attempt is an opportunity to improve.";
  }
}
