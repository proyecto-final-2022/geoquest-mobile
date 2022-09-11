import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Modal, ActivityIndicator, Text, View, Dimensions, Image, Pressable, FlatList, TouchableOpacity, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native'
import {FontAwesome, Entypo, Ionicons} from '@expo/vector-icons'
import Config from '../../../config.json'
import Tags from "react-native-tags"
import CustomButton from '../commons/CustomButton'

const {width} = Dimensions.get('screen')

export default MultiplayerWaitRoom = ({route, navigation}) => {

  const {id, name, qualification, description, difficulty, duration, completions, image_url, tags} = route.params

  const [invited, setInvited] = useState([])

  const users = [
    {id: 1, name: "string", username: "string", email: "string"},
  //  {id: 2, name: "string2", username: "string2", email: "string2"}
  ]

  const addInvited = (newInvited) => {
    return (      
      setInvited([...invited, newInvited])
    )
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

  const Player = ({player}) => {
    return (
      <View>
      <Text
        style={{marginTop: 10, marginLeft: 15, fontSize: 20, color:'#a52a2a'}}
      >{player.name}</Text>
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
      <ScrollView style={styles.containerWaitRoom}>
        <Text style={{marginTop: 10, marginLeft: 5, fontSize: 20, fontWeight: 'bold', color:'#a52a2a'}}>Jugadores invitados</Text>
        <FlatList
          horizontal= {false}
          contentContainerStyle={{paddingLeft: 20, paddingVertical: 20}}
          showsHorizontalScrollIndicator = {false}
          data={invited}
          keyExtractor={(item, index) => item.key}
          renderItem={({item}) => <Player player={item}/>}>      
        </FlatList> 

      </ScrollView>

      <Button onPress={() => {addInvited({id: 1, name: "string", username: "string", email: "string"})}} text="Invitar"/>

      <Button onPress={() => {console.log(invited)}} text="a ver"/>

      <Button onPress={() => {setInvited([])}} text="limpiar"/>

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
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
  },  
});

