import { useState, useEffect, useRef, useCallback } from "react";
import { fetchTeammates, pickRandom } from "../services/api";
import { Teammate, GameMode, GuessResult, RoundResult } from "../types";
import gameConfig from "../config/gameConfig";
import { Platform } from "react-native";

const GRID_SIZE = gameConfig.teammatesCount;
const TIMED_MODE_SECONDS = gameConfig.timedModeDurationSeconds;

interface GameState {
  allTeammates: Teammate[];
  currentSix: Teammate[];
  correctAnswer: Teammate | null;
  score: number;
  isGameOver: boolean;
  guessResult: GuessResult;
  lastGuessId: string | null;
  timeLeft: number;
  isLoading: boolean;
  error: string | null;
  rounds: RoundResult[];
  roundStartTime: number;
}

export function useGameLogic(mode: GameMode) {
  const [state, setState] = useState<GameState>({
    allTeammates: [],
    currentSix: [],
    correctAnswer: null,
    score: 0,
    isGameOver: false,
    guessResult: null,
    lastGuessId: null,
    timeLeft: TIMED_MODE_SECONDS,
    isLoading: true,
    error: null,
    rounds: [],
    roundStartTime: Date.now(),
  });

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Fetch teammates on mount
  useEffect(() => {
    fetchTeammates()
      .then((teammates) => {
        const six = pickRandom(teammates, GRID_SIZE);
        const correct = six[Math.floor(Math.random() * six.length)];
        setState((prev) => ({
          ...prev,
          allTeammates: teammates,
          currentSix: six,
          correctAnswer: correct,
          isLoading: false,
          roundStartTime: Date.now(),
        }));
      })
      .catch((err) => {
        setState((prev) => ({ ...prev, error: err.message, isLoading: false }));
      });
  }, []);

  // Timed mode countdown
  useEffect(() => {
    if (mode !== "timed" || state.isLoading || state.isGameOver) return;

    timerRef.current = setInterval(() => {
      setState((prev) => {
        if (prev.timeLeft <= 1) {
          clearInterval(timerRef.current!);
          return { ...prev, timeLeft: 0, isGameOver: true };
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);

    return () => clearInterval(timerRef.current!);
  }, [mode, state.isLoading, state.isGameOver]);

  const nextRound = useCallback(
    (teammates: Teammate[], currentScore: number, rounds: RoundResult[]) => {
      const six = pickRandom(teammates, GRID_SIZE);
      const correct = six[Math.floor(Math.random() * six.length)];
      setState((prev) => ({
        ...prev,
        currentSix: six,
        correctAnswer: correct,
        score: currentScore,
        guessResult: null,
        lastGuessId: null,
        rounds,
        roundStartTime: Date.now(),
      }));
    },
    [],
  );

  const handleGuess = useCallback(
    (guessedTeammate: Teammate) => {
      const isCorrect = guessedTeammate.id === state.correctAnswer?.id;
      const timeTaken = Date.now() - state.roundStartTime;
      const newRound: RoundResult = { correct: isCorrect, timeTaken };
      const newRounds = [...state.rounds, newRound];

      if (isCorrect) {
        const newScore = state.score + 1;

        setState((prev) => ({
          ...prev,
          guessResult: "correct",
          lastGuessId: guessedTeammate.id,
          score: newScore,
          rounds: newRounds,
        }));

        if (Platform.OS !== "web") {
          // Mobile only — auto advance on correct guess
          setTimeout(
            () => nextRound(state.allTeammates, newScore, newRounds),
            gameConfig.correctGuessDelay,
          );
        }
      } else {
        setState((prev) => ({
          ...prev,
          guessResult: "incorrect",
          lastGuessId: guessedTeammate.id,
          rounds: newRounds,
          // Practice mode ends on wrong guess; timed mode continues until timer
          isGameOver: mode === "practice",
        }));
      }
    },
    [state, mode, nextRound],
  );

  // Computed stats for results screen
  const stats = {
    totalRounds: state.rounds.length,
    correct: state.rounds.filter((r) => r.correct).length,
    incorrect: state.rounds.filter((r) => !r.correct).length,
    correctPercent: state.rounds.length
      ? Math.round(
          (state.rounds.filter((r) => r.correct).length / state.rounds.length) *
            100,
        )
      : 0,
    incorrectPercent: state.rounds.length
      ? Math.round(
          (state.rounds.filter((r) => !r.correct).length /
            state.rounds.length) *
            100,
        )
      : 0,
    avgTimeSeconds: state.rounds.length
      ? (
          state.rounds.reduce((sum, r) => sum + r.timeTaken, 0) /
          state.rounds.length /
          1000
        ).toFixed(1)
      : "0.0",
  };

  return {
    ...state,
    handleGuess,
    nextRound: () => nextRound(state.allTeammates, state.score, state.rounds),
    stats,
  };
}
