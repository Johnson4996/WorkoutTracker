import React from "react";
import { StyleSheet, Text, View } from "react-native";
import globalStyles from "../../styles/styles";
import { DateSelector } from "./DateSelector";
// import { TouchableOpacity } from "react-native";
// import { SimpleLineIcons } from '@expo/vector-icons';
// import { AntDesign } from '@expo/vector-icons';

const Header = () => {

    

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const date = new Date();
    const day = date.getDay();
    const dateText = date.getDate();
    const month = date.getMonth();

    
    return (
        <View style={styles.headerContainer}>
            <Text style={globalStyles.text}>Hello, User</Text>
            <Text style={globalStyles.textSecondary}>{days[day]}, {months[month]} {dateText}</Text>
            <DateSelector/>
            <View style={styles.btnContainer}>
                {/* TODO: Add functionality for routines */}
            {/* <TouchableOpacity style={styles.selectBtn}>
                <Text style={styles.selectText}>Select a Workout Routine</Text>
                <SimpleLineIcons name="arrow-down" size={18} color="black" />
            </TouchableOpacity> */}
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    headerContainer:{
        backgroundColor: "#191818",
        padding: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,

    },
    selectBtn: {
        marginTop: 20,
        borderRadius: 5,
        alignItems: "center",
        padding: 10,
        backgroundColor: '#ECBE69',
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "75%"
    },
    selectText: {
    color: "black",
    fontFamily: "Lexend_400Regular",
    },
    btnContainer:{
        flexDirection: "row",
        justifyContent: "center",
    }
});

export default Header;