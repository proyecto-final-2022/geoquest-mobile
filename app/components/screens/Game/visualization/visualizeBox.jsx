import React, { useEffect, useState } from "react";
import { Viro3DObject } from "@viro-community/react-viro/components/Viro3DObject";
import { ViroNode } from "@viro-community/react-viro/components/ViroNode";
import { ViroBox } from "@viro-community/react-viro/components/ViroBox";
import { ViroMaterials } from "@viro-community/react-viro/components/Material/ViroMaterials";
import { ViroAnimations } from "@viro-community/react-viro/components/Animation/ViroAnimations";
import { ViroOmniLight } from "@viro-community/react-viro/components/ViroOmniLight";
import { ViroAmbientLight } from "@viro-community/react-viro/components/ViroAmbientLight";
import Resources from "../../../../utils/resources.js";
import Quest from "../../../../redux/slices/quest"
import { useSelector, useDispatch } from "react-redux";
import {BoxAnimation, FolderAnimation, PageAnimation, makeOnPinch, makeOnRotate, makeOnDrag, MapToViro3DObject, Lighting} from "../GameModelsCommon"

export default function VisualizeBox(item, ctx) {
  const questLocal = useSelector(state => state.questLocal);
  const questState = useSelector(state => state.quest);
  const dispatch = useDispatch();

  const modelspath = "../../../../../res/models";

  const Node = useState({
    position:[0,0,-10], //X:left-right, Y:height, Z:depth
    rotation:[0,0,0],
    scale:[1,1,1],
    prev_scale_factor:1,
    prev_rotation_factor:1,
    rotation_axis:[1,0,0], //should be programatically set to Box[0].rotation_axis, unfortunately Box[0] doesnt yet exist at this point, there's a cross dependency here
    animation:undefined,
    animate:true,
    loop_animation:true,
});

const Box = useState({
    position:[0,0,0], //X:left-right, Y:height, Z:depth
    scale:[1,1,1],
    rotation:[-90,180,0],
    prev_scale_factor:1,
    prev_rotation_factor:1,
    rotation_axis:[1,0,0], //[roll,yaw,pitch]
    animation:BoxAnimation.Idle,
    animate:true,
    loop_animation:false,
    anim_interruptible:false,
    anim_on_finish:undefined,
    //onClick:handleOnClick,
    onRotate:makeOnRotate(Node),
    onPinch:makeOnPinch(Node),
    source:require(modelspath+"/BoxWithKeyhole/model.vrx"),
    resources:[require(modelspath+'/BoxWithKeyhole/box-atlas_d.png'),
               require(modelspath+'/BoxWithKeyhole/box-atlas_m.png'),
               require(modelspath+'/BoxWithKeyhole/box-atlas_n.png'),
               require(modelspath+'/BoxWithKeyhole/box-atlas_r.png'),
               ],
    interactable:true,
    interactions_precise_collision_detection:true,
    visible:true,
});

const Key = useState({
    position:[0,0,-1000], //X:left-right, Y:height, Z:depth //INFO: since highaccuracyevents is not set for this object we need to move it away so it doesnt capture user input (scale at 0 will not change the default collision bounding box)
    scale:[0,0,0],
    rotation:[0,0,0],
    prev_scale_factor:1,
    prev_rotation_factor:1,
    rotation_axis:[0,1,0], //[roll,yaw,pitch]
    animation:undefined,
    animate:true,
    loop_animation:true,
    anim_interruptible:false,
    anim_on_finish:undefined,
    source:require(modelspath+"/Key/model.vrx"),
    resources:[require(modelspath+"/Key/key-atlas_d.png"),
               require(modelspath+"/Key/key-atlas_m.png"),
               require(modelspath+"/Key/key-atlas_r.png"),
               ],
});

const KeyholeTrigger = useState({
    position:[0,-.8,-.1], //X:left-right, Y:height, Z:depth
    rotation:[0,0,0],
    scale:[.8,.8,.8],
    dim:[1,1,1],
    prev_scale_factor:1,
    prev_rotation_factor:1,
    rotation_axis:Box[0].rotation_axis, //[roll,yaw,pitch]
    animation:undefined,
    animate:false,
    loop_animation:false,
    visible:true,
});

const Page6 = useState({
    position:[0,-.8,-.5], //X:left-right, Y:height, Z:depth
    scale:[1,1,1],
    rotation:[75,180,0],
    prev_scale_factor:1,
    prev_rotation_factor:1,
    rotation_axis:[0,1,0], //[roll,yaw,pitch]
    animation:PageAnimation.IdleClosed,
    animate:true,
    loop_animation:false,
    anim_on_finish:undefined,
    visible:false,
    source:require(modelspath+"/Page/model.vrx"),
    resources:[require(modelspath+'/Page/page-atlas_d.png'),
               require(modelspath+'/Page/page-atlas_r.png'),
               require(modelspath+'/Page/page-atlas_n.png'),
               ],
    onRotate:makeOnRotate(Node),
    onPinch:makeOnPinch(Node),
//    onClick:onClickPage6,
    interactable:false,
    interactions_precise_collision_detection:true,
});

function Page6OnClick(){
    const box = Box[0], setbox = Box[1];
    const page = Page6[0], setpage = Page6[1];//NOTE: we assume there can be multiple pages on a scene, each with different behaviours
 //   console.log("*************y que hacemos")
 //   Quest.actions.set({...questState, sendUpdate: {lastFoundItemID: "8"}, inventory: [...questState.inventory, "8"]})
    ViroAnimations.registerAnimations({
        page6_open1:{ //move out of the box
            properties:{
                positionX: box.position.x(),
                positionY: box.position.y()-3,
                positionZ: box.position.z()+1,
        },
        easing:"EaseInEaseOut", 
        duration: 1000
        },
        page6_open2:{ //point towards the player
            properties:{
                rotateX: 90,
                rotateY: 0,
                rotateZ: 180,
        },
        easing:"EaseInEaseOut", 
        duration: 1000
        },
        page6_open3:{ //stretch up a little
            properties:{
                scaleX: page.scale.x() * .9,
                scaleY: page.scale.y() * 1.1,
                scaleZ: page.scale.z() * 1.1,
        },
        easing:"EaseOut", 
        duration: 500
        },
        page6_open4:{ //restore from stretch
            properties:{
                scaleX: page.scale.x(),
                scaleY: page.scale.y(),
                scaleZ: page.scale.z(),
        },
        easing:"EaseOut", 
        duration: 500
        },
        page6_open5:{ //scale down to 0
            properties:{
                scaleX: 0,
                scaleY: 0,
                scaleZ: 0,
        },
        easing:"EaseIn", 
        duration: 1000
        },
        page6_open6:{ //disappear from the world
            properties:{
                positionZ: -1000,
        },
        easing:"Linear", 
        duration: 10
        },
        page6_open_pt1:[["page6_open1","page6_open2"]],
        //IMPORTANT: Viro cannot chain this animations with skeletal animations, we have to manually change to skeletal and then back to the rest of the animation
        page6_open_pt2:[["page6_open3","page6_open4","page6_open5","page6_open6"]],
    });
    setpage(prevState => ({...prevState,interactable:false})) //do not allow the page to be clicked again and restart the animation
    setpage(prevState => ({...prevState,animate:false,anim_interruptible:true}))
    setpage(prevState => ({...prevState,animate:true,anim_interruptible:false,loop_animation:false}))
    setpage(prevState => ({...prevState,animation:"page6_open_pt1"}))
    setpage(prevState => ({...prevState,anim_on_finish:()=>{
        setpage(prevState => ({...prevState,animation:PageAnimation.Open,loop_animation:false,animate:true}))

        setpage(prevState => ({...prevState,anim_on_finish:()=>{
            console.log("***********on finish animation")
            setpage(prevState => ({...prevState,animation:"page6_open_pt2",loop_animation:false,animate:true}))
            setpage(prevState => ({...prevState,anim_on_finish:()=>{    dispatch(Quest.actions.set({...questState, sendUpdate: {lastFoundItemID: "8"}, inventory: [...questState.inventory, "8"]}));}}))
        }}))

    }}))

    /*Register 'Page 6' has been collected*/
}

function BoxKeyholeOnClick(){
    if (questLocal.inventory.selectedItem.itemID == "4") { // Key equipped
    //smallTODO(fran): I cant get the animation to play again after the first time (even if I dont disable the trigger), why?
    //TODO(fran): sometimes the box opening animation at the end doesnt play, why?
    const box = Box[0], setbox = Box[1];
    const key = Key[0], setkey = Key[1];
    const trigger = KeyholeTrigger[0], settrigger = KeyholeTrigger[1];
    const page = Page6[0], setpage = Page6[1];

    ViroAnimations.registerAnimations({
        key_openbox1:{ //appear
            properties:{
                scaleX: .5,
                scaleY: .5,
                scaleZ: .5,
        },
        easing:"EaseInEaseOut", 
        duration: 1000
        },
        key_openbox2:{ //point towards keyhole
            properties:{
                rotateX: 90, //TODO(fran): viro does the rotation in the opposite direction, aka takes the long path (can we somehow tell it to take the short path?)
                rotateY: 0,
                rotateZ: 90,
        },
        easing:"EaseIn", 
        duration: 1000
        },
        key_openbox3:{ //move towards keyhole
            properties:{
                positionX: box.position.x(),
                positionY: box.position.y()-1.5,
                positionZ: box.position.z()-.05,
        },
        easing:"EaseOut",
        duration: 1000
        },
        key_openbox4:{ //rotate inside keyhole upwards
            properties:{
                rotateX: 180,
        },
        easing:"EaseInEaseOut", 
        duration: 1000
        },
        key_openbox5:{ //rotate inside keyhole downwards
            properties:{
                rotateX: 90,
        },
        easing:"EaseInEaseOut", 
        duration: 1000
        },
        key_openbox6:{ //hide
            properties:{
                opacity: 0,
        },
        easing:"EaseInEaseOut", 
        duration: 1000
        },
        key_openbox7:{ //disappear from the world
            properties:{
                scaleX: 0,
                scaleY: 0,
                scaleZ: 0,
                positionZ: -1000, //Move the key as far away from the scene as possible
        },
        easing:"Linear", 
        duration: 10
        },
        key_openbox:[["key_openbox1","key_openbox2","key_openbox3","key_openbox4","key_openbox5","key_openbox6","key_openbox7"]],
    });
    settrigger(prevState => ({...prevState,visible:false})) //make trigger uninteractable
    setbox(prevState => ({...prevState,animate:false,anim_interruptible:true}))
    setkey(prevState => ({...prevState,position:[0,box.position.y()-3,0],scale:[0,0,0],rotation:[0,-90,90]}))
    setkey(prevState => ({...prevState,animate:true,anim_interruptible:false,loop_animation:false}))
    setkey(prevState => ({...prevState,animation:"key_openbox"}))
    setkey(prevState => ({...prevState,anim_on_finish:()=>{
        setbox(prevState => ({...prevState,animation:BoxAnimation.Open,loop_animation:false,animate:true})) //interactable:false
        //TODO(fran): animate the page inside falling due to gravity

        setpage(prevState => ({...prevState,interactable:true}))//make page inside box interactable
        //TODO(fran): make page interactive only after the box has completely opened
    }}))
    setpage(prevState => ({...prevState,visible:true})) //make page visible
    }
}

ViroMaterials.createMaterials({
    trigger_color: {
       lightingModel: "Constant",
       //diffuseColor:"#FF0000",
       diffuseTexture: require(modelspath+'/Trigger/trigger-atlas_d.png'),
     },
});

return (
  <ViroNode visible={(questLocal.visualizer.itemID == item.questItemID)}>
    {/* <ViroAmbientLight color="#ffffff" intensity={200}/> */}
    {/* <Lighting/> */}
    <ViroNode position={Node[0].position} rotation={Node[0].rotation} scale={Node[0].scale} onRotate={makeOnRotate(Node)}>
        <Viro3DObject
            //{...MapToViro3DObject(Box[0])} //TODO(fran): this forgets the individual values and when the box gets updated it updates the whole thing, thus restarting it to its original position every time, instead we'd want to use a macro that aumatically writes what's below this text
            source={Box[0].source}
            resources={Box[0].resources}
            type="VRX"
            position={Box[0].position}
            rotation={Box[0].rotation}
            scale={Box[0].scale}
            animation={{name: Box[0].animation, run: Box[0].animate, loop: Box[0].loop_animation}}
            onRotate={makeOnRotate(Node)}
            highAccuracyEvents={Box[0].interactions_precise_collision_detection} //NOTE(fran): required for the keyhole trigger to work correctly, otherwise the collision box that is tested against user input is completely wrong
            />

        <Viro3DObject
            source={Page6[0].source}
            resources={Page6[0].resources}
            type="VRX"
            visible={Page6[0].visible}
            position={Page6[0].position}
            rotation={Page6[0].rotation}
            scale={Page6[0].scale}
            onRotate={makeOnRotate(Node)}
            onClick={Page6OnClick}
            highAccuracyEvents={Page6[0].interactions_precise_collision_detection}
            animation={{name: Page6[0].animation, run: Page6[0].animate, loop: Page6[0].loop_animation, onFinish:Page6[0].anim_on_finish}}
            ignoreEventHandling={!Page6[0].interactable}
            />

        <Viro3DObject
            source={Key[0].source}
            resources={Key[0].resources}
            type="VRX"
            position={Key[0].position}
            rotation={Key[0].rotation}
            scale={Key[0].scale}
            onRotate={makeOnRotate(Node)}
            animation={{name: Key[0].animation, run: Key[0].animate, loop: Key[0].loop_animation, onFinish:Key[0].anim_on_finish}}
            />
        <ViroBox 
            visible={KeyholeTrigger[0].visible}
            opacity={.03} 
            width={KeyholeTrigger[0].dim.x()} 
            height={KeyholeTrigger[0].dim.y()} 
            length={KeyholeTrigger[0].dim.z()} 
            position={KeyholeTrigger[0].position}
            materials={"trigger_color"} 
            onRotate={makeOnRotate(Node)}
            onClick={BoxKeyholeOnClick}
            /> 
        
    </ViroNode>
  </ViroNode>
)
}
