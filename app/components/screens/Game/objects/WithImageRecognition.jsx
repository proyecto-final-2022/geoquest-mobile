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
  const dispatch = useDispatch();
  const [pauseUpdates, setPauseUpdates] = useState(false);
  const [visible, setIsVisible] = useState(true);
  const [runFade, setRunFade] = useState(false);

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

  const hasInteractionsLeft = (state) => {
    const objectState = state.objects[id] ?? 0;
    console.log("**********OBJ STATE: ", objectState)
    const interactionN = interactions.length;
    return interactionN - 1  >= objectState;
  };

  const updateState = (state) => {
    fetch(Config.appUrl + "quests/" + questID, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json'},
      body: JSON.stringify(state) 
    }).catch(error => {
      console.log('Error sending update: '+error);
    })
  }

  const sendNotification = () => {
    fetch(Config.appNotificationsUrl + "notifications/quest_update", {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'},
      body: JSON.stringify({
        quest_id: questID
      }) 
    }).catch(error => {
      console.log('Error sending notification: '+error);
    })
  }
/*
  const sendUpdate = (state) => {
    fetch(Config.appUrl + "quests/" + questID, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json'},
      body: JSON.stringify(state) 
    }).catch(error => {
      console.log('Error sending update: '+error);
    })
    .then(
      fetch(Config.appNotificationsUrl + "notifications/quest_update", {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'},
        body: JSON.stringify({
          quest_id: questID
        }) 
      }).catch(error => {
        console.log('Error sending notification: '+error);
      })
    )
    
  }
*/

  useEffect(() => {
    if(!hasInteractionsLeft(questState)) {
      setIsVisible(false);
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
      setIsVisible(false);
    }
  }, [questState]);

  useEffect(() => {
    if(globalCtx.description.questItemID != "" || !hasInteractionsLeft(questState)) {
      setIsVisible(false);
    } else {
      setIsVisible(true)
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

    if(!hasInteractionsLeft(newState)) {
      setRunFade(true);
    }
    
    if (newState.sendUpdate) {

      if (newState.sendNotification) {
        updateState(newState).then(sendNotification())
        newState.sendNotification = false
      } else {
        updateState(newState)
      }

      newState.sendUpdate = false
    }

    dispatch(Quest.actions.set(newState));
  };

  return (
    <ViroARImageMarker 
      target={targetID}
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
  }

});

ViroAnimations.registerAnimations({
  fade: {
    properties: {
      opacity: "-=1"
    },
    duration: 2000
  }
});
