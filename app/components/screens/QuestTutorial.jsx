/* eslint-disable semi */
/* eslint-disable indent */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable quotes */
import React, { useState, useEffect } from 'react';
import { Alert } from "react-native";
import {FontAwesome, Entypo, Ionicons} from '@expo/vector-icons'
import {
  useWindowDimensions,
  StyleSheet,
  View,
  Text,
  Image,
  BackHandler,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AppIntroSlider from 'react-native-app-intro-slider';

import DuendeLadron from '../../../res/images/tutorial/duendeLadron.png'
import Puff from '../../../res/images/tutorial/puff.png'
import Detective from '../../../res/images/tutorial/detective.png'
import Menu from '../../../res/images/tutorial/menu.jpg'
import MenuInventory from '../../../res/images/tutorial/menuInventory.jpg'
import Carpeta from '../../../res/images/tutorial/carpeta.jpg'
import Config from '../../../config.json'

const QuestTutorial = ({route, navigation}) => {
  const { height, width } = useWindowDimensions();
//  const {questID, teamID} = route.params
  const {data: data} = route.params
  const [questID, setQuestID] = useState()
  const [teamID, setTeamID] = useState(0)

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('Quest Navigator');
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress',onBackPress);
      return () => { BackHandler.removeEventListener('hardwareBackPress',onBackPress) };
    }, []),
  );

  useEffect(() => {
    if (data.mode == "singlePlayer"){
      fetch(
        Config.appUrl+'teams/' + data.userID, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ 
          user_ids: [data.userID],
          quest_id: data.questID})
        }).then(response => response.json()).catch(error => console.log(error))
        .then(teamID => 
          fetch(
            Config.appUrl+'quests/' + data.questID + '/progressions/' + teamID, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            }).catch(error => console.log(error))
            .then(setTeamID(teamID)))
            .catch(error => console.log(error))
    }else{
      if (data.rol == "host"){
        fetch(
          Config.appUrl+'quests/' + data.questID + '/progressions/' + data.teamID, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          }).catch(error => console.log(error))
        setTeamID(data.teamID)
      }else{
        setTeamID(data.teamID)
      }
    }
  }, [data])

  useEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerTintColor: '#a52a2a',
      headerRight: () => (
        <Ionicons color='#a52a2a' name ='arrow-back' size={30} onPress={() => navigation.navigate('Quest Navigator')}/>
      ),
      headerSearchBarOptions: {
        placeholder: "Search",
      }
    })
  })

  const redirectToQuest = () => {
    if (teamID != 0){
    fetch(Config.appUrl + "quests/" + questID + "/progressions/" + teamID, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json'},
      body: JSON.stringify({
        inventory: [],
        scene: parseFloat(0),
        objects: {},
        logs: [],
        points: parseFloat(0),
        finished: false,
        can_finish: false,
        start_time: Math.floor(Date.now() / 1000)}) 
    }).catch(error => {
      console.log('Error sending update: '+error);
    }).then(navigation.navigate('Game', {team: {teamID: teamID}})).catch(error => console.log(error))
  }else{
    Alert.alert("Cargando datos de la búsqueda")
  }
  };

  const RenderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingBottom: 100,
        }}>
        {item.title != '' && <Text style={styles.introTitleStyle}>{item.title}</Text>}
        <Image style={item.imageStyle} source={item.image} />
        <Text style={[styles.introTextStyle, item.textStyle]}>{item.text}</Text>
      </View>
    );
  };

  return (
    <AppIntroSlider
        data={slides}
        renderItem={RenderItem}
        onDone={() => {redirectToQuest(questID, teamID)}}
        onSkip={() => {redirectToQuest(questID, teamID)}}
        showSkipButton
        showPrevButton
        renderNextButton={() => 
        <View style={styles.buttonCircle}>
            <Entypo name="arrow-with-circle-right" size={40}/>
        </View>}
        renderPrevButton={() => 
        <View style={styles.buttonCircle}>
            <Entypo name="arrow-with-circle-left" size={40}/>
        </View>}
        renderSkipButton={() => 
        <View>
            <Text style={styles.introTextStyle}>Saltar</Text>
        </View>}
        renderDoneButton={() => 
        <View>
              <Text style={styles.introTextStyle}>Comenzar</Text>
        </View>}
        activeDotStyle={{backgroundColor: 'black'}}
    />
  );
};

