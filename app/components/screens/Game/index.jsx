import React from "react";
import { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import ARView from "./ARView";
import QuestLog from "./QuestLog";
import Exit from "./Exit";
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
import {DEBUG} from "./DEBUG"

function useQuestSetup(route, teamID) {
  const questState = useSelector(state => state.quest);
  const questStateLocal = useSelector(state => state.questLocal);
  const dispatch = useDispatch();
  const navigation = useNavigation()
  const [config, setConfig] = useState();
  const [userID, setUserID] = useState();
  const [loading, setLoading] = useState(true);

  const initQuest = async () => {
    console.log("*******Init quest: ", questState);
    console.log("*******quest local: ", questStateLocal) 
    // TODO
    // Download config and:
    setConfig(exampleQuest);
    // If there is a session download current state.
    // If not, create a session and initialize with returned initial state:
  //TODO: des-hardcodear url
    const url = Config.appUrl + "quests/" + exampleQuest.id + "/progressions/" + teamID 

    fetch(url)
    .then((response) => {
      if(!response.ok) throw new console.warn(response.status)
      else
      response.json().then((json) => 
      {
        console.log("***Progress: ", json)
          if (json.finished == true) {
            console.log("******finished")
            dispatch(QuestLocal.actions.setVisualizer({itemID: undefined}))
            dispatch(QuestLocal.actions.selectItem(
            {selectedItem: {
              itemID: undefined,
              name: ""
            }}))
            navigation.navigate("Quest Completed",
            {
              clientId: exampleQuest.clientId,
              userId: userID,
              questId: exampleQuest.id,
              questName: exampleQuest.name,
              questScore: questState.points,
              questDifficulty: "Dificil",
              questDuration: "Media",
              startTime: questState.start_time
            })
          } else {
            Alert.alert("Actualizo estado")
            console.log("*******actualizacion de estado")
            if (json.started == true && questStateLocal.updateState) {
              console.log("*******actualizacion de estado started")
              dispatch(Quest.actions.set(
                {...questState,
                 inventory: json.inventory,
                 scene: json.scene,
                 objects: json.objects,
                 logs: json.logs,
                 points: json.points,
                 finished: json.finished,
                 start_time: json.start_time}
                ));
            } else {
              if (!questStateLocal.updateState){
                dispatch(QuestLocal.actions.setUpdateState(true));
              }
              console.log("*********actualizacion de estado startn'7")
              dispatch(Quest.actions.setStartTime(json.start_time))
            } 
            }   
      }
      
      )
      .catch((error) => console.error(error))  
    })
    .catch((error) => console.error(error))  
  }
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
    Storage.getObject('user').
    then(user => setUserID(user.id))
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
        if (questState.sendUpdate.combinable == true){
          const questRequest = {...questState, item_name: exampleQuest.combinable[questState.sendUpdate.lastFoundItemID].title, user_id: userID}
          sendUpdate(questRequest, teamID)            
        } else {
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

export default function Game({route}) {
//  if(DEBUG) route = {params:112};
  const {teamID: teamID} = route.params;
  const [userID, setUserID] = useState();

  useEffect(() => {
    Storage.getObject('user').
    then(user => setUserID(user.id))
  }
   , [route])

  //des-hardcodear
  //teamID: 112
  const {loading, questConfig } = useQuestSetup(route, teamID);
  const questState = useSelector(state => state.quest);
  const dispatch = useDispatch();

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
      {questState.can_finish && <Tab.Screen 
        name="Finalizar!" 
        component={ARView} //TODO(alguien q sepa): Clickear en este item debería setear questState.finished en true y así triggerear el fin de la búsqueda
        initialParams={{questConfig}}
        options={{
          tabBarIcon: ({color, size}) => (
            <Feather name="award" color={color} size={size} />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            // Prevent default action
            e.preventDefault();
            dispatch(QuestLocal.actions.setVisualizer({itemID: undefined}))
                dispatch(QuestLocal.actions.selectItem({selectedItem: {
                  itemID: undefined,
                  name: ""
            }}))
            dispatch(Quest.actions.set(
              {...questState,
                finished: true,
                can_finish: true
            }))
            fetch(
              Config.appUrl+'coupons/' + exampleQuest.clientId + "/completions/" + userID, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json'},
              body: JSON.stringify({ 
                points: questState.points,
                start_time: questState.start_time})
              }).then(response => response.json()).catch(error => console.log(error))
              .then(questResult =>
                {
                  navigation.navigate("Quest Completed",
                  {
                    clientId: exampleQuest.clientId,
                    userId: userID,
                    questId: exampleQuest.id,
                    questName: exampleQuest.name,
                    questScore: questState.points,
                    questDifficulty: "Dificil",
                    questDuration: questResult.quest_duration,
                    qr: questResult.coupon,
                    startTime: questState.start_time
                  })
                }
              )
              // dispatch(Quest.actions.set(
              //   {...questState,
              //    inventory: [],
              //    scene: parseFloat(0),
              //    objects: {},
              //    logs: [],
              //    points: parseFloat(0),
              //    finished: false,
              //    can_finish: false,
              //    start_time: Math.floor(Date.now() / 1000)}
              //   ))
          },
        })}
      />}
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
      <Tab.Screen
        name="Salir"
        component={Exit} 
        initialParams={{userID: userID, teamID: teamID}}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="exit" color={color} size={size} />
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