import { View, Image, TouchableOpacity, Text } from "react-native";

const mobileHorizontalLogo = require("../../assets/images/MobileHorizontalLogo.png");

interface Props {
  onPractice: () => void;
  onTimed: () => void;
}

export default function MenuScreenLandscape({ onPractice, onTimed }: Props) {
  return (
    <View className="flex-1 bg-game_blue flex-row items-start">
      <Image
        source={mobileHorizontalLogo}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          right: 190,
        }}
        resizeMode="contain"
      />
      <View className="z-10 h-full w-1/2 justify-center items-center px-8 gap-4 ml-auto mr-32">
        <Text className="text-white text-lg font-normal text-center px-10">
          Try matching the WillowTree Employee to their photo
        </Text>
        <TouchableOpacity
          onPress={onPractice}
          className="bg-button_blue rounded-full px-10 py-4 w-full items-center"
        >
          <Text className="text-white text-lg font-bold">Practice Mode</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onTimed}
          className="bg-button_blue rounded-full px-10 py-4 w-full items-center"
        >
          <Text className="text-white text-lg font-bold">Timed Mode</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
