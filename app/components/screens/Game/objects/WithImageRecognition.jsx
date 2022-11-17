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
const questID = "1"

export default function WithImageRecognition({id, typeProps, globalCtx}) {
  const questState = useSelector(state => state.quest);
  const questLocalState = useSelector(state => state.questLocal);
  const dispatch = useDispatch();
  const [pauseUpdates, setPauseUpdates] = useState(false);

  
  const {target, model, interactions} = typeProps;
  const targetID = target.source;
  
  const targetProps = {
    ...target,
    source: Resources.get(target.source)
  };
  
  const modelProps = {
    ...model,
    source: Resources.get(model.source),
    resources: model.resources.map(r => Resources.get(r))
  };
  
  const Model = useState({
    visible:false,
    opacity:0,
    animation:undefined,
    animate:false,
    loop_animation:false,
    anim_interruptible:false,
    anim_on_finish:undefined,
  });

  const setModelVisible = (visible) => {
    const model = Model[0], setmodel = Model[1];

    setmodel(prevState => ({...prevState,
        visible:visible,
    }))
  }
  
  const hasInteractionsLeft = (state) => {
    const objectState = state.objects[id] ?? 0;
    const interactionN = interactions.length;
    return interactionN - 1  >= objectState;
  };


  useEffect(() => {
    if(!hasInteractionsLeft(questState)) {
      //setModelVisible(false);
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
      //setModelVisible(false);
    }
  }, [questState]);

  // useEffect(() => {
  //   console.log("***************Model props: ", modelProps)
  // }, []);

  useEffect(() => {
    if(questLocalState.visualizer.itemID != undefined || !hasInteractionsLeft(questState)) {
      setModelVisible(false);
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
    }
    console.log("****with image recognition dispatch")
    dispatch(Quest.actions.set({...newState}));
  };

  const appearModel = () => {
    const model = Model[0], setmodel = Model[1];

    ViroAnimations.registerAnimations({
      appearModel: {
        properties: {
          opacity: 1,
        },
        duration: 1000
      }
    });

    setmodel(prevState => ({...prevState,
        visible:true,
        animation:"appearModel",
        animate:true,
        loop_animation:false,
        anim_interruptible:false,
        anim_on_finish:undefined,
    }))
  };

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

  return (
    <ViroARImageMarker 
      target={targetID}
      onAnchorFound={() => {setPauseUpdates(true); appearModel()}}
      pauseUpdates={pauseUpdates}
    >
      <ViroAmbientLight color="#ffffff"/>
        <Viro3DObject 
          {...modelProps}
          visible={Model[0].visible} 
          onClick={onClick}
          opacity={Model[0].opacity}
          animation={{name:Model[0].animation, run:Model[0].animate, loop:Model[0].loop_animation, interruptible:Model[0].anim_interruptible, onFinish:Model[0].anim_on_finish}}
        />
    </ViroARImageMarker>
  );
}

ViroARTrackingTargets.createTargets({
  "images.exampleImage": {
    source: require('../../../../../res/images/exampleImage.jpg'),
    orientation: "Up",
    physicalWidth: 0.2 // real world width in meters  
  },
  "images.duende": {
    source: require('../../../../../res/images/duende.jpg'),
    orientation: "Up",
    physicalWidth: 0.2 // real world width in meters  
  },
  "images.boquita": {
    source: require('../../../../../res/images/boquita.jpg'),
    orientation: "Up",
    physicalWidth: 0.2 // real world width in meters  
  },
  "images.argentina": {
    source: require('../../../../../res/images/argentina.jpg'),
    orientation: "Up",
    physicalWidth: 0.2 // real world width in meters  
  },
  "images.aula": {
    source: require('../../../../../res/images/aula_621_crop.jpg'),
    orientation: "Up",
    physicalWidth: 0.2 // real world width in meters  
  },
  "images.cuadro": {
    source: require('../../../../../res/images/cuadro.jpg'),
    orientation: "Up",
    physicalWidth: 0.2 // real world width in meters  
  },
  "images.graduados": {
    source: require('../../../../../res/images/graduados.jpg'),
    orientation: "Up",
    physicalWidth: 0.2 // real world width in meters  
  },
  "images.silla": {
    source: require('../../../../../res/images/silla.jpg'),
    orientation: "Up",
    physicalWidth: 0.2 // real world width in meters  
  },
  "images.cosowifi": {
    source: require('../../../../../res/images/cosowifi.jpg'),
    orientation: "Up",
    physicalWidth: 0.2 // real world width in meters  
  }

//aula_621_crop
});
