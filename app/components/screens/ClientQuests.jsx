import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, Text, View, Dimensions, Image, Pressable, FlatList, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native'
import {FontAwesome, Entypo} from '@expo/vector-icons'
import Config from '../../../config.json'
import Tags from "react-native-tags"

const {width} = Dimensions.get('screen')

export default ClientQuests = ({route, navigation}) => {
  //  const navigation = useNavigation()

  const {ID, name, image} = route.params
  const [data, setData] = useState([])
  const [tags, setTags] = useState([])
  const [loading, setLoading] = useState(true)

  const url = Config.appUrl + "clients/" + ID + "/quests"

  const getData = () => {
    if (loading) {
      return <ActivityIndicator size="large" />
    }
  return (
    data.map( (quest, index) => 
      <Pressable key={index}>
        <View  style={styles.optionCard} key = {index}>
          <Text style={{textAlign: 'center', marginTop:10, fontSize:18, fontWeight: 'bold'}}>{quest.name}</Text>
        </View>        
      </Pressable>))
    }

    useEffect(() => {
      fetch(url)
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error))
        .finally(()=>setLoading(false))
    }, [])
    
    const Tags = ({tag}) => {
      return (
        <View style={styles.tag}>
        <View style={{marginTop: -38, marginLeft:10}}>
          <Text style={styles.tagInfoText}>{tag}</Text>
        </View>
      </View>
      )
    }
    const Card = ({quest}) => {
      return (
        <View style={styles.card}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Text style={{marginTop: 5, fontSize: 20, fontWeight: 'bold'}}>{quest.name}</Text>
          </View>
          <View style={{marginTop: 10, flexDirection: 'row'}}>
            <View style={styles.questInfo}>
              <FontAwesome name ='clock-o' size={25}/>
              <Text style={styles.questInfoText}>{quest.duration}</Text>
            </View>
            <View style={styles.questInfo} marginLeft={18}>
              <Entypo name ='gauge' size={25}/>
                <Text style={styles.questInfoText}>{quest.difficulty}</Text>
            </View>

            <View style={styles.questInfo} marginTop={-50} marginLeft={18}>
              <Entypo name ='star' size={30}/>
                <Text style={styles.questInfoText}>4.5</Text>
            </View>
            {quest.tags.map((tag) => <Tags tag={tag}/>)}  
          </View>
        </View>)}
  
  return (
    <ScrollView style={styles.view}>
    <Text style = {styles.title}>{name}</Text>
    <FlatList
      horizontal= {false}
      contentContainerStyle={{paddingLeft: 20, paddingVertical: 20}}
      showsHorizontalScrollIndicator = {false}
      data={data}
      renderItem={({item}) => <Card quest={item}/>}>      
    </FlatList> 
    
    </ScrollView> 
    )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#a52a2a',
    textAlign: 'center'
  },
  view: {
    flex: 1,
    backgroundColor: '#FFF9CA',
  },
  card:{
    height: 120,
    backgroundColor: '#ffefd5',
    elevation: 10,
    width: width - 40,
    marginTop:20,
    padding: 15,
    borderRadius: 20,
  },
  tag:{
    height: 10,
    marginRight: 360,
    marginLeft: -345,
    marginTop: 15,
    backgroundColor: 'mintcream',
    width: 78,
    padding: 15,
    borderRadius: 20,
  },
  questInfo: {
    flexDirection: 'row',
    marginTop: -50, 
    marginLeft: 200,
  },
  questInfoText: {
    marginTop: 28,
    marginLeft: -25,
    color: '#696969',
  },
  tagInfoText: {
    fontSize: 11,
    marginTop: 25,
    marginLeft: -20,
    color: '#696969',
  }
});

