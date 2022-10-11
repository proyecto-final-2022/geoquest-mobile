import React, { useRef, useState, useEffect, useCallback } from "react";
import { ViroARSceneNavigator } from "@viro-community/react-viro/components/AR/ViroARSceneNavigator";
import { StyleSheet, Text, ScrollView, Modal, View, Pressable} from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import HintModal from "./HintModal";
import Scene from "./Scene";
import ObjectView from "./ObjectView";
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet'
import Inventory from "./inventory/Inventory"

const buildHandler = (ctxFunctions, questHandler) => {
  return {
    ...questHandler,
    ctx: {
      global: {...ctxFunctions}
    }
  };
};

export default function ARView({questHandler}) {
  const [ showHint, setShowHint ] = useState(false);
  const [ hintText, setHintText ] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [visibleDescription, setVisibleDescription] = useState(false);
  const snapPoints = ["3%", "45%"];
  const navigatorRef = useRef();
  const sheetRef = useRef(null);

  const hint = (text) => {
    setHintText(text);
    setShowHint(true);
  };

  const globalCtx = { 
    hint
  };

  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  })

  const arViewCtx = { handleSnapPress, setVisibleDescription};

  useEffect(() => {
    handleSnapPress(0)
//    props.sceneNavigator.push({scene: HelloUser})
  }, []);

  useEffect(() => {
    if (questHandler.visualize == true){
      console.log("Chuchu wa: ")
      navigatorRef.current.jump({scene: ObjectView})
    }
    if (questHandler.visualize == false){
      navigatorRef.current.jump({scene: Scene})
      console.log("Piña vá: ")
    }

//    props.sceneNavigator.push({scene: HelloUser})
  }, [questHandler.visualize]);

  return (
    <View style={{height: "100%", width: "100%"}}>
      <ViroARSceneNavigator 
        ref={navigatorRef}
        initialScene={{scene: Scene}} 
        viroAppProps={{handler: questHandler, globalCtx}}
      />
      <HintModal 
        style={styles.hintModal} 
        visible={showHint} 
        hint={hintText} 
        onClose={() => setShowHint(false)}
      />
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        onClose={() => setIsOpen(false)}>
        <BottomSheetView>
          <Inventory props={questHandler} ctx={arViewCtx} />
        </BottomSheetView>
      </BottomSheet>
      
      <Modal
        animationType="slide"
        onDismiss={() => console.log('close')}
        onShow={() => console.log('show')}
        transparent
        visible={visibleDescription}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              height:'25%', 
              width: '60%',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              backgroundColor: 'aliceblue',
              borderWidth: 10,
              borderColor: '#a52a2a', 
            }}  
          >
            <View style={{flexDirection: 'row-reverse'}}>
              <Pressable onPress={() => {
                questHandler.setObjectVisualize(false)
                setVisibleDescription(false)}}>
                <Ionicons name='close' size={35}/>
              </Pressable>
            </View>
            <ScrollView>
                <Text>En Francia la tortuga busca la cabeza</Text>
            </ScrollView>

  
          </View>
        </View>
      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  hintModal: {

  },
});
