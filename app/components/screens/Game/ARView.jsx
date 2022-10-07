import React, { useState, useCallback, useRef } from "react";
import { ViroARSceneNavigator } from "@viro-community/react-viro/components/AR/ViroARSceneNavigator";
import interactions from "./interactions";
import { View, StyleSheet, Text } from "react-native";
import HintModal from "./HintModal";
import Scene from "./Scene";
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet'
import Inventory from "./inventory/Inventory"

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
  const [isOpen, setIsOpen] = useState(true)
  const snapPoints = ["3%","40%"]

  const hint = (text) => {
    setHintText(text);
    setShowHint(true);
  };

  const ctx = { hint };
  const handler = buildHandler(ctx, questHandler);

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
        onClose={() => setShowHint(false)}
      />
      <BottomSheet
//        ref={sheetRef}
        snapPoints={snapPoints}
        onClose={() => setIsOpen(false)}>
        <BottomSheetView>
          <Inventory />
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}


const styles = StyleSheet.create({
  hintModal: {

  },
});
