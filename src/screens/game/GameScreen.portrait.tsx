import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Teammate, GuessResult } from "../../types";

interface Props {
  currentSix: Teammate[];
  correctAnswer: Teammate | null;
  score: number;
  guessResult: GuessResult;
  lastGuessId: string | null;
  isLoading: boolean;
  mode: string;
  timeLeft: number;
  onGuess: (teammate: Teammate) => void;
}

export default function GameScreenPortrait({
  currentSix,
  correctAnswer,
  score,
  guessResult,
  lastGuessId,
  isLoading,
  mode,
  timeLeft,
  onGuess,
}: Props) {
  if (isLoading) {
    return (
      <View className="flex-1 bg-game_blue items-center justify-center">
        <ActivityIndicator size="large" color="#ffffff" />
        <Text className="text-white mt-4">Loading...</Text>
      </View>
    );
  }

  const getBorderColor = (teammate: Teammate) => {
    if (lastGuessId === teammate.id) {
      return guessResult === "correct" ? "border-green-400" : "border-red-400";
    }
    if (guessResult === "correct" && teammate.id === correctAnswer?.id) {
      return "border-green-400";
    }
    return "border-transparent";
  };

  return (
    <View className="flex-1 bg-game_blue">
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 pt-12 pb-4">
        <View className="bg-white/20 rounded-xl px-4 py-2">
          <Text className="text-white text-xs">Score</Text>
          <Text className="text-white text-2xl font-bold">{score}</Text>
        </View>

        {mode === "timed" && (
          <View
            className={`rounded-xl px-4 py-2 ${timeLeft <= 10 ? "bg-red-500" : "bg-white/20"}`}
          >
            <Text className="text-white text-xs">Time</Text>
            <Text className="text-white text-2xl font-bold">{timeLeft}s</Text>
          </View>
        )}
      </View>

      {/* Question */}
      <View className="items-center px-6 py-4">
        <Text className="text-white/70 text-sm">Who is...</Text>
        <Text className="text-white text-3xl font-bold text-center mt-1">
          {correctAnswer?.fullName}
        </Text>
      </View>

      {/* 3x2 Headshot Grid */}
      <View className="flex-row flex-wrap justify-center px-4 gap-3 mt-2">
        {currentSix.map((teammate) => (
          <TouchableOpacity
            key={teammate.id}
            onPress={() => onGuess(teammate)}
            disabled={guessResult === "correct"}
            className={`border-4 rounded-xl overflow-hidden ${getBorderColor(teammate)}`}
            style={{ width: "30%", aspectRatio: 1 }}
          >
            <Image
              source={{ uri: teammate.headshotUrl }}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
