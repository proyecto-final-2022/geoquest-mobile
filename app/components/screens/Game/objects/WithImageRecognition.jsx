import React, { useState, useEffect } from "react";
import { ViroARImageMarker } from "@viro-community/react-viro/components/AR/ViroARImageMarker";
import { 
  ViroARTrackingTargets 
} from "@viro-community/react-viro/components/AR/ViroARTrackingTargets";
import { Viro3DObject } from "@viro-community/react-viro/components/Viro3DObject";
import { ViroAmbientLight } from "@viro-community/react-viro/components/ViroAmbientLight";
import Resources from "../../../../utils/resources.js";
import Interactions from "../interactions";
import { ViroAnimations } from "@viro-community/react-viro/components/Animation/ViroAnimations";
import { useSelector, useDispatch } from "react-redux";
import Quest from "../../../../redux/slices/quest";


export default function WithImageRecognition({id, typeProps, globalCtx}) {
  const questState = useSelector(state => state.quest);
  const dispatch = useDispatch();
  const [pauseUpdates, setPauseUpdates] = useState(false);
  const [visible, setIsVisible] = useState(true);
  const [runFade, setRunFade] = useState(false);

  const {target, model, interactions} = typeProps;

  const targetProps = {
    ...target,
    source: Resources.get(target.source)
  };

  const modelProps = {
    ...model,
    source: Resources.get(model.source),
    resources: model.resources.map(r => Resources.get(r))
  };

  const hasInteractionsLeft = () => {
    const objectState = questState.objects[id] ?? 0;
    const interactionN = interactions.length;
    return interactionN - 1  >= objectState;
  };

  useEffect(() => {
    if(!hasInteractionsLeft()) {
      setIsVisible(false);
    }

    const targets = {};
    targets[target.source] = targetProps;
    ViroARTrackingTargets.createTargets(targets);

    return () => ViroARTrackingTargets.deleteTarget(target);
  }, []);

  const onClick = () => {
    const interactionN = interactions.length;
    if(!hasInteractionsLeft()) {
      return;
    }

    const interact = (name, state, params) => {
      const ctx = {
        state,
        global: globalCtx,
        object: {}  // TODO estado de este objeto
      };
      return Interactions[name](ctx, ...params);
    };

    const objectState = questState.objects[id] ?? 0;
    const newState = interactions[objectState].reduce((prevState, int) => {
      return interact(int.name, prevState, int.params) || prevState;
    }, questState);

    const newObjectState = objectState + 1;
    if(newObjectState == interactionN) {
      setRunFade(true);
    }

    console.log(id, objectState, newObjectState);
    newState.objects[id] = newObjectState;
    console.log("Prev state:", questState);
    console.log("New state:", newState);
    dispatch(Quest.actions.set(newState));
  };

  return (
    <ViroARImageMarker 
      target={target.source}
      onAnchorFound={() => {setPauseUpdates(true);}}
      pauseUpdates={pauseUpdates}
    >
      <ViroAmbientLight color="#ffffff"/>
      <Viro3DObject 
        visible={visible} 
        onClick={onClick} 
        {...modelProps} 
        animation={{
          name: "fade", 
          run: runFade, 
          loop: false, 
          onFinish: () => {setIsVisible(false);}
        }}
      />
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
