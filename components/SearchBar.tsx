// SearchBar.js
import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";

type SearchBarProps = {
    clicked: boolean;
    searchPhrase: string;
    setSearchPhrase: (searchPhrase: string) => void;
    setClicked: (clicked: boolean) => void;
};

const SearchBar = ({ clicked, searchPhrase, setSearchPhrase, setClicked }: SearchBarProps) => {
   return (
      <View style={styles.container}>
         <View style={clicked ? styles.searchBar__clicked : styles.searchBar__unclicked}>
            <Feather name="search" size={20} color="black" style={{ marginLeft: 1 }} />

            <TextInput
               style={styles.input}
               placeholder="Search"
               value={searchPhrase}
               onChangeText={setSearchPhrase}
               onFocus={() => {
                  setClicked(true);
               }}
            />

            {clicked && (
               <Entypo
                  name="cross"
                  size={20}
                  color="black"
                  style={{ padding: 1 }}
                  onPress={() => {
                     setSearchPhrase("");
                     Keyboard.dismiss();
                     setClicked(false)
                  }}
               />
            )}
         </View>
      </View>
   );
};
export default SearchBar;

const styles = StyleSheet.create({
   container: {
      margin: 15,
      justifyContent: "flex-start",
      alignItems: "center",
      flexDirection: "row",
   },
   searchBar__unclicked: {
      padding: 10,
      flexDirection: "row",
      backgroundColor: "#F0F0F0",
      borderRadius: 15,
      alignItems: "center",
   },
   searchBar__clicked: {
      padding: 10,
      flexDirection: "row",
      backgroundColor: "#F0F0F0",
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "space-evenly",
   },
   input: {
      fontSize: 20,
      marginLeft: 10,
      width: "90%",
   },
});
