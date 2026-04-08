import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Image as ExpoImage } from "expo-image";
import { Teammate, GuessResult } from "../../types";

const correctIcon = require("../../assets/images/Correct.svg");
const wrongIcon = require("../../assets/images/Wrong.svg");

interface Props {
  currentSix: Teammate[];
  correctAnswer: Teammate | null;
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
    <View className="flex-1 bg-game_blue pt-20">
      {/* Header */}
      {mode === "timed" && (
        <View className="flex-row justify-end items-center px-6 pt-12 pb-4">
          <View
            className={`rounded-xl px-4 py-2 ${timeLeft <= 10 ? "bg-red-500" : "bg-white/20"}`}
          >
            <Text className="text-white text-xs">Time</Text>
            <Text className="text-white text-2xl font-bold">{timeLeft}s</Text>
          </View>
        </View>
      )}

      {/* Question */}
      <View className="items-center px-6 py-4">
        <Text className="text-white/70 text-sm">
          Try matching the WillowTree employee to their photo.
        </Text>
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
            {lastGuessId === teammate.id && guessResult !== null && (
              <View
                style={[
                  StyleSheet.absoluteFillObject,
                  guessResult === "correct"
                    ? styles.overlayCorrect
                    : styles.overlayIncorrect,
                ]}
                className="items-center justify-center"
              >
                <ExpoImage
                  source={guessResult === "correct" ? correctIcon : wrongIcon}
                  style={{ width: 56, height: 56 }}
                  contentFit="contain"
                />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlayCorrect: { backgroundColor: "rgba(34, 197, 94, 0.7)" },
  overlayIncorrect: { backgroundColor: "rgba(239, 68, 68, 0.7)" },
});
