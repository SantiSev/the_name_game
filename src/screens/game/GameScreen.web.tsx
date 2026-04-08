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
  onGuess: (teammate: Teammate) => void;
  onContinue: () => void;
}

export default function GameScreenWeb({
  currentSix,
  correctAnswer,
  guessResult,
  lastGuessId,
  isLoading,
  onGuess,
  onContinue,
}: Props) {
  if (isLoading) {
    return (
      <View className="flex-1 bg-game_blue items-center justify-center">
        <ActivityIndicator size="large" color="#ffffff" />
        <Text className="text-white mt-4">Loading teammates...</Text>
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
    <View className="flex-1 bg-white">
      <View className="flex-row justify-center items-center px-12 pt-8 pb-4 bg-game_blue">
        <Text className="text-white text-center text-4xl font-bold">
          The Name Game
        </Text>
      </View>

      <View className="items-center py-6 mt-10">
        <Text className="text-game_blue text-lg">
          Try matching the WillowTree employee to their photo.
        </Text>
        <Text className="text-game_blue text-4xl font-bold text-center mt-2">
          {correctAnswer?.fullName}
        </Text>
      </View>

      <View className="px-12 gap-4 items-center">
        {[currentSix.slice(0, 3), currentSix.slice(3, 6)].map(
          (row, rowIndex) => (
            <View key={rowIndex} className="flex-row justify-center gap-4">
              {row.map((teammate) => (
                <TouchableOpacity
                  key={teammate.id}
                  onPress={() => onGuess(teammate)}
                  disabled={guessResult !== null}
                  className={`border-4 rounded-2xl overflow-hidden ${getBorderColor(teammate)}`}
                  style={{ width: 250, height: 250 }}
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
                        source={
                          guessResult === "correct" ? correctIcon : wrongIcon
                        }
                        style={{ width: 80, height: 80 }}
                        contentFit="contain"
                      />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          ),
        )}
      </View>

      <TouchableOpacity
        onPress={onContinue}
        disabled={guessResult !== "correct"}
        className={`py-4 px-28 rounded-2xl mt-8 self-center ${
          guessResult === "correct" ? "bg-button_blue" : "bg-gray-300"
        }`}
      >
        <Text className="text-white text-lg font-bold">Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  overlayCorrect: { backgroundColor: "rgba(34, 197, 94, 0.7)" },
  overlayIncorrect: { backgroundColor: "rgba(239, 68, 68, 0.7)" },
});
