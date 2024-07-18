//TODO: Add error popup when error deleting exercise
//TODO: figure out how to reset first delete when swiping a second delete, code is somewhat there, just not working

import { useRef } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { useNavigation } from "expo-router";
import { createOrGetWorkout } from '@/utils/database';

export default function ExerciseItem({ item, onDelete }) {

  const navigation = useNavigation()

  let row = [];
  let prevOpenedRow = useRef(null);
  const closeRow = (index) => {
    if(prevOpenedRow.current && prevOpenedRow.current !== row.current) {
      prevOpenedRow.current.close();
    }

    prevOpenedRow.current = row.current;
  }

  const handleCreateWorkout = async () => {
    try {
      const workoutId = await createOrGetWorkout();
      return workoutId;
    } catch (error) {
      console.error("Error creating workout:", error);
      throw error; 
    }
  };

  const renderRightView = (onDelete,progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0, 100],
      extrapolate: 'clamp',
    });

    return(
      <Animated.View style={[styles.deleteButton, { transform: [{ translateX: trans }] }]}>
        <TouchableOpacity onPress={() => onDelete(item.id)}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </Animated.View>
    )
  }
   
    return (
      <Swipeable
      renderRightActions={(progress, dragX) => renderRightView(onDelete,progress, dragX)}
      onSwipeableOpen={closeRow}
      ref={(ref) => (row.current = ref)}
      rightOpenValue = {-100}
      >
        <TouchableOpacity style={styles.exerciseContainer} onPress={async () => {
              try {
                const workoutId = await handleCreateWorkout();
                navigation.navigate('log-exercise', {
                  workoutId: workoutId,
                  exerciseId: item.id, 
                  exerciseName: item.name
                });
              } catch (error) {
                console.error("Error handling workout creation:", error);
              }
          }}>
            <Text style={styles.exerciseText}>{item.name}</Text>
            <Text style={styles.exerciseCategoryText}>{item.muscle_group.toUpperCase()}</Text>
        </TouchableOpacity>
      </Swipeable>
    );
}

const styles = StyleSheet.create({
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
      },
      deleteButtonContainer: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
      },
      deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
      },
      deleteButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: '100%',
      },
    })