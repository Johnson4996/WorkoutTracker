import { DateProvider } from "@/utils/DateContext";
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
    <DateProvider>
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
        name="log-exercise"
        options={{
          title: 'LogExercise',
          headerBackTitleVisible: false, 
          headerShadowVisible: false,
          headerTintColor: '#191818',
        }}
        />
        <Stack.Screen
        name="calendar-exercises"
        options={{
          title: 'CalendarExercises',
          headerBackTitleVisible: false, 
          headerShadowVisible: false,
          headerTintColor: '#191818',
        }}
        />
      {/* <Stack.Screen name="not-found" /> */}
    </Stack>
    </DateProvider>

  
  );
}
