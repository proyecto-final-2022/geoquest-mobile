import React, { useEffect, useState } from "react";
import {StyleSheet, Alert} from 'react-native';
import { ViroARScene } from "@viro-community/react-viro/components/AR/ViroARScene";
import { Viro3DObject } from "@viro-community/react-viro/components/Viro3DObject";
import { ViroNode } from "@viro-community/react-viro/components/ViroNode";
import { ViroAnimations } from "@viro-community/react-viro/components/Animation/ViroAnimations";
import { ViroARCamera } from "@viro-community/react-viro/components/AR/ViroARCamera";
import { ViroOmniLight } from "@viro-community/react-viro/components/ViroOmniLight";
import { ViroAmbientLight } from "@viro-community/react-viro/components/ViroAmbientLight";
import Resources from "../../../../utils/resources.js";
import Quest from "../../../../redux/slices/quest";
import QuestLocal from "../../../../redux/slices/questLocal";
import { useSelector, useDispatch } from "react-redux";
import {BoxAnimation, FolderAnimation, PageAnimation, makeOnPinch, makeOnRotate, makeOnDrag, MapToViro3DObject, Lighting, DisappearModel} from "../GameModelsCommon"

export default function VisualizeFolder(item, ctx) {
  const questState = useSelector(state => state.quest);
  const questLocal = useSelector(state => state.questLocal);
  const [folderOpened, setFolderOpened] = useState(true)
  const dispatch = useDispatch();

  const modelspath = "../../../../../res/models";
  
  const Folder = useState({
    source:Resources.get(item.model.source),
    resources:item.model.resources.map(r => Resources.get(r)),
    position:[0,0,0],
    scale:item.model.scale,
    rotation:item.model.rotation,
    type:item.model.type,
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
//    onClick:FolderOnClick,
    visible:true,
    interactable:true,
    interactions_accurate_collision_detection:true,
  });

  const Note = useState({
    source:Resources.get("models.note1.model"),
    resources:["resources.note1D","resources.note1N","resources.note1R","resources.note1AO"].map(r => Resources.get(r)),

    // source:require(modelspath+"/Note/modelAnim.vrx"),
    // resources:[require(modelspath+'/Note/note-atlas_d.png'),
    //            require(modelspath+'/Note/note-atlas_r.png'),
    //            require(modelspath+'/Note/note-atlas_n.png'),
    //            require(modelspath+'/Note/note-atlas_ao.png'),
    //            ],

    position:[-.1,0,.005], //X:left-right, Y:height, Z:depth
    rotation:[0,0,0],
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
  source:Resources.get("models.clue01.model"),
  resources:["resources.clue01D","resources.clue01R"].map(r => Resources.get(r)),

  // source:require(modelspath+"/ClueCard/0/modelAnim.vrx"),
  // resources:[require(modelspath+'/ClueCard/0/cluecard-atlas_d.png'),
  //            require(modelspath+'/ClueCard/0/cluecard-atlas_r.png'),
  //            ],

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

  const PageData = {
    // source:require(modelspath+"/Page/modelAnim.vrx"),
    // resources:[require(modelspath+'/Page/page-folder-atlas_d.png'),
    //            require(modelspath+'/Page/page-folder-atlas_r.png'),
    //            require(modelspath+'/Page/page-folder-atlas_n.png'),
    //            require(modelspath+'/Page/page-folder-atlas_m.png'),
    //            ],
    position:[1,0,-.014], //X:left-right, Y:height, Z:depth
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
    onClick:undefined,
    visible:false,
    interactable:false, //TODO(fran): interactable after Folder is opened
    interactions_accurate_collision_detection:false,
}
  const PageData0 = {
    source:Resources.get("models.page7.model"),
    resources:["resources.page7D","resources.page7N","resources.page7R","resources.page7M"].map(r => Resources.get(r)),
    ...PageData,
  }
  const PageData1 = {
    source:Resources.get("models.page8.model"),
    resources:["resources.page8D","resources.page8N","resources.page8R","resources.page8M"].map(r => Resources.get(r)),
    ...PageData,
  }
  const PageData2 = {
    source:Resources.get("models.page9.model"),
    resources:["resources.page9D","resources.page9N","resources.page9R","resources.page9M"].map(r => Resources.get(r)),
    ...PageData,
  }
  const PageData3 = {
    source:Resources.get("models.page10.model"),
    resources:["resources.page10D","resources.page10N","resources.page10R","resources.page10M"].map(r => Resources.get(r)),
    ...PageData,
  }

  const Page0 = useState(PageData0);
  const Page1 = useState(PageData1);
  const Page2 = useState(PageData2);
  const Page3 = useState(PageData3);

  function OpenOrCloseFolder(){
    const folder = Folder[0], setfolder = Folder[1];
    const note = Note[0], setnote = Note[1];

    setFolderOpened(!folderOpened)  
    setfolder(prevState => ({...prevState,
        interactable:false,
        animation:folderOpened?FolderAnimation.Open:FolderAnimation.Close,
        animate:true,
        loop_animation:false,
        anim_interruptible:false,
        anim_on_finish:()=>{
            setnote(prevState => ({...prevState, interactable:folderOpened}));
            setfolder(prevState => ({...prevState, interactable:true}));
        },
    }))
  }

  function FolderOnClick(){
    // console.log("***Last interaction: ", questLocal.inventory.selectedItem.itemID)
    // if (questState.finished == true) {
    //   navigation.navigate("Quest Navigator")
    // }

    const folder = Folder[0], setfolder = Folder[1];
    const note = Note[0], setnote = Note[1];

    const selected = questLocal.inventory.selectedItem.itemID ?? 0
    console.log("***************BFDAUSFBASDFIB")
    
    const page_idx = selected - 8; //pages go from ["8","9","10","11"]
    
    if (page_idx>=0 && page_idx<4) { //Page equipped
      const Pages = [Page0,Page1,Page2,Page3];
      const Page = Pages[page_idx];
      const page = Page[0], setpage = Page[1];
      console.log("******aaaaaaaaaaaaa: ", questLocal.inventory.selectedItem.itemID)
      //TODO(FRAN): fix Folder animation, make it so it doesnt close so much at the end so the pages can fit inside without clipping the front flap

      if(folderOpened) OpenOrCloseFolder();

        ViroAnimations.registerAnimations({
          page_addtofolder1:{ //appear page
            properties:{
                scaleX: PageData.scale.x(),
                scaleY: PageData.scale.y(),
                scaleZ: PageData.scale.z(),
          },
          easing:"EaseInEaseOut",
          duration: 1000
          },
          page_addtofolder2:{ //move page inside folder
            properties:{
                positionX: "-=1",
          },
          easing:"EaseInEaseOut",
          duration: 1000
          },
          page_addtofolder:[["page_addtofolder1","page_addtofolder2"]],
        })
        
        const finish_quest = "8" == questLocal.inventory.selectedItem.itemID;
        setpage(prevState => ({...prevState,
          visible:true,
          scale:[0,0,0],
          animation:"page_addtofolder",
          animate:true,
          loop_animation:false,
          anim_interruptible:false,
          anim_on_finish:()=>{
            if (finish_quest)
              //TODO(fran): check whether more pages are really still left to be found and placed in the folder
              ctx.hint("¡Felicidades! Ya tenés suficientes hojas para entregar tu TP. Si te quedaste con ganás de más, todavía quedan más hojas por encontrar para obtener un mejor premio.")
          }
        }))
        var newInventory = []
        var filteredInventory = []
        newInventory = questState.inventory
        const id_to_remove = questLocal.inventory.selectedItem.itemID;
        
        filteredInventory = newInventory.filter(item => item != questLocal.inventory.selectedItem.itemID)
        console.log("CONCHAAAAAAAAAAAAAAAAAAAAAAAAAA: ", filteredInventory)
        if (finish_quest) {
          dispatch(Quest.actions.set({...questState, inventory: newInventory.filter(item => item != questLocal.inventory.selectedItem.itemID), can_finish: finish_quest}));
          dispatch(QuestLocal.actions.setUpdateState(false));
        }else{
          dispatch(Quest.actions.set({...questState, inventory: newInventory.filter(item => item != questLocal.inventory.selectedItem.itemID), can_finish: finish_quest}));
        }
    }
    else{
      OpenOrCloseFolder()
    }
  }

  function NoteOnClick(){
    const note = Note[0], setnote = Note[1];
    const clue = Clue0[0], setclue = Clue0[1];
    //TODO(fran)
    DisappearModelAndSaveInInventory(Note, "2");
    //setnote(prevState => ({...prevState, visible:false}));
    setclue(prevState => ({...prevState, interactable:true}));
    console.log("****note on click")
    //cambiar hardcodeo
  }

  function Clue0OnClick(){
    const clue = Clue0[0], setclue = Clue0[1];
    console.log("***********Clue 0 on click")
    //setclue(prevState => ({...prevState, visible:false}));
    DisappearModelAndSaveInInventory(Clue0, "3");
  }

  function DisappearModelAndSaveInInventory(Model, id){
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
        interactable:false,
        animation:"disappearModel",
        animate:true,
        loop_animation:false,
        anim_interruptible:false,
        anim_on_finish:()=>{
          setmodel(prevState => ({...prevState,visible:false,}))
          dispatch(Quest.actions.set({...questState, sendUpdate: {lastFoundItemID: id}, inventory: [...questState.inventory, id]}));
        }
    }))
  };

  return (
   <ViroNode visible={(questLocal.visualizer.itemID == item.questItemID)}>
    {/* <Lighting/> */}
    <ViroNode position={Node[0].position} rotation={Node[0].rotation} scale={Node[0].scale} onRotate={makeOnRotate(Node)}>
      <Viro3DObject
          source={Folder[0].source}
          resources={Folder[0].resources}
          type={Folder[0].type}
          position={Folder[0].position}
          rotation={Folder[0].rotation}
          scale={Folder[0].scale}
          animation={{name: Folder[0].animation, run: Folder[0].animate, loop: Folder[0].loop_animation, interruptible:Folder[0].anim_interruptible, onFinish:Folder[0].anim_on_finish}}
          onRotate={makeOnRotate(Node)}
          onClick={FolderOnClick}
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
          visible={!questState.inventory.includes("2") ?? true}
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
          visible={!questState.inventory.includes("3") ?? true}
          ignoreEventHandling={!Clue0[0].interactable}
          highAccuracyEvents={Clue0[0].interactions_accurate_collision_detection}
          />

      <Viro3DObject
          source={Page0[0].source}
          resources={Page0[0].resources}
          type="VRX"
          position={Page0[0].position}
          rotation={Page0[0].rotation}
          scale={Page0[0].scale}
          animation={{name: Page0[0].animation, run: Page0[0].animate, loop: Page0[0].loop_animation, interruptible:Page0[0].anim_interruptible, onFinish:Page0[0].anim_on_finish}}
          onRotate={makeOnRotate(Node)}
          onClick={Page0[0].onClick}
          visible={Page0[0].visible}
          ignoreEventHandling={!Page0[0].interactable}
          highAccuracyEvents={Page0[0].interactions_accurate_collision_detection}
          />

      <Viro3DObject
          source={Page1[0].source}
          resources={Page1[0].resources}
          type="VRX"
          position={Page1[0].position}
          rotation={Page1[0].rotation}
          scale={Page1[0].scale}
          animation={{name: Page1[0].animation, run: Page1[0].animate, loop: Page1[0].loop_animation, interruptible:Page1[0].anim_interruptible, onFinish:Page1[0].anim_on_finish}}
          onRotate={makeOnRotate(Node)}
          onClick={Page1[0].onClick}
          visible={Page1[0].visible}
          ignoreEventHandling={!Page1[0].interactable}
          highAccuracyEvents={Page1[0].interactions_accurate_collision_detection}
          />

      <Viro3DObject
          source={Page2[0].source}
          resources={Page2[0].resources}
          type="VRX"
          position={Page2[0].position}
          rotation={Page2[0].rotation}
          scale={Page2[0].scale}
          animation={{name: Page2[0].animation, run: Page2[0].animate, loop: Page2[0].loop_animation, interruptible:Page2[0].anim_interruptible, onFinish:Page2[0].anim_on_finish}}
          onRotate={makeOnRotate(Node)}
          onClick={Page2[0].onClick}
          visible={Page2[0].visible}
          ignoreEventHandling={!Page2[0].interactable}
          highAccuracyEvents={Page2[0].interactions_accurate_collision_detection}
          />

      <Viro3DObject
          source={Page3[0].source}
          resources={Page3[0].resources}
          type="VRX"
          position={Page3[0].position}
          rotation={Page3[0].rotation}
          scale={Page3[0].scale}
          animation={{name: Page3[0].animation, run: Page3[0].animate, loop: Page3[0].loop_animation, interruptible:Page3[0].anim_interruptible, onFinish:Page3[0].anim_on_finish}}
          onRotate={makeOnRotate(Node)}
          onClick={Page3[0].onClick}
          visible={Page3[0].visible}
          ignoreEventHandling={!Page3[0].interactable}
          highAccuracyEvents={Page3[0].interactions_accurate_collision_detection}
          />
    </ViroNode>
   </ViroNode>
  );
}
//TODO(fran): ask the boyz if there's some way to add an animation to the interactions