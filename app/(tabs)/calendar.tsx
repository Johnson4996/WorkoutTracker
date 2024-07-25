//TODO: Possibly get all exercises here and add marker to each date in calendar
import { useDate } from "@/utils/DateContext";
import { useNavigation } from "expo-router";
import React from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';


export default function CalendarScreen() {

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <CalendarList
      pastScrollRange={50}
      futureScrollRange={0}
      onDayPress={(day) => {
        navigation.navigate('calendar-exercises', {
          date: day.dateString
        });
        console.log('selected day', day)
      }}
      theme={{
        calendarBackground: "#E5E5E5",
        arrowColor: "#191818",
        monthTextColor: "#191818",
        dayTextColor: "#191818",
        selectedDayTextColor: "#white",
        selectedDayBackgroundColor: "#191818",
        textDayFontFamily: "Lexend_400Regular",
        textDayHeaderFontFamily: "Lexend_400Regular",
        textMonthFontFamily: "Lexend_700Bold",
        textDayHeaderFontSize: 13,
        textMonthFontSize: 20,
        todayTextColor: "#ECBE69",
        todayBackgroundColor: "#191818",
        textSectionTitleColor: "#191818",
      }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:"#E5E5E5"
  }
});


