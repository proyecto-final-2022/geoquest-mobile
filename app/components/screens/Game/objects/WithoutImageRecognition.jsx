import React, { useState, useEffect } from "react";
import { ViroARImageMarker } from "@viro-community/react-viro/components/AR/ViroARImageMarker";
import { 
  ViroARTrackingTargets 
} from "@viro-community/react-viro/components/AR/ViroARTrackingTargets";
import { ViroAmbientLight } from "@viro-community/react-viro/components/ViroAmbientLight";
import { Viro3DObject } from "@viro-community/react-viro/components/Viro3DObject";
import { ViroARCamera } from "@viro-community/react-viro/components/AR/ViroARCamera";
import Resources from "../../../../utils/resources.js";
import Interactions from "../interactions";
import { ViroAnimations } from "@viro-community/react-viro/components/Animation/ViroAnimations";
import { useSelector, useDispatch } from "react-redux";
import Quest from "../../../../redux/slices/quest";
import Config from "../../../../../config.json"
import { ViroNode } from "@viro-community/react-viro/components/ViroNode";
import { Lighting } from "../GameModelsCommon.js";
const questID = "1"

export default function WithoutImageRecognition({id, typeProps, globalCtx}) {
  const questState = useSelector(state => state.quest);
  const questLocalState = useSelector(state => state.questLocal);
  const dispatch = useDispatch();
  const [pauseUpdates, setPauseUpdates] = useState(false);

  const {target, model, interactions} = typeProps;

  const modelProps = {
    ...model,
    source: Resources.get(model.source),
    resources: model.resources.map(r => Resources.get(r))
  };
  
  ViroAnimations.registerAnimations({
    appearModel: {
      properties: {
        opacity: 1,
      },
      duration: 1000
    }
  });

  const Model = useState({
    visible:false,
    opacity:0,
    animation:"appearModel",
    animate:true,
    loop_animation:false,
    anim_interruptible:false,
    anim_on_finish:undefined,
  });

  const hasInteractionsLeft = (state) => {
    const objectState = state.objects[id] ?? 0;
    const interactionN = interactions.length;
    return interactionN - 1  >= objectState;
  };

  const setModelVisible = (visible) => {
    const model = Model[0], setmodel = Model[1];

    setmodel(prevState => ({...prevState,
        visible:visible,
    }))
  }

  const disappearModel = () => {
    const model = Model[0], setmodel = Model[1];

    ViroAnimations.registerAnimations({
      disappearModel: {
        properties: {
          // opacity: 0,
          scaleX:0,
          scaleY:0,
          scaleZ:0,
        },
        duration: 400
      }
    });

    setmodel(prevState => ({...prevState,
        animation:"disappearModel",
        animate:true,
        loop_animation:false,
        anim_interruptible:false,
        anim_on_finish:()=>{setModelVisible(false)}
    }))
  };


  useEffect(() => {
    if(!hasInteractionsLeft(questState)) {
      disappearModel();
    }

    /* 
    const targets = {};
    targets[targetID] = targetProps;
    console.log("Creating:", targetID);
    ViroARTrackingTargets.createTargets(targets);

    return () => {
      console.log("Removing:", targetID);
      ViroARTrackingTargets.deleteTarget(targetID);
    };
    */
  }, [questState.scene]);

  useEffect(() => {
    if(!hasInteractionsLeft(questState)) {
      disappearModel();
    }
  }, [questState]);

  // useEffect(() => {
  //   console.log("***************Model props: ", modelProps)
  // }, []);

  useEffect(() => {
    if(questLocalState.visualizer.itemID != undefined || !hasInteractionsLeft(questState)) {
      disappearModel();
    } else {
      setModelVisible(true)
    }
  }, [globalCtx.description]);

  const onClick = () => {
    if(!hasInteractionsLeft(questState)) {
      return;
    }

    const interact = (name, state, params) => {
      const ctx = {
        state,
        global: globalCtx,
      };
      return Interactions[name](ctx, ...params);
    };

    const objectState = questState.objects[id] ?? 0;
    const objects = {
      ...questState.objects
    };
    objects[id] = objectState + 1;
    const inputState = {
      ...questState,
      objects
    };

    const newState = interactions[objectState].reduce((prevState, int) => {
      return interact(int.name, prevState, int.params) || prevState;
    }, inputState);
    
    if (newState.addInteraction != undefined && newState.addInteraction != "" && newState.addInteraction) {
      interactions.push([{"name": "grabItemCondition", "params": [newState.addInteraction]}])
      newState.addInteraction = ""
    }

    if(!hasInteractionsLeft(newState)) {
      disappearModel();
      //setRunFade(true);
    }
    console.log("***without image recognition dispatch")    
    dispatch(Quest.actions.set({...newState}));
  };

  return (
    <ViroNode visible={Model[0].visible}>
      {/* <ViroAmbientLight color="#ffffff" intensity={200}/> */}
      <Lighting visible={Model[0].visible}/>
      <Viro3DObject 
        {...modelProps}
        onClick={onClick}
        opacity={Model[0].opacity}
        animation={{name:Model[0].animation, run:Model[0].animate, loop:Model[0].loop_animation, interruptible:Model[0].anim_interruptible, onFinish:Model[0].anim_on_finish}}
        // TODO(fran): it'd be nice if we could show the disappearModel animation before moving to the next scene
      />
    </ViroNode>
  );
}
