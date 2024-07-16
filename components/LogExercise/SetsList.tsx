import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

interface Set {
  weight: number;
  reps: number;
}

const SetsList = ({ sets }: { sets: Set[] }) => {
  return (
    <FlatList
      data={sets}
      renderItem={({ item, index }) => (
        <View style={styles.setContainer}>
          <View style={styles.setNumber}>
            <Text style={styles.setNumberText}>{index + 1}</Text>
          </View>
          <Text style={styles.setText}>{item.weight} lbs</Text>
          <Text style={styles.setText}>{item.reps} reps</Text>
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  setContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 0,
    justifyContent: 'center',
    marginTop: 30,
  },
  setNumber: {
    backgroundColor: 'black',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
  },
  setNumberText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  setText: {
    marginRight: 20,
    fontSize: 18,
  },
});

export default SetsList;
