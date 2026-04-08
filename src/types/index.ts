export interface Teammate {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  jobTitle: string;
  headshotUrl: string;
}

export type GameMode = "practice" | "timed";

export type GuessResult = "correct" | "incorrect" | null;

export interface RoundResult {
  correct: boolean;
  timeTaken: number; // in milliseconds
}
