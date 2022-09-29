import { useState } from "react";
import { ViroARImageMarker } from "@viro-community/react-viro/components/AR/ViroARImageMarker";
import { ViroARTrackingTargets } from "@viro-community/react-viro/components/AR/ViroARTrackingTargets";
import { Viro3DObject } from "@viro-community/react-viro/components/Viro3DObject";
import { ViroAmbientLight } from "@viro-community/react-viro/components/ViroAmbientLight";
import Resources from "../../../../utils/resources.js";

export default WithImageRecognition = ({objNum, handler, typeProps}) => {
  const [pauseUpdates, setPauseUpdates] = useState(false);

  const {target, model, interactions} = typeProps;

  const targetProps = {
    ...target,
    source: Resources.get(target.source)
  };

  ViroARTrackingTargets.createTargets({
    "target": targetProps
  });

  modelProps = {
    ...model,
    source: Resources.get(model.source),
    resources: model.resources.map(r => Resources.get(r))
  };

  const onClick = () => {
    const state = handler.questState.objects[objNum] || 0;

    const intAmount = interactions.length;
    if(intAmount < state)
      return;

    interactions[state].forEach((int) => handler.interact(int.name, ...int.params));

    const questState = handler.questState;
    questState.objects[objNum] = Math.min(state + 1, intAmount - 1);
    handler.setQuestState(questState);
  }

  return (
    <ViroARImageMarker 
      target={"target"}
      onAnchorFound={() => setPauseUpdates(true)}
      pauseUpdates={pauseUpdates}
    >
      <ViroAmbientLight color="#ffffff"/>
      <Viro3DObject onClick={onClick} {...modelProps} />
    </ViroARImageMarker>
  );
}
