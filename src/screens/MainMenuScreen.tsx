import {
  View,
  Image,
  TouchableOpacity,
  Text,
  useWindowDimensions,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";

const mobileVerticalLogo = require("../assets/images/MobileVerticalLogo.png");
const mobileHorizontalLogo = require("../assets/images/MobileHorizontalLogo.png");
const webLogo = require("../assets/images/WebLogo.png");

export default function MainMenuScreen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const isWeb = Platform.OS === "web";
  const isLandscape = width > height;

  // const goToGame = (mode: "practice" | "timed") => {
  //   router.push({ pathname: "/game", params: { mode } });
  // };

  // --- WEB LAYOUT ---
  if (isWeb) {
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
        <View className="flex-1 z-10 absolute bottom-10 h-1/3 items-center justify-between w-full px-10 py-12">
          <Text className="text-white text-2xl font-thin text-center">
            Try matching the WillowTree Employee to their photo
          </Text>
          <TouchableOpacity
            //onPress={() => goToGame("practice")}
            className="bg-button_blue rounded-xl px-44 py-4 mb-12"
          >
            <Text className="text-white text-sm font-bold">Play!</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // --- MOBILE LANDSCAPE LAYOUT ---
  if (isLandscape) {
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
            //onPress={() => goToGame("practice")}
            className="bg-button_blue rounded-full px-10 py-4 w-full items-center"
          >
            <Text className="text-white text-lg font-bold">Practice Mode</Text>
          </TouchableOpacity>

          <TouchableOpacity
            //onPress={() => goToGame("timed")}
            className="bg-button_blue rounded-full px-10 py-4 w-full items-center"
          >
            <Text className="text-white text-lg font-bold">Timed Mode</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // --- MOBILE PORTRAIT LAYOUT ---
  return (
    <View className="flex-1 bg-game_blue">
      <Image
        source={mobileVerticalLogo}
        style={{
          position: "absolute",
          width: "100%",
          height: "75%",
        }}
        resizeMode="contain"
      />
      <View className="flex-1 justify-center items-center px-8 gap-4 bottom-0 mb-32 absolute">
        <Text className="text-white text-lg font-normal text-center px-10">
          Try matching the WillowTree Employee to their photo
        </Text>
        <TouchableOpacity
          //onPress={() => goToGame("practice")}
          className="bg-button_blue rounded-full py-4 w-full items-center"
        >
          <Text className=" text-white text-xl font-bold">Practice Mode</Text>
        </TouchableOpacity>

        <TouchableOpacity
          //onPress={() => goToGame("timed")}
          className="bg-button_blue rounded-full py-4 w-full items-center"
        >
          <Text className="text-white text-xl font-bold">Timed Mode</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
