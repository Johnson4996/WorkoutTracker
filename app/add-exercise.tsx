import SearchBar from '@/components/SearchBar';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { fetchExercisesByGroup } from '@/utils/database';


export default function AddExerciseScreen() {


const [searchPhrase, setSearchPhrase] = useState("");
const [clicked, setClicked] = useState(false);
const [activeTab, setActiveTab] = useState("chest");
const [exercises, setExercises] = useState([]);

useEffect(() => {
  const fetchExercises = async () => {
    try {
      const data = await fetchExercisesByGroup(activeTab);
      setExercises(data);
    } catch (error) {
      console.error('Error fetching exercises:', error);
    }
  };

  fetchExercises();
}, 
[activeTab])



  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <SearchBar searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase} setClicked={setClicked} clicked={clicked}/>
            <ScrollView horizontal={true} style={styles.scrollView}>
          {/* Add selected highlight */}
          <TouchableOpacity style={styles.scrollItem} onPress={() => setActiveTab("chest")}>
            <Text style={styles.text}>Chest</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.scrollItem} onPress={() => setActiveTab("biceps")}>
            <Text style={styles.text}>Biceps</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.scrollItem} onPress={() => setActiveTab("triceps")}>
            <Text style={styles.text}>Triceps</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.scrollItem} onPress={() => setActiveTab("shoulders")}>
            <Text style={styles.text}>Shoulders</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.scrollItem} onPress={() => setActiveTab("back")}>
            <Text style={styles.text}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.scrollItem} onPress={() => setActiveTab("legs")}>
            <Text style={styles.text}>Legs</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.scrollItem} onPress={() => setActiveTab("core")}>
            <Text style={styles.text}>Core</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.scrollItem} onPress={() => setActiveTab("other")}>
            <Text style={styles.text}>Other</Text>
          </TouchableOpacity>
        </ScrollView>
        </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.createBtn}>
            <Entypo name="circle-with-plus" size={18} color="#ECBE69" />
            <Text style={styles.createText}>Create New Exercise</Text>
        </TouchableOpacity>
      </View>
        <ScrollView style={styles.exercisesContainer}>
          {exercises.map((exercise) => (
            <TouchableOpacity style={styles.exerciseContainer} key={exercise.id}>  
              <Text style={styles.exerciseText}>{exercise.name}</Text>
              <Text style={styles.exerciseCategoryText}>{exercise.muscle_group.toUpperCase()}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    width: '100%',
    alignItems: 'center',
  },
  text: {
    color: '#8B8989',
    fontFamily: 'Lexend_400Regular',
    fontSize: 18
  },
  scrollView: {
    maxHeight: 50,
  },
  scrollItem: {
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  btnContainer: {
    alignItems: 'center',
  },
  createBtn: {
      flexDirection: "row",
      padding: 10,
      gap: 5,
      borderRadius: 20,
      marginVertical:20,
      alignItems: "center",
      textAlign: "center",
  },
  createText: {
      fontSize: 16,
      fontFamily: "Lexend_400Regular",
  },
  exercisesContainer: {
    padding: 8,
    flex: 1,
},
exerciseContainer: {
  padding:10,
  marginTop: 10,
  borderBottomWidth: 1,
  borderBottomColor: "#E5E5E5",
},
exerciseText: {
  fontSize: 16,
  fontWeight: '500',
},

exerciseCategoryText: {
  color: '#8B8989',
  fontWeight: 'bold',
}
});