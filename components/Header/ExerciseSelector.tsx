import React from "react";
import { StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";


export const ExerciseSelector = () => {
    return (
        <TouchableOpacity>
            <Text>Select a Workout Routine</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    selectBtn: {
        
    },
    selectText: {
    color: "black",
    }
})