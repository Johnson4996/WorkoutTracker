import React from "react";
import { View,Text, TouchableOpacity, StyleSheet } from "react-native";
import { Entypo } from '@expo/vector-icons';


const ExerciseLog = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.startText}>Tap "Add Exercise" to Start a New Log</Text>
            <Text style={styles.noExerciseText}>Last Workout: June 17th, 2024</Text>
            <TouchableOpacity style={styles.addBtn}>
                <Entypo name="circle-with-plus" size={15} color="#ECBE69" /> 
                <Text style={styles.btnText}>Add Exercise</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
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
})


export default ExerciseLog