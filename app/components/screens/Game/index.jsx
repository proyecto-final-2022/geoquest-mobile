import React from "react";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import ARView from "./ARView";
import QuestLog from "./QuestLog";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector, useDispatch } from "react-redux";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import TeamRanking from "../TeamRanking"
import exampleQuest from "../../../../res/exampleQuest.json";
import Quest from "../../../redux/slices/quest"
import QuestLocal from "../../../redux/slices/questLocal"
import Config from "../../../../config.json"
import {useNavigation} from '@react-navigation/native'
import Storage from "../../../utils/storage/storage"

function useQuestSetup(route, teamID) {
  const questState = useSelector(state => state.quest);
  const dispatch = useDispatch();
  const navigation = useNavigation()
  const [config, setConfig] = useState();
  const [userID, setUserID] = useState(72);
  const [loading, setLoading] = useState(true);

  const initQuest = async () => {
    console.log("*******Init quest: ", questState);
    // TODO
    // Download config and:
    setConfig(exampleQuest);
    // If there is a session download current state.
    // If not, create a session and initialize with returned initial state:
  //TODO: des-hardcodear url
    const url = Config.appUrl + "quests/" + exampleQuest.id + "/progressions/" + teamID 

    fetch(url)
    .then((response) => response.json())
    .then((json) => 
    {   
      console.log("***Progress: ", json)
        if (json.finished == true) {
          dispatch(QuestLocal.actions.setVisualizer({itemID: undefined}))
          dispatch(QuestLocal.actions.selectItem(
          {selectedItem: {
            itemID: undefined,
            name: ""
          }}))
          navigation.navigate("Quest Completed",
          {
            questId: exampleQuest.id,
            questName: exampleQuest.name,
            questScore: 99999,
            questDifficulty: "Dificil",
            questDuration: "Media"
          })
        } else {
          dispatch(Quest.actions.set(
            {...questState,
             inventory: json.inventory,
             scene: json.scene,
             objects: json.objects ?? {},
             logs: json.logs ?? [],
             points: json.points ?? parseFloat(0),
             finished: json.finished,
             start_time: json.start_time ?? Math.floor(Date.now() / 1000)}
            ));
        }    
    }
    
    )
    .catch((error) => console.error(error))

  };

  //IMPORTANTE!! HAY QUE ESTAR LOGUEADO PARA QUE ESTO FUNQUE
  /*
  useEffect( () => {
    Storage.getObject('user').
    then(user => setUserID(user.id) )
  }, [])
*/
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

  useEffect(() => {

    if (questState.sendUpdate.lastFoundItemID != undefined) {
        if (questState.finished == true) {
          const questRequest = {...questState, item_name: exampleQuest.lastItem.title, user_id: userID}
          sendUpdate(questRequest, teamID)
          navigation.navigate("Quest Completed",
          {
            questId: exampleQuest.id,
            questName: exampleQuest.name,
            questScore: 99999,
            questDifficulty: "Dificil",
            questDuration: "Media"
          })
        }
        else{
          const questRequest = {...questState, item_name: exampleQuest.items[questState.sendUpdate.lastFoundItemID].title, user_id: userID}
          sendUpdate(questRequest, teamID)  
        }
      }
  } 
   , [questState.sendUpdate])

  return {
    loading: loading,
    questConfig: config
  };
}


const Tab = createBottomTabNavigator();

export default function Game({route, teamID}) {
  //des-hardcodear
  const {loading, questConfig } = useQuestSetup(route, 112);

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
        options={{
          tabBarIcon: ({color, size}) => (
            <AntDesign name="book" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Camara" 
        component={ARView} 
        initialParams={{questConfig}}
        options={{
          tabBarIcon: ({color, size}) => (
            <Feather name="camera" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Podio" 
        component={TeamRanking} 
        initialParams={{questConfig}}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="ios-podium-sharp" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function sendUpdate(questRequest, teamID) {
  fetch(Config.appUrl + "quests/" + exampleQuest.id + "/progressions/" + teamID, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json'},
    body: JSON.stringify(questRequest) 
  }).catch(error => {
    console.log('Error sending update: '+error);
  })
}