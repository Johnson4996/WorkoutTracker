import SearchBar from '@/components/SearchBar';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';


export default function AddExerciseScreen() {


const [searchPhrase, setSearchPhrase] = useState("");
const [clicked, setClicked] = useState(false);



  return (
    <View style={styles.container}>
        <View>
            <SearchBar searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase} setClicked={setClicked} clicked={clicked}/>
            <ScrollView horizontal={true} style={styles.scrollView}>
          {/* Add selected highlight */}
          <TouchableOpacity style={styles.scrollItem}>
            <Text style={styles.text}>Chest</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.scrollItem}>
            <Text style={styles.text}>Biceps</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.scrollItem}>
            <Text style={styles.text}>Triceps</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.scrollItem}>
            <Text style={styles.text}>Shoulders</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.scrollItem}>
            <Text style={styles.text}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.scrollItem}>
            <Text style={styles.text}>Legs</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.scrollItem}>
            <Text style={styles.text}>Core</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.scrollItem}>
            <Text style={styles.text}>Other</Text>
          </TouchableOpacity>
        </ScrollView>
        </View>
      <View>
        <TouchableOpacity style={styles.createBtn}>
            <Entypo name="circle-with-plus" size={18} color="#ECBE69" />
            <Text style={styles.createText}>Create New Exercise</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  text: {
    color: '#8B8989',
    fontFamily: 'Lexend_400Regular',
    fontSize: 18
  },
  scrollView: {
    flex: 1,
    maxHeight: 50,
  },
  scrollItem: {
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
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
  }
});