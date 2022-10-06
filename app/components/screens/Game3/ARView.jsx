import React, { useState } from "react";
import { ViroARSceneNavigator } from "@viro-community/react-viro/components/AR/ViroARSceneNavigator";
import interactions from "./interactions";
import { View, StyleSheet } from "react-native";
import {useNavigation} from '@react-navigation/native'
import HintModal from "./HintModal";
import Scene from "./Scene";


const buildHandler = (ctx, questHandler) => {
  return {
    ...questHandler,
    interact: (interaction, questState, ...params) => {
      return interactions[interaction]({...ctx, questState}, ...params);
    }
  };
};

export default function ARView({questHandler}) {
  const [ showHint, setShowHint ] = useState(false);
  const [ hintText, setHintText ] = useState("");

  const navigation = useNavigation()

  const hint = (text) => {
    setHintText(text);
    setShowHint(true);
  };

  const ctx = { hint };
  const handler = buildHandler(ctx, questHandler);

  const onClickOk = (hint) => {
    console.log("Hint: " + hint)
    if (hint == "Escene 3: una pista re loca 2!!!") {
        console.log("hola: " + hint)
        navigation.navigate("Game4")
    }
    setShowHint(false)
  }

  return (
    <View style={{height: "100%", width: "100%"}}>
      <ViroARSceneNavigator 
        initialScene={{scene: Scene}} 
        viroAppProps={{handler}}
      />
      <HintModal 
        style={styles.hintModal} 
        visible={showHint} 
        hint={hintText} 
        onClose={() => onClickOk(hintText)}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  hintModal: {

  },
});