export default QuestTutorial;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
  },
  introTextStyle: {
    fontSize: 20,
    textAlign: 'center',
    marginHorizontal: 5
  },
  introTitleStyle: {
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  buttonCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const slides = [
  {
    key: 's1',
    text: 'Un día te dirigías a Medrano para entregar tu Trabajo Práctico Final de Sistemas y Organizaciones.\n'+
    'En la puerta te encontrás con uno de tus compañeros y te ponés a hablar un rato cuando de repente...',
    title: 'El TP Perdido',
    image: {
      uri:
        'https://www.frba.utn.edu.ar/wp-content/uploads/2016/10/Fachada-medrano-en-baja-e1462221529402-1024x427.jpg',
    },
    imageStyle: {
        width: 400,
        height: 200,
    },
    backgroundColor: '#FFF9CA',
  },
  {
    key: 's2',
    title: '¡Aparece un duende en frente tuyo!',
    text: '"Robé tu TP mientras estabas distraido.\nSi querés encontrarlo tendrás que seguir las pistas que dejé MUAJAJAJAJA"',
    image: DuendeLadron,
    imageStyle: {
        width: 240,
        height: 216,
    },
    backgroundColor: '#FFF9CA',
  },
  {
    key: 's3',
    title: '',
    text: 'Luego de reirse el duende desaparece en una cortina de humo.\n'+
    'Parece que lo único que podés hacer es seguir las pistas que el duende te dejó para poder entregar el TP a tiempo.',
    image: Puff,
    imageStyle: {
        width: 250,
        height: 250,
    },
    backgroundColor: '#FFF9CA',
  },
  {
    key: 's4',
    title: 'Instrucciones',
    text: 'En esta búsqueda deberás seguir las pistas para encontrar las dos hojas perdidas.\n'+
    'Estas hojas pueden estar escondidas en cualquier lugar de la facultad.',
    image: Detective,
    imageStyle: {
        width: 303,
        height: 206,
    },
    backgroundColor: '#FFF9CA',
  },
  {
    key: 's5',
    title: 'Instrucciones - Menú',
    text: 'Este será tu menú durante la búsqueda.\n'+
    '"Mis Notas" es un log con todos los avances que hiciste en la búsqueda.\n'+
    'La "Cámara" será tu herramienta para encontrar las hojas perdidas.\n'+
    '¡Cuando crees haber encontrado el lugar de una pista apuntalo con la cámara a ver si aparece!\n'+
    'En "Podio" podrás ver tu puntaje actual, como también el de las demás personas.',
    textStyle: {
        fontSize: 17,
        textAlign: 'left',
    },
    image: Menu,
    imageStyle: {
        width: 300,
        height: 170,
    },
    backgroundColor: '#FFF9CA',
  },
  {
    key: 's6',
    title: 'Instrucciones - Inventario',
    text: 'Los objetos que encuentres en la búsqueda se agregarán automáticamente al inventario.\n'+
    'Lo podrás ver cuando estés usando la cámara como un submenú desplegable hacia arriba.\n'+
    'Para ver un objeto haz click en la opción "Ver"\n'+
    'Para usar un objeto haz click en la opción "Usar".\n'+'El objeto tendrá un marco rojo.\n'+
    'El inventario es compartido entre todos los integrantes de un equipo.\n',
    textStyle: {
        fontSize: 15,
        marginTop: 20,
        textAlign: 'left',
    },
    image: MenuInventory,
    imageStyle: {
        width: 300,
        height: 350,
    },
    backgroundColor: '#FFF9CA',
  },
  {
    key: 's7',
    title: '¡Comenzar la búsqueda!',
    text: 'Ya estás listo para comenzar la búsqueda\n'+
    'Andá a planta baja y presioná el botón "Comenzar" y activa la cámara para agarrar la carpeta a la que el duende le robó las hojas.\n'+
    'Luego ve al inventario y presiona "Ver" en la carpeta para recolectar tus primeras pistas.\n\n'+
    '¡MUCHA SUERTE!\n',
    textStyle: {
        fontSize: 17,
        marginTop: 20,
    },
    image: Carpeta,
    imageStyle: {
        width: 150,
        height: 200,
    },
    backgroundColor: '#FFF9CA',
  },
];
