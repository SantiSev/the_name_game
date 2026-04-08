import "../global.css";
import { Stack } from "expo-router";

/// _layout.tsx is a special file in Expo Router that wraps all other screens in your app.
export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="game" />
      <Stack.Screen name="results" />
    </Stack>
  );
}
