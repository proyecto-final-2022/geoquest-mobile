import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Alert, Modal, ActivityIndicator, Text, View, Dimensions, Image, Pressable, FlatList, TouchableOpacity, TextInput} from 'react-native';
import {Avatar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native'
import {FontAwesome, Entypo, Ionicons, AntDesign} from '@expo/vector-icons'
import Config from '../../../config.json'
import Tags from "react-native-tags"
import CustomButton from '../commons/CustomButton'
import IconButton from '../commons/IconButton'
import CustomButton2 from '../commons/CustomButton2'
import Storage from '../../../app/utils/storage/storage'

const {width} = Dimensions.get('screen')

export default MultiplayerWaitRoom = ({route, navigation}) => {

  const {id, name, qualification, description, difficulty, duration, completions, image_url, tags} = route.params

  //sendID field is for test if you wanna try invite yourself to make a group
  const sendID = 72 
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
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [invitedIDs, setInvitedIDs] = useState([])
  const [playerFriends, setplayerFriends] = useState(friends)

  const forwardToWaitRoom = (questID, teamID, userID) => {
    navigation.navigate('Wait Room', {questID, teamID, userID})
  }

  useEffect(() => {
    setData(friends)
    setFilteredData(friends)}, [route])

  const sendNotification = async (senderID, senderName, questName) => {
  
    fetch(
      Config.appUrl+'teams/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ 
        user_ids: invitedIDs,
        quest_id: id})
      })
      .then(response => {
        if(!response.ok) throw new Error(response.status);
        else 
        response.json().then(teamId => 
          {
            invited.map((user) => {
              //sendID -> user.id
              fetch(Config.appUrl + "users/" + sendID  + '/notifications', {
                method: 'POST',
                body: JSON.stringify({ 
                quest_name: questName,
                sender_id: senderID,
                quest_id: id,
                team_id: teamId,
                type: 'quest_invite'
              })
              })
              .then(
                fetch(Config.appNotificationsUrl + "notifications/quest_invite", {
                  method: 'POST',
                  headers: { 
                    'Content-Type': 'application/json'},
                  body: JSON.stringify({ 
                    sender_name: senderName
                  }) 
                })
              )
              .then(
                Storage.getObject('user').then(user => forwardToWaitRoom(id, teamId, user.id)))
              .catch((error) => console.error(error))
            })
        })
        .catch((error) => {console.log('error: ' + error)});
        })
        .catch((error) => {console.log('error: ' + error)});
    }
    

  const Button = ({text, onPress}) => {
    return (
      <Pressable 
        onPress={onPress} 
        style={styles.button}>  
        <Text 
          style={styles.buttonText}>{text}</Text>
      </Pressable>
    )
  }

  const StartButton = ({text, onPress}) => {
    return (
      <IconButton
        onPress={onPress}
        icon={'arrow-forward-circle'}
        bgColor={(invited.length > 1) ? 'darkseagreen' : 'lightgreen'}>
      </IconButton>
    )
  }

  const Player = ({player}) => {
    return (
      <View style={{marginTop: 5, height: 50, backgroundColor:'antiquewhite', alignItems: 'center', flexDirection: 'row'}}>
        <View style={styles.invitedUserImage}>
          <Avatar.Image 
            source={{
            uri: 'https://img.olympicchannel.com/images/image/private/f_auto/t_1-1_300/primary/wfrhxc0kh2vvq77sonki'}}
            size={40}
            marginTop={5}
          />
        </View>
        <View style={styles.invitedUserText}>
          <Text style={{fontSize: 20, color:'#a52a2a'}}>{player.name}</Text>
        </View>
        
        <View style={styles.invitedUserCloseIcon}>
          <Pressable onPress={() => 
            {
            setView(true)
            setCancel(player)}
            }
          >
            <AntDesign style={{color:'darkred'}} size={25} name ='closecircle'/> 
          </Pressable>
        </View>              

      </View>
    ) 
  }

  const Friend = ({player}) => {
    return (
      <View style={{marginTop: 5, height: 50, backgroundColor:'azure', alignItems: 'center', flexDirection: 'row'}}>
        <View style={styles.addUserImage}>
          <Avatar.Image 
            source={{
            uri: 'https://img.olympicchannel.com/images/image/private/f_auto/t_1-1_300/primary/wfrhxc0kh2vvq77sonki'}}
            size={40}
          />
        </View>

        <View style={styles.addUserText}>
          <Text style={{fontSize: 20, color:'#a52a2a'}}>{player.name}</Text>
        </View>

        <View style={styles.addUserIcon}>
          <Pressable onPress={() => { 
           Alert.alert("Jugador añadido")
            setFilteredData(filteredData.filter((friend) => friend.id != player.id))
            setData(data.filter((friend) => friend.id != player.id))
            setInvited([...invited, player])
          //cambiarlo por player.id
           setInvitedIDs([...invitedIDs, sendID])
         }}>
         <AntDesign style={{color:'black'}} size={35} name ='adduser'/>       
        </Pressable>
        </View> 
    </View>
    ) 
  }

  const filterSearch = (text) => {

    if (text) {
    const newData = data.filter((user) => {
      const userData = user.name ? user.name.toUpperCase() : ''.toUpperCase()
      const textData = text.toUpperCase()
      return userData.indexOf(textData) > -1
    })
    setFilteredData(newData)
    } else {
    setFilteredData(data)
    } 
  }


  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Formar Equipo',
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
            height:'25%', 
            width: '80%',
            backgroundColor: 'aliceblue',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderWidth: 10,
            borderColor: '#a52a2a', 
            }}  
        >
          <View style={styles.closeButtonContainer}>
            <Pressable onPress={() => {setView(false)}}>
              <Ionicons name='close' color={'darkred'} size={35}/>
            </Pressable>
          </View>
          
          <View style={styles.textModal}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>{"Desea cancelar invitación"}</Text>  
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>{"de " + cancel.name + '?'}</Text>
          </View>

          <View style={styles.optionsContainer}>


          <View style={styles.options}>
            <Pressable onPress={() => {
              {
              setView(false)
              setFilteredData([cancel, ...filteredData])
              setData([cancel, ...data])
              setInvited(invited.filter((player) => player.id != cancel.id))
              setInvitedIDs(invitedIDs.filter((id) => id != cancel.id))
              }
            }}>
              <Text style={{fontSize: 20, color: 'green', fontWeight: 'bold'}}>Aceptar</Text>  
            </Pressable>
          </View>

            <View style={styles.options}>
            <Pressable onPress={() => {setView(false)}}>
              <Text style={{fontSize: 20, color: 'darkred', fontWeight: 'bold'}}>Volver</Text>     
            </Pressable>
            </View>

          </View>

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
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderWidth: 10,
            borderColor: '#a52a2a', 
            }}  
        >
          <View style={styles.closeButtonContainer}>
            <Pressable onPress={() => {setInviteView(false)}}>
              <Ionicons name='close' color={'darkred'} size={30}/>
            </Pressable>
          </View>

          <View style={styles.searchContainer}>    
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => filterSearch(text)}/>
          </View>
         
          <FlatList
            horizontal= {false}
            contentContainerStyle={{paddingLeft: 10}}
            showsHorizontalScrollIndicator = {false}
            data={filteredData}
            keyExtractor={(item, index) => item.id}
            renderItem={({item}) => <Friend player={item}/>}>      
          </FlatList> 

        </View>
      </View>
    </Modal>

    <ScrollView style={styles.containerWaitRoom}>
      <View style={styles.containerWaitRoomHeader}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color:'#a52a2a'}}>Equipo</Text>
        <FontAwesome name='users' size={35} style={{marginLeft: 10, color:'darkred'}} />
      </View>
      <FlatList
        horizontal= {false}
        contentContainerStyle={{paddingVertical: 20}}
        showsHorizontalScrollIndicator = {false}
        data={invited}
        keyExtractor={(item, index) => item.id}
        renderItem={({item}) => <Player player={item}/>}>      
      </FlatList> 
    </ScrollView>

    <View style={styles.teamButtonsContainer}>
      <CustomButton2 
        text ="Añadir"
        onPress = {() => setInviteView(true)}
        icon = "person-add"
        bgColor= '#CA955C'
        fgColor='white'
      />

      <StartButton onPress={() => {
        if (invited.length > 1) {
          Storage.getObject('user')
          .then(user => 
          {
          sendNotification(user.id, user.username, name)
          }
          )
        }
      }}/>      
    </View>
    
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
    marginTop:20,
    padding: 15, 
  },
  searchContainer: {
    marginTop: 5,
    flexDirection: 'row'
  },
  textInput: {
    flexBasis: 275,
    flexShrink: 0,
    flexGrow: 0,
    borderWidth: 1,
    borderColor: '#a52a2a',
    backgroundColor: 'white',
  },
  containerWaitRoomHeader:{
    flexDirection: 'row'
  },
  closeButtonContainer: {
    flexDirection: 'row-reverse'
  },
  optionsContainer: {
    flexDirection: 'row-reverse'
  },
  options: {
    justifyContent: 'flex-end',
    flexBasis: 80,
    flexShrink: 1,
    flexGrow: 0
  },
  textModal: {
    alignItems: 'center',
    flexBasis: 60,
    flexShrink: 0,
    flexGrow: 0
  },
  addUserIcon: {
    flexBasis: 50,
    flexShrink: 0,
    flexGrow: 0
  },
  addUserImage: {
    flexBasis: 50,
    flexShrink: 0,
    flexGrow: 0
  },
  addUserText: {
    flexBasis: 200,
    flexShrink: 0,
    flexGrow: 0
  },
  invitedUserImage: {
    flexBasis: 50,
    flexShrink: 0,
    flexGrow: 0
  },
  invitedUserText: {
    flexBasis: 300,
    flexShrink: 0,
    flexGrow: 0
  },
  invitedUserCloseIcon: {
    flexBasis: 50,
    flexShrink: 0,
    flexGrow: 0
  },
  teamButtonsContainer: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
  },
  button: {
    width: '50%',
    padding: 15,
    marginTop: 20,
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#CA955C'
  }  
});

