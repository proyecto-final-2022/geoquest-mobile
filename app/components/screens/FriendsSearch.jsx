import React, { useState, useEffect } from 'react';
import { StyleSheet, BackHandler, TextInput, Alert, ActivityIndicator, Text, View, Dimensions, Pressable, FlatList} from 'react-native';
import {Avatar} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native'
import {Ionicons, AntDesign} from '@expo/vector-icons'
import Config from '../../../config.json'
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

const {width} = Dimensions.get('screen')

export default FriendsSearch = ({route, navigation}) => {

  const {friends} = route.params

  const [user, setUser] = useState([])
  const [dbUsers, setData] = useState([])
  const [invitedIDs, setInvitedIDs] = useState([])
	const [text, setText] = useState('')
	const [filteredData, setFilteredData] = useState([])

  const url = Config.appUrl + "users/" 
  var ids = [] 

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Buscar Amigos',
      headerTintColor: '#a52a2a',
      headerRight: () => (
        <Ionicons color='#a52a2a' name ='arrow-back' size={30} onPress={() => navigation.navigate('Friends List', user)}/>
      ),
      headerSearchBarOptions: {
        placeholder: "Search",
      }
    })
  })

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Storage.getObject('user').then(user => navigation.navigate('Friends List', user))
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress',onBackPress);
      return () => { BackHandler.removeEventListener('hardwareBackPress',onBackPress) };
    }, []),
  );

  useEffect(() => {
    setInvitedIDs([])
    Storage.getObject('user').then(user => setUser(user))
    fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
    .then((json) => setData(json))
    .catch((error) => console.error(error))
    
  }, [route])

  const sendID = 72 

  const getUserImage = (imageNumber) => { 
    const userImages = [userImage_1, userImage_2, userImage_3, userImage_4, userImage_5, userImage_6, userImage_7, userImage_8, userImage_9];
    return userImages[imageNumber-1];
  }

//NOTIF1
  const sendNotification = (friend) => {
    //sendID -> friend.id
    fetch(Config.appUrl + "users/" + friend.id + '/notifications', {
      method: 'POST',
      body: JSON.stringify({ 
        sender_id: user.id,
        type: 'friend_request'
      })
    })
    .catch((error) => console.error(error))
  }

  const Friend = ({friend}) => {
    return (
      <View style={{flex: 1, marginTop: 5, height: 70, backgroundColor:'antiquewhite', alignItems: 'center', flexDirection: 'row'}}>
        <View style={{flex: 1, marginLeft: 5}}>
          <Avatar.Image 
            source={getUserImage(friend.image)}
            size={50}
            marginTop={5}
          />
        </View>
				<View style={{flex: 6, marginLeft: 20}}>
					<Text style={{fontSize: 20, fontWeight: 'bold', color:'#a52a2a'}}>{friend.name}</Text>
					<Text style={{fontSize: 15, color:'#a52a2a'}}>{friend.email}</Text>
        </View>
        <View style={{flex: 1}}>
          <Pressable onPress={() => 
              {
                Alert.alert(
                  "Enviar solicitud de amistad a " + friend.username +" ?",
                  "",
                  [
                    {
                      text: "Cancel",
                      style: "cancel"
                    },
                    { text: "OK", onPress: () => {          
                      setFilteredData(filteredData.filter((user) => user.id != friend.id))  
                      setInvitedIDs([...invitedIDs, friend.id])
                      sendNotification(friend)}
                    }
                  ]
                );
              }}>
						<AntDesign style={{color:'darkgreen'}} size={35} name ='adduser'/>  
          </Pressable>
        </View>
      </View>
    ) 
  }

	const filterSearch = (text, friendIDs) => {
    if(text) {
      setFilteredData(
        dbUsers
        .filter((dbUser) => {
          const userData = dbUser.name ? dbUser.name.toUpperCase() : ''
          return userData.indexOf(text.toUpperCase()) > -1 && !(invitedIDs.includes(dbUser.id) || friendIDs.includes(dbUser.id) || user.id == dbUser.id)
        })
      )
    } else {
      setFilteredData("")
    }
  }


  return (
    <View style={styles.view}>
      <View style={{backgroundColor:'antiquewhite', alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'row'}}>
        <View style={{flex: 1, marginLeft: 5, backgroundColor: 'white'}}>
          <TextInput
            fontSize={20}
            //value={value}
            onChangeText={(newText) => {
              setText(newText)
              var friendIDs = []
              friends.forEach((friend) => friendIDs.push(friend.id))
              filterSearch(newText, friendIDs)
            }}
            //onBlur={onBlur}
            placeholder={"Buscar..."}
            //style={styles.input}  
          />
        </View>
      
        <View>
          <Ionicons color='#a52a2a' name ='search-circle' size={40} onPress={() => {
              var friendIDs = []
              friends.forEach((friend) => friendIDs.push(friend.id))
              filterSearch(text, friendIDs)
            }}/>
        </View>
      </View>

      <FlatList
        horizontal= {false}
        contentContainerStyle={{
          backgroundColor: '#ffefd5',
          paddingVertical: 5}}
        showsHorizontalScrollIndicator = {true}
        data={filteredData}
        keyExtractor={(item, index) => index}
        renderItem={({item}) => <Friend friend={item}/>}>      
      </FlatList>
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#FFF9CA',
    flexDirection: 'column',
    height: 650,
  }
});
