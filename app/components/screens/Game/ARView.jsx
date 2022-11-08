import React, { useRef, useCallback, useState, useEffect } from "react";
import { 
  ViroARSceneNavigator
} from "@viro-community/react-viro/components/AR/ViroARSceneNavigator";
import { View, StyleSheet, Pressable, Text } from "react-native";
import HintModal from "./HintModal";
import Scene from "./Scene";
import SceneView from "./SceneView";
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet'
import Inventory from "./inventory/Inventory"
import DescriptionModal from "./DescriptionModal";
import QuestLocal from "../../../redux/slices/questLocal"
import {useSelector} from "react-redux";
import {Ionicons} from '@expo/vector-icons'

export default function ARView({route}) {
  const quest = useSelector(state => state.quest);
  const questLocal = useSelector(state => state.questLocal);
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

  useEffect(() => {
    //questLocal.visualizer.itemID != undefined
    console.log("****Quest local: ", questLocal)
    console.log("****Quest: ", quest)
    console.log("****ehhhhhhhhhhhhhhh??")
  }, [questLocal]);


  return (
    <View style={{height: "100%", width: "100%"}}>
      <ViroARSceneNavigator 
        ref={navigatorRef}
        initialScene={{scene: Scene}} 
        viroAppProps={{questConfig: route.params.questConfig, globalCtx}}
      />
      {description.visible && <View style={{backgroundColor: 'linen',
              height:'40%', 
              width: '90%',borderWidth: 5,borderColor: '#a52a2a'}}>
              <Text style={{fontStyle: 'italic'}}>Nombre objeto</Text>
        <Text>Descripcion del objeto</Text>
        <View style={{flex: 1/* , flexDirection: 'row-reverse'*/}}>
              <Pressable onPress={() => {
                setObjectDescription({visible: false, questItemID: ""})
                //QuestLocal.actions.setVisualizer({itemID: undefined})
                }}>
                <Ionicons name='close' size={35}/>
              </Pressable>
          </View>
      </View>}
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
      
      {/* <DescriptionModal
        props={{ctx: globalCtx, itemDescription: description}}/> */}

    </View>
  );
}


const styles = StyleSheet.create({
  hintModal: {

  },
});
