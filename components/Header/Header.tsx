import React from "react";
import { StyleSheet, Text, View } from "react-native";
import globalStyles from "../../styles/styles";
import { DateSelector } from "./DateSelector";
import { TouchableOpacity } from "react-native";
import { SimpleLineIcons } from '@expo/vector-icons';

const Header = () => {

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
        }
    });
    return (
        <View style={styles.headerContainer}>
            <Text style={globalStyles.text}>Hello, User</Text>
            <Text style={globalStyles.textSecondary}>Wednesday, March 11th</Text>
            <DateSelector/>
            <TouchableOpacity style={styles.selectBtn}>
                <Text style={styles.selectText}>Select a Workout Routine</Text>
                <SimpleLineIcons name="arrow-down" size={18} color="black" />
            </TouchableOpacity>
        </View>
    );
};

export default Header;