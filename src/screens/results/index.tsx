import { View, Text, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function ResultsScreen() {
  const router = useRouter();
  const {
    total,
    correct,
    incorrect,
    percentCorrect,
    percentIncorrect,
    avgTimeSecs,
  } = useLocalSearchParams<{
    total: string;
    correct: string;
    incorrect: string;
    percentCorrect: string;
    percentIncorrect: string;
    avgTimeSecs: string;
  }>();

  return (
    <View className="flex-1 bg-game_blue items-center justify-center px-8">
      <Text className="text-white text-4xl font-bold mb-2">Game Over!</Text>
      <Text className="text-white/60 text-base mb-10">
        Here&apos;s how you did
      </Text>

      {/* Stats */}
      <View className="w-full bg-white/10 rounded-2xl p-6 gap-4">
        <StatRow label="Total Rounds" value={total} />
        <StatRow label="Correct" value={correct} color="text-green-400" />
        <StatRow label="Incorrect" value={incorrect} color="text-red-400" />
        <View className="border-t border-white/20 pt-4 mt-2 gap-4">
          <StatRow
            label="Correct %"
            value={`${percentCorrect}%`}
            color="text-green-400"
          />
          <StatRow
            label="Incorrect %"
            value={`${percentIncorrect}%`}
            color="text-red-400"
          />
          <StatRow label="Avg Time" value={`${avgTimeSecs}s`} />
        </View>
      </View>

      <TouchableOpacity
        onPress={() => router.replace("/")}
        className="mt-10 bg-white rounded-full px-16 py-4"
      >
        <Text className="text-game_blue text-xl font-bold">OK</Text>
      </TouchableOpacity>
    </View>
  );
}

function StatRow({
  label,
  value,
  color = "text-white",
}: {
  label: string;
  value: string;
  color?: string;
}) {
  return (
    <View className="flex-row justify-between items-center">
      <Text className="text-white/70 text-base">{label}</Text>
      <Text className={`${color} text-xl font-bold`}>{value}</Text>
    </View>
  );
}
