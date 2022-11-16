import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, Text, View, useWindowDimensions, Image} from "react-native";
import CustomButton2 from "../../commons/CustomButton2";
import Config from "../../../../config.json";
import PirateImage from '../../../../assets/Pirate2.png'
import { color } from "react-native-reanimated";

export default function Exit({route, navigation}) {
  const {userID: userID, teamID: teamID} = route.params;
  const { height, width } = useWindowDimensions();

  return (
    <ScrollView style={styles.view}> 
      <Image
        source = {PirateImage}
        style={{margin: 5, width: width * 0.5, zIndex: -1, alignSelf: 'center'}}
        resizeMode="contain"
      />
      <Text style={{
        margin: 10, 
        fontWeight: 'bold', 
        alignSelf: 'center'
      }}>
        {'¿Está seguro que desea abandonar la búsqueda?\nTodo tu progreso se perderá y no subirás más posiciones en el ranking'}
      </Text>
   
      <View style={styles.teamButtonsContainer}> 
        <CustomButton2 
          onPress = {() => 
            fetch(Config.appUrl + "teams/" + teamID + "/users/" + userID, {
              method: 'DELETE',
              headers: { 
                'Content-Type': 'application/json'},
            }).then(navigation.navigate("Quest Navigator"))            
          }
          icon = "arrow-forward-circle"
          bgColor= 'red'
          fgColor = 'white'
          text = 'Abandonar'
          style={styles.buttonStyle}
          textStyle={styles.buttonTextStyle}
          iconStyle={styles.iconStyle}
        />
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "#FFF9CA",
  },
  card:{
    height: 250,
    flexDirection: "column",
    backgroundColor: "#ffefd5",
    elevation: 5,
    marginTop:0,
    padding: 15, 
  },
  questInfoContainer: {
    flex: 1,
    flexDirection: "row-reverse",
  },
  questInfo: {
    flexDirection: "column",
    alignItems: "center",
    flexBasis: 45,
    flexShrink: 0,
    flexGrow: 0,
  },
  description: {
    flex: 2  
  },
  tagContainer:{
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  tag:{
    flexDirection: "row",
    justifyContent: "center",
    alignItems:  "center",
    width: 90,
    padding: 5,
    borderRadius: 20,
    marginLeft: 5
  },
  image: {
    height: 160,
    width: '100%'
  },
  container: {
    width: "50%",

    padding: 15,
    marginVertical: 5,
    marginLeft: 100,
    marginTop: 20,

    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#CA955C"
  },
  teamButtonsContainer: {
    marginTop: 60,
    flexDirection: "column",
    alignItems: "center"
  },
  text: {
    fontWeight: "bold",
    color: "white",
  },
  customRatingBar: {
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 30
  },
  starImg: {
    width: 40,
    height: 40,
    resizeMode: "cover"
  },
  customRating: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffefd5",
    margin: 30,
    borderWidth: 3,
    borderRadius:10,
    borderColor: '#CA955C'
  },
  buttonStyle: {
    width: '40%',
  },
  buttonTextStyle: {
    flexBasis: 200,
    flexShrink: 1,
    flexGrow: 1
  },
  iconStyle: {
    flexBasis: 100,
    flexShrink: 1,
    flexGrow: 1
  }
});
