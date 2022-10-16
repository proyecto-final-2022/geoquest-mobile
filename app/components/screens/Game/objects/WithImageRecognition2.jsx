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
  const [visible, setIsVisible] = useState(true);
  const [runFade, setRunFade] = useState(false);

  const {target, model, interactions} = typeProps;

  const targetProps = {
    ...target,
    source: Resources.get("images.exampleImage2")
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

  useEffect(() => {
    if(!hasInteractionsLeft()) {
      setIsVisible(false);
    }

    ViroARTrackingTargets.createTargets({
      target2: targetProps
    });

//    return () => ViroARTrackingTargets.deleteTarget(target);
  }, []);

  const onClick = () => {
  /*
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

 //   const objectState = handler.questState.objects[id] ?? {visible: true};
    const objectState = handler.questState.objects[id] ?? 0;
    const newState = interactions[objectState].reduce((prevState, int) => {
      return interact(int.name, prevState, int.params) || prevState;
    }, handler.questState);

    const newObjectState = objectState + 1;
    if(newObjectState == interactionN) {
      setRunFade(true);
    }

    newState.objects[id] = newObjectState;
    //handler.setQuestState(newState);

    //POST (id inventario, ["objeto1"])
    //response --> devuelve el inventario actualizado con lo ultimo
    */
    handler.setTeamInventory([{
      key: "cubone",
      title: "Objeto 1",
      description: "Objeto 1 descripcion Objeto 1 descripcion Objeto 1 descripcion Objeto 1 descripcion",
      questItemID: 1,
      image: "2",
      view: 1,
      combinable: [
        {
          combinableQuestItemID: 2,
          image: "3"
        } 
      ],
      visibleMenu: false,
      marker: false
    }])
    
  };

  return (
    <ViroARImageMarker 
      target={"target2"}
//      onAnchorFound={() => console.log("************************on anchor found")}
//      pauseUpdates={false}
      onAnchorFound={() => {setPauseUpdates(true);}}
      pauseUpdates={pauseUpdates}
    >
      <ViroAmbientLight color="#ffffff"/>
      <Viro3DObject 
        visible={handler.asdasdasd} 
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
