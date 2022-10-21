import React from "react";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import ARView from "./ARView";

import exampleQuest from "../../../../res/exampleQuest.json";


function useQuestStateHandler(_questID) {
  const [config, setConfig] = useState();
  const [state, setState] = useState();
  const [inventory, setInventory] = useState([{}]);
  const [loading, setLoading] = useState(true);

  const initQuest = async () => {
    console.log("Init quest");
    // TODO
    // Download config and:
    setConfig(exampleQuest);
    // If there is a session download current state.
    // If not, create a session and initialize with returned initial state:
    setState({
      inventory: [],
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
  }, []);

  //por ejemplo:
  useEffect(() => {
    //GET id inventario
    //actualizar variable de inventario
    console.log("***********Quest ID: ", _questID)
  }, _questID);


  return {
    loading: loading,
    questConfig: config,
    questState: state,
    inventory: inventory,

    setQuestState: (newState) => {
      // TODO: Notify state update.
      console.log("Update sent");
      // If ok, then:
      setState(newState);
    },
    setTeamInventory: (inventory) => {
      console.log("Update inventory");
      setInventory(inventory)
    }
  };
}


export default function Game({questID}) {
  const questHandler = useQuestStateHandler(questID);

  if (questHandler.loading)
    return <View><Text>Loading...</Text></View>;

  return (
    <ARView questHandler={questHandler} />
  );
}
