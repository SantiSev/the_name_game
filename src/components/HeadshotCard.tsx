import { TouchableOpacity, Image } from "react-native";
import { Teammate, GuessResult } from "../types";

interface Props {
  teammate: Teammate;
  onPress: (teammate: Teammate) => void;
  guessResult: GuessResult;
  wasSelected: boolean;
  isCorrect: boolean;
  disabled: boolean;
}

export default function HeadshotCard({
  teammate,
  onPress,
  guessResult,
  wasSelected,
  isCorrect,
  disabled,
}: Props) {
  const getBorderColor = () => {
    if (wasSelected && guessResult === "incorrect") return "border-red-500";
    if (wasSelected && guessResult === "correct") return "border-green-500";
    if (!wasSelected && guessResult === "correct" && isCorrect)
      return "border-green-500";
    return "border-transparent";
  };

  return (
    <TouchableOpacity
      onPress={() => onPress(teammate)}
      disabled={disabled}
      className={`w-[30%] aspect-square m-[1.5%] rounded-xl overflow-hidden border-4 ${getBorderColor()}`}
      activeOpacity={0.75}
    >
      <Image
        source={{ uri: teammate.headshotUrl }}
        className="w-full h-full"
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
}
