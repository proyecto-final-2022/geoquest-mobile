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

import userImage_1 from '../../../assets/userImages/userImage_1.png'
import userImage_2 from '../../../assets/userImages/userImage_2.png'
import userImage_3 from '../../../assets/userImages/userImage_3.png'
import userImage_4 from '../../../assets/userImages/userImage_4.png'
import userImage_5 from '../../../assets/userImages/userImage_5.png'
import userImage_6 from '../../../assets/userImages/userImage_6.png'
import userImage_7 from '../../../assets/userImages/userImage_7.png'
import userImage_8 from '../../../assets/userImages/userImage_8.png'
import userImage_9 from '../../../assets/userImages/userImage_9.png'

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

  const getUserImage = (imageNumber) => { 
    const userImages = [userImage_1, userImage_2, userImage_3, userImage_4, userImage_5, userImage_6, userImage_7, userImage_8, userImage_9];
    return userImages[imageNumber-1];
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
        <View style={styles.notificationUserImage}> 
          <Avatar.Image 
            source={getUserImage(notification.sender_image)}
            size={50}
            marginTop={5}
          />
        </View>
        <View style={styles.description}>
          {notification.type == 'quest_invite' ? 
          <View> 
            <Text style={{fontWeight: 'bold', fontSize: 18}}>{notification.sender_name}</Text>
            <Text style={{fontSize: 16}}>{'Te ha invitado a: '}</Text>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>{notification.quest_name}</Text>
          </View>
          :
          <View> 
            <Text style={{fontWeight: 'bold', fontSize: 20}}>{notification.sender_name}</Text>
            <Text style={{fontSize: 16}}>{'Quiere sumarte a amigos!'}</Text>
          </View>
          }
        </View>

        <View style={styles.optionsContainer}>          
        
        <View style={styles.options}>
          <Ionicons color='firebrick' name ='md-close-circle' size={40} onPress={() => notification.type == "quest_invite" ? Storage.getObject('user').then(user => 
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
          ) : console.log("cancelar friend") }/> 
        </View>

        <View style={styles.options}>
          <Ionicons color='green' name ='ios-checkmark-circle' size={40} onPress={() => notification.type == "quest_invite" ? handleAcceptQuest(notification.team_id, notification.id, notification.quest_id) : console.log("amigos")}/>
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
    flexBasis: 60,
    flexShrink: 1,
    flexGrow: 0
  },
  optionsContainer: {
    flexDirection: 'row-reverse'
  },
  description: {
    flexBasis: 100,
    flexShrink: 0,
    flexGrow: 1,
  },
  notificationContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 120,
    width: '100%',
    backgroundColor: 'aliceblue',
    elevation: 5,
    marginTop:10,
    padding: 15, 
  },
  notificationUserImage: {
    flexBasis: 60,
    flexShrink: 0,
    flexGrow: 0
  },
});

