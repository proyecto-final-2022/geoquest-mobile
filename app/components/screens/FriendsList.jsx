import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Alert, Modal, ActivityIndicator, Text, View, Dimensions, Image, Pressable, FlatList, TouchableOpacity, TextInput} from 'react-native';
import {Avatar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native'
import {FontAwesome, Entypo, Ionicons, AntDesign} from '@expo/vector-icons'
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

export default FriendsList = ({route, navigation}) => {
  
  const userID = route.params

  const [friends, setFriends] = useState([])
  const [friendIDs, setFriendIDs] = useState([])
  const [loading, setLoading] = useState(true)
  
  const url = Config.appUrl + "users/" + userID + "/friends"

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Amigos',
      headerTintColor: '#a52a2a',
      headerRight: () => (
        <Ionicons color='#a52a2a' name ='arrow-back' size={30} onPress={() => navigation.navigate('Quest Navigator')}/>
      ),
      headerSearchBarOptions: {
        placeholder: "Search",
      }
    })
  })

  useEffect(() => {
    console.log("hola")
    fetch(url)
    .then((response) => response.json())
    .then((json) => setFriends(json))
    .catch((error) => console.error(error))
    .finally(()=>setLoading(false))
    .catch((error) => console.error(error))
  }, [route])


  const getUserImage = (imageNumber) => { 
    const userImages = [userImage_1, userImage_2, userImage_3, userImage_4, userImage_5, userImage_6, userImage_7, userImage_8, userImage_9];
    return userImages[imageNumber-1];
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

        <View style={styles.friendDeleteIcon}>
          <Pressable onPress={() => 
            {
            console.log(friend.id)}
            }
          >
            <AntDesign style={{color:'darkred'}} size={30} name ='closecircle'/> 
          </Pressable>
        </View>              

      </View>
    ) 
  }

  return (
    <ScrollView style={styles.view}>
      <View style={styles.container}> 
        <View style={styles.containerHeader}>
          <View style={styles.containerHeaderIcon}>
            <FontAwesome name='users' size={35} style={{color:'darkred'}} />
          </View>
          <View style={styles.containerHeaderText}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color:'#a52a2a'}}>{friends.length}</Text>
          </View>
        </View>
      
        <FlatList
          horizontal= {false}
          contentContainerStyle={{
            backgroundColor: '#ffefd5',
            paddingVertical: 5}}
          showsHorizontalScrollIndicator = {false}
          data={friends}
          keyExtractor={(item, index) => item.id}
          renderItem={({item}) => <Friend friend={item}/>}>      
        </FlatList>

        <CustomButton2 
          text ="Buscar"
          onPress={() => 
          {
            
            navigation.navigate('Friends Search', {friends})
          }}
          icon = "search-outline"
          bgColor= '#CA955C'
          fgColor='white'
        />
        
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
  friendDeleteIcon: {
    flexBasis: 50,
    flexShrink: 0,
    flexGrow: 0
  },
  userInfoContainer: {
		flexDirection: 'column',
		marginLeft: 10,
		flexBasis: 280,
    flexShrink: 0,
    flexGrow: 0
	}

});

