import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Alert, Modal, ActivityIndicator, Text, View, Dimensions, Image, Pressable, FlatList, TouchableOpacity, TextInput} from 'react-native';
import {Avatar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native'
import {FontAwesome, Entypo, Ionicons, AntDesign} from '@expo/vector-icons'
import Config from '../../../config.json'
import Tags from "react-native-tags"
import CustomButton from '../commons/CustomButton'
import Storage from '../../../app/utils/storage/storage'

const {width} = Dimensions.get('screen')

export default WaitRoom = ({route, navigation}) => {

  const {questID, teamID, userID} = route.params

  const url = Config.appUrl + "teams/waitrooms/" + teamID + "/quests/" + questID

  const urlTeam = Config.appUrl + "teams/" + teamID 


  const [playersAccepted, setPlayersAccepted] = useState([])
  const [playersTeam, setPlayersTeam] = useState([])

  const Player = ({player}) => {
    return (
      <View style={{marginTop: 5, height: 50, backgroundColor:'antiquewhite'}}>
        <Avatar.Image 
          source={{
            uri: 'https://img.olympicchannel.com/images/image/private/f_auto/t_1-1_300/primary/wfrhxc0kh2vvq77sonki'}}
            size={40}
            marginTop={5}
          />
        <Text style={{marginLeft: 60, fontSize: 20, marginTop: -35, color:'#a52a2a'}}>{player.name}</Text>
      </View>
    ) 
  }

  const CancelButton = ({text, onPress}) => {
    return (
      <Pressable 
        onPress={onPress} 
        style={styles.buttonContainer}>  
        <Text 
          style={styles.buttonText}>{text}</Text>
      </Pressable>
    )
  }

  const HandleCancel = () => {
    fetch(
      Config.appUrl+'teams/' + teamID + '/users/' + userID, {
      method: 'DELETE',      
      headers: { 'Content-Type': 'application/json'}
      })
    .then(navigation.navigate('Quest Navigator'))
  }

  const StartButton = ({text, onPress}) => {
    return (
      <Pressable 
        onPress={onPress} 
        style={[
          styles.startButtonContainer, 
          (playersAccepted.length == playersTeam.length) ? {backgroundColor: '#CA955C'} : {backgroundColor: 'wheat'}
        ]}>  
        <Text 
          style={styles.buttonText}>{text}</Text>
      </Pressable>
    )
  }

  useEffect(() => {    
    fetch(url)
    .then((response) => response.json())
    .then((json) => {
      setPlayersAccepted(json)
      })
    .catch((error) => console.error(error))
    .finally(()=>setLoading(false))
    }, [route])   

    useEffect(() => {    
      fetch(urlTeam)
      .then((response) => response.json())
      .then((json) => {
        setPlayersTeam(json)
        })
      .catch((error) => console.error(error))
      .finally(()=>setLoading(false))
      }, [route])   


  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Sala de Espera',
      headerTintColor: '#a52a2a',
      headerRight: () => (
        <Ionicons color='#a52a2a' name ='arrow-back' size={30} onPress={() => navigation.navigate('Quest Navigator')}/>
      ),
      headerSearchBarOptions: {
        placeholder: "Search",
      }
    })
  })

  return (
    <ScrollView style={styles.view}> 

      <ScrollView style={styles.containerWaitRoom}>
        <Text style={{marginTop: 10, marginLeft: 5, fontSize: 20, fontWeight: 'bold', color:'#a52a2a'}}>{'En espera (' + (playersAccepted.length > 0 ? playersAccepted.length: 0) + '/' + playersTeam.length +')'}</Text>
        <FlatList
          horizontal= {false}
          contentContainerStyle={{paddingLeft: 20, paddingVertical: 20}}
          showsHorizontalScrollIndicator = {false}
          data={playersAccepted}
          keyExtractor={(item, index) => item.id}
          renderItem={({item}) => <Player player={item}/>}>      
        </FlatList> 
      </ScrollView>

      <StartButton onPress={() => {
        if (playersAccepted.length == playersTeam.length ) {
          
        }
      }} text="Comenzar"/>   

      <CancelButton 
        onPress={() => {
          Alert.alert(
            "Abandonar grupo de busqueda?",
            "",
            [
              {
                text: "Cancelar",
                style: "Cancelar"
              },
              { text: "OK", onPress: () => {HandleCancel()} }
            ]
          );
      }}
        text="Cancelar"/>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#FFF9CA',
  },
  containerWaitRoom:{
    height: 600,
    backgroundColor: '#ffefd5',
    elevation: 5,
    marginTop:20,
    padding: 15, 
  },
  buttonContainer: {
    width: '50%',
    padding: 15,
    marginVertical: 5,
    marginLeft: 100,
    marginTop: 20,

    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#a52a2a'
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
  },  
  startButtonContainer: {
    width: '50%',

    padding: 15,
    marginVertical: 5,
    marginLeft: 100,
    marginTop: 20,

    alignItems: 'center',
    borderRadius: 5,
  },
});

