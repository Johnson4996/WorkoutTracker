
//TODO: add dropdown for muscle group
import React, { useState } from "react";
import {  Button, Modal, StyleSheet, Text, TextInput, View } from "react-native";


interface NewExerciseModalProps {
    isVisible: boolean;
    onClose: () => void;
    onAddExercise: (name: string, muscleGroup: string, description: string) => void;
  }

const NewExerciseModal: React.FC<NewExerciseModalProps> = ({ isVisible, onClose, onAddExercise }) => {
  const [name, setName] = useState('');
  const [muscleGroup, setMuscleGroup] = useState('');
  const [description, setDescription] = useState('');

  const handleAddExercise = () => {
    onAddExercise(name, muscleGroup, description);
    onClose();
    setName('');
    setMuscleGroup('');
    setDescription('');
  };

    return (
    <Modal visible={isVisible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
        <View style={styles.container}>
        <Text style={styles.title}>Add New Exercise</Text>
        <TextInput
          style={styles.input}
          placeholder="Exercise Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Muscle Group"
          value={muscleGroup}
          onChangeText={setMuscleGroup}
        />
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
})

export default NewExerciseModal;
