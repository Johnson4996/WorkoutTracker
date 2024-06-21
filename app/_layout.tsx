import { Lexend_400Regular, Lexend_700Bold } from "@expo-google-fonts/lexend";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";



export default function RootLayout() {
  let [fontsLoaded, fontsError] = useFonts({
    Lexend_400Regular,
    Lexend_700Bold
  });

  if (!fontsLoaded && !fontsError) {
    return null;
  }else {
    SplashScreen.hideAsync();
  }
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* <Stack.Screen name="not-found" /> */}
    </Stack>
  );
}
