import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Modal, ActivityIndicator, Text, View, Dimensions, Image, Pressable, FlatList, TouchableOpacity, TextInput} from 'react-native';
import { useIsFocused } from '@react-navigation/native'
import {useNavigation} from '@react-navigation/native'
import {FontAwesome, Entypo, Ionicons} from '@expo/vector-icons'
import Config from '../../../config.json'
import Tags from "react-native-tags"
import CustomButton from '../commons/CustomButton'

const {width} = Dimensions.get('screen')

export default Ranking = ({route, navigation}) => {
  const {id, name, qualification, description, difficulty, duration, completions, image_url, tags, clientID, clientName} = route.params
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0)
  
  const url = Config.appUrl + "quests/" + id + "/rankings"
  const urlTeam = Config.appUrl + "teams/rankings/" + id 

  const [ranking, setRanking] = useState([])
  const [teamRanking, setTeamRanking] = useState([])
  const [loading, setLoading] = useState(true)

  const isFocused = useIsFocused()

  useEffect(() => {
    fetch(url)
    .then((response) => response.json())
    .then((json) => {
      setRanking(json) 
    })
    .catch((error) => console.error(error))
    .finally(()=>setLoading(false))
  }, [isFocused])

  useEffect(() => {
    fetch(urlTeam)
    .then((response) => response.json())
    .then((json) => {
      setTeamRanking(json) 
    })
    .catch((error) => console.error(error))
    .finally(()=>setLoading(false))
  }, [isFocused])
  
  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Ranking',
      headerRight: () => (
        <Ionicons color='#a52a2a' name ='arrow-back' size={30} onPress={() => navigation.navigate('Quest Visualizer', {id, name, qualification, description, difficulty, duration, completions, image_url, tags, clientID, clientName})}/>
      ),
      headerTintColor: '#a52a2a',
    })
  })

  const listCategories = () => {
    const categoryList = ['Individual', 'Equipos']
    
    return <View style={styles.categoryListContainer}>
      {categoryList.map((category, index) => (
        <Pressable
          key={index}
          onPress={() => {setSelectedCategoryIndex(index)}}>
          <Text style={[styles.categoryListText, (index == selectedCategoryIndex && styles.activeCategoryListText)]}>{category}</Text>        
        </Pressable>
      ))}
      </View>
  }

  const Ranking = ({data}) => {
    return(
      <View style={styles.rankingContainer}>
        <View style={styles.rankingItem}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>{data.username}</Text>
        </View>
        <View style={styles.rankingItem}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>{data.hours + "h " + data.minutes + "m " + data.seconds + "s "}</Text>
        </View>
      </View>
      )
  }

  const TeamRanking = ({data}) => {
    return(
      <View style={styles.rankingContainer}>
        <View style={styles.rankingItem}>
          {data.users.map((user) => <Text style={{fontSize: 20, fontWeight: 'bold'}}>{user}</Text>)}
        </View>
        <View style={styles.rankingItem}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>{data.hours + "h " + data.minutes + "m " + data.seconds + "s "}</Text>
        </View>
      </View>
      )
  }

  return (

    <ScrollView style={styles.view}> 
      {listCategories()}
      { 
        selectedCategoryIndex == 0 ?           
        <FlatList
          contentContainerStyle={{paddingLeft: 20, paddingVertical: 20}}
          showsHorizontalScrollIndicator = {false}
          data={ranking}
          renderItem={({item}) => <Ranking data={item}/>
        }></FlatList> :           
        <FlatList
          contentContainerStyle={{paddingLeft: 20, paddingVertical: 20}}
          showsHorizontalScrollIndicator = {false}
          data={teamRanking}
          renderItem={({item}) => <TeamRanking data={item}/>
        }></FlatList>
      }
    </ScrollView>

    )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#FFF9CA',
  },
  categoryListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 80,
  },
  categoryListText: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 5,
    color: '#cd853f',
  },
  activeCategoryListText: {
    color: '#a52a2a',
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  rankingContainer: {
    flexDirection: 'row',
  },
  rankingItem: {
    width: 200,
    marginTop: 20,
    backgroundColor: '#ffefd5',
  }
});

