import React, { View, Text, ImageBackground, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import backgroundImage from "../../../../assets/logs_background.jpg";
import { useFonts } from "expo-font";


export default function QuestLog() {
  const questLogs = useSelector(state => state.quest.logs);
  const [fontsLoaded] = useFonts({
    "Title-Font": require("../../../../assets/fonts/OldMe-vmyZy.otf"),
    "Notes-Font": require("../../../../assets/fonts/HandNote-rg3gB.otf")
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ImageBackground style={styles.view} source={backgroundImage}>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Mis Notas</Text>
        </View>
        <FlatList 
          data={questLogs}
          renderItem={({item}) => <Text style={styles.text}>{item}</Text>}
        />
      </View>
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: "5%"
  },
  view: {
    height: "100%",
    width: "100%"
  },
  title: {
    fontSize: 50,
    alignSelf: "center",
    fontFamily: "Title-Font",
    paddingVertical: "5%"
  },
  text: {
    fontSize: 40,
    fontFamily: "Notes-Font"
  }
});