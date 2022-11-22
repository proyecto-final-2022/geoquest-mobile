/* eslint-disable max-len */
/* eslint-disable semi */
/* eslint-disable linebreak-style */
/* eslint-disable quotes */
/* eslint-disable indent */
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

  const data = [{
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
    }
  ]

  const quests = [{
    "client_id": 1,
    "name": "La búsqueda del TP perdido",
    "qualification": 4.5,
    "description": "Un día te dirigías a Medrano para entregar tu Trabajo Práctico Final de Sistemas y Organizaciones. En la puerta te encontrás con uno de tus compañeros y te ponés a hablar un rato cuando de repente... ¡Oh no! Tu malvado compañero, el Duende, apareció y robó el TP de tus manos y desperdigó las hojas por toda la facultad! Debés apurarte y entregar el trabajo completo a tiempo o sino tendrás que recursar la materia. Por suerte el Duende ha sido generoso y te ha dejado algunas pistas para guiarte en tu aventura.",
    "difficulty": "Media",
    "duration": "Media",
    "image_url": "https://www.frba.utn.edu.ar/wp-content/uploads/2016/10/Fachada-medrano-en-baja-e1462221529402-1024x427.jpg",
    "completions": 10
  }]

  // const [data, setData] = useState([{
  //   "ID": 1,
  //   "name": "UTN FRBA Medrano",
  //   "image": "https://www.frba.utn.edu.ar/wp-content/uploads/2016/10/Fachada-medrano-en-baja-e1462221529402-1024x427.jpg"
  //   },
  //   {
  //   "ID": 2,
  //   "name": "Museo de Bellas Artes",
  //   "image": "https://cloudfront-us-east-1.images.arcpublishing.com/infobae/QHRKHASXJBB2FI6NNLIAY3WMYA.jpg"
  //   },
  //   {
  //   "ID": 3,
  //   "name": "Museo de Ciencias Naturales",
  //   "image": "https://esperanza.tur.ar/turismo/wp-content/uploads/2015/09/images_museosycasasdearte_CIENCIAS_MUSEO_CIENCIAS_NATURALES_ESPERANZA_4.jpg"
  //   },
  //   {
  //   "ID": 4,
  //   "name": "Temaiken",
  //   "image": "https://www.turismodebolsillo.com.ar/media/novedades/1582646945_Temaiken%2013.JPG"
  //   },
  //   {
  //   "ID": 5,
  //   "name": "Parque de la Costa",
  //   "image": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/26/b5/a7/parque-de-la-costa.jpg?w=1200&h=-1&s=1"
  //   }])
  // const [quests, setDataQuests] = useState([{
  //   "client_id": 1,
  //   "name": "La busqueda del TP perdido",
  //   "qualification": 4.5,
  //   "description": "Un día te dirigías a Medrano para entregar tu Trabajo Práctico Final de Sistemas y Organizaciones. En la puerta te encontrás con uno de tus compañeros y te ponés a hablar un rato cuando de repente... ¡Oh no! Tu malvado compañero, el Duende, apareció y robó el TP de tus manos y desperdigó las hojas por toda la facultad! Debés apurarte y entregar el trabajo completo a tiempo o sino tendrás que recursar la materia. Por suerte el Duende ha sido generoso y te ha dejado algunas pistas para guiarte en tu aventura.",
  //   "difficulty": "Media",
  //   "duration": "Media",
  //   "image": "https://www.frba.utn.edu.ar/wp-content/uploads/2016/10/Fachada-medrano-en-baja-e1462221529402-1024x427.jpg",
  //   "completions": 10
  // }])
  const [loading, setLoading] = useState(true)

  const url = Config.appUrl + "clients/"
  const urlQuests = Config.appUrl + "clients/quests"

  const Empty = ({spacing}) => { return(<Text style={{marginTop:spacing}}> </Text>)}
  const Card = ({quest}) => {
    return (
      <ScrollView style={styles.card} contentContainerStyle={{alignItems: 'center'}}>
        <Pressable 
        style={{flex: 1, width: width * 0.75}}
        onPress={() => {
          var clientID = data[0].ID
          var clientName = data[0].name
          navigation.navigate('Client Quests', {clientID, clientName})
        }}>
            <Image style={styles.cardImage} source={{uri: quest.image_url}}/>
            <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 10, flex: 1}}>{quest.name}</Text>
              <View style={{marginTop: 10, flexDirection: 'row', flex: 1}}>
                <View style={styles.questInfo}>
                  <FontAwesome name ='clock-o' color={'#1A515B'} size={18}/>
                  <Text style={styles.questInfoText}>{quest.duration}</Text>
                </View>
                <View style={styles.questInfo}>
                  <Entypo name ='gauge' color={'firebrick'} size={18}/>
                  <Text style={styles.questInfoText}>{quest.difficulty}</Text>
                </View>
                <View style={styles.questInfo}>
                  <Entypo name ='star' color={'goldenrod'} size={18}/>
                  <Text style={styles.questInfoText}>{quest.qualification.toFixed(1)}</Text>
                </View>
                {/* //TODO(fran): qualification */}
              </View>
            <Text style={{fontSize: 14, marginVertical: 5, textAlign: 'justify', flex: 5}}>{quest.description}</Text>
            <Empty spacing={20}/>
        </Pressable>
      </ScrollView>
    )
  }

  useEffect(() => {
    // fetch(url)
    //   .then((response) => response.json())
    //   .then((json) => setData(json))
    //   .catch((error) => console.error(error))
    //   .finally(()=>setLoading(false))

    // fetch(urlQuests)
    //   .then((response) => response.json())
    //   .then((json) => setDataQuests(json))
    //   .catch((error) => console.error(error))
    //   .finally(()=>setLoading(false))
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
    // if (loading) {
    //   return <ActivityIndicator size="large" />
    // }
    return (
      data.map( (client, index) => 
        <View style={styles.optionCard} key={index}>
          <Pressable key={index} style={{width: width * 0.38, flex: 1, alignItems: 'center'}} onPress={() => {
            var clientID = client.ID
            var clientName = client.name
            navigation.navigate('Client Quests', {clientID, clientName})
          }}>
            <Image style={styles.optionCardImage} source={{uri: client.image}}/>
            <Text style={{textAlign: 'center', marginTop:10, fontSize:18, fontWeight: 'bold', flex: 1}}>{client.name}</Text>
          </Pressable>
        </View>
      )
    )
  }

  return (
    <View style={styles.view}>
      <View style={{flex: 5}}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}>
          <View style={styles.optionListContainer}>
            {getData()}
          </View>
        </ScrollView>
      </View>

      <View style={styles.categoryListContainer}>
        {['Populares', 'Más jugadas'].map((category, index) => (
          <Pressable key={index} onPress={() => {setSelectedCategoryIndex(index)}}>
            <Text style={[styles.categoryListText, (index == selectedCategoryIndex && styles.activeCategoryListText)]}>{category}</Text>        
          </Pressable>
        ))}
      </View>
      <View style={{flex: 6}}>
        <FlatList
          horizontal
          contentContainerStyle={{paddingLeft: 20}}
          showsHorizontalScrollIndicator = {false}
          data={selectedCategoryIndex == 0 ? quests.sort((a, b) => a.qualification < b.qualification) : quests.sort((a, b) => a.completions < b.completions)}
          renderItem={({item}) => <Card quest={item}/>}
        />
      </View>
    </View> 
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
    marginLeft: 20,
  },
  optionCard: {
    height: 240,
    marginRight: 10,
    width: width * 0.38,
    elevation: 15,
    backgroundColor: '#ffefd5',
    alignItems: 'center',
    borderRadius: 20,
    paddingTop: 5,
    paddingHorizontal: 10,
    flex: 1
  },
  optionCardImage: {
    flex: 2,
    borderRadius: 10,
    width: width * 0.32
  },
  categoryListContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: width * 0.15
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
    height: width * 0.85,
    backgroundColor: '#ffefd5',
    elevation: 10,
    width: width * 0.85,
    marginRight:20,
    padding: 15,
    borderRadius: 20
  },
  cardImage:{
    width: width * 0.75,
    height: width * 0.35,
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
