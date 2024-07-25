import React, { useCallback, useState } from "react";
import { View,Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from "expo-router";
import { deleteWorkoutExercise, getLastWorkout, getWorkoutsForDay } from "@/utils/database";
import SetsList from "../LogExercise/SetsList";
import { useFocusEffect } from "@react-navigation/native";


type Workout = {
    exercise_name: string;
    order: number;
    reps: number;
    weight: number;
    workout_exercise_id: number;
}

type Set = {
    reps: number;
    weight: number;
}

type DayWorkouts = {
    exercise_name: string;
    sets: Array<Set>;
    order: number;
    we_id: number;
}
const ExerciseLog = (selectedDate: {date: string}) => {
    const navigation = useNavigation();

    const [workouts, setWorkouts] = useState<DayWorkouts[]>([])
    const [lastWorkout, setLastWorkout] = useState<string>();
    const [deletedWorkout, setDeletedWorkout] = useState(false);

    useFocusEffect(
        useCallback(() => {
          const loadWorkouts = async () => {
            try {
              const date = selectedDate.date
              console.log("selectedDate", date) 
              const lastWorkout = await getLastWorkout();
              setLastWorkout(lastWorkout);
              const results = await getWorkoutsForDay(date);
              
              const dayWorkouts: DayWorkouts[] = [];
              results.forEach((workout: Workout) => {
                let exercise = dayWorkouts.find((dw) => dw.exercise_name === workout.exercise_name);
                if (!exercise) {
                  exercise = {
                    exercise_name: workout.exercise_name,
                    sets: [],
                    order: workout.order,
                    we_id: workout.workout_exercise_id
                  };
                  dayWorkouts.push(exercise);
                }
                if (workout.order != null) {
                  exercise.sets.push({
                    weight: workout.weight,
                    reps: workout.reps
                  });
                }
              });
              setWorkouts(dayWorkouts);
              setDeletedWorkout(false);
            } catch (error) {
              console.log("Error loading workouts", error);
            }
          };
    
          loadWorkouts();
        }, [selectedDate, deletedWorkout])
      );


    const renderDayWorkouts = () => {
        return (
        <View style={styles.container}>
            <ScrollView >
            {workouts.map((workout: DayWorkouts, index: number) => (
                <View style={styles.workoutCard}key={index}>
                    <View style={styles.workoutCardHeader}>
                        <Text style={{fontWeight: 'bold', fontSize: 15}}>{workout.exercise_name}</Text>
                    <TouchableOpacity onPress={ async () =>{
                        Alert.alert(
                            'Delete Workout',
                            'Are you sure you want to delete this exercise?',
                            [
                                {
                                    text: 'Cancel',
                                    onPress: () => console.log('Cancel Pressed'),
                                    style: 'cancel',
                                },
                                {
                                    text: 'Delete',
                                    onPress: async () => {
                                        await deleteWorkoutExercise(workout.we_id);
                                        setDeletedWorkout(true);
                                    },
                                    style: 'destructive',
                                },
                            ],
                        )
                    }}>
                        {/* TODO: add functionality for edit card */}
                        <Entypo name="dots-three-vertical" size={18} color="black"/>
                    </TouchableOpacity>
                    </View>
                    <SetsList sets={workout.sets} />
                </View>
            ))}
        </ScrollView>
        </View>
        )
    }

    const renderNoExercisesView = () => {
        return(
            <View style={styles.container}>
            <Text style={styles.startText}>Tap "Add Exercise" to Start a New Log</Text>
            <Text style={styles.noExerciseText}>Last Workout: {lastWorkout}</Text>
            <TouchableOpacity 
            style={styles.addBtn}
            onPress={() => navigation.navigate('exercises')}>
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