/* eslint-disable react/display-name */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable indent */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react';
import { StyleSheet, BackHandler, ActivityIndicator, Text, View, Dimensions, Image, Pressable, FlatList, TouchableOpacity, TextInput} from 'react-native';
import { useIsFocused } from '@react-navigation/native'
import {Avatar} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native'
import {FontAwesome, Entypo, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons'
import Config from '../../../config.json'

import userImage_1 from '../../../assets/userImages/userImage_1.png'
import userImage_2 from '../../../assets/userImages/userImage_2.png'
import userImage_3 from '../../../assets/userImages/userImage_3.png'
import userImage_4 from '../../../assets/userImages/userImage_4.png'
import userImage_5 from '../../../assets/userImages/userImage_5.png'
import userImage_6 from '../../../assets/userImages/userImage_6.png'
import userImage_7 from '../../../assets/userImages/userImage_7.png'
import userImage_8 from '../../../assets/userImages/userImage_8.png'
import userImage_9 from '../../../assets/userImages/userImage_9.png'

import goldMedal from '../../../assets/medals/gold.png'
import silverMedal from '../../../assets/medals/silver.png'
import bronzeMedal from '../../../assets/medals/bronze.png'

export default Ranking = ({route, navigation}) => {
  const {id, name, qualification, description, difficulty, duration, completions, image_url, tags, clientID, clientName} = route.params
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0)
  
  //const url = Config.appUrl + "quests/" + id + "/rankings"
  //const urlTeam = Config.appUrl + "teams/rankings/" + id 

  //const [ranking, setRanking] = useState([])
  //const [rankingIndex, setRankingIndex] = useState(0)

  const [teamRanking, setTeamRanking] = useState([])
  const [loading, setLoading] = useState(true)

  //const isFocused = useIsFocused()

  //des hardcodear, pero pablo no lo hizo asi que yo tampoco :)
  const urlTeam = Config.appUrl + "quests/" + route.params.id + "/progression/rankings" 

  // useEffect(() => {
  //   fetch(url)
  //   .then((response) => {
  //     if (response.ok){
  //       response.json()
  //       .then((json) => {
  //         setRanking(json)
  //       })
  //       .catch((error) => console.error(error))
  //       .finally(()=>setLoading(false))
  //     }
  //   })
  //   .catch((error) => console.log(error))
  // }, [isFocused])

  // useEffect(() => {
  //   fetch(urlTeam)
  //   .then((response) => {
  //     if (response.ok)
  //       response.json()
  //       .then((json) => {
  //         setTeamRanking(json)
  //       })
  //       .catch((error) => console.error(error))
  //       .finally(()=>setLoading(false))
  //   })
  //   .catch((error) => console.log(error))
  // }, [isFocused])
  

  useEffect(() => {
    //console.log("*****Que onda esto")
    fetch(urlTeam)
    .then((response) => {
      if(response.ok){
        response.json()
        .then((json) => {
          //console.log("********Ranking: ", json)
          setTeamRanking(json)
        })
        .catch((error) => console.error(error))
        .finally(()=>setLoading(false))
      }else{
        console.log(response)
      }
    })
    .catch((error) => console.log(error))
  }, [route])

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Ranking',
      headerRight: () => (
        <Ionicons color='#a52a2a' name ='arrow-back' size={30} onPress={() => navigation.navigate('Quest Visualizer', {id, name, qualification, description, difficulty, duration, completions, image_url, tags, clientID, clientName})}/>
      ),
      headerTintColor: '#a52a2a',
    })
  })

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('Quest Visualizer', {id, name, qualification, description, difficulty, duration, completions, image_url, tags, clientID, clientName})
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress',onBackPress);
      return () => { BackHandler.removeEventListener('hardwareBackPress',onBackPress) };
    }, []),
  );

  const listCategories = () => {
    const categoryList = ['Individual', 'Equipos']
    
    return (
      <View style={styles.categoryListContainer}>
        {categoryList.map((category, index) => (
          <Pressable
            key={index}
            onPress={() => {setSelectedCategoryIndex(index)}}>
            <Text style={[styles.categoryListText, (index == selectedCategoryIndex && styles.activeCategoryListText)]}>{category}</Text>        
          </Pressable>
        ))}
      </View>
    )
  }

  const getUserImage = (imageNumber) => { 
    const userImages = [userImage_1, userImage_2, userImage_3, userImage_4, userImage_5, userImage_6, userImage_7, userImage_8, userImage_9];
    return userImages[imageNumber-1];
  }

  const Ranking = ({data: user, index}) => {
    return(
      <View style={styles.rankingContainer}>
        <View style={styles.rankingItemPos}>
          {
            index == 1 || index == 2 || index == 3 ? 
              <Image
                source = {[goldMedal,silverMedal,bronzeMedal][index-1]}
                size= {100}
                style={[styles.logo]}
              />
            :
              <Text style={{fontSize: 20, marginLeft: 10, fontWeight: 'bold'}}>{index}</Text> 
          }
        </View>
        <View style={styles.rankingItemImage}>
          <Avatar.Image 
            source={getUserImage(user.image)}
            size={50}
            marginTop={5}
          />
        </View>
        <View style={styles.rankingItemUsername}>
          <Text style={{fontSize: 20, color:'#a52a2a', fontWeight: 'bold'}}>{user.username}</Text>
        </View>
        <View style={styles.rankingItemTime}>
          <FontAwesome name ='clock-o' color={'#1A515B'} size={32}/>
          <Text style={{fontSize: 15, fontWeight: 'bold', color:'#a52a2a'}}>{user.hours+"h "+user.minutes+"m\n"+user.seconds+"s"}</Text>
        </View>
      </View>
    )
  }

  const TeamRanking = ({data, index}) => {
    return(
      <View style={[styles.teamRankingContainer, {height: data.users.length*70}]}>
        <View style={styles.rankingItemPos}>
        {
          index == 1 || index == 2 || index == 3 ? 
            <Image
              source = {[goldMedal,silverMedal,bronzeMedal][index-1]}
              size= {100}
              style={[styles.logo]}
            />
          :
            <Text style={{fontSize: 20, marginLeft: 10, fontWeight: 'bold'}}>{index}</Text> 
        }
        </View>
        <View style={styles.teamRankingContainerItem}>
          {
            data.users.map((user, index) =>
              <View key={index} style={{flexDirection: 'row',justifyContent: "space-between",alignItems: "center"}}>
                <View style={styles.rankingItemImage}>
                  <Avatar.Image 
                    source={getUserImage(user.image)}
                    size={50}
                    marginTop={5}
                  />
                </View>
                <View style={styles.rankingTeamUsername}>
                  <Text style={{fontSize: 20, fontWeight: 'bold', color:'#a52a2a'}}>{user.username.substring(0,33)}</Text>
                </View>
              </View>
            )
          }
        </View>
        <View style={styles.rankingItemTime}>
          <MaterialCommunityIcons name ='star-four-points' color={'goldenrod'} size={32}/>
          <Text style={{fontSize: 15, fontWeight: 'bold', color:'#a52a2a'}}>{data.points}</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.view}> 
      {/* {listCategories()}         
      <FlatList
        contentContainerStyle={{paddingHorizontal: 5, paddingVertical: 20}}
        showsHorizontalScrollIndicator = {false}
        data={ranking}
        keyExtractor={(item, index) => index}
        renderItem={({item, index}) => selectedCategoryIndex == 0 ? <Ranking data={item} index={index+1}/> : <TeamRanking data={item} index={index+1}/>
      }/> */}
      { loading && <View style={{flex: 1, justifyContent: "center"}}>
          <ActivityIndicator size="large" style={{justifyContent: "center", paddingTop: 50, transform: [{ scaleX: 2 }, { scaleY: 2 }]}}/>
        </View>
      }
      { !loading && 
        <FlatList
          contentContainerStyle={{paddingHorizontal: 5, paddingVertical: 20}}
          showsHorizontalScrollIndicator = {false}
          data={teamRanking}
          keyExtractor={(item, index) => index}
          renderItem={({item, index}) => <TeamRanking key={index} data={item} index={index+1}/>}
        /> 
      }
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#FFF9CA',
    flexDirection: 'column',
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
    flex: 1,
    backgroundColor:'antiquewhite',
    marginTop: 5,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  rankingItemPos: {
    flex: 1.5,
  },
  rankingItemImage: {
    flex: 2
  },
  rankingItemUsername: {
    flex: 4
  },
  rankingItemTime: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  logo: {
    width: '100%',
    maxWidth: 40,
    maxHeight: 40,
  },
  teamRankingContainer: {
    flex: 1,
    // height: 270, changed to dynamic height
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor:'antiquewhite',
  },
  teamRankingContainerItem: {
    flex: 7,
    marginTop: 2,
    flexDirection: 'column',
    alignItems: 'center'
  },
  rankingTeamUsername: {
    flex: 4
  }
});

