import React from "react";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import ARView from "./ARView";
import QuestLog from "./QuestLog";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector, useDispatch } from "react-redux";
import exampleQuest from "../../../../res/exampleQuest.json";
import Quest from "../../../redux/slices/quest"
import Config from "../../../../config.json"

function useQuestSetup(route, questID) {
  const questState = useSelector(state => state.quest);
  const dispatch = useDispatch();
  const [config, setConfig] = useState();
  const [loading, setLoading] = useState(true);

  //TODO: des-hardcodear url
  const url = Config.appUrl + "quests/1" 

  const initQuest = async () => {
    console.log("*******Init quest: ", questState);
    // TODO
    // Download config and:
    setConfig(exampleQuest);
    // If there is a session download current state.
    // If not, create a session and initialize with returned initial state:

    fetch(url)
    .then((response) => response.json())
    .then((json) => 
    {  
        dispatch(Quest.actions.set(
          {...questState,
          inventory: json.inventory,
          scene: json.scene,
          objects: json.objects ?? {}}
          ));
    }
    
    )
    .catch((error) => console.error(error))

  };

  const setUpdateListener = () => {
    console.log("Listener set");
    // TODO: On update notification update state.
    return () => { };  // Unset listener.
  };

  useEffect(() => {
    initQuest().then(() => { 
      setLoading(false);
    }).catch((err) => {
      alert(err);
      // Handle error
    });
    const cleanUp = setUpdateListener();
    return cleanUp;
  }, [route]);

  return {
    loading: loading,
    questConfig: config
  };
}


const Tab = createBottomTabNavigator();

export default function Game({route, questID}) {
  const {loading, questConfig } = useQuestSetup(route, questID);

  if(loading)
    return <View><Text>Loading...</Text></View>;

  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Camara" 
        component={ARView} 
        initialParams={{questConfig}} 
        options={{headerShown: false}} 
      />
      <Tab.Screen 
        name="Mis Notas" 
        component={QuestLog} 
        initialParams={{questConfig}} 
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}
