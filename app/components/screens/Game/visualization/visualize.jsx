import React, { useEffect, useState } from "react";
import {StyleSheet} from 'react-native';
import { ViroARScene } from "@viro-community/react-viro/components/AR/ViroARScene";
import { Viro3DObject } from "@viro-community/react-viro/components/Viro3DObject";
import { ViroAnimations } from "@viro-community/react-viro/components/Animation/ViroAnimations";
import { ViroARCamera } from "@viro-community/react-viro/components/AR/ViroARCamera";
import { ViroOmniLight } from "@viro-community/react-viro/components/ViroOmniLight";
import { ViroAmbientLight } from "@viro-community/react-viro/components/ViroAmbientLight";
import Resources from "../../../../utils/resources.js";

export default function ObjectView(item, ctx) {

    console.log("********Condition: ", (ctx.description.itemID == item.questItemID))
    console.log("********ItemID: ", (ctx.description.itemID))
    console.log("********QuestItemID: ", (item.questItemID))
    console.log("********CTX: ", ctx)

  return (
      <ViroARCamera>  
      <ViroAmbientLight color="#ffffff"/>
        <Viro3DObject
          visible={(ctx.description.itemID == item.questItemID)}
          source={Resources.get(item.model.source)}
          position={item.model.position}
          scale={item.model.scale}
          rotation={item.model.rotation}
          animation={{name: "loopRotate", run: true, loop: true}}
          type={item.model.type}
        />
      </ViroARCamera>  
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
