import { Lexend_400Regular, Lexend_700Bold } from "@expo-google-fonts/lexend";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";





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
      <Stack.Screen
        name="add-exercise"
        options={{
          title: 'Exercises',
          headerBackTitleVisible: false, // Hide the back button title
          headerShadowVisible: false,
          headerTintColor: '#191818',
        }}
        />
      {/* <Stack.Screen name="not-found" /> */}
    </Stack>

  
  );
}
