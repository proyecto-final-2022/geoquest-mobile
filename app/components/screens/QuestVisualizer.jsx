import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Modal, ActivityIndicator, Text, View, Dimensions, Image, Pressable, FlatList, TouchableOpacity, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native'
import {FontAwesome, Entypo, Ionicons} from '@expo/vector-icons'
import Config from '../../../config.json'
import Tags from "react-native-tags"
import CustomButton from '../commons/CustomButton'

const {width} = Dimensions.get('screen')

export default QuestVisualizer = ({route, navigation}) => {

  const {id, name, qualification, description, difficulty, duration, completions, image_url, tags, clientID, clientName} = route.params

  const Tag = ({tag}) => {
    return (
      <View style={styles.tag}>
        <Text>{tag}</Text>
      </View>
    )
  }
  //Por que no reutilizar CustomButton? Porque me pone el boton donde se le canta la verga basicamente y no me deja moverlo
  const Button = ({text, onPress}) => {
    return (
      <Pressable 
        onPress={onPress} 
        style={styles.container}>  
      <Text 
        style={styles.text}>{text}</Text>
      </Pressable>
    )
  }

  useEffect(() => {
    navigation.setOptions({
      headerTitle: route.params.name,
      headerTintColor: '#a52a2a',
      headerRight: () => (
        <Ionicons color='#a52a2a' name ='arrow-back' size={30} onPress={() => navigation.navigate('Client Quests', {clientID, clientName})}/>
      ),
      headerSearchBarOptions: {
        placeholder: "Search",
      }
    })
  })

  return (

    <ScrollView style={styles.view}> 
      <Image style={styles.image} source={{uri: "https://www.frba.utn.edu.ar/wp-content/uploads/2016/10/Fachada-medrano-en-baja-e1462221529402-1024x427.jpg"}} />

      <View style={styles.card}>
        <View style={styles.questInfoContainer}>
          <View style={styles.questInfo}>
            <Entypo name ='star' size={25}/>
            <Text>{qualification}</Text>
          </View>
          <View style={styles.questInfo}>
            <Entypo name ='gauge' size={25}/>
            <Text>{difficulty}</Text>
          </View>
          <View style={styles.questInfo}>
            <FontAwesome name ='clock-o' size={25}/>
            <Text>{duration}</Text>
          </View>
        </View>
        <View style={styles.description}>
          <Text style={{fontSize: 20}}>{description}</Text>
        </View>
  
        <View style={styles.tagContainer}>
          {tags.map((tag) => <Tag tag={tag}/>)}
        </View>

      </View>

      <Button onPress={() => console.log('Comenzar')} text="Comenzar"/>
      <Button onPress={() => console.log('Armar Grupo')} text="Armar Grupo"/>
      <Button onPress={() => navigation.navigate('Ranking', {...{id, name, qualification, description, difficulty, duration, completions, image_url, tags, clientID, clientName}})} text="Ver Rankings"/>
    
    </ScrollView>

    )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#FFF9CA',
  },
  card:{
    height: 250,
    flexDirection: 'column',
    backgroundColor: '#ffefd5',
    elevation: 5,
    marginTop:20,
    padding: 15, 
  },
  questInfoContainer: {
    flex: 1,
    flexDirection: 'row-reverse',
  },
  questInfo: {
    flexDirection: 'column',
    alignItems: 'center',
    flexBasis: 45,
    flexShrink: 0,
    flexGrow: 0,
  },
  description: {
    flex: 2  
  },
  tagContainer:{
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  tag:{
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'mintcream',
    width: 90,
    padding: 5,
    borderRadius: 20,
    marginLeft: 5
  },
  image: {
    height: 140,
    borderRadius: 10,
    width: '100%'
  },
  container: {
    width: '50%',

    padding: 15,
    marginVertical: 5,
    marginLeft: 100,
    marginTop: 20,

    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#CA955C'
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
  },  
});

