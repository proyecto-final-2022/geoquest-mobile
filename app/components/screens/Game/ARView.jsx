import React, { useRef, useState } from "react";
import { 
  ViroARSceneNavigator
} from "@viro-community/react-viro/components/AR/ViroARSceneNavigator";
import { View, StyleSheet } from "react-native";
import HintModal from "./HintModal";
import Scene from "./Scene";


export default function ARView({route}) {
  const [ showHint, setShowHint ] = useState(false);
  const [ hintText, setHintText ] = useState("");
  const navigatorRef = useRef();

  const hint = (text) => {
    setHintText(text);
    setShowHint(true);
  };

  const forceReload = () => {
    console.log("Force Reload");
    navigatorRef.current.jump({scene: Scene});
  };

  const globalCtx = { 
    hint, forceReload
  };

  return (
    <View style={{height: "100%", width: "100%"}}>
      <ViroARSceneNavigator 
        ref={navigatorRef}
        initialScene={{scene: Scene}} 
        viroAppProps={{handler: route.params.questHandler, globalCtx}}
      />
      <HintModal 
        style={styles.hintModal} 
        visible={showHint} 
        hint={hintText} 
        onClose={() => setShowHint(false)}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  hintModal: {

  },
});
