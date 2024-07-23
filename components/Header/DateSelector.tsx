import { getDaysOfTheWeek } from "@/utils/getDaysOfTheWeek";
import React, { useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { TODAY_DATE_FORMATTED } from "@/utils/constants";
import { useDate } from "@/utils/DateContext";

const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
export const DateSelector = () => {
    const { selectedDate, setSelectedDate } = useDate();
    const weekDates = getDaysOfTheWeek()

    const handleDatePress = (date: Date) => {
        const formattedDate = date.toISOString().split('T')[0];
        setSelectedDate(date);
    };

   return (
    <View style={styles.dateContainer}>
        {
            weekDates.map((date, i) => {
                const formattedDate = date.toISOString().split('T')[0];
                const isSelected = formattedDate === selectedDate.toISOString().split('T')[0];
                return (
                    <TouchableOpacity 
                        key={i} 
                        style={[styles.dateBtn, isSelected && styles.selectedDateBtn]} 
                        onPress={() => handleDatePress(date)}
                    >
                        <Text key={i} style={[styles.dayText, isSelected && styles.selectedText]}>{days[date.getDay()]}</Text>
                        <Text style={[styles.dateText, isSelected && styles.selectedText]}>{date.getDate()}</Text>
                    </TouchableOpacity>
                );
            })
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
        marginTop: 25,
    },
    dateBtn: {
        alignItems: "center",
        backgroundColor: "#ECBE69",
        padding: 8,
        gap: 5,
        borderRadius: 10,
    },
    selectedDateBtn: {
        backgroundColor: "white",
    },
    dayText: {
        color: "#191818",
        fontFamily: "Lexend_700Bold",
    },
    dateText: {
        color: "#191818",
        fontFamily: "Lexend_400Regular",
    },
    selectedText: {
        color: "#000000",
    },

})