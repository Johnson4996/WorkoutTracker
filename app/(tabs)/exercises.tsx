//TODO: Add success popup when successfully added exercise
//TODO: Add error popup when error adding exercise
//TODO: Implement search

import SearchBar from '@/components/SearchBar';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { addExercise, deleteExercise, getAllExercises } from '@/utils/database';
import NewExerciseModal from '@/components/NewExerciseModal';
import ExerciseItem from '@/components/ExerciseItem';
import { GestureHandlerRootView } from 'react-native-gesture-handler'



interface Exercise {
  id: number;
  name: string;
  muscle_group: string;
  description: string;
}

export default function AddExerciseScreen() {


const [searchPhrase, setSearchPhrase] = useState("");
const [clicked, setClicked] = useState(false);
const [activeTab, setActiveTab] = useState("chest");
const [allExercises, setAllExercises] = useState<Exercise[]>([]);
const [viewModal, setViewModal] = useState(false);
const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);

const fetchExercises = async () => {
  try {
    const data = await getAllExercises();
    setAllExercises(data);
  } catch (error) {
    console.error('Error fetching exercises:', error);
  }
};

useEffect(() => {
  fetchExercises();
}, 
[])


useEffect(() => {
  setFilteredExercises(allExercises.filter(exercise => exercise.muscle_group === activeTab));
}, [activeTab, allExercises]);





const renderItem = ({ item }: { item: Exercise }) => (
  <ExerciseItem item={item} onDelete={handleDeleteExercise} />
);


const handleAddExercise = async (name: string, muscleGroup: string, description: string) => {
  await addExercise(name, muscleGroup, description)
  await fetchExercises(); 
}

const handleDeleteExercise = async (id: number) => {
  console.log("Delete exercise id: ", id)
  await deleteExercise(id)
  await fetchExercises(); 
}



    return (
      <GestureHandlerRootView>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>

            <SearchBar searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase} setClicked={setClicked} clicked={clicked} />
            <ScrollView horizontal={true} style={styles.scrollView}>
              <TouchableOpacity style={styles.scrollItem} onPress={() => setActiveTab("chest")}>
                <Text style={[styles.text, activeTab === "chest" && styles.selectedText]}>Chest</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.scrollItem} onPress={() => setActiveTab("biceps")}>
                <Text style={[styles.text, activeTab === "biceps" && styles.selectedText]}>Biceps</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.scrollItem} onPress={() => setActiveTab("triceps")}>
                <Text style={[styles.text, activeTab === "triceps" && styles.selectedText]}>Triceps</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.scrollItem} onPress={() => setActiveTab("shoulders")}>
                <Text style={[styles.text, activeTab === "shoulders" && styles.selectedText]}>Shoulders</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.scrollItem} onPress={() => setActiveTab("back")}>
                <Text style={[styles.text, activeTab === "back" && styles.selectedText]}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.scrollItem} onPress={() => setActiveTab("legs")}>
                <Text style={[styles.text, activeTab === "legs" && styles.selectedText]}>Legs</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.scrollItem} onPress={() => setActiveTab("core")}>
                <Text style={[styles.text, activeTab === "core" && styles.selectedText]}>Core</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.scrollItem} onPress={() => setActiveTab("other")}>
                <Text style={[styles.text, activeTab === "other" && styles.selectedText]}>Other</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.createBtn} onPress={() => setViewModal(true)}>
              <Entypo name="circle-with-plus" size={18} color="#ECBE69" />
              <Text style={styles.createText}>Create New Exercise</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={filteredExercises}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
          <NewExerciseModal
            isVisible={viewModal}
            onClose={() => setViewModal(false)}
            onAddExercise={handleAddExercise}
          />
        </SafeAreaView>
      </GestureHandlerRootView>
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
  selectedText: {
    color: 'black',
    fontFamily: 'Lexend_400Regular',
    fontSize: 18
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
scrollItemSelected: {
},


});