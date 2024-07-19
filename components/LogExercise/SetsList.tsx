import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

interface Set {
  weight: number;
  reps: number;
}

const SetsList = ({ sets }: { sets: Set[] }) => {
  return (
    <View style={styles.setListContainer}>
      {sets.map((set, index) => (
        <View key={index} style={styles.setContainer}>
            <View style={styles.setNumberContainer}>
              <View style={styles.setNumber}>
                <Text style={styles.setNumberText}>{index + 1}</Text>
              </View>
              {index < sets.length - 1 && <View style={styles.verticalLine}></View>}
            </View>
            <View style={styles.setTextContainer}>
              <Text style={styles.setText}>{set.weight} lbs</Text>
              <Text style={styles.setText}>{set.reps} reps</Text>
            </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  setListContainer: {
    paddingVertical: 10,
    
  },
  setContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    paddingHorizontal: 40,
    paddingVertical: 0
  },
  setNumberContainer:{
    marginRight: 70,
  },
  setNumber: {
    backgroundColor: 'black',
    borderRadius: 3,
    padding: 6,
    zIndex: 1
  },
  setNumberText: {
    color: 'white',
    fontWeight: '900',
    fontSize: 12
  },
  setTextContainer:{
    flexDirection: "row",
  },
  setText: {
    marginRight: 50,
    fontSize: 15,
  },
  verticalLine: {
    width: 3,
    height: 20,
    backgroundColor: 'black',
    marginTop: 0,
    marginLeft: 9,
    position: 'absolute',
    top:25,
    zIndex: 0
  },
});

export default SetsList;
