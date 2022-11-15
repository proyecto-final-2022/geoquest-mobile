import React, { useState, useEffect } from 'react';
import { StyleSheet, BackHandler, Alert, Modal, ActivityIndicator, Text, View, Dimensions, Image, Pressable, FlatList, TouchableOpacity, TextInput} from 'react-native';
import {Avatar} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native'
import {FontAwesome, Entypo, Ionicons, AntDesign} from '@expo/vector-icons'
import Config from '../../../config.json'
import CustomModal from '../commons/CustomModal';
import CustomButton2 from '../commons/CustomButton2'
import Storage from '../../../app/utils/storage/storage'

import userImage_1 from '../../../assets/userImages/userImage_1.png'
import userImage_2 from '../../../assets/userImages/userImage_2.png'
import userImage_3 from '../../../assets/userImages/userImage_3.png'
import userImage_4 from '../../../assets/userImages/userImage_4.png'
import userImage_5 from '../../../assets/userImages/userImage_5.png'
import userImage_6 from '../../../assets/userImages/userImage_6.png'
import userImage_7 from '../../../assets/userImages/userImage_7.png'
import userImage_8 from '../../../assets/userImages/userImage_8.png'
import userImage_9 from '../../../assets/userImages/userImage_9.png'

export default MultiplayerWaitRoom = ({route, navigation}) => {

  const {id, name, qualification, description, difficulty, duration, completions, image_url, tags, user} = route.params

  const [friends, setFriends] = useState([])
  const [userID, setUserID] = useState()

  //sendID field is for test if you wanna try invite yourself to make a group
  const sendID = 72 

  const url = Config.appUrl + "users/" + user.id + "/friends"

  useEffect(() => {
    Storage.getObject('user').
    then(user => setUserID(user.id))
    .catch((error) => console.error(error))

    setInvited([])
    setInvitedIDs([])
    fetch(url)
    .then((response) => {
      if (response.ok)
        response.json()
        .then((json) => {
          setFriends(json)
          setData(json)
          setFilteredData(json)
        })
        .catch((error) => console.error(error))
    })
  }, [route]) 

  const [view, setView] = useState(false)
  const [inviteView, setInviteView] = useState(false)
  const [cancel, setCancel] = useState([])
  const [invited, setInvited] = useState([])
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [invitedIDs, setInvitedIDs] = useState([])
  const [playerFriends, setplayerFriends] = useState(friends)

  const forwardToWaitRoom = (questID, teamID, userID) => {
    navigation.navigate('Wait Room', {questID, teamID, userID, rol: "host"})
  }

  const getUserImage = (imageNumber) => { 
    const userImages = [userImage_1, userImage_2, userImage_3, userImage_4, userImage_5, userImage_6, userImage_7, userImage_8, userImage_9];
    return userImages[imageNumber-1];
  }

  const sendNotification = async (senderID, senderName, senderImage, questName) => {
    console.log("InvitedIDs: ", invitedIDs)
    
    fetch(
      Config.appUrl+'teams/' + userID, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ 
        user_ids: [...invitedIDs, userID],
        quest_id: id})
      })
      .then(response => {
        if(!response.ok) throw new Error(response.status);
        else 
        response.json()
        .then(teamId => {
          invitedIDs.map((invited_id) => {
            //ONLY FOR TEST
            //senderID (url) -> user.id
            //sendID -> senderID
            fetch(Config.appUrl + "users/" + invited_id  + '/notifications', {
              method: 'POST',
              body: JSON.stringify({ 
                quest_name: questName,
                sender_id: senderID,
                sender_image: senderImage,
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
              .catch((error) => console.error(error))
            )
            .then(
            fetch(
              Config.appUrl+'quests/' + id + '/progressions/' + teamId, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json'},
              }).then(navigation.navigate("Game", {teamID: teamId}))
              .catch(error => console.log(error)))
            .then(
              Storage.getObject('user').then(user => forwardToWaitRoom(id, teamId, user.id)))
            .catch((error) => console.error(error))
          })
        })
        .catch((error) => {console.log('error: ' + error)});
      })
      .catch((error) => {console.log('error: ' + error)});
  }

  const Player = ({player}) => {
    return (
      <View style={{flex: 1, marginTop: 5, height: 50, backgroundColor:'antiquewhite', alignItems: 'center', flexDirection: 'row'}}>
        <View style={styles.invitedUserImage}>
          <Avatar.Image 
            source={getUserImage(player.image)}
            size={50}
            marginTop={5}
          />
        </View>
        <View style={styles.invitedUserText}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color:'#a52a2a'}}>{player.name}</Text>
        </View>
        
        <View style={styles.invitedUserCloseIcon}>
          <Pressable onPress={() => {
              setView(true)
              setCancel(player)}
            }>
            <AntDesign style={{color:'darkred'}} size={30} name ='closecircle'/> 
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
            source={getUserImage(player.image)}
            size={50}
            marginTop={5}/>
        </View>

        <View style={styles.addUserText}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color:'#a52a2a'}}>{player.name}</Text>
        </View>

        <View style={styles.addUserIcon}>
          <Pressable onPress={() => { 
            Alert.alert("Jugador añadido")
            setFilteredData(filteredData.filter((friend) => friend.id != player.id))
            setData(data.filter((friend) => friend.id != player.id))
            setInvited([...invited, player])
            //TEST
            //user.id -> player.id
            setInvitedIDs([...invitedIDs, player.id])
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


  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('Quest Visualizer', {id, name, qualification, description, difficulty, duration, completions, image_url, tags});
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress',onBackPress);
      return () => { BackHandler.removeEventListener('hardwareBackPress',onBackPress) };
    }, []),
  );

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
    <View style={styles.view}> 
      <CustomModal visible={view} dismiss={() => setView(false)}>
        <View style={{flex: 1}}></View>
        <View style={styles.customRemoveModal}>
          <View style={styles.closeButtonContainer}>
            <Pressable onPress={() => {setView(false)}}>
              <Ionicons name='close' color={'darkred'} size={35}/>
            </Pressable>
          </View>
            
          <View style={styles.textModal}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>{"Desea cancelar invitación de "+cancel.name+'?'}</Text>
          </View>

          <View style={styles.optionsContainer}>
            <View style={styles.options}>
              <Pressable onPress={() => {{
                  setView(false)
                  setFilteredData([cancel, ...filteredData])
                  setData([cancel, ...data])
                  setInvited(invited.filter((player) => player.id != cancel.id))
                  setInvitedIDs(invitedIDs.filter((id) => id != cancel.id))
                }}}>
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
        <View style={{flex: 3}}></View>
      </CustomModal>
      
      <CustomModal visible={inviteView} dismiss={() => setInviteView(false)}>
        <View style={styles.customModal}>
          <View style={styles.closeButtonContainer}>
            <Pressable onPress={() => {setInviteView(false)}}>
              <Ionicons name='close' color={'darkred'} size={30}/>
            </Pressable>
          </View>

          <View style={styles.searchContainer}>    
            <TextInput
              fontSize={20}
              placeholder={"Buscar..."}
              style={styles.textInput}
              onChangeText={(text) => filterSearch(text)}/>
          </View>
          
          <FlatList
            horizontal= {false}
            contentContainerStyle={{paddingHorizontal: 10}}
            showsHorizontalScrollIndicator = {false}
            data={filteredData}
            keyExtractor={(item, index) => index}
            renderItem={({item}) => <Friend player={item}/>}>      
          </FlatList> 
        </View>
      </CustomModal>

      <View style={styles.containerWaitRoom}>
        <View style={styles.containerWaitRoomHeader}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color:'#a52a2a'}}>Equipo ({invited.length})</Text>
          <FontAwesome name='users' size={35} style={{marginLeft: 10, color:'darkred'}} />
        </View>
        <FlatList
          horizontal= {false}
          contentContainerStyle={{paddingVertical: 20}}
          showsHorizontalScrollIndicator = {false}
          data={invited}
          keyExtractor={(item, index) => index}
          renderItem={({item}) => <Player player={item}/>}>      
        </FlatList> 
      </View>

      <View style={styles.teamButtonsContainer}>
        <CustomButton2 
          text ="Añadir amigos"
          onPress = {() => setInviteView(true)}
          icon = "person-add"
          bgColor= '#CA955C'
          fgColor='white'
          style={styles.buttonStyle}
          textStyle={styles.buttonTextStyle}
          iconStyle={styles.iconStyle}
        />

        <CustomButton2 
          text ="Comenzar"
          onPress = {() => {
            if (invited.length > 0) {    
              sendNotification(user.id, user.username, user.image, name)
            }
          }}
          icon = "arrow-forward-circle"
          bgColor= {(invited.length > 0) ? 'darkseagreen' : 'beige'}
          fgColor = 'white'
          style={styles.buttonStyle}
          textStyle={styles.buttonTextStyle}
          iconStyle={styles.iconStyle}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#FFF9CA',
  },
  customRemoveModal: {
    flex: 2,
    flexDirection: 'column',
    backgroundColor: '#ffefd5',
    margin: 30,
    borderWidth: 3,
    borderRadius:10,
    borderColor: '#CA955C',
  },
  customModal: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffefd5',
    margin: 10,
    borderWidth: 3,
    borderRadius:10,
    borderColor: '#CA955C',
    justifyContent: 'space-between',
  },
  containerWaitRoom:{
    flex: 3,
    backgroundColor: '#ffefd5',
    marginTop: 0,
    padding: 15, 
    elevation: 2,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  searchContainer: {
    marginTop: 0,
    flexDirection: 'row'
  },
  textInput: {
    marginHorizontal: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#CA955C',
    backgroundColor: 'white',
    flexBasis: 240,
    flexShrink: 1,
    flexGrow: 1,
  },
  containerWaitRoomHeader:{
    flexDirection: 'row'
  },
  closeButtonContainer: {
    flexDirection: 'row-reverse',
    padding: 5
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10
  },
  options: {
    padding: 20
    // justifyContent: 'flex-end',
    // flexBasis: 80,
    // flexShrink: 1,
    // flexGrow: 0
  },
  textModal: {
    alignItems: 'center',
    marginHorizontal: 10
    // flexBasis: 60,
    // flexShrink: 0,
    // flexGrow: 0
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
    marginLeft: 5,
    flexBasis: 140,
    flexShrink: 1,
    flexGrow: 1
  },
  invitedUserImage: {
    flex: 1
  },
  invitedUserText: {
    flex: 4,
    marginLeft: 5
  },
  invitedUserCloseIcon: {
    alignItems: 'flex-end',
    flex: 1, 
    marginRight: 10
  },
  teamButtonsContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10
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
  },
  buttonStyle: {
    width: '40%',
  },
  buttonTextStyle: {
    flexBasis: 200,
    flexShrink: 1,
    flexGrow: 1
  },
  iconStyle: {
    flexBasis: 100,
    flexShrink: 1,
    flexGrow: 1
  }
});

