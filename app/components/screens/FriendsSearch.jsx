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
  
  const [data, setData] = useState([])
	const [text, setText] = useState('')
	const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Buscar Amigos',
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
    setData(friends)
  }, [route])

  const sendID = 72 
  const friends = [
    {id: 1, name: "string", username: "string", email: "string", image:1},
    {id: 2, name: "string2", username: "string2", email: "string2", image:2},
    {id: 3, name: "string3", username: "string3", email: "string3", image:3},
    {id: 4, name: "string4", username: "string4", email: "string4", image:4},
    {id: 5, name: "string5", username: "string5", email: "string5", image:5},
    {id: 6, name: "string6", username: "string6", email: "string6", image:6},
    {id: 7, name: "string7", username: "string7", email: "string7", image:7},
    {id: 8, name: "string8", username: "string8", email: "string8", image:8},
    {id: 9, name: "string9", username: "string9", email: "string9", image:9},
    {id: 10, name: "string10", username: "string", email: "string", image:1}
  ]

  const getUserImage = (imageNumber) => { 
    const userImages = [userImage_1, userImage_2, userImage_3, userImage_4, userImage_5, userImage_6, userImage_7, userImage_8, userImage_9];
    return userImages[imageNumber-1];
   }

  const Friend = ({friend}) => {
    return (
      <View style={{marginTop: 5, height: 50, backgroundColor:'antiquewhite', alignItems: 'center', flexDirection: 'row'}}>
        <View style={styles.friendProfilePicture}>
          <Avatar.Image 
            source={getUserImage(friend.image)}
            size={40}
            marginTop={5}
          />
        </View>
        <View style={styles.friendUsernameText}>
          <Text style={{fontSize: 20, color:'#a52a2a'}}>{friend.name}</Text>
        </View>
        
        <View style={styles.friendDeleteIcon}>
          <Pressable onPress={() => 
            {
            setView(true)
            setCancel(friend)}
            }
          >
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
							<Ionicons color='#a52a2a' name ='search-circle' size={40} onPress={() => filterSearch(text)}/>
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
  friendDeleteIcon: {
    flexBasis: 50,
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

});
