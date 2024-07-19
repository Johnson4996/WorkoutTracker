import React, { useEffect, useState } from "react";
import { View,Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from "expo-router";
import { getWorkoutsForDay } from "@/utils/database";
import SetsList from "../LogExercise/SetsList";

type Workout = {
    exercise_name: string;
    order: number;
    reps: number;
    weight: number;
}

type Set = {
    reps: number;
    weight: number;
}

type DayWorkouts = {
    exercise_name: string;
    sets: Array<Set>;
    order: number;
}
const ExerciseLog = () => {
    const navigation = useNavigation();

    const [workouts, setWorkouts] = useState<DayWorkouts[]>([])

    useEffect(() => {
      const loadWorkouts = async () => {
        try {
          const date = new Date().toISOString().split('T')[0]; 
          const results = await getWorkoutsForDay(date);
          
          
            const dayWorkouts = Array<DayWorkouts>();
            results.forEach((workout:Workout) => {
                let exercise = dayWorkouts.find((dw) => dw.exercise_name === workout.exercise_name);
                if(!exercise) {
                    exercise = {
                        exercise_name: workout.exercise_name,
                        sets: [],
                        order: workout.order
                    };
                    dayWorkouts.push(exercise);
                }
                if(workout.order != null){
                    exercise.sets.push({
                        weight: workout.weight,
                        reps: workout.reps
                    });
                }
          })
          setWorkouts(dayWorkouts);
        } catch (error) {
          console.log("Error loading workouts", error);
        }
      };
  
      loadWorkouts();
      
    }, []);


    const renderDayWorkouts = () => {
        return (
        <View style={styles.container}>
            <ScrollView >
            {workouts.map((workout: DayWorkouts, index: number) => (
                <View style={styles.workoutCard}key={index}>
                    <View style={styles.workoutCardHeader}>
                        <Text style={{fontWeight: 'bold', fontSize: 15}}>{workout.exercise_name}</Text>
                    <TouchableOpacity>
                        <Entypo name="dots-three-vertical" size={18} color="black"/>
                    </TouchableOpacity>
                    </View>
                    <SetsList sets={workout.sets} />
                </View>
            ))}
        </ScrollView>
        <TouchableOpacity 
        style={styles.addBtnWorkouts}
        onPress={() => navigation.navigate('add-exercise')}>
            <Entypo style={styles.addBtnWorkouts} name="circle-with-plus" size={60} color="#ECBE69" /> 
        </TouchableOpacity>
        </View>
        )
    }

    const renderNoExercisesView = () => {
        return(
            <View style={styles.container}>
            <Text style={styles.startText}>Tap "Add Exercise" to Start a New Log</Text>
            <Text style={styles.noExerciseText}>Last Workout: June 17th, 2024</Text>
            <TouchableOpacity 
            style={styles.addBtn}
            onPress={() => navigation.navigate('add-exercise')}>
                <Entypo name="circle-with-plus" size={15} color="#ECBE69" /> 
                <Text style={styles.btnText}>Add Exercise</Text>
            </TouchableOpacity>
        </View>
        )
    }


    return (
        <View>
        {workouts.length > 0 ? renderDayWorkouts() : renderNoExercisesView()}
        </View>
    )
}

const styles = StyleSheet.create({
container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
},
startText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#191818",
},
noExerciseText: {
    fontSize: 16,
    color: "#8F8F8F",
    marginVertical: 10,
},
addBtn: {
    flexDirection: "row",
    backgroundColor: "#191818",
    padding: 10,
    gap: 5,
    borderRadius: 20,
    marginVertical:20,
},
btnText: {
    color: "#FFFFFF",
},
addBtnWorkouts:{
alignSelf: "flex-end",
},
workoutCard: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 20,
    marginVertical: 5,
    gap: 5,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
    
},
workoutCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding:4,
},
})


export default ExerciseLog