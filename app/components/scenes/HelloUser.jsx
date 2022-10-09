import React, { useState, useEffect } from "react"; 
import { ViroARSceneNavigator } from "@viro-community/react-viro/components/AR/ViroARSceneNavigator";
import { ViroARScene } from "@viro-community/react-viro/components/AR/ViroARScene";
import { ViroText } from "@viro-community/react-viro/components/ViroText";
import { ViroTrackingStateConstants } from "@viro-community/react-viro/components/ViroConstants";
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";
/*
export default function Scene() {
    return (
      <ViroARSceneNavigator initialScene={{scene: HelloUserScene}}/>
    );
  }
*/
const HelloUser = (_props) => {
    const [text, setText] = useState("Loading...");
    const [name, setName] = useState("");
 
    useEffect(() => {
        const ongetData = async () =>  {
            try {
                const value = await AsyncStorage.getItem('auth.token')
                const decoded = jwt_decode(value);
    
                if(value !== null) {
                  setName(decoded.username) 
                  console.warn('User : ' + decoded.username)
                  // value previously stored
                }
              } catch(e) {
                // error reading value
              }
          }      
        ongetData();
    }, []);

    const onTrackingUpdated = (state, _reason) => {
      if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE)
        setText("Tracking unavailable");
      else if (state === ViroTrackingStateConstants.TRACKING_NORMAL)
        setText("Hello " + name);
    }


   
    return (
      <ViroARScene onTrackingUpdated={onTrackingUpdated}>
        <ViroText
          text={text}
          position={[0,0,-2]}
          style={{fontSize: 20, color:"white"}}
        />
      </ViroARScene>
    );
  }

  export default HelloUser