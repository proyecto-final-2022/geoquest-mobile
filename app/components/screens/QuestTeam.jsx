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

export default MultiplayerWaitRoom = ({route, navigation}) => {

  const {id, name, qualification, description, difficulty, duration, completions, image_url, tags} = route.params

  const friends = [
    {id: 1, name: "string", username: "string", email: "string"},
    {id: 2, name: "string2", username: "string2", email: "string2"},
    {id: 3, name: "string3", username: "string3", email: "string3"},
    {id: 4, name: "string4", username: "string4", email: "string4"},
    {id: 5, name: "string5", username: "string5", email: "string5"},
    {id: 6, name: "string6", username: "string6", email: "string6"},
    {id: 7, name: "string7", username: "string7", email: "string7"},
    {id: 8, name: "string8", username: "string8", email: "string8"},
    {id: 9, name: "string9", username: "string9", email: "string9"},
    {id: 10, name: "string10", username: "string10", email: "string10"},
    {id: 11, name: "string11", username: "string11", email: "string11"},
    {id: 12, name: "string12", username: "string12", email: "string12"},
  ]

  const [view, setView] = useState(false)
  const [inviteView, setInviteView] = useState(false)
  const [cancel, setCancel] = useState([])
  const [invited, setInvited] = useState([])
  const [accepted, setAccepted] = useState([])
  const [playerFriends, setplayerFriends] = useState(friends)

  const addInvited = (newInvited) => {
    return (      
      setInvited([...invited, newInvited])
    )
  }

  const addAccepted = (newAccepted) => {
    return (      
      setAccepted([...accepted, newAccepted])
    )
  }

  const sendNotification = async (receiverID, senderID, senderName, questName) => {
    fetch(Config.appNotificationsUrl + "notifications/quest_invite", {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'},
      body: JSON.stringify({ 
        sender_name: senderName
      }) 
    })
    .then(fetch(Config.appUrl + "users/" + receiverID  + '/notifications', {
      method: 'POST',
      body: JSON.stringify({ 
      team_id: 64,
      quest_name: questName,
      sender_id: senderID,
      type: 'quest_invite'
    })
    })
    .catch((error) => console.error(error))
    )
    .catch((error) => console.error(error))
    }
    

  const Button = ({text, onPress}) => {
    return (
      <Pressable 
        onPress={onPress} 
        style={styles.buttonContainer}>  
        <Text 
          style={styles.buttonText}>{text}</Text>
      </Pressable>
    )
  }

  const StartButton = ({text, onPress}) => {
    return (
      <Pressable 
        onPress={onPress} 
        style={[
          styles.startButtonContainer, 
          (invited.length > 1) ? {backgroundColor: '#CA955C'} : {backgroundColor: 'wheat'}
        ]}>  
        <Text 
          style={styles.buttonText}>{text}</Text>
      </Pressable>
    )
  }

  const Player = ({player}) => {
    return (
      <View style={{marginTop: 5, height: 50, backgroundColor:'antiquewhite'}}>
        <Avatar.Image 
          source={{
            uri: 'https://img.olympicchannel.com/images/image/private/f_auto/t_1-1_300/primary/wfrhxc0kh2vvq77sonki'}}
            size={40}
            marginTop={5}
          />
        <Pressable onPress={() => 
          {
            setView(true)
            console.log(player.id)
            setCancel(player)}
          }
        >
        <AntDesign style={{color:'black', marginLeft: 320, marginTop:-30}} size={25} name ='closecircle'/> 
        <Text style={{marginLeft: 60, fontSize: 20, marginTop: -30, color:'#a52a2a'}}>{player.name}</Text>
        </Pressable>       
      </View>
    ) 
  }

  const Friend = ({player}) => {
    return (
      <View style={{marginTop: 5, height: 50, backgroundColor:'azure'}}>
        <Avatar.Image 
          source={{
            uri: 'https://img.olympicchannel.com/images/image/private/f_auto/t_1-1_300/primary/wfrhxc0kh2vvq77sonki'}}
            size={40}
            marginTop={5}
          />
        <Pressable onPress={() => 
        { 
          Alert.alert("Jugador invitado")
          setplayerFriends(playerFriends.filter((friend) => friend.id != player.id))
          setInvited([...invited, player])
        }}>
          <AntDesign style={{color:'black', marginLeft: 250, marginTop: -30}} size={25} name ='adduser'/>       
          <Text style={{marginLeft: 60, fontSize: 20, marginTop: -30, color:'#a52a2a'}}>{player.name}</Text>
        </Pressable> 
      </View>
    ) 
  }

  const AcceptedPlayers = ({player}) => {
    return (
      <View style={{marginTop: 5, height: 50, backgroundColor:'antiquewhite'}}>
        <Avatar.Image 
          source={{
            uri: 'https://img.olympicchannel.com/images/image/private/f_auto/t_1-1_300/primary/wfrhxc0kh2vvq77sonki'}}
            size={40}
            marginTop={5}
          />
          <Text style={{marginLeft: 60, fontSize: 20, marginTop: -30, color:'#a52a2a'}}>{player.name}</Text>
      </View>

    ) 
  }

  
  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Armar Grupo',
      headerTintColor: '#a52a2a',
      headerRight: () => (
        <Ionicons color='#a52a2a' name ='arrow-back' size={30} onPress={() => navigation.navigate('Quest Visualizer', {id, name, qualification, description, difficulty, duration, completions, image_url, tags})}/>
      ),
      headerSearchBarOptions: {
        placeholder: "Search",
      }
    })
  })

  return (
    <ScrollView style={styles.view}> 
      <Modal
        animationType="slide"
        transparent
        visible={view}
      >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            height:'30%', 
            width: '80%',
            backgroundColor: 'aliceblue',
            borderWidth: 10,
            borderColor: '#a52a2a', 
            }}  
        >
          <Pressable onPress={() => {setView(false)}}>
            <Ionicons name='close' size={35} style={{marginLeft:270}}/>
          </Pressable>

          <Text style={{marginLeft: 60, fontSize: 20, fontWeight: 'bold'}}>{"   Desea cancelar invitación de " + cancel.name + "?"}</Text>  

          <Pressable onPress={() => {
            {
            setView(false)
            setplayerFriends([cancel, ...playerFriends])
            setAccepted(accepted.filter((player) => player.id != cancel.id))
            setInvited(invited.filter((player) => player.id != cancel.id))
            }
          }}>
            <Text style={{marginTop: 50, marginLeft: 60, fontSize: 20}}>Aceptar</Text>  
          </Pressable>
          <Pressable onPress={() => {setView(false)}}>
            <Text style={{fontSize: 20, marginLeft: 200, marginTop: -30}}>Volver</Text>     
          </Pressable>

        </View>
      </View>
    </Modal>

    <Modal
        animationType="slide"
        transparent
        visible={inviteView}
      >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            height:'70%', 
            width: '80%',
            backgroundColor: 'aliceblue',
            borderWidth: 10,
            borderColor: '#a52a2a', 
            }}  
        >
          <Pressable onPress={() => {setInviteView(false)}}>
            <Ionicons name='close' size={35} style={{marginLeft:270}}/>
          </Pressable>

          <Text style={{marginLeft: 60, fontSize: 20, fontWeight: 'bold'}}>Sumar amigo</Text>  
          
          <FlatList
            horizontal= {false}
            contentContainerStyle={{paddingLeft: 20, paddingVertical: 20}}
            showsHorizontalScrollIndicator = {false}
            data={playerFriends}
            keyExtractor={(item, index) => item.id}
            renderItem={({item}) => <Friend player={item}/>}>      
          </FlatList> 

        </View>
      </View>
    </Modal>

      <ScrollView style={styles.containerWaitRoom}>
        <Text style={{marginTop: 10, marginLeft: 5, fontSize: 20, fontWeight: 'bold', color:'#a52a2a'}}>Jugadores</Text>
        <FlatList
          horizontal= {false}
          contentContainerStyle={{paddingLeft: 20, paddingVertical: 20}}
          showsHorizontalScrollIndicator = {false}
          data={invited}
          keyExtractor={(item, index) => item.id}
          renderItem={({item}) => <Player player={item}/>}>      
        </FlatList> 
        <Text style={{marginTop: 10, marginLeft: 5, fontSize: 20, fontWeight: 'bold', color:'#a52a2a'}}>Jugadores aceptados</Text>
        <FlatList
          horizontal= {false}
          contentContainerStyle={{paddingLeft: 20, paddingVertical: 20}}
          showsHorizontalScrollIndicator = {false}
          data={accepted}
          keyExtractor={(item, index) => item.id}
          renderItem={({item}) => <AcceptedPlayers player={item}/>}>      
        </FlatList> 
      </ScrollView>

      <Button onPress={() => {setInviteView(true)}} text="Sumar jugador"/>
      <StartButton onPress={() => {
        Storage.getObject('user')
        .then(user => 
          {
          sendNotification(user.id, user.id, user.name, name)}
          )

      }} text="Formar Grupo"/>      

      <StartButton text="Comenzar"/>

      <Button onPress={() => {
        setInvited([])
        setAccepted([])
        }} text="Limpiar"/>

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
    backgroundColor: '#CA955C'
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
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
  },  
});

