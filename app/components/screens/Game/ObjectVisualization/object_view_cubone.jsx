import React, { useEffect, useState } from "react";
import {StyleSheet} from 'react-native';
import { ViroARScene } from "@viro-community/react-viro/components/AR/ViroARScene";
import { Viro3DObject } from "@viro-community/react-viro/components/Viro3DObject";
import { ViroAnimations } from "@viro-community/react-viro/components/Animation/ViroAnimations";
import { ViroARCamera } from "@viro-community/react-viro/components/AR/ViroARCamera";
import { ViroOmniLight } from "@viro-community/react-viro/components/ViroOmniLight";
import { ViroAmbientLight } from "@viro-community/react-viro/components/ViroAmbientLight";

const ObjectView = () => {

  return (
    <ViroARScene>
      <ViroAmbientLight color="#ffffff"/>
      <ViroARCamera>  
        <Viro3DObject
          source={require("../../../../../res/models/cubone/model.obj")}
          position={[0,1.3,-3]}
          scale={[1.5,1.5,1.5]}
          rotation={[0,180,0]}
          animation={{name: "loopRotate", run: true, loop: true}}
          resources={[require("../../../../../res/models/cubone/materials.mtl")]}
          type="OBJ"
        />
      </ViroARCamera>  
    </ViroARScene>
  );
}

ViroAnimations.registerAnimations({
  loopRotate:{
    properties:{
      rotateY: "+=45"
    }, 
    duration:1000
  },
});


export default ObjectView;
