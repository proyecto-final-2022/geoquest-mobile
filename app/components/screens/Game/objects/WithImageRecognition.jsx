import { useState } from "react";
import { ViroARImageMarker } from "@viro-community/react-viro/components/AR/ViroARImageMarker";
import { ViroARTrackingTargets } from "@viro-community/react-viro/components/AR/ViroARTrackingTargets";
import { Viro3DObject } from "@viro-community/react-viro/components/Viro3DObject";
import { ViroAmbientLight } from "@viro-community/react-viro/components/ViroAmbientLight";
import Resources from "../../../../utils/resources.js";

export default WithImageRecognition = ({handler, typeProps}) => {
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

  return (
    <ViroARImageMarker 
      target={"target"}
      onAnchorFound={() => setPauseUpdates(true)}
      pauseUpdates={pauseUpdates}
    >
      <ViroAmbientLight color="#ffffff"/>
      <Viro3DObject {...modelProps} />
    </ViroARImageMarker>
  );
}
