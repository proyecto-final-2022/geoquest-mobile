import { ViroARSceneNavigator } from "@viro-community/react-viro/components/AR/ViroARSceneNavigator";
import { parseScene } from "./questParsers";


export default ARView = ({handler}) => {
  const sceneNum = handler.questState.scene;
  const sceneConfig = handler.questConfig.scenes[sceneNum];
  const parsedScene = parseScene(sceneConfig)(handler);

  return (
    <ViroARSceneNavigator 
      initialScene={{scene: parsedScene.scene, passProps: { objectComponents: parsedScene.objectComponents }}} 
    />
  );
}
