
//TODO: Add non bold lbs to weight counter

import SetsList from '@/components/LogExercise/SetsList';
import { addSet, addWorkoutExercise } from '@/utils/database';
import { Entypo } from '@expo/vector-icons';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import react, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


type LogExerciseScreenParams = {
    workoutId: number;
    exerciseId: string;
    exerciseName: string;
  };

type LogExerciseRouteProp = RouteProp<{ LogExercise: LogExerciseScreenParams }, 'LogExercise'>;
export default function LogExerciseScreen() {

    const navigation = useNavigation();
    const route = useRoute<LogExerciseRouteProp>();
    const { workoutId, exerciseId, exerciseName } = route.params;

    const [weight, setWeight] = useState(0);
    const [reps, setReps] = useState(0);
    const [sets, setSets] = useState([{weight:0, reps:0}]);

    useEffect(() => {
        navigation.setOptions({ title: exerciseName });
      }, [navigation]);
    
      const handleSaveSet = async (workoutExerciseId:number, weight:number, reps:number) => {
        await addWorkoutExercise(workoutExerciseId, exerciseId)
        await addSet(workoutExerciseId, weight, reps);
      };

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
          <TouchableOpacity onPress={() => setWeight(weight - 5)}>
          <Entypo name="circle-with-minus" size={30} color="#000000" />
          </TouchableOpacity>
          <TextInput style={styles.counterText} onChange={(e) => setWeight(Number(e.nativeEvent.text))}>{weight}</TextInput> 
          <TouchableOpacity onPress={() => setWeight(weight + 5)}>
          <Entypo name="circle-with-plus" size={30} color="#000000" />
          </TouchableOpacity>
      </View>
      <Text style={styles.counterLabel}>REPS</Text>
      <View style={styles.weightRepContainer}>
          <TouchableOpacity onPress={() => setReps(reps - 1)}>
          <Entypo name="circle-with-minus" size={30} color="#000000" />
          </TouchableOpacity>
          <TextInput style={styles.counterText} onChange={(e) => setReps(Number(e.nativeEvent.text))}>{reps}</TextInput>
          <TouchableOpacity onPress={() => setReps(reps + 1)}>
          <Entypo name="circle-with-plus" size={30} color="#000000" />
          </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.addBtn} onPress={() => setSets([...sets, {weight: weight, reps: reps}])}>
              <Text style={styles.btnText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteBtn} onPress={() => setSets([])}>
              <Text style={styles.btnText}>Delete</Text>
          </TouchableOpacity>
      </View>
      {
          sets.length > 0 ? 
          <>
              <SetsList sets={sets} />
                  <SafeAreaView style={styles.saveBtnContainer}>
                  <TouchableOpacity style={styles.saveBtn} onPress={() =>{
                      sets.forEach(async (set) => {
                          await handleSaveSet(parseInt(exerciseId), set.weight, set.reps);
                          console.log("Set saved successfully", set);
                      })
                      navigation.navigate('index');
                  }}>
                      <Text style={styles.saveBtnText}>Save</Text>
                  </TouchableOpacity>
              </SafeAreaView>
          </>
       : null
      }
      
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