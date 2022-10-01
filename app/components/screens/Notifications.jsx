import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Alert, Modal, ActivityIndicator, Text, View, Dimensions, Image, Pressable, FlatList, TouchableOpacity, TextInput} from 'react-native';
import { useIsFocused } from '@react-navigation/native'
import {Avatar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native'
import {FontAwesome, Entypo, Ionicons, AntDesign} from '@expo/vector-icons'
import Config from '../../../config.json'
import Tags from "react-native-tags"
import CustomButton from '../commons/CustomButton'
import Storage from '../../utils/storage/storage'


const {width} = Dimensions.get('screen')

export default Notifications = ({route, navigation}) => {
  
  const isFocused = useIsFocused()

  const user = route.params

  const [notifications, setNotifications] = useState([])

  const [loading, setLoading] = useState(true)

  const [call, setCall] = useState(false);

  const forwardToWaitRoom = (questID, teamID, userID) => {
    navigation.navigate('Wait Room', {questID, teamID, userID})
  }

  const forwardToFriendList = () => {
    navigation.navigate('Friends List')
  }

  const HandleCancel = (teamID, userID, notificationID, questID) => {
    fetch(
      Config.appUrl+'teams/' + teamID + '/users/' + userID, {
      method: 'DELETE',      
      headers: { 'Content-Type': 'application/json'}
      })
    .then(
      fetch(
        Config.appUrl+'users/' + userID + '/notifications/'+ notificationID, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json'}
        })
      )
    .then(
      fetch(Config.appNotificationsUrl + "notifications/quest_accept", {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'},
        body: JSON.stringify({ 
          sender_name: user.username,
          quest_id: questID,
          team_id: teamID,
        }) 
      })
      )
    .then(
      fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setNotifications(json)
        })
      .catch((error) => console.error(error))
      .finally(()=>setLoading(false))
    )
  }

  const handleAcceptQuest = (teamID, notificationID, questID) => {
    Alert.alert("Invitacion aceptada")
    fetch(
      Config.appUrl+'teams/waitrooms/'+ teamID + '/users/' + user.id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json'}
      })
    .then(
      fetch(
        Config.appUrl+'users/' + user.id + '/notifications/'+ notificationID, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json'}
        })
      )
      .then(
        fetch(Config.appNotificationsUrl + "notifications/quest_accept", {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json'},
          body: JSON.stringify({ 
            sender_name: user.username,
            quest_id: questID,
            team_id: teamID,
          }) 
        })
        )

    .then(
      Storage.getObject('user').then(user => forwardToWaitRoom(questID, teamID, user.id))      
    )
    .catch((error) => console.error(error))
    
  }

  const handleAcceptFriendRequest = (senderID, notificationID) => {
    Alert.alert("Solicitud aceptada")
      fetch(Config.appUrl + "users/" + user.id + "/friends/" + senderID  , {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'} 
        })
      .catch((error) => console.error(error))
      .then(
        fetch(
          Config.appUrl+'users/' + user.id + '/notifications/'+ notificationID, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json'}
          })
        )
      .catch((error) => console.error(error))  
      .then(forwardToFriendList())
  }

  const handleCancelFriendRequest = (notificationID) => {
    Alert.alert("Solicitud cancelada")
        fetch(
          Config.appUrl+'users/' + user.id + '/notifications/'+ notificationID, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json'}
          })
      .catch((error) => console.error(error))  
      .then(forwardToFriendList())
  }
  
  const url = Config.appUrl + "users/" + user.id + "/notifications"

  useEffect(() => {    
    fetch(url)
    .then((response) => response.json())
    .then((json) => {
      setNotifications(json)
      })
    .catch((error) => console.error(error))
    .finally(()=>setLoading(false))
    }, [route])    


  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Notificaciones',
      headerRight: () => (
        <Ionicons color='#a52a2a' name ='arrow-back' size={30} onPress={() => navigation.navigate('Quest Navigator')}/>
      ),
      headerTintColor: '#a52a2a',
    })
  })

  const Notification = ({notification}) => {
    return (
      <View style={styles.notificationContainer}>
        <View style={styles.description}>
          {notification.type == 'quest_invite' ? 
          <Text style={{fontWeight: 'bold', fontSize: 18}}>{notification.sender_name + ' te ha invitado a: '+ notification.quest_name}</Text>
          : 
          <Text style={{fontWeight: 'bold', fontSize: 18}}>{notification.sender_name + ' te ha enviado una solicitud de amistad'}</Text>
          }
        </View>

        <View style={styles.optionsContainer}>          
        
        <View style={styles.options}>
        <Pressable onPress={() => notification.type == "quest_invite" ? Storage.getObject('user').then(user => 
          {Alert.alert("Invitacion rechazada")
          HandleCancel(notification.team_id, user.id, notification.id, notification.quest_id)
        .then(
          fetch(Config.appNotificationsUrl + "notifications/quest_deny", {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json'},
            body: JSON.stringify({ 
              sender_name: user.username,
              quest_id: notification.quest_id,
              team_id: notification.team_id,
            }) 
          })
        )}
          ) : handleCancelFriendRequest(notification.id) }>
          <Text style={{fontWeight: 'bold', color: 'red', fontSize: 15}}>Rechazar</Text> 
        </Pressable>

        </View>

        <View style={styles.options}>
          <Pressable onPress={() => notification.type == "quest_invite" ? handleAcceptQuest(notification.team_id, notification.id, notification.quest_id) : handleAcceptFriendRequest(notification.sender_id, notification.id)}>
            <Text style={{fontWeight: 'bold', color: 'green', fontSize: 15}}>Aceptar</Text>
          </Pressable>
        </View>
          
        </View>

      </View>
    )
  
      }

  return (
    <ScrollView style={styles.view}>
      <FlatList
        horizontal= {false}
        contentContainerStyle={{paddingLeft: 20, paddingVertical: 20}}
        showsHorizontalScrollIndicator = {false}
        data={notifications}
        renderItem={({item}) => <Notification notification={item}/>
        
        }>      
      </FlatList>

      
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#FFF9CA',
  },
  options: {
    justifyContent: 'flex-end',
    flexBasis: 80,
    flexShrink: 1,
    flexGrow: 0
  },
  optionsContainer: {
    flexDirection: 'row-reverse'
  },
  description: {
    flexBasis: 60,
    flexShrink: 1,
    flexGrow: 1,
  },
  notificationContainer:{
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 140,
    width: '100%',
    backgroundColor: 'aliceblue',
    elevation: 5,
    marginTop:10,
    padding: 15, 
  },
});

