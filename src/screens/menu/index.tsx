import { useWindowDimensions, Platform } from "react-native";
import { useRouter } from "expo-router";
import MenuScreenWeb from "./MenuScreen.web";
import MenuScreenPortrait from "./MenuScreen.portrait";
import MenuScreenLandscape from "./MenuScreen.landscape";

export default function MenuScreen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const isWeb = Platform.OS === "web";
  const isLandscape = width > height;

  const goToGame = (mode: "practice" | "timed") => {
    //router.push({ pathname: "/game", params: { mode } });
  };

  if (isWeb) {
    return <MenuScreenWeb onPlay={() => goToGame("practice")} />;
  }

  if (isLandscape) {
    return (
      <MenuScreenLandscape
        onPractice={() => goToGame("practice")}
        onTimed={() => goToGame("timed")}
      />
    );
  }

  return (
    <MenuScreenPortrait
      onPractice={() => goToGame("practice")}
      onTimed={() => goToGame("timed")}
    />
  );
}
