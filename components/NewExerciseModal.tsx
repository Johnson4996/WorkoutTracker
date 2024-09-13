
import React, { useState } from "react";
import {  Button, StyleSheet, Text, TextInput, View } from "react-native";
import Modal from "react-native-modal";
import { Dropdown } from "react-native-element-dropdown";

interface NewExerciseModalProps {
    isVisible: boolean;
    onClose: () => void;
    onAddExercise: (name: string, muscleGroup: string, description: string) => void;
  }

const NewExerciseModal: React.FC<NewExerciseModalProps> = ({ isVisible, onClose, onAddExercise }) => {
  const [name, setName] = useState('');
  const [muscleGroup, setMuscleGroup] = useState('');
  const [description, setDescription] = useState('');


  const muscleGroups = [
    { label: 'Chest', value: 'Chest' },
    { label: 'Biceps', value: 'Biceps' },
    { label: 'Triceps', value: 'Triceps' },
    { label: 'Shoulders', value: 'Shoulders' },
    { label: 'Back', value: 'Back' },
    { label: 'Legs', value: 'Legs' },
    { label: 'Abs', value: 'Abs' },
    { label: 'Other', value: 'Other' },
  ];

  const handleAddExercise = () => {
    onAddExercise(name, muscleGroup, description);
    onClose();
    setName('');
    setMuscleGroup('');
    setDescription('');
  };

    return (
    <Modal style={styles.modal} isVisible={isVisible} onBackdropPress={onClose} avoidKeyboard={true} onSwipeComplete={onClose}>
        <View style={styles.container}>
        <Text style={styles.title}>Add New Exercise</Text>
        <TextInput
          style={styles.input}
          placeholder="Exercise Name"
          value={name}
          onChangeText={setName}
        />
        <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        containerStyle={styles.containerStyle}
        data={muscleGroups}
        placeholder="Select..."
        labelField="label"
        valueField="value"
        onChange={item => setMuscleGroup(item.value)}
        />
        {/* <TextInput
          style={styles.input}
          placeholder="Muscle Group"
          value={muscleGroup}
          onChangeText={setMuscleGroup}
        /> */}
        {/* npm install react-native-element-dropdown --save */}
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
        <Button title="Add Exercise" onPress={handleAddExercise} />
      </View>
    </Modal>
    
    )
    
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    height: '50%',
    width: '100%',
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    borderRadius: 5,
  },
  dropdown: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginBottom: 20,
  },
  containerStyle: {
    maxHeight:200
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  
})

export default NewExerciseModal;
