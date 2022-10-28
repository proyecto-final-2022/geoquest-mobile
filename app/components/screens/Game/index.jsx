import React from "react";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import ARView from "./ARView";
import QuestLog from "./QuestLog";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import exampleQuest from "../../../../res/exampleQuest.json";


function useQuestSetup(questID) {
  const [config, setConfig] = useState();
  const [loading, setLoading] = useState(true);

  const initQuest = async () => {
    console.log("Init quest");
    // TODO
    // Download config and:
    setConfig(exampleQuest);
    // If there is a session download current state.
    // If not, create a session and initialize with returned initial state:
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
    questConfig: config
  };
}


const Tab = createBottomTabNavigator();

export default function Game({questID}) {
  const {loading, questConfig } = useQuestSetup(questID);

  if(loading)
    return <View><Text>Loading...</Text></View>;

  return (
    <Tab.Navigator 
      detachInactiveScreens={false}
      screenOptions={(_props) => ({
        unmountOnBlur: true,
        headerShown: false,
        tabBarActiveTintColor: "#664C0F",
        tabBarInactiveTintColor: "#B3AA98",
        tabBarStyle: {
          backgroundColor: "#FFF9CA",
        }
      })}
    >
      <Tab.Screen 
        name="Mis Notas" 
        component={QuestLog} 
        initialParams={{questConfig}}
      />
      <Tab.Screen 
        name="Camara" 
        component={ARView} 
        initialParams={{questConfig}}
      />
    </Tab.Navigator>
  );
}
