import React, { useEffect, useState } from "react";
import {StyleSheet} from 'react-native';
import { ViroARScene } from "@viro-community/react-viro/components/AR/ViroARScene";
import { Viro3DObject } from "@viro-community/react-viro/components/Viro3DObject";
import { ViroNode } from "@viro-community/react-viro/components/ViroNode";
import { ViroAnimations } from "@viro-community/react-viro/components/Animation/ViroAnimations";
import { ViroARCamera } from "@viro-community/react-viro/components/AR/ViroARCamera";
import { ViroOmniLight } from "@viro-community/react-viro/components/ViroOmniLight";
import { ViroAmbientLight } from "@viro-community/react-viro/components/ViroAmbientLight";
import Resources from "../../../../utils/resources.js";
import Quest from "../../../../redux/slices/quest"
import { useSelector, useDispatch } from "react-redux";
import {BoxAnimation, FolderAnimation, PageAnimation, makeOnPinch, makeOnRotate, makeOnDrag, MapToViro3DObject, Lighting} from "../GameModelsCommon"

export default function VisualizeFolder(item, ctx) {
  const questState = useSelector(state => state.quest);
  const dispatch = useDispatch();

  useEffect(
    () => console.log("*****Quest state:", questState)
    , [questState])
  const GameState = {
    folder_opened:false, //TODO(fran): I dont like this logic at all
  };
  const Folder = useState({
    source:Resources.get(item.model.source),
    position:[0,0,0],
    scale:item.model.scale,
    rotation:item.model.rotation,
    type:item.model.type,
    // source:require("../../res/GameModels/Folder/model.vrx"),
    // resources:[require('../../res/GameModels/Folder/folder-atlas_d.png'),
    //            require('../../res/GameModels/Folder/folder-atlas_r.png'),
    //            require('../../res/GameModels/Folder/folder-atlas_n.png'),
    //            ],
    // position:[0,0,0], //X:left-right, Y:height, Z:depth
    // rotation:[90,180,0],
    // scale:[1,1,1],
    prev_scale_factor:1,
    prev_rotation_factor:1,
    rotation_axis:[0,1,0], //[roll,yaw,pitch]
    animation:FolderAnimation.Idle,
    animate:true,
    loop_animation:false,
    anim_interruptible:false,
    anim_on_finish:undefined,
    onRotate:undefined,
    onPinch:undefined,
    onDrag:undefined,
    onClick:FolderOnClick,
    visible:true,
    interactable:true,
    interactions_accurate_collision_detection:true,
  });

  const Note = useState({ 
    source:require("../../../../../res/models/Note/model.vrx"),
    resources:[require('../../../../../res/models/Note/note-atlas_d.png'),
               require('../../../../../res/models/Note/note-atlas_r.png'),
               require('../../../../../res/models/Note/note-atlas_n.png'),
               require('../../../../../res/models/Note/note-atlas_ao.png'),
               ],
    position:[-.1,0,.005], //X:left-right, Y:height, Z:depth
    rotation:item.model.rotation,
    scale:item.model.scale,
    prev_scale_factor:1,
    prev_rotation_factor:1,
    rotation_axis:[0,1,0], //[roll,yaw,pitch]
    animation:undefined,
    animate:false,
    loop_animation:false,
    anim_interruptible:false,
    anim_on_finish:undefined,
    onRotate:undefined,
    onPinch:undefined,
    onDrag:undefined,
//    onClick:NoteOnClick,
    visible:true,
    interactable:false, //TODO(fran): interactable after Folder is opened
    interactions_accurate_collision_detection:true,
});

const Clue0 = useState({
  source:require("../../../../../res/models/ClueCard/0/model.vrx"),
  resources:[require('../../../../../res/models/ClueCard/0/cluecard-atlas_d.png'),
             require('../../../../../res/models/ClueCard/0/cluecard-atlas_r.png'),
             ],
  position:[-.1,-.04,0], //X:left-right, Y:height, Z:depth
  rotation:item.model.rotation,
  scale:item.model.scale,
  prev_scale_factor:1,
  prev_rotation_factor:1,
  rotation_axis:[0,1,0], //[roll,yaw,pitch]
  animation:undefined,
  animate:false,
  loop_animation:false,
  anim_interruptible:false,
  anim_on_finish:undefined,
  onRotate:undefined,
  onPinch:undefined,
  onDrag:undefined,
//  onClick:Clue0OnClick,
  visible:true,
  interactable:false, //TODO(fran): interactable after Folder is opened
  interactions_accurate_collision_detection:true,
});

  const Node = useState({
    position:item.model.position, //X:left-right, Y:height, Z:depth
    rotation:[0,0,0],
    scale:Array(3).fill(1), //NOTE(fran): to avoid object jittering it's better to change the node scale than to move the objects back in depth, keep the objects as close as possible to [0,0,0]
    prev_scale_factor:1,
    prev_rotation_factor:1,
    rotation_axis:Folder[0].rotation_axis,
    animation:undefined,
    animate:true,
    loop_animation:false,
  });

  function FolderOnClick(){

    const folder = Folder[0], setfolder = Folder[1];
    const note = Note[0], setnote = Note[1];
    
    GameState.folder_opened=!GameState.folder_opened;

    setfolder(prevState => ({...prevState,
        interactable:false,
        animation:GameState.folder_opened?FolderAnimation.Open:FolderAnimation.Close,
        animate:true,
        loop_animation:false,
        anim_interruptible:false,
        anim_on_finish:()=>{
            setnote(prevState => ({...prevState, interactable:GameState.folder_opened}));
            setfolder(prevState => ({...prevState, interactable:true}));
        },
    }))

  }

  function NoteOnClick(){
    const note = Note[0], setnote = Note[1];
    const clue = Clue0[0], setclue = Clue0[1];
    //TODO(fran)
    setnote(prevState => ({...prevState, visible:false}));
    setclue(prevState => ({...prevState, interactable:true}));
    //cambiar hardcodeo
    dispatch(Quest.actions.set({...questState, inventory: [...questState.inventory, "1"]}));

  }

  function Clue0OnClick(){
    const clue = Clue0[0], setclue = Clue0[1];
    setclue(prevState => ({...prevState, visible:false}));
    dispatch(Quest.actions.set({...questState, inventory: [...questState.inventory, "1"]}));
  }

  return (  
    <ViroNode visible={(ctx.description.itemID == item.questItemID)} position={Node[0].position} rotation={Node[0].rotation} scale={Node[0].scale} onRotate={makeOnRotate(Node)} >
      <Viro3DObject
          source={Folder[0].source}
          resources={Folder[0].resources}
          type={Folder[0].type}
          position={Folder[0].position}
          rotation={Folder[0].rotation}
          scale={Folder[0].scale}
          animation={{name: Folder[0].animation, run: Folder[0].animate, loop: Folder[0].loop_animation, interruptible:Folder[0].anim_interruptible, onFinish:Folder[0].anim_on_finish}}
          onRotate={makeOnRotate(Node)}
          onClick={Folder[0].onClick}
          visible={Folder[0].visible}
          ignoreEventHandling={!Folder[0].interactable}
          highAccuracyEvents={Folder[0].interactions_accurate_collision_detection}
      />
      <Viro3DObject
          source={Note[0].source}
          resources={Note[0].resources}
          type="VRX"
          position={Note[0].position}
          rotation={Note[0].rotation}
          scale={Note[0].scale}
          animation={{name: Note[0].animation, run: Note[0].animate, loop: Note[0].loop_animation, interruptible:Note[0].anim_interruptible, onFinish:Note[0].anim_on_finish}}
          onRotate={makeOnRotate(Node)}
          onPinch={makeOnPinch(Node)}
          onDrag={makeOnDrag()}
          onClick={NoteOnClick}
          visible={Note[0].visible}
          ignoreEventHandling={!Note[0].interactable}
          highAccuracyEvents={Note[0].interactions_accurate_collision_detection}
      />
      <Viro3DObject
          source={Clue0[0].source}
          resources={Clue0[0].resources}
          type="VRX"
          position={Clue0[0].position}
          rotation={Clue0[0].rotation}
          scale={Clue0[0].scale}
          animation={{name: Clue0[0].animation, run: Clue0[0].animate, loop: Clue0[0].loop_animation, interruptible:Clue0[0].anim_interruptible, onFinish:Clue0[0].anim_on_finish}}
          onRotate={makeOnRotate(Node)}
          onClick={Clue0OnClick}
          visible={Clue0[0].visible}
          ignoreEventHandling={!Clue0[0].interactable}
          highAccuracyEvents={Clue0[0].interactions_accurate_collision_detection}
      />
  </ViroNode>
  );
}