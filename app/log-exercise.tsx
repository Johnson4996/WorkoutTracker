
//TODO: Add non bold lbs to weight counter

import SetsList from '@/components/LogExercise/SetsList';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import react, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LogExerciseScreen() {

    const navigation = useNavigation();

    const [weight, setWeight] = useState(0);
    const [reps, setReps] = useState(0);

    useEffect(() => {
        navigation.setOptions({ title: "Chest Press" });
      }, [navigation]);
    
    return (
    <View style={styles.background}>
        <View style={styles.container}>
            <TouchableOpacity style={styles.dateButton}>
                <Text style={styles.dateText}>Today, March 11</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.historyButton}>
                <Text style={styles.historyText}>History</Text>
            </TouchableOpacity>
        </View>
        <Text style={styles.counterLabel}>WEIGHT</Text>
        <View style={styles.weightRepContainer}>
            <TouchableOpacity onPress={() => setWeight(weight - 1)}>
            <Entypo name="circle-with-minus" size={30} color="#000000" />
            </TouchableOpacity>
            <Text style={styles.counterText}>{weight}</Text> 
            <TouchableOpacity onPress={() => setWeight(weight + 1)}>
            <Entypo name="circle-with-plus" size={30} color="#000000" />
            </TouchableOpacity>
        </View>
        <Text style={styles.counterLabel}>REPS</Text>
        <View style={styles.weightRepContainer}>
            <TouchableOpacity onPress={() => setReps(reps - 1)}>
            <Entypo name="circle-with-minus" size={30} color="#000000" />
            </TouchableOpacity>
            <Text style={styles.counterText}>{reps}</Text>
            <TouchableOpacity onPress={() => setReps(reps + 1)}>
            <Entypo name="circle-with-plus" size={30} color="#000000" />
            </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.addBtn}>
                <Text style={styles.btnText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteBtn}>
                <Text style={styles.btnText}>Delete</Text>
            </TouchableOpacity>
        </View>
        <SetsList sets={[{weight: weight, reps: reps}]}/>
        <SafeAreaView style={styles.saveBtnContainer}>
            <TouchableOpacity style={styles.saveBtn}>
                <Text style={styles.saveBtnText}>Save</Text>
            </TouchableOpacity>
        </SafeAreaView>
    </View>
    );
}


const styles = StyleSheet.create({
    background:{
        backgroundColor: 'white',
        flex: 1
    },
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 20,
    },
    dateButton: {
      flex: 1,
      backgroundColor: 'black',
      alignItems: 'center',
      padding: 10,
      borderRadius: 5,
    },
    historyButton: {
      flex: 1,
      backgroundColor: 'lightgrey',
      alignItems: 'center',
      padding: 10,
      borderRadius: 5,
    },
    dateText: {
      color: 'white',
      fontWeight: 'bold',
    },
    historyText: {
      color: 'black',
      fontWeight: 'bold',
    },
    counterLabel: {
      marginTop: 20,
      alignSelf: 'center',
    },
    counterText: {
      fontWeight: 'bold',
      fontSize: 25,
    },
    weightRepContainer: {
      marginTop: 20,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      padding: 10,
      borderRadius: 5,
    },
    buttonContainer: {
      marginTop: 20,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      padding: 10,
      borderRadius: 5,
    },
    addBtn:{
        backgroundColor: '#ECBE69',
        padding: 10,
        borderRadius: 15,
        width: 150,
    },
    deleteBtn:{
        backgroundColor: 'lightgrey',
        padding: 10,
        borderRadius: 15,
        width: 150,
    },
    btnText:{
        textAlign: 'center',
        fontWeight: 'bold',
    },
    saveBtnContainer:{
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        padding: 10,
        borderRadius: 5,
        marginBottom: 60,
    },
    saveBtn:{
        backgroundColor: '#ECBE69',
        padding: 15,
        borderRadius: 15,
        width: "90%",
    },
    saveBtnText:{
        textAlign: 'center',
        fontWeight: 'bold',
    },
  });