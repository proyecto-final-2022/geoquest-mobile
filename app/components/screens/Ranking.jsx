import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Modal, ActivityIndicator, Text, View, Dimensions, Image, Pressable, FlatList, TouchableOpacity, TextInput} from 'react-native';
import { useIsFocused } from '@react-navigation/native'
import {Avatar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native'
import {FontAwesome, Entypo, Ionicons} from '@expo/vector-icons'
import Config from '../../../config.json'
import Tags from "react-native-tags"
import CustomButton from '../commons/CustomButton'

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

export default Ranking = ({route, navigation}) => {
  const {id, name, qualification, description, difficulty, duration, completions, image_url, tags, clientID, clientName} = route.params
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0)
  
  const url = Config.appUrl + "quests/" + id + "/rankings"
  const urlTeam = Config.appUrl + "teams/rankings/" + id 

  const [ranking, setRanking] = useState([])
  const [rankingIndex, setRankingIndex] = useState(0)

  const [teamRanking, setTeamRanking] = useState([])
  const [loading, setLoading] = useState(true)

  const isFocused = useIsFocused()

  useEffect(() => {
    fetch(url)
    .then((response) => 
    {
      if (response.ok)
        response.json()
        .then((json) => {setRanking(json)})
        .catch((error) => 
        
        console.error(error))
        .finally(()=>setLoading(false))
    }
    )
  }, [isFocused])

  useEffect(() => {
    fetch(urlTeam)
    .then((response) => 
    {
      if (response.ok)
        response.json()
        .then((json) => {setTeamRanking(json)})
        .catch((error) => 
        
        console.error(error))
        .finally(()=>setLoading(false))
    }
    )
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

  const getUserImage = (imageNumber) => { 
    const userImages = [userImage_1, userImage_2, userImage_3, userImage_4, userImage_5, userImage_6, userImage_7, userImage_8, userImage_9];
    return userImages[imageNumber-1];
   }

  const Ranking = ({data, index}) => {
    return(
      <View style={styles.rankingContainer}>
        <View style={styles.rankingItemPos}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>{index}</Text>
        </View>
        <View style={styles.rankingItemImage}>
          <Avatar.Image 
            source={getUserImage(data.image)}
            size={50}
            marginTop={5}
          />
        </View>
        <View style={styles.rankingItemUsername}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>{data.username}</Text>
        </View>
        <View style={styles.rankingItemTime}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>{data.hours + "h " + data.minutes + "m " + data.seconds + "s "}</Text>
        </View>
      </View>
      )
  }

  const TeamRanking = ({data}, index) => {
    var index = 0
    return(
      <View style={styles.rankingContainer}>
        
        {console.log(index)}
        <View style={styles.rankingItem}>
          {data.users.map((user, index) => 
          {
          <View>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>{user}</Text>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>{index}</Text>
          </View>
          })
          }
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
          renderItem={({item, index}) => <Ranking data={item} index= {index + 1}/> }
  //        {
//    console.log(index + 1)
  //          {console.log(index)}
            //<Ranking data={item}/>
//        }
        //}
        ></FlatList> :           
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
    backgroundColor:'antiquewhite',
    marginTop: 5,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center'
  },
  rankingItemPos: {
    flexBasis: 30,
    flexShrink: 0,
    flexGrow: 0,
  },
  rankingItemImage: {
    flexBasis: 60,
    flexShrink: 0,
    flexGrow: 0,
  },
  rankingItemUsername: {
    flexBasis: 100,
    flexShrink: 0,
    flexGrow: 0,
  },
  rankingItemTime: {
    flexBasis: 200,
    flexShrink: 0,
    flexGrow: 0,
  },
  rankingItem: {

  }
});

