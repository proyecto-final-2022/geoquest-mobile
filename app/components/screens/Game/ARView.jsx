import React, { useRef, useState, useEffect, useCallback } from "react";
import { ViroARSceneNavigator } from "@viro-community/react-viro/components/AR/ViroARSceneNavigator";
import { StyleSheet, Text, ScrollView, Modal, View, Pressable, Image} from 'react-native';
import Lebron from '../../../../assets/medals/silver.png'
import {Avatar} from 'react-native-paper';
import {Ionicons} from '@expo/vector-icons'
import HintModal from "./HintModal";
import DescriptionModal from "./DescriptionModal";
import Scene from "./Scene";
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

  const arViewCtx = { setObjectVisualize, handleSnapPress, visibleDescription, setVisibleDescription};
  
  const getObjectView = (sceneNumber) => { 
    const objectViews = [object_view_cubone, object_view_cubone2, object_view_cubone3];
    return objectViews[sceneNumber-1];
  }

  useEffect(() => {
    handleSnapPress(0)
  }, []);

  useEffect(() => {
    if (visualize != 0 && visualize != undefined){
      navigatorRef.current.jump({scene: getObjectView(visualize)})
    }
    if (visualize == 0){
      navigatorRef.current.jump({scene: Scene})
    }
  }, [visualize]);

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
