import React, { useRef, useCallback, useState, useEffect } from "react";
import { 
  ViroARSceneNavigator
} from "@viro-community/react-viro/components/AR/ViroARSceneNavigator";
import { View, StyleSheet } from "react-native";
import HintModal from "./HintModal";
import Scene from "./Scene";
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet'
import Inventory from "./inventory/Inventory"

export default function ARView({route}) {
  const [ showHint, setShowHint ] = useState(false);
  const [ hintText, setHintText ] = useState("");
  const snapPoints = ["3%", "45%"];
  const sheetRef = useRef(null);


  const hint = (text) => {
    setHintText(text);
    setShowHint(true);
  };

  const globalCtx = { 
    hint,
  };

  const arViewCtx = {handleSnapPress};

  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  })

  useEffect(() => {
    handleSnapPress(0)  
  }, []);
//          <Inventory ctx={arViewCtx} />
  return (
    <View style={{height: "100%", width: "100%"}}>
      <ViroARSceneNavigator 
        initialScene={{scene: Scene}} 
        viroAppProps={{questConfig: route.params.questConfig, globalCtx}}
      />
      <HintModal 
        style={styles.hintModal} 
        visible={showHint} 
        hint={hintText} 
        onClose={() => setShowHint(false)}
      />
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}>
        <BottomSheetView>
          <Inventory props={route.params.questConfig} ctx={arViewCtx} />
        </BottomSheetView>
      </BottomSheet>

    </View>
  );
}


const styles = StyleSheet.create({
  hintModal: {

  },
});
