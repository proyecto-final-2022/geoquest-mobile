import React, { useEffect, useState } from "react";
import {StyleSheet} from 'react-native';
import { ViroARScene } from "@viro-community/react-viro/components/AR/ViroARScene";
import { Viro3DObject } from "@viro-community/react-viro/components/Viro3DObject";
import { ViroAnimations } from "@viro-community/react-viro/components/Animation/ViroAnimations";
import { ViroARCamera } from "@viro-community/react-viro/components/AR/ViroARCamera";
import { ViroOmniLight } from "@viro-community/react-viro/components/ViroOmniLight";
import { ViroAmbientLight } from "@viro-community/react-viro/components/ViroAmbientLight";
import {useSelector} from "react-redux";
import Resources from "../../../../utils/resources.js";

export default function ObjectView(item, ctx) {
  const questLocal = useSelector(state => state.questLocal);

  return (  
        <Viro3DObject
          visible={(questLocal.visualizer.itemID == item.questItemID)}
          source={Resources.get(item.model.source)}
          position={item.model.position}
          scale={item.model.scale}
          rotation={item.model.rotation}
          animation={{name: "loopRotate", run: true, loop: true}}
          type={item.model.type}
        />
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
