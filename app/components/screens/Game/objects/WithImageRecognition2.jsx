import React, { useState, useEffect } from "react";
import { ViroARImageMarker } from "@viro-community/react-viro/components/AR/ViroARImageMarker";
import { ViroARTrackingTargets } from "@viro-community/react-viro/components/AR/ViroARTrackingTargets";
import { Viro3DObject } from "@viro-community/react-viro/components/Viro3DObject";
import { ViroAmbientLight } from "@viro-community/react-viro/components/ViroAmbientLight";
import Resources from "../../../../utils/resources.js";
import Interactions from "../interactions";
import { ViroAnimations } from "@viro-community/react-viro/components/Animation/ViroAnimations";


export default function WithImageRecognition2({id, handler, typeProps, globalCtx}) {
  const [pauseUpdates, setPauseUpdates] = useState(false);
  const [visible, setIsVisible] = useState(false);
  const [runFade, setRunFade] = useState(false);

  const {target, model, interactions} = typeProps;

  const key = "cubone"

  const targetProps2 = {
    ...target,
    source: Resources.get("images.exampleImage")
  };

  const modelProps = {
    ...model,
    source: Resources.get(model.source),
    resources: model.resources.map(r => Resources.get(r))
  };

  const hasInteractionsLeft = () => {
    const objectState = handler.questState.objects[id] ?? 0;
    const interactionN = interactions.length;
    return interactionN - 1  >= objectState;
  };

  const onClick = () => {
    const interactionN = interactions.length;
    if(!hasInteractionsLeft()) {
      return;
    }

    const interact = (name, state, params) => {
      const ctx = {
        state,
        global: globalCtx,
        object: {}  // TODO
      };
      return Interactions[name](ctx, ...params);
    };

    const objectState = handler.questState.objects[id] ?? 0;
    const newState = interactions[objectState].reduce((prevState, int) => {
      return interact(int.name, prevState, int.params) || prevState;
    }, handler.questState);

    const newObjectState = objectState + 1;
    if(newObjectState == interactionN) {
      setRunFade(true);
    }

    newState.objects[id] = newObjectState;
    handler.setQuestState(newState);
  };

  useEffect(() => {
    if(!hasInteractionsLeft()) {
      setIsVisible(false);
    }

    ViroARTrackingTargets.createTargets({
      "target2": targetProps2
    });

    console.log("Inventory: ", handler.inventory)
    


//    return () => ViroARTrackingTargets.deleteTarget(target);
  }, []);

  function findKey(item_key) {
    return key === item_key
  }
  useEffect(() => {
    if (handler.inventory.find(item => findKey(item.key))) {
      setIsVisible(true)
    }
    console.log("****************Inventory: ", handler.inventory)
  }, handler.inventory);

/*
  useEffect(() => {
    if(!hasInteractionsLeft()) {
      setIsVisible(false);
    }

    ViroARTrackingTargets.createTargets({
      "target2": targetProps2
    });

    return () => ViroARTrackingTargets.deleteTarget(target);
  }, []);
*/



  return (
    <ViroARImageMarker 
      target={"target2"}
      onAnchorFound={() => {setPauseUpdates(true);}}
      pauseUpdates={pauseUpdates}
    >
      <ViroAmbientLight color="#ffffff"/>
      <Viro3DObject 
        visible={visible} 
        onClick={onClick} 
        {...modelProps} 
        animation={{name: "fade2", run: runFade, loop: false, onFinish: () => {setIsVisible(false);}}}
      />
    </ViroARImageMarker>
  );
}


ViroAnimations.registerAnimations({
  fade2: {
    properties: {
      opacity: "-=1"
    },
    duration: 2000
  }
});
