import { useState } from "react";
import { ViroARSceneNavigator } from "@viro-community/react-viro/components/AR/ViroARSceneNavigator";
import { ViroARScene } from "@viro-community/react-viro/components/AR/ViroARScene";
import { parseScene } from "./questParsers";
import interactions from "./interactions";


const Scene = ({objectComponents}) => {
  return (
    <ViroARScene>
      {objectComponents}
    </ViroARScene>
  );
}

const buildHandler = (ctx, questHandler) => {
  return {
    ...questHandler,
    interact: (interaction, ...params) => {
      return interactions[interaction](ctx, questHandler, ...params);
    }
  };
}

export default ARView = ({questHandler}) => {
  const [ showHint, setShowHint ] = useState(false);
  const [ hintText, setHintText ] = useState();

  const hint = (text) => {
    /* setHintText(text); */
    /* setShowHint(true); */
    alert(text);
  }

  const ctx = { hint };
  const handler = buildHandler(ctx, questHandler);

  const sceneNum = questHandler.questState.scene;
  const sceneConfig = questHandler.questConfig.scenes[sceneNum];
  const objects = parseScene(sceneConfig)(handler);

  return (
    <ViroARSceneNavigator 
      initialScene={{scene: Scene, passProps: { objectComponents: objects }}} 
    />
  );
}
