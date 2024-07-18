import Header from "../../components/Header/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts, Lexend_400Regular, Lexend_700Bold } from '@expo-google-fonts/lexend';
import { Platform, StyleSheet, View, StatusBar } from "react-native";
import ExerciseLog from "@/components/ExerciseLog/ExerciseLog";
import { useEffect, useState } from "react";
import { getWorkoutsForDay } from "@/utils/database";

export default function HomeScreen() {

  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const date = new Date().toISOString().split('T')[0]; 
        const results = await getWorkoutsForDay(date);
        console.log(results)
        setWorkouts(results);
      } catch (error) {
        console.log("Error loading workouts", error);
      }
    };

    loadWorkouts();
    
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.statusBarBackground}/>
      <StatusBar translucent barStyle="light-content" backgroundColor={"transparent"} />
      
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.safeArea}>
        <Header />
        <ExerciseLog />
    </SafeAreaView>
    </View>
    
  );

  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C', 
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  statusBarBackground: {
     height: Platform.OS === 'ios' ? 44 : 0,
     backgroundColor: '#191818',
  }
});


