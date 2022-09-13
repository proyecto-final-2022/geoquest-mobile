import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Alert, Modal, ActivityIndicator, Text, View, Dimensions, Image, Pressable, FlatList, TouchableOpacity, TextInput} from 'react-native';
import {Avatar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native'
import {FontAwesome, Entypo, Ionicons, AntDesign} from '@expo/vector-icons'
import Config from '../../../config.json'
import Tags from "react-native-tags"
import CustomButton from '../commons/CustomButton'

const {width} = Dimensions.get('screen')

export default Notifications = ({route, navigation}) => {
  
  const {type, sender} = route.params

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
          <Text style={{fontWeight: 'bold', fontSize: 18, marginTop:20}}>{sender + ' te ha invitado a: '+ 'Sarlanga'}</Text>
          <Pressable onPress={() => console.log("ffffff")}>
            <Text style={{marginLeft: 180, color: 'green', fontWeight: 'bold', fontSize: 20, marginTop:30}}>Aceptar</Text>
          </Pressable>
          <Pressable onPress={() => console.log("aaaaaaa")}>
            <Text style={{marginLeft: 270, color: 'red', fontWeight: 'bold', fontSize: 20, marginTop:-30}}>Rechazar</Text>
          </Pressable>

              
        </View>
    
      ) 
    }

  return (
    <ScrollView style={styles.view}>

       <Notification type={type} sender={sender}/>
      
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#FFF9CA',
  },
  notificationContainer:{
    height: 130,
    width: '100%',
    backgroundColor: 'aliceblue',
    elevation: 5,
    marginTop:10,
    padding: 15, 
  },
});

