import React, { useRef, useCallback, useState, useEffect } from "react";
import { 
  ViroARSceneNavigator
} from "@viro-community/react-viro/components/AR/ViroARSceneNavigator";
import { View, StyleSheet } from "react-native";
import HintModal from "./HintModal";
import Scene from "./Scene";
import SceneView from "./SceneView";
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet'
import Inventory from "./inventory/Inventory"
import DescriptionModal from "./DescriptionModal";

export default function ARView({route}) {
  const [ showHint, setShowHint ] = useState(false);
  const [ hintText, setHintText ] = useState("");
  const [description, setObjectDescription] = useState({title: "", questItemID: "", description: "", image: 0, visible: null});
  const [selectedItem, setSelectedItem] = useState({title: "", questItemID: ""});
  const snapPoints = ["3%", "45%"];
  const sheetRef = useRef(null);
  const navigatorRef = useRef();

  const hint = (text) => {
    setHintText(text);
    setShowHint(true);
  };

  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  })

  const globalCtx = { 
    hint,
    setObjectDescription,
    handleSnapPress,
    description,
    selectedItem,
    setSelectedItem
  };

  useEffect(() => {
    handleSnapPress(0)  
  }, []);

  useEffect(() => {
    console.log("****Selected item: ", selectedItem)
  }, [selectedItem]);


  return (
    <View style={{height: "100%", width: "100%"}}>
      <ViroARSceneNavigator 
        ref={navigatorRef}
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
          <Inventory props={{questConfig: route.params.questConfig, ctx: globalCtx}} />
        </BottomSheetView>
      </BottomSheet>
      <DescriptionModal
        props={{ctx: globalCtx, itemDescription: description}}/>

    </View>
  );
}


const styles = StyleSheet.create({
  hintModal: {

  },
});
