import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, TextInput, Alert, Modal, ActivityIndicator, Text, View, Dimensions, Image, Pressable, FlatList, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native'
import {FontAwesome, Entypo, Ionicons, AntDesign} from '@expo/vector-icons'
import CustomInput from '../../components/commons/CustomInput'
import CustomButton2 from '../commons/CustomButton2'
import Config from '../../../config.json'
import Tags from "react-native-tags"
import CustomButton from '../commons/CustomButton'
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
  const [data, setData] = useState([])
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


  useEffect(() => {
    setInvitedIDs([])
    Storage.getObject('user').then(user => setUser(user))
    fetch(url)
    .then((response) => response.json())
    .then((json) => setData(json))
    .catch((error) => console.error(error))
    .catch((error) => console.error(error))
    
  }, [route])

  const sendID = 72 

  const getUserImage = (imageNumber) => { 
    const userImages = [userImage_1, userImage_2, userImage_3, userImage_4, userImage_5, userImage_6, userImage_7, userImage_8, userImage_9];
    return userImages[imageNumber-1];
   }


  const sendNotification = (friend) => {
    //sendID -> friend.id
    fetch(Config.appUrl + "users/" + sendID + '/notifications', {
      method: 'POST',
      body: JSON.stringify({ 
      sender_id: user.id,
      type: 'friend_request'
    })
    })
    .catch((error) => console.error(error))
    .then(
      fetch(Config.appNotificationsUrl + "notifications/friend_request", {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'},
        body: JSON.stringify({ 
          sender_name: user.username,
          sender_id: user.id
        }) 
      })
      )
    .catch((error) => console.error(error))
  }

  const Friend = ({friend}) => {
    return (
      <View style={{marginTop: 5, height: 70, backgroundColor:'antiquewhite', alignItems: 'center', flexDirection: 'row'}}>
        <View style={styles.friendProfilePicture}>
          <Avatar.Image 
            source={getUserImage(friend.image)}
            size={50}
            marginTop={5}
          />
        </View>
				<View style={styles.userInfoContainer}>
					<Text style={{fontSize: 20, fontWeight: 'bold', color:'#a52a2a'}}>{friend.name}</Text>
					<Text style={{fontSize: 15, color:'#a52a2a'}}>{friend.email}</Text>
        </View>
        <View style={styles.friendAddIcon}>
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
                    sendNotification(friend)} }
                ]
              );

          }
            }
          >
						<AntDesign style={{color:'darkgreen'}} size={35} name ='adduser'/>  
          </Pressable>
        </View>              

      </View>
    ) 
  }

	const filterSearch = (text, friendIDs) => {
    if (text) {
    const newData = data.filter((search) => 
    !(invitedIDs.includes(search.id) || friendIDs.includes(search.id) || user.id == search.id)
    ).filter((user) => {
      const userData = user.name ? user.name.toUpperCase() : ''.toUpperCase()
      const textData = text.toUpperCase()
      return userData.indexOf(textData) > -1
    })
    setFilteredData(newData)
    } else {
    setFilteredData("")
    } 
  }


  return (
    <ScrollView style={styles.view}>
      <View style={styles.container}> 
					<View style={styles.searchContainer}>
						<View style={styles.searchContainerText}>
					  	<TextInput
								fontSize={20}
//            	value={value}
								onChangeText={(text) => setText(text)}
   //         	onBlur={onBlur}
            		placeholder={"Buscar..."}
     //       	style={styles.input}  
  	        	/>
						</View>
					
						<View style={styles.searchContainerIcon}>
							<Ionicons color='#a52a2a' name ='search-circle' size={40} onPress={() => 
                {
                  var friendIDs = []
                  friends.forEach((friend) => friendIDs.push(friend.id))
                  filterSearch(text, friendIDs)}
                }/>
						</View>
				
 	        
					</View>

        <FlatList
          horizontal= {false}
          contentContainerStyle={{
            backgroundColor: '#ffefd5',
            paddingVertical: 10}}
          showsHorizontalScrollIndicator = {false}
          data={filteredData}
          keyExtractor={(item, index) => item.id}
          renderItem={({item}) => <Friend friend={item}/>}>      
        </FlatList>
        
      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#FFF9CA',
  },
  container:{
    flexDirection: 'column',
    alignItems: 'center',
    height: 650,
  },
  containerHeader:{
    paddingVertical: 10,
    backgroundColor: '#FFF9CA',
    flexDirection: 'row',
  },
  containerHeaderIcon:{
    flexBasis: 50,
    flexShrink: 0,
    flexGrow: 0,
  },
  containerHeaderText:{
    flexBasis: 320,
    flexShrink: 0,
    flexGrow: 0
  },
  friendProfilePicture: {
    flexBasis: 50,
    flexShrink: 0,
    flexGrow: 0
  },
  friendUsernameText: {
    flexBasis: 300,
    flexShrink: 0,
    flexGrow: 0
  },
  friendAddIcon: {
    flexBasis: 40,
    flexShrink: 0,
    flexGrow: 0
  },
	searchContainer: {
		flexDirection: 'row',
		height: 40,
		marginTop: 20
  },
	searchContainerText: {
		flexBasis: 300,
		backgroundColor: 'white',
		marginLeft: 10,
    flexShrink: 0,
    flexGrow: 1
  },
	searchContainerIcon: {
		flexBasis: 10,
    flexShrink: 0,
    flexGrow: 1
  },
	userInfoContainer: {
		flexDirection: 'column',
		marginLeft: 10,
		flexBasis: 300,
    flexShrink: 0,
    flexGrow: 0
	}

});