import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  useWindowDimensions,
  Platform,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useGameLogic } from "../../hooks/useGameLogic";
import { GameMode } from "../../types";
import GameScreenWeb from "./GameScreen.web";
import GameScreenPortrait from "./GameScreen.portrait";
import GameScreenLandscape from "./GameScreen.landscape";

export default function GameScreen() {
  const router = useRouter();
  const { mode } = useLocalSearchParams<{ mode: string }>();
  const gameMode: GameMode = mode === "timed" ? "timed" : "practice";

  const { width, height } = useWindowDimensions();
  const isWeb = Platform.OS === "web";
  const isLandscape = width > height;

  const {
    currentSix,
    correctAnswer,
    score,
    isGameOver,
    guessResult,
    lastGuessId,
    timeLeft,
    isLoading,
    nextRound,
    handleGuess,
    stats,
  } = useGameLogic(gameMode);

  const handleOk = () => {
    router.replace("/");
  };

  const sharedProps = {
    currentSix,
    correctAnswer,
    score,
    guessResult,
    lastGuessId,
    isLoading,
    onGuess: handleGuess,
  };

  const renderScreen = () => {
    if (isWeb) return <GameScreenWeb {...sharedProps} onContinue={nextRound} />;
    if (isLandscape)
      return <GameScreenLandscape {...sharedProps} timeLeft={timeLeft} />;
    return (
      <GameScreenPortrait
        {...sharedProps}
        mode={gameMode}
        timeLeft={timeLeft}
      />
    );
  };

  return (
    <View className="flex-1">
      {renderScreen()}

      {/* Game Over Modal */}
      <Modal visible={isGameOver} transparent animationType="fade">
        <View className="flex-1 bg-black/60 items-center justify-center">
          <View className="bg-white rounded-2xl p-8 w-4/5 items-center gap-4">
            <Text className="text-game_blue text-3xl font-bold">
              Game Over!
            </Text>

            {/* Score */}
            <Text className="text-6xl font-bold text-game_blue">
              {stats.correct}
            </Text>
            <Text className="text-gray-500 text-sm">correct answers</Text>

            {/* Stats */}
            <View className="w-full bg-gray-100 rounded-xl p-4 gap-2">
              <View className="flex-row justify-between">
                <Text className="text-gray-600">✅ Correct</Text>
                <Text className="font-bold text-green-500">
                  {stats.correctPercent}%
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-600">❌ Incorrect</Text>
                <Text className="font-bold text-red-500">
                  {stats.incorrectPercent}%
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-600">⏱ Avg time</Text>
                <Text className="font-bold text-game_blue">
                  {stats.avgTimeSeconds}s
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={handleOk}
              className="bg-game_blue rounded-full px-16 py-4 mt-2"
            >
              <Text className="text-white text-lg font-bold">OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
