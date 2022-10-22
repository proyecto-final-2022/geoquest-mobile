import React, { useState, useEffect } from "react";
import { ViroARImageMarker } from "@viro-community/react-viro/components/AR/ViroARImageMarker";
import { ViroARTrackingTargets } from "@viro-community/react-viro/components/AR/ViroARTrackingTargets";
import { Viro3DObject } from "@viro-community/react-viro/components/Viro3DObject";
import { ViroAmbientLight } from "@viro-community/react-viro/components/ViroAmbientLight";
import Resources from "../../../../utils/resources.js";
import Interactions from "../interactions";
import { ViroAnimations } from "@viro-community/react-viro/components/Animation/ViroAnimations";


export default function WithImageRecognitionModal({id, handler, typeProps, globalCtx}) {
  const [pauseUpdates, setPauseUpdates] = useState(false);
  const {target} = typeProps;

  const targetProps = {
    ...target,
    source: Resources.get(typeProps.target.source)
  };

  useEffect(() => {
    console.log("*************************************hola Esc 2", globalCtx)
    
    const source = target.source
    const targets = {}
    targets[source] = targetProps
    ViroARTrackingTargets.createTargets(targets);

    return () => ViroARTrackingTargets.deleteTarget(target.source);
  }, []);


  return (
    <ViroARImageMarker 
      target={target.source}

//      pauseUpdates={false}
      onAnchorFound={() => {
        console.log("************************on anchor found")
        globalCtx.setVisualizeTargetModal(true)
        setPauseUpdates(true);}}
      pauseUpdates={pauseUpdates}
    >
      
    </ViroARImageMarker>
  );
}


ViroAnimations.registerAnimations({
  fade: {
    properties: {
      opacity: "-=1"
    },
    duration: 2000
  }
});
