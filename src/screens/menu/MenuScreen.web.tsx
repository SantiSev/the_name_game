import { View, Image, TouchableOpacity, Text } from "react-native";

const webLogo = require("../../assets/images/WebLogo.png");

interface Props {
  onPlay: () => void;
}

export default function MenuScreenWeb({ onPlay }: Props) {
  return (
    <View className="flex-1 bg-game_blue items-center">
      <Image
        source={webLogo}
        style={{
          position: "absolute",
          top: "10%",
        }}
        resizeMode="contain"
      />
      <View className="flex-1 z-10 absolute bottom-10 items-center gap-5 pt-16 w-full px-10 py-12">
        <Text className="text-white text-2xl font-thin text-center my-16">
          Try matching the WillowTree Employee to their photo
        </Text>
        <TouchableOpacity
          onPress={onPlay}
          className="bg-button_blue rounded-xl px-44 py-4 mb-12"
        >
          <Text className="text-white text-sm font-bold">Play!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
