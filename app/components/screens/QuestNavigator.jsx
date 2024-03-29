import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, Text, View, Dimensions, Image, Pressable, FlatList, BackHandler} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native'
import {FontAwesome, Entypo} from '@expo/vector-icons'
import Config from '../../../config.json'
import {areYouSureAlert} from '../../utils/storage/storage';

const {width} = Dimensions.get('screen')

const QuestNavigator = () => {
  const navigation = useNavigation()

  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0)

  const [data, setData] = useState([])
  const [quests, setDataQuests] = useState([])
  const [loading, setLoading] = useState(true)

  const url = Config.appUrl + "clients/"
  const urlQuests = Config.appUrl + "clients/quests"

  const listCategories = () => {
    const categoryList = ['Populares', 'Más jugadas']
    return <View style={styles.categoryListContainer}>
      {categoryList.map((category, index) => (
        <Pressable
          key={index}
            onPress={
              () => {setSelectedCategoryIndex(index)}}>
        <Text style={[styles.categoryListText, (index == selectedCategoryIndex && styles.activeCategoryListText)]}>{category}</Text>        
        </Pressable>
      ))}
    </View>
  }

  const Card = ({quest}) => {
    return (
      <View style={styles.card}>
        <Image style={styles.cardImage} source={{uri: quest.image_url}} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>{quest.name}</Text>
          </View>
          <Text style={{fontSize: 14, marginTop: 5}}>{quest.description}</Text>
          <View style={{marginTop: 10, flexDirection: 'row'}}>
            <View style={styles.questInfo}>
              <FontAwesome name ='clock-o' size={18}/>
              <Text style={styles.questInfoText}>{quest.duration}</Text>
            </View>
            <View style={styles.questInfo}>
              <Entypo name ='gauge' size={18}/>
              <Text style={styles.questInfoText}>{quest.difficulty}</Text>
            </View>
          </View>
      </View>
    )
  }

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(()=>setLoading(false))

    fetch(urlQuests)
      .then((response) => response.json())
      .then((json) => setDataQuests(json))
      .catch((error) => console.error(error))
      .finally(()=>setLoading(false))
  }, [])
  
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        areYouSureAlert({navigation});
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress',onBackPress);
      return () => { BackHandler.removeEventListener('hardwareBackPress',onBackPress) };
    }, []),
  );

  const getData = () => {
    if (loading) {
      return <ActivityIndicator size="large" />
    }
    return (
      data.map( (client, index) => 
        <Pressable key={index} onPress={() => {
          var clientID = client.ID
          var clientName = client.name
          navigation.navigate('Client Quests', {clientID, clientName})
        }}>
          <View  style={styles.optionCard} key = {index}>
            <Image style={styles.optionCardImage} source={{uri: client.image}} />
              <Text style={{textAlign: 'center', marginTop:10, fontSize:18, fontWeight: 'bold'}}>{client.name}</Text>
          </View>        
        </Pressable>
          )
        )
  }

  return (
    <ScrollView style={styles.view}> 
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{height: 350}}>
        <View style={styles.optionListContainer}>
          {getData()}
        </View>
      </ScrollView> 

      {listCategories()}
      { 
        selectedCategoryIndex == 0 ?           
        <FlatList
          horizontal
          contentContainerStyle={{paddingLeft: 20, paddingVertical: 20}}
          showsHorizontalScrollIndicator = {false}
          data={quests.sort((a, b) => a.qualification < b.qualification)}
          renderItem={({item}) => <Card quest={item}/>
        }></FlatList> :           
        <FlatList
          horizontal
          contentContainerStyle={{paddingLeft: 20, paddingVertical: 20}}
          showsHorizontalScrollIndicator = {false}
          data={quests.sort((a, b) => a.completions < b.completions)}
          renderItem={({item}) => <Card quest={item}/>
        }></FlatList>
      }

    </ScrollView> 
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#a52a2a',
  },
  view: {
    flex: 1,
    backgroundColor: '#FFF9CA',
  }, 
  optionListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  optionCard: {
    height: 240,
    marginRight: 10,
    width: width/2 - 40,
    elevation: 15,
    backgroundColor: '#ffefd5',
    alignItems: 'center',
    borderRadius: 20,
    paddingTop: 5,
    paddingHorizontal: 10
  },
  optionCardImage: {
    height: 140,
    borderRadius: 10,
    width: '100%'
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
  card:{
    height: 320,
    backgroundColor: '#ffefd5',
    elevation: 10,
    width: width - 65,
    marginRight:20,
    padding: 15,
    borderRadius: 20,
  },
  cardImage:{
    width: '100%',
    height: 120,
    borderRadius: 15,
  },
  questInfo: {
    flexDirection: 'row',
    marginRight: 15
  },
  questInfoText: {
    marginLeft: 5,
    color: '#696969',
  }
});


export default QuestNavigator