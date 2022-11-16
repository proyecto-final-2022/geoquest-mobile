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
import {useNavigation} from '@react-navigation/native'
import DescriptionModal from "./DescriptionModal";
import QuestState from "../../../redux/slices/quest"
import QuestLocal from "../../../redux/slices/questLocal"
import {useSelector, useDispatch} from "react-redux";
import {Ionicons} from '@expo/vector-icons'
import Navigation from "../../navigation";

export default function ARView({route}) {
  const questState = useSelector(state => state.quest);
  const dispatch = useDispatch();
  const navigation = useNavigation()

  const questLocal = useSelector(state => state.questLocal);
  const [ showHint, setShowHint ] = useState(false);
  const [ hintText, setHintText ] = useState("");
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
    handleSnapPress
  };

  useEffect(() => {
    handleSnapPress(0)
  }, []);

  return (
    <View style={{height: "100%", width: "100%"}}>
      <ViroARSceneNavigator 
        ref={navigatorRef}
        initialScene={{scene: Scene}} 
        viroAppProps={{questConfig: route.params.questConfig, globalCtx}}
      />
      {questLocal.visualizer.itemID != undefined && <View style={{
        backgroundColor: 'linen',
        height:'40%', 
        width: '100%',
        borderWidth: 3,
        borderColor: '#CA955C'}}>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: 10,
            marginHorizontal: 10}}>
            <Text style={{fontStyle: 'italic', flex: 1, fontWeight: 'bold', fontSize: 20}}>{questLocal.visualizer.title}</Text>
            <Pressable onPress={() => {
              if (questState.finished == true) {
                console.log("*********quest finished")
                dispatch(QuestLocal.actions.setVisualizer({itemID: undefined}))
                dispatch(QuestLocal.actions.selectItem({selectedItem: {
                  itemID: undefined,
                  name: ""
                }}))
                dispatch(QuestState.actions.set(
                  {...questState,
                    sendUpdate: {
                      lastFoundItemID: route.params.questConfig.lastItem.id,
                    }
                  }))
              }else{
                console.log("*****set visualizer false")
                dispatch(QuestLocal.actions.setVisualizer({itemID: undefined}))
              } 
            }}>
              <Ionicons name='close' size={35}/>
            </Pressable>
          </View>
          <Text style={{
            flex: 4.5,
            marginHorizontal: 10,
            textAlign: 'justify'}}>{questLocal.visualizer.description}</Text> 
        </View>
      }
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
