import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Text, View, Dimensions, Image, Pressable, TouchableOpacity} from 'react-native';
import {FontAwesome, Entypo, Ionicons} from '@expo/vector-icons'
import CustomButton from '../commons/CustomButton'
import CustomButton2 from '../commons/CustomButton2'
import CustomModal from '../commons/CustomModal';

import starFilled from '../../../assets/ratingStars/star_filled.png'
import starCorner from '../../../assets/ratingStars/star_corner.png'

const {width} = Dimensions.get('screen')

export default QuestVisualizer = ({route, navigation}) => {

  const {id, name, qualification, description, difficulty, duration, completions, image_url, tags, clientID, clientName} = route.params
  const colors = ['sandybrown', 'indianred', 'darksalmon', 'darkseagreen']

  const Tag = ({tag, index}) => {
    return (
      <View style={[
        styles.tag,
        {backgroundColor: colors[index]}
        ]}>
        <Text style={{fontWeight: 'bold', color: 'white'}}>{tag}</Text>
      </View>
    )
  }

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

  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
      setModalVisible(!isModalVisible);
  };
  const [defaultRating, setDefaultRating] = useState(2);
  const maxRating = [1,2,3,4,5];

  const CustomRatingBar = () => {
    return (
      <View style={styles.customRatingBar}>
        {
          maxRating.map((item, key) => {
            return (
              <TouchableOpacity activeOpacity={0.7} key={item} onPress={() => setDefaultRating(item)}>
                <Image style={styles.starImg} source={item <= defaultRating ? starFilled : starCorner}/>
              </TouchableOpacity>
            )
          })
        }
      </View>
    )
  }

  return (

    <ScrollView style={styles.view}> 
      <Image style={styles.image} source={{uri: "https://www.frba.utn.edu.ar/wp-content/uploads/2016/10/Fachada-medrano-en-baja-e1462221529402-1024x427.jpg"}} />

      <View style={styles.card}>
        <View style={styles.questInfoContainer}>
          <View style={styles.questInfo}>
            <Entypo name ='star' size={25} color={'goldenrod'}/>
            <Text style={{fontWeight: 'bold'}}>{qualification}</Text>
          </View>
          <View style={styles.questInfo}>
            <Entypo name ='gauge' color={'firebrick'} size={25}/>
            <Text style={{fontWeight: 'bold'}}>{difficulty}</Text>
          </View>
          <View style={styles.questInfo}>
            <FontAwesome name ='clock-o' color={'black'} size={25}/>
            <Text style={{fontWeight: 'bold'}}>{duration}</Text>
          </View>
        </View>
        <View style={styles.description}>
          <Text style={{fontSize: 20}}>{description}</Text>
        </View>
  
        <View style={styles.tagContainer}>
          {tags.map((tag, index) => <Tag tag={tag} key={index} index={index}/>)}
        </View>

      </View>

      <View style={styles.teamButtonsContainer}> 
        <CustomButton2 
          onPress = {() => console.log('Comenzar')}
          icon = "arrow-forward-circle"
          bgColor= 'darkseagreen'
          fgColor = 'white'
        />
        <CustomButton2 
          onPress = {() => console.log('Armar Equipo')}
          icon = "people-sharp"
          bgColor= '#CA955C'
          fgColor = 'white'
          text = 'Armar Equipo'
        />
        <CustomButton2 
          onPress={() => navigation.navigate('Ranking', {...{id, name, qualification, description, difficulty, duration, completions, image_url, tags, clientID, clientName}})}
          icon = "ios-podium-sharp"
          bgColor= '#CA955C'
          fgColor = 'white'
          text = 'Podio'
        />
        <CustomButton2 
          onPress={toggleModal}
          icon = "star"
          bgColor= '#CA955C'
          fgColor = 'white'
          text = 'Calificar busqueda'
        />
      </View>

      
      <CustomModal visible={isModalVisible} dismiss={toggleModal}>
        <View style={{flex: 1}}/>
        <View style={styles.customRating}>
          <Text>¡Califica esta búsqueda!</Text>
          <CustomRatingBar/>
          <Text>{'\n'+defaultRating+'/'+maxRating.length+'\n'}</Text>
          <CustomButton
            onPress={toggleModal}
            style={{marginTop: 100}}
            bgColor= '#CA955C'
            fgColor = 'white'
            text = 'Guardar'
          />
          <CustomButton
            onPress={toggleModal}
            style={{marginTop: 100}}
            bgColor= 'grey'
            fgColor = 'white'
            text = 'Volver'
          />
        </View>
        <View style={{flex: 1}}/>
      </CustomModal>
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
  teamButtonsContainer: {
    marginTop: 15,
    flexDirection: 'column',
    alignItems: 'center'
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
  },
  customRatingBar: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30
  },
  starImg: {
    width: 40,
    height: 40,
    resizeMode: 'cover'
  },
  customRating: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffefd5',
    margin: 30,
    borderWidth: 3,
    borderRadius:10,
    borderColor: '#CA955C'
  }
});

