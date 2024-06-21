import { getDaysOfTheWeek } from "@/utils/getDaysOfTheWeek";
import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import globalStyles from "../../styles/styles";

const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
export const DateSelector = () => {
    
   const weekDates = getDaysOfTheWeek()

   return (
    <View style={styles.dateContainer}>
        {
            weekDates.map((date, i) => (
                <TouchableOpacity key={i} style={styles.dateBtn}>
                    <Text key={i} style={styles.dayText}>{days[date.getDay()]}</Text>
                    <Text style={styles.dateText}>{date.getDate()}</Text>
                </TouchableOpacity>
            ))
        }
    </View>
   )
}

const styles = StyleSheet.create({
    dateContainer: {
        flexDirection: "row",
        gap: 8,
        padding: 10,
        justifyContent: "space-evenly",
        marginTop:25,
    },
    dateBtn: {
        alignItems: "center",
        backgroundColor: "#ECBE69",
        padding: 8,
        gap: 5,
        borderRadius: 10,
    },
    dayText: {
        color: "#191818",
        fontFamily: "Lexend_700Bold",
    },
    dateText: {
        color: "#191818",
        fontFamily: "Lexend_400Regular",
    }

})