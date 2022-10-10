import React, { useState } from "react";
import { ViroARImageMarker } from "@viro-community/react-viro/components/AR/ViroARImageMarker";
import { ViroARTrackingTargets } from "@viro-community/react-viro/components/AR/ViroARTrackingTargets";
import { Viro3DObject } from "@viro-community/react-viro/components/Viro3DObject";
import { ViroAmbientLight } from "@viro-community/react-viro/components/ViroAmbientLight";
import Resources from "../../../../utils/resources.js";

export default function WithImageRecognition2({id, handler, typeProps, ...props}) {
  const [pauseUpdates, setPauseUpdates] = useState(false);
  const [visible, setVisible] = useState(true);

  const {target, model, interactions} = typeProps;

  const targetProps = {
    ...target,
    source: Resources.get("images.boquita")
  };

  ViroARTrackingTargets.createTargets({
    "target2": targetProps
  });

  const modelProps = {
    ...model,
    source: Resources.get(model.source),
    resources: model.resources.map(r => Resources.get(r))
  };

  const onClick = () => {
    setVisible(false)
    const state = handler.questState.objects[id] || 0;
    const intAmount = interactions.length;
    if(intAmount < state)
      return;
    const newState = interactions[state].reduce((prevState, int) => {
      return handler.interact(int.name, prevState, ...int.params) || prevState;
    }, handler.questState);
    newState.objects[id] = Math.min(state + 1, intAmount - 1);
    handler.setQuestState(newState);
  };

  return (
    <ViroARImageMarker 
      target={"target2"}
      onAnchorFound={() => setPauseUpdates(true)}
      pauseUpdates={pauseUpdates}
    >
      {console.log("***********Obj2:", id)}
      <ViroAmbientLight color="#ffffff"/>
      <Viro3DObject 
      visible={visible}
      onClick={onClick} {...modelProps} />
    </ViroARImageMarker>
  );
} 
