import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert, BackHandler, Text, View, Dimensions, FlatList} from 'react-native';
import {Avatar} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native'
import {Ionicons} from '@expo/vector-icons'
import Config from '../../../config.json'
import CustomButton2 from '../commons/CustomButton2'

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

export default WaitRoom = ({route, navigation}) => {

  const {questID, teamID, userID} = route.params

  const url = Config.appUrl + "teams/waitrooms/" + teamID + "/quests/" + questID

  const urlTeam = Config.appUrl + "teams/" + teamID 


  const [playersAccepted, setPlayersAccepted] = useState([])
  const [playersTeam, setPlayersTeam] = useState([])

  const Player = ({player}) => {
    return (
      <View style={{marginTop: 5, height: 50, flexDirection: 'row', alignItems: 'center', backgroundColor:'antiquewhite'}}>
        <View style={styles.waitUserImage}>
          <Avatar.Image 
            source={
              getUserImage(player.image)}
              size={50}
              marginTop={5}
            />
        </View>
        <View style={styles.waitUserText}>
          <Text style={{color:'#a52a2a', fontSize: 20, fontWeight: 'bold'}}>{player.name}</Text>
        </View>
      </View>
    ) 
  }
 
  const getUserImage = (imageNumber) => { 
    const userImages = [userImage_1, userImage_2, userImage_3, userImage_4, userImage_5, userImage_6, userImage_7, userImage_8, userImage_9];
    return userImages[imageNumber-1];
  }

  const HandleCancel = () => {
    fetch(
      Config.appUrl+'teams/' + teamID + '/users/' + userID, {
      method: 'DELETE',      
      headers: { 'Content-Type': 'application/json'}
    })
    .then(navigation.navigate('Quest Navigator'))
    .catch((error) => console.error(error))
  }

  useEffect(() => {    
    fetch(url)
    .then((response) => response.json())
    .then((json) => {setPlayersAccepted(json)})
    .catch((error) => console.error(error))
    // .finally(()=>setLoading(false))
  }, [route])   

  useEffect(() => {    
    fetch(urlTeam)
    .then((response) => response.json())
    .then((json) => {setPlayersTeam(json)})
    .catch((error) => console.error(error))
    // .finally(()=>setLoading(false))
  }, [route])   

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        areYousureLeave();
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress',onBackPress);
      return () => { BackHandler.removeEventListener('hardwareBackPress',onBackPress) };
    }, []),
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Sala de Espera',
      headerTintColor: '#a52a2a',
      headerRight: () => (
        <Ionicons color='#a52a2a' name ='arrow-back' size={30} onPress={() => areYousureLeave()}/>
      ),
      headerSearchBarOptions: {
        placeholder: "Search",
      }
    })
  })

  const areYousureLeave = () => {
    Alert.alert(
      "Abandonar grupo de busqueda?",
      "",
      [
        {
          text: "Si",
          onPress: () => {HandleCancel()},
        },
        {
          text: "No",
          onPress: () => null,
        },
      ]
    );
  }

  return (
    <View style={styles.view}> 

      <View style={styles.containerWaitRoom}>
        <Text style={{marginVertical: 10, marginLeft: 5, fontSize: 20, fontWeight: 'bold', color:'#a52a2a'}}>
          {'En espera (' + (playersAccepted.length > 0 ? playersAccepted.length: 0) + '/' + playersTeam.length +')'}
        </Text>
        <FlatList
          horizontal= {false}
          showsHorizontalScrollIndicator = {false}
          data={playersAccepted}
          keyExtractor={(item, index) => index}
          renderItem={({item}) => <Player player={item}/>}>      
        </FlatList> 
      </View>

      <View style={styles.teamButtonsContainer}> 
        <CustomButton2 
          onPress = {() => console.log('Comenzar')}
          icon = "arrow-forward-circle"
          bgColor= {(playersAccepted.length == playersTeam.length && playersTeam.length != 0) ? 'darkseagreen' : 'beige'}
          fgColor = 'white'
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
  containerWaitRoom:{
    flex: 4.5,
    backgroundColor: '#ffefd5',
    marginTop:10,
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
  teamButtonsContainer: {
    flex: 1,
    marginTop: 10,
    flexDirection: 'column',
    alignItems: 'center'
  },
  button: {
    width: '50%',
    padding: 15,
    marginTop: 20,
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#CA955C'
  },
  buttonCancel: {
    width: '50%',
    padding: 15,
    marginTop: 20,
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: 'darkred'
  },
  waitUserImage: {
    flexBasis: 50,
    flexShrink: 0,
    flexGrow: 0
  },
  waitUserText: {
    marginLeft: 10,
		flexBasis: 280,
    flexShrink: 0,
    flexGrow: 0
  },
});

