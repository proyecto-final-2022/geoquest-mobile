// import React from "react";
// import {
//     ViroOmniLight, ViroSpotLight
//   } from "@viro-community/react-viro"
import { ViroOmniLight } from "@viro-community/react-viro/components/ViroOmniLight";
import { ViroSpotLight } from "@viro-community/react-viro/components/ViroSpotLight";
import "./VectorOperations"


export const yaw = [0,1,0]
export const pitch = [0,0,1]
export const roll = [1,0,0]

export const UserAction = { 
    Rotate: 1,
    Pinch: 2,
    Drag: 3,
}
export let ActiveUserAction = UserAction.Rotate;
export function SetActiveUserAction(new_action) {ActiveUserAction = new_action}
export function ActionsMatch(req) {return req === ActiveUserAction}

export const rot_axis_str = ['Yaw','Pitch','Roll','Obj'];
export const rot_axis_val = [yaw,pitch,roll]
export let   rot_axis_idx = 3;

export function Flip_rot_axis_idx(){
    rot_axis_idx+=1;
    if(rot_axis_idx>=rot_axis_str.length) rot_axis_idx=0;
}

export function makeOnPinch(_obj) {
    const obj = _obj[0], setobj = _obj[1];
    return function (state, scaleFactor, source) {
        if(!ActionsMatch(UserAction.Pinch)) return;
        switch(state){
            case 1:  // Pinch start
            {
                setobj(prevState => ({...prevState,prev_scale_factor:1}))
            } break;
            case 2:  // Pinch interact
            {
                const scale_difference = scaleFactor - obj.prev_scale_factor;
                const new_scale = obj.scale.add(obj.scale.mult(scale_difference))
                setobj(prevState => ({...prevState,scale:new_scale}))
                setobj(prevState => ({...prevState,prev_scale_factor:scaleFactor}))
            } break;
            case 3: { } break; // Pinch end
        }
        setobj(prevState => ({...prevState,prev_rotation_factor:scaleFactor}))
    }
}

export function makeOnRotate(_obj) {
    const obj = _obj[0], setobj = _obj[1];
    return function (state, rotationFactor, source) {
        if(!ActionsMatch(UserAction.Rotate)) return;
        switch(state){
            case 1: { } break; //Rotation start
            case 2: //Rotation interact
            {
                
                const rotation_difference = rotationFactor-obj.prev_rotation_factor;
                const new_rotation = obj.rotation.add([...rot_axis_val,obj.rotation_axis][rot_axis_idx].mult(rotation_difference));
                setobj(prevState => ({...prevState,rotation:new_rotation}))
            } break;
            case 3: { } break; //Rotation end
        }
        setobj(prevState => ({...prevState,prev_rotation_factor:rotationFactor}))
    }
}

export function makeOnDrag() { return ActionsMatch(UserAction.Drag) ? ()=>{} : undefined }

export const BoxAnimation = {
    Idle: "BoxWithKeyhole_Idle",
    Open: "BoxWithKeyhole_Open",
    Close: "BoxWithKeyhole_Close",
}

export const FolderAnimation = {
    Idle: "Folder_Idle",
    Open: "Folder_Open",
    Close: "Folder_Close"
}

 export const PageAnimation = {
    Idle: "Page_Idle",
    IdleClosed: "Page_IdleClosed",
    Open: "Page_Open",
    Close: "Page_Close"
}

// export function MapToViro3DObject(obj){
//     return {
//         type:"VRX",
//         source:obj.source,
//         resources:obj.resources,
//         position:obj.position,
//         rotation:obj.rotation,
//         scale:obj.scale,
//         animation:{name:obj.animation,run:obj.animate,loop:obj.loop_animation,interruptible:obj.anim_interruptible,onFinish:obj.anim_on_finish},
//         onRotate:obj.onRotate,
//         onPinch:obj.onPinch,
//         onDrag:obj.onDrag,
//         onClick:obj.onClick,
//         visible:obj.visible,
//         ignoreEventHandling:!obj.interactable,
//         highAccuracyEvents:obj.interactions_accurate_collision_detection,
//     }
// }

const ObjectPrototype = {
    source:undefined,
    resources:[],
    position:[0,0,0], //X:left-right, Y:height, Z:depth
    rotation:[0,0,0],
    scale:[1,1,1],
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
    onClick:undefined,
    visible:true,
    interactable:true,
    interactions_accurate_collision_detection:true,
};

export const Lighting = () => {
    const omnilight = true;
    const spotlight = false;
    return (
        <>
            { omnilight && <ViroOmniLight //TODO(fran): move lighting to separate function so it can be reused for all scenes
                color="#FFFFFF"
                position={[0, 5, -10]}
                intensity={700}
                attenuationStartDistance={5}
                attenuationEndDistance={30}
            /> }
            { omnilight && <ViroOmniLight
                color="#FFFFFF"
                position={[0, 0.3, 3]}
                intensity={700}
                attenuationStartDistance={5}
                attenuationEndDistance={30}
            /> }

            { spotlight && <ViroSpotLight
                color="#ffffff"
                attenuationStartDistance={4}
                attenuationEndDistance={20}
                intensity={1000}
                position={[0, 0, -1]}
                direction={[0, 0, -1]}
                innerAngle={0}
                outerAngle={45}
            /> }
        </>
    )
}