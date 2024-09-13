// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, TextInput, StyleSheet, Switch, SafeAreaView } from 'react-native';
// import { useNavigation } from 'expo-router';
// import { useDate } from '@/utils/DateContext';

// export default function SettingsScreen() {
//   const navigation = useNavigation();
//   const { selectedDate, setSelectedDate } = useDate();
  
//   const [name, setName] = useState<string>('');
//   const [unit, setUnit] = useState<string>('lbs');
//   const [reminder, setReminder] = useState<string>('08:00');
//   const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(false);

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerText}>Settings</Text>
//       </View>
      
//       <View style={styles.settingContainer}>
//         <Text style={styles.settingLabel}>Name:</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your name"
//           value={name}
//           onChangeText={setName}
//         />
//       </View>
      
//       <View style={styles.settingContainer}>
//         <Text style={styles.settingLabel}>Units:</Text>
//         <View style={styles.unitButtons}>
//           <TouchableOpacity
//             style={[styles.unitButton, unit === 'lbs' && styles.selectedButton]}
//             onPress={() => setUnit('lbs')}
//           >
//             <Text style={styles.unitText}>Lbs</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.unitButton, unit === 'kgs' && styles.selectedButton]}
//             onPress={() => setUnit('kgs')}
//           >
//             <Text style={styles.unitText}>Kgs</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#E5E5E5',
//   },
//   header: {
//     marginBottom: 20,
//   },
//   headerText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     color: '#191818',
//   },
//   settingContainer: {
//     marginBottom: 20,
//     padding: 10
//   },
//   settingLabel: {
//     fontSize: 18,
//     color: '#191818',
//     marginBottom: 10,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#CCC',
//     padding: 10,
//     borderRadius: 8,
//     backgroundColor: '#FFF',
//   },
//   unitButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   unitButton: {
//     flex: 1,
//     alignItems: 'center',
//     padding: 10,
//     borderRadius: 8,
//     marginHorizontal: 5,
//     backgroundColor: '#CCC',
//   },
//   selectedButton: {
//     backgroundColor: '#191818',
//   },
//   unitText: {
//     color: '#FFF',
//     fontWeight: 'bold',
//   },
// });

