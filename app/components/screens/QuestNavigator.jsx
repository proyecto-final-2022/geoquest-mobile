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

  const [data, setData] = useState([{
    "ID": 1,
    "name": "UTN FRBA Medrano",
    "image": "https://www.frba.utn.edu.ar/wp-content/uploads/2016/10/Fachada-medrano-en-baja-e1462221529402-1024x427.jpg"
    },
    {
    "ID": 2,
    "name": "Museo de Bellas Artes",
    "image": "https://cloudfront-us-east-1.images.arcpublishing.com/infobae/QHRKHASXJBB2FI6NNLIAY3WMYA.jpg"
    },
    {
    "ID": 3,
    "name": "Museo de Ciencias Naturales",
    "image": "https://esperanza.tur.ar/turismo/wp-content/uploads/2015/09/images_museosycasasdearte_CIENCIAS_MUSEO_CIENCIAS_NATURALES_ESPERANZA_4.jpg"
    },
    {
    "ID": 4,
    "name": "Temaiken",
    "image": "https://www.turismodebolsillo.com.ar/media/novedades/1582646945_Temaiken%2013.JPG"
    },
    {
    "ID": 5,
    "name": "Parque de la Costa",
    "image": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/26/b5/a7/parque-de-la-costa.jpg?w=1200&h=-1&s=1"
    }])
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
          <ScrollView>
            <Text style={{fontSize: 14, marginTop: 5}}>{quest.description}</Text>
          </ScrollView>
          <View style={{marginTop: 10, flexDirection: 'row', flex: 1}}>
            <View style={styles.questInfo}>
              <FontAwesome name ='clock-o' size={18}/>
              <Text style={styles.questInfoText}>{quest.duration}</Text>
            </View>
            <ScrollView style={styles.questInfo}>
              <Entypo name ='gauge' size={18}/>
              <Text style={styles.questInfoText}>{quest.difficulty}</Text>
            </ScrollView>
          </View>
      </View>
    )
  }

  useEffect(() => {
    // fetch(url)
    //   .then((response) => response.json())
    //   .then((json) => setData(json))
    //   .catch((error) => console.error(error))
    //   .finally(()=>setLoading(false))

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
    height: 350,
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
    marginRight: 15,
  },
  questInfoText: {
    marginLeft: 5,
    color: '#696969',
  }
});


export default QuestNavigator