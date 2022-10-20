import React from "react";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import ARView from "./ARView";
import QuestLog from "./QuestLog";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import exampleQuest from "../../../../res/exampleQuest.json";


function useQuestStateHandler(questID) {
  const [config, setConfig] = useState();
  const [state, setState] = useState();
  const [loading, setLoading] = useState(true);

  const initQuest = async () => {
    console.log("Init quest");
    // TODO
    // Download config and:
    setConfig(exampleQuest);
    // If there is a session download current state.
    // If not, create a session and initialize with returned initial state:
    setState({
      scene: 0,
      objects: {}
    });
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
  }, [questID]);

  return {
    loading: loading,
    questConfig: config,
    questState: state,

    setQuestState: (newState) => {
      // TODO: Notify state update.
      console.log("Update sent");
      // If ok, then:
      setState(newState);
    },
  };
}


const Tab = createBottomTabNavigator();

export default function Game({questID}) {
  const {loading, ...questHandler} = useQuestStateHandler(questID);

  if(loading)
    return <View><Text>Loading...</Text></View>;

  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Mis Notas" 
        component={QuestLog} 
        initialParams={{questHandler}} 
        options={{headerShown: false}}
      />
      <Tab.Screen 
        name="Camara" 
        component={ARView} 
        initialParams={{questHandler}} 
        options={{headerShown: false}} 
      />
    </Tab.Navigator>
  );
}
