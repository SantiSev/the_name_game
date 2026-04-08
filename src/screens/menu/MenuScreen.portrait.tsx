import { View, Image, TouchableOpacity, Text } from "react-native";

const mobileVerticalLogo = require("../../assets/images/MobileVerticalLogo.png");

interface Props {
  onPractice: () => void;
  onTimed: () => void;
}

export default function MenuScreenPortrait({ onPractice, onTimed }: Props) {
  return (
    <View className="flex-1 bg-game_blue">
      <Image
        source={mobileVerticalLogo}
        style={{ position: "absolute", width: "100%", height: "75%" }}
        resizeMode="cover"
      />
      <View className="flex-1 justify-center items-center px-8 gap-4 bottom-0 mb-32 absolute w-full">
        <Text className="text-white text-lg font-normal text-center px-10">
          Try matching the WillowTree Employee to their photo
        </Text>
        <TouchableOpacity
          onPress={onPractice}
          className="bg-button_blue rounded-full py-4 w-full items-center"
        >
          <Text className="text-white text-xl font-bold">Practice Mode</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onTimed}
          className="bg-button_blue rounded-full py-4 w-full items-center"
        >
          <Text className="text-white text-xl font-bold">Timed Mode</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
