import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Modal, ActivityIndicator, Text, View, Dimensions, Image, Pressable, FlatList, TouchableOpacity, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native'
import {FontAwesome, Entypo, Ionicons} from '@expo/vector-icons'
import Config from '../../../config.json'
//import PopUpWindow from '../commons/PopUpWindow'
import Tags from "react-native-tags"

const {width} = Dimensions.get('screen')

export default QuestVisualizer = ({route, navigation}) => {

  const {id, name, qualification, description, difficulty, duration, completions, image_url, tags} = route.params
  
  const Tags = ({tag}) => {
    return (
      <View style={styles.tag}>
      <View style={{marginTop: -38, marginLeft:10}}>
        <Text style={styles.tagInfoText}>{tag}</Text>
      </View>
      </View>
    )
  }

  useEffect(() => {
    navigation.setOptions({
      headerTitle: route.params.name,
      headerTintColor: '#a52a2a',
      headerSearchBarOptions: {
        placeholder: "Search",
      }
    })
  })

  return (

    <ScrollView style={styles.view}> 
      {console.log(id)}
      <Image style={styles.image} source={{uri: "https://www.frba.utn.edu.ar/wp-content/uploads/2016/10/Fachada-medrano-en-baja-e1462221529402-1024x427.jpg"}} />
      <View style={styles.card}>
          <Text style={{marginTop: 50, fontSize: 20, fontWeight: 'bold'}}>{description}</Text>
          <View style={{marginTop: 10, flexDirection: 'row'}}>
            <View style={styles.questInfo}>
              <FontAwesome name ='clock-o' size={25}/>
                <Text style={styles.questInfoText}>{duration}</Text>
            </View>
            <View style={styles.questInfo} marginLeft={18}>
              <Entypo name ='gauge' size={25}/>
                <Text style={styles.questInfoText}>{difficulty}</Text>
            </View>

            <View style={styles.questInfo} marginTop={-150} marginLeft={18}>
              <Entypo name ='star' size={30}/>
              <Text style={styles.questInfoText}>{qualification}</Text>
            </View>
            {tags.map((tag) => <Tags tag={tag}/>)}  
          </View>
        </View>
    
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
    backgroundColor: '#ffefd5',
    elevation: 5,
    marginTop:20,
    padding: 15, 
  },
  questInfo: {
    flexDirection: 'row',
    marginTop: -150, 
    marginLeft: 195,
  },
  questInfoText: {
    marginTop: 28,
    marginLeft: -25,
    color: '#696969',
  },
  tag:{
    height: 10,
    marginRight: 360,
    marginLeft: -340,
    marginTop: 30,
    backgroundColor: 'mintcream',
    width: 78,
    padding: 15,
    borderRadius: 20,
  },
  tagInfoText: {
    fontSize: 11,
    marginTop: 25,
    marginLeft: -15,
    color: '#696969',
  },
  image: {
    height: 140,
    borderRadius: 10,
    width: '100%'
  },  
});

