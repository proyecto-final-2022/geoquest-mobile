import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Alert, Modal, ActivityIndicator, Text, View, Dimensions, Image, Pressable, FlatList, TouchableOpacity, TextInput} from 'react-native';
import { useIsFocused } from '@react-navigation/native'
import {Avatar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native'
import {FontAwesome, Entypo, Ionicons, AntDesign} from '@expo/vector-icons'
import Config from '../../../config.json'
import Tags from "react-native-tags"
import CustomButton from '../commons/CustomButton'

const {width} = Dimensions.get('screen')

export default Notifications = ({route, navigation}) => {
  
  const {userID} = route.params

  const isFocused = useIsFocused()

  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  const [call, setCall] = useState(false);
  
  const url = Config.appUrl + "users/" + userID + "/notifications"

  useEffect(() => {
    fetch(url)
    .then((response) => response.json())
    .then((json) => {
      setNotifications(json)
      console.log(userID)})
    .catch((error) => console.error(error))
    .finally(()=>setLoading(false))
  } , [isFocused])

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Notificaciones',
      headerRight: () => (
        <Ionicons color='#a52a2a' name ='arrow-back' size={30} onPress={() => navigation.navigate('Quest Navigator')}/>
      ),
      headerTintColor: '#a52a2a',
    })
  })

  const Notification = ({type, sender}) => {
    return (

      <View style={styles.notificationContainer}>
        {
          type == 'quest_invite' ?
          <Text style={{fontWeight: 'bold', fontSize: 18, marginTop:20}}>{sender + ' te ha invitado a: '+ 'Sarlanga'}</Text> : 
          <Text style={{fontWeight: 'bold', fontSize: 18, marginTop:20}}>{sender + ' te ha enviado una solicitud de amistad'}</Text>
        }                         
        <Pressable onPress={() => console.log("ffffff")}>
          <Text style={{marginLeft: 180, color: 'green', fontWeight: 'bold', fontSize: 18, marginTop:30}}>Aceptar</Text>
        </Pressable>
        <Pressable onPress={() => console.log("aaaaaaa")}>
          <Text style={{marginLeft: 270, color: 'red', fontWeight: 'bold', fontSize: 18, marginTop:-26}}>Rechazar</Text>
        </Pressable>
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
        renderItem={({item}) => <Notification type={item.type} sender={item.sender_name}/>}>      
      </FlatList>

      
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#FFF9CA',
  },
  notificationContainer:{
    height: 150,
    width: '100%',
    backgroundColor: 'aliceblue',
    elevation: 5,
    marginTop:10,
    padding: 15, 
  },
});

