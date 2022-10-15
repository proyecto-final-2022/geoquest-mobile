import React, { useRef, useState, useEffect, useCallback } from "react";
import { ViroARSceneNavigator } from "@viro-community/react-viro/components/AR/ViroARSceneNavigator";
import { StyleSheet, Text, ScrollView, Modal, View, Pressable, Image} from 'react-native';
import Lebron from '../../../../assets/medals/silver.png'
import {Avatar} from 'react-native-paper';
import {Ionicons} from '@expo/vector-icons'
import HintModal from "./HintModal";
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
  
  const getObjectView = (sceneNumber) => { 
//    const objectViews = [object_view_cubone, object_view_cubone2, object_view_cubone3];
    const objectViews = [object_view_cubone, object_view_cubone2, object_view_cubone3];
    console.log("***************************Scene number: ", sceneNumber)
    console.log("***************************object view: ", objectViews[sceneNumber-1])
    return objectViews[sceneNumber-1];
  }

  useEffect(() => {
    handleSnapPress(0)
  }, []);

  useEffect(() => {
    if (questHandler.visualize != 0 && questHandler.visualize != undefined){
      console.log("Visualizeeee:", questHandler.visualize)
//      navigatorRef.current.jump({scene: getObjectView(questHandler.visualize)})
      const arr = [object_view_cubone]
      const view = object_view_cubone
      navigatorRef.current.jump({scene: getObjectView(questHandler.visualize)})
    }
    if (questHandler.visualize == 0){
      navigatorRef.current.jump({scene: Scene})
    }
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
            marginTop: 200,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              height:'40%', 
              width: '90%',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              backgroundColor: 'linen',
              borderWidth: 5,
              borderColor: '#a52a2a', 
            }}  
          >
            <View style={{flexDirection: 'row-reverse'}}>
              <Pressable onPress={() => {
                questHandler.setObjectVisualize(0)
                setVisibleDescription(false)}}>
                <Ionicons name='close' size={35}/>
              </Pressable>
            </View>


            <ScrollView>
                <View style={{flexDirection: 'column', justifyContent: 'space-around'}}>
          
                  <Text style={{fontWeight: 'bold', color: 'darkred', fontSize: 20}}>El desodrande de Marcelo Hugo T</Text>
            
                  <View style={{flexDirection: 'row'}}>
                    <View style={styles.descriptionText}>
                      <Text style={{fontWeight: 'bold', fontSize: 15, marginTop: 30}}>Desodrante extraviado perteneciente a Hugo T Desodrante extraviado perteneciente a Hugo T Desodrante extraviado perteneciente a Hugo T</Text>
                    </View>

                    <View style={styles.descriptionImage}>
                      <Image 
                        source={Lebron}
                        style={styles.itemImage}
                        size={50}
                      />
                    </View>
                                        
                  </View>
                </View>
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
