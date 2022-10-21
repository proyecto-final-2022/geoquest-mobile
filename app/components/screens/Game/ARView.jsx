import React, { useRef, useState, useEffect, useCallback } from "react";
import { ViroARSceneNavigator } from "@viro-community/react-viro/components/AR/ViroARSceneNavigator";
import { StyleSheet, Dimensions, PixelRatio, Text, ScrollView, Modal, View, Pressable, Image} from 'react-native';
import Lebron from '../../../../assets/medals/silver.png'
import {Avatar} from 'react-native-paper';
import {Ionicons} from '@expo/vector-icons'
import HintModal from "./HintModal";
import DescriptionModal from "./DescriptionModal";
import DescriptionModal2 from "./DescriptionModal2";
import Scene from "./Scene";
import Scene2 from "./Scene2";
import Scene3 from "./Scene3";
import Scene4 from "./Scene4";
import object_view_cubone from "./ObjectVisualization/object_view_cubone";
import object_view_cubone2 from "./ObjectVisualization/object_view_cubone2";
import object_view_cubone3 from "./ObjectVisualization/object_view_cubone3";
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

  const [visualize, setObjectVisualize] = useState();
  const [visualize2, setObjectVisualize2] = useState(false);
  const [description, setObjectDescription] = useState({title: "", description: ""});
  const [visibleDescription, setVisibleDescription] = useState(false);

  const snapPoints = ["3%", "45%"];
  const navigatorRef = useRef();
  const sheetRef = useRef(null);

  const hint = (text) => {
    setHintText(text);
    setShowHint(true);
  };

  const setQuestState = (newState) => {questHandler.setQuestState(newState)}

  const globalCtx = { 
    hint,
    setObjectVisualize2,
    setQuestState
  };

  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  })

  const arViewCtx = {questHandler, description, handleSnapPress, visibleDescription, visualize2, setObjectVisualize2, setObjectVisualize, setObjectDescription, setVisibleDescription, handleSnapPress};
  
  const getObjectView = (sceneNumber) => { 
    const objectViews = [object_view_cubone, object_view_cubone2, object_view_cubone3];
    return objectViews[sceneNumber-1];
  }

  useEffect(() => {
    handleSnapPress(0)  
  }, []);

  useEffect(() => {
    if (questHandler.questState.scene == 2) {
      console.log("***********************State scene 2:", questHandler.questState)
      const newState = {...questHandler.questState,
        objects: {}
      }
      setQuestState(newState)
      navigatorRef.current.jump({scene: Scene2})
    }
  }, [questHandler.questState.scene]);

  useEffect(() => {
    if (visualize != 0 && visualize != undefined){
//      navigatorRef.current.jump({scene: Scene})
      navigatorRef.current.jump({scene: getObjectView(visualize)})
    }
    if (visualize == 0){
      navigatorRef.current.jump({scene: Scene})
    }
  }, [visualize]);

  useEffect(() => {
    if (questHandler.inventory.find(item => (item.key == "cubone"))) {
      console.log("************************************Cambio de escena")
      navigatorRef.current.jump({scene: Scene2})
    }
    if (questHandler.inventory.find(item => (item.key == "cubone2"))) {
      console.log("************************************Cambio de escena")
      navigatorRef.current.jump({scene: Scene3})
    }
    if (questHandler.inventory.find(item => (item.key == "cubone3"))) {
      console.log("************************************Cambio de escena")
      navigatorRef.current.jump({scene: Scene4})
    }

  }, [questHandler.inventory]);

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
          <Inventory ctx={arViewCtx} />
        </BottomSheetView>
      </BottomSheet>

      <DescriptionModal
        ctx={arViewCtx}/>
      <DescriptionModal2
        ctx={arViewCtx}/>
      
    </View>
  );
}


const styles = StyleSheet.create({
  hintModal: {

  },
  itemImage: {
    width: '100%',
    marginTop: 30,
    maxWidth: 60,
    maxHeight: 60,
  },
  descriptionText: {
    flexBasis: 300,
    flexShrink: 0,
    flexGrow: 0
  },
  descriptionImage: {
    flexBasis: 50,
    flexShrink: 0,
    flexGrow: 0
  }
});
