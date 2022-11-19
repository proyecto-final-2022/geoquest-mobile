import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, Text, View, Pressable, Image, useWindowDimensions, TouchableOpacity, BackHandler} from 'react-native';
import {FontAwesome, Entypo, Ionicons,} from '@expo/vector-icons'
import QRCode from 'react-native-qrcode-svg'
import CustomButton from '../commons/CustomButton'
import CustomButton2 from '../commons/CustomButton2'
import CustomModal from '../commons/CustomModal';
import Storage from '../../utils/storage/storage';
import Config from '../../../config.json';
import {updateQuestRating} from '../../utils/apicalls/ApiCalls';
import { useFocusEffect } from '@react-navigation/native';
import ConfettiCannon from 'react-native-confetti-cannon';

import starFilled from '../../../assets/ratingStars/star_filled.png'
import starCorner from '../../../assets/ratingStars/star_corner.png'
import PirateGroup from '../../../assets/PirateGroup.png'

export default QuestCompleted = ({route, navigation}) => {

  const { height, width } = useWindowDimensions();

  const {
    clientId,
    userId,
    questId,
    questDuration,
    qr, 
    questName,
    questScore,
    questTime,
    questDifficulty,
    startTime,
    isConfettiVisible = true
  } = route.params;

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        exitScreen();
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress',onBackPress);
      return () => { BackHandler.removeEventListener('hardwareBackPress',onBackPress) };
    }, []),
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: '¡Búsqueda completada!',
      headerTintColor: '#a52a2a',
      headerRight: () => (
        <Ionicons color='#a52a2a' name ='arrow-back' size={30} onPress={() => exitScreen()}/>
      ),
      headerSearchBarOptions: {
        placeholder: "Search",
      }
    })
  })

  const exitScreen = () => {
    navigation.navigate('Quest Navigator');
  }

  //CustomRatingBar
  const [isStarModalVisible, setStarModalVisible] = useState(false);
  const toggleStarModal = () => {setStarModalVisible(!isStarModalVisible)};
  const [starRating, setDefaultRating] = useState(3);
  const maxRating = [1,2,3,4,5];

  const CustomRatingBar = () => {
    return (
      <View style={styles.customRatingBar}>
        {
          maxRating.map((item, key) => {
            return (
              <TouchableOpacity activeOpacity={0.7} key={item} onPress={() => setDefaultRating(item)}>
                <Image style={styles.starImg} source={item <= starRating ? starFilled : starCorner}/>
              </TouchableOpacity>
            )
          })
        }
      </View>
    )
  }
  const refreshUserRanking = () => {
    Storage.getObject('user').then(user => {
      fetch(
        Config.appUrl+'quests/'+questId+'/rating/'+user.id, {
          method: 'GET',
          headers: {'Content-Type': 'application/json'}
      })
      .then(response => {
        if(!response.ok) return;
        else response.json().then( (data) => {
          setDefaultRating(data.rate);
        })
        .catch((error) => {
          console.log('error: ' + error);
          this.setState({ requestFailed: true });
        });
      })
      .catch(error => {
        console.error(error);
      })
    })
  }
  const updateRating = () => {
    Storage.getObject('user').then(user => {
      updateQuestRating(user.id, questId, starRating);
    })
  }

  //QR
  const [isQRModalVisible, setQRModalVisible] = useState(false);
  const toggleQRModal = () => {setQRModalVisible(!isQRModalVisible)};

  //Confetti
  let confettiExplosion;
  useEffect(() => {
    if(isConfettiVisible == true){
      confettiExplosion.start();
    }
  })

  // const calculateQuestTime = (number) => {
  //   const miliseconds = number % 1000;
  //   const seconds = Math.floor(number/1000 % 60);
  //   const minutes = Math.floor(number/1000/60 % 60);
  //   const hours = Math.floor(number/1000/60/60 % 24);
  //   const days = Math.floor(number/1000/3600/24);
  //   return (days > 0? days+':' : '')+hours+':'+minutes+':'+seconds;//+'.'+miliseconds;
  // }
  // const calculateQuestTime2 = () => {
  //   const d1 = new Date();
  //   d1.setMilliseconds(123);
  //   d1.setSeconds(56);
  //   d1.setMinutes(34);
  //   d1.setHours(12);
  //   d1.setDate(1);
  //   d1.setMonth(11);
  //   d1.setFullYear(2022);

  //   const d2 = new Date();
  //   d2.setMilliseconds(0);
  //   d2.setSeconds(0)
  //   d2.setMinutes(0);
  //   d2.setHours(0);
  //   d2.setDate(1);
  //   d2.setMonth(10);
  //   d2.setFullYear(2022);

  //   return calculateQuestTime(d1 - d2);
  // }

  return (
    <View style={styles.view}>
      { isConfettiVisible &&
        <ConfettiCannon 
          style={{flex: 2, zIndex: 1}}
          count={200}
          origin={{x: -10, y: 0}}
          fadeOut={true}
          autoStart={false}
          ref={ref => (confettiExplosion = ref)}
          onAnimationEnd={() => {
            route.params.isConfettiVisible = false;
          }}
        />
      }
      <Text style={styles.title}>
        ¡Completaste {questName}!
      </Text>
      <Image
        source = {PirateGroup}
        style={{flex: 1, width: width * 0.9, zIndex: -1}}
        resizeMode="contain"
      />
      <View style={styles.scoreContainer}>
        <View style={{flex: 1, padding: 10}}>
          <View style={{flex: 1}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.scoreTitle}>
                Tiempo
              </Text>
              <FontAwesome name ='hourglass-half' color={'black'} size={25} style={{marginLeft:5}}/>
            </View>
            <Text style={styles.scoreValue}>
              {questTime}
            </Text>
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.scoreTitle}>
                Puntaje
              </Text>
              <FontAwesome name ='star' color={'black'} size={25} style={{marginLeft:5}}/>
            </View>
            <Text style={styles.scoreValue}>
              {questScore}
            </Text>
          </View>
        </View>
        <View style={{flex: 1, padding: 10}}>
          <View style={{flex: 1}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.scoreTitle}>
                Dificultad
              </Text>
            <Entypo name ='gauge' color={'black'} size={25} style={{marginLeft:5}}/>
            </View>
            <Text style={styles.scoreValue}>
              {questDifficulty}
            </Text>
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.scoreTitle}>
                Duración
              </Text>
              <FontAwesome name ='clock-o' color={'black'} size={25} style={{marginLeft:5}}/>
            </View>
            <Text style={styles.scoreValue}>
              {questDuration.substring(0,questDuration.indexOf("."))+"s"/* {Date.parse(questDuration).toString()} */}
            </Text>
          </View>
        </View>
      </View>
      <View style={{flex: 2, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: -1}}>
        <CustomButton2 
          onPress={() => {
            toggleQRModal();
          }}
          icon = "qr-code-outline"
          bgColor= '#CA955C'
          fgColor = 'white'
          text = {'Ver'+'\n'+'cupón'}
          style={styles.buttonStyle}
          textStyle={styles.buttonTextStyle}
          iconStyle={styles.iconStyle}
          iconColor='black'/>
        <CustomButton2 
          onPress={() => {
            refreshUserRanking();
            toggleStarModal();
          }}
          icon = "star"
          bgColor= '#CA955C'
          fgColor = 'white'
          text = {'Calificar'+'\n'+'busqueda'}
          style={styles.buttonStyle}
          textStyle={styles.buttonTextStyle}
          iconStyle={styles.iconStyle}
          iconColor='#FFEA00'/>
        <CustomButton2 
          onPress={() => {
            exitScreen()
          }}
          icon = "exit-outline"
          bgColor= 'grey'
          fgColor = 'white'
          text = 'Salir'
          style={styles.buttonStyle}
          textStyle={styles.buttonTextStyle}
          iconStyle={styles.iconStyle}
          iconColor='#a52a2a'/>
      </View>

      <CustomModal visible={isQRModalVisible} dismiss={() => {toggleQRModal()}}>
        <View style={{flex: 1}}/>
        <View style={[{flex: 3}, styles.qrModal]}>
          <Pressable style={{alignSelf:'flex-end'}} onPress={() => {toggleQRModal()}}>
            <Ionicons size={35} name='close'/>
          </Pressable>
          { (qr != undefined && qr.id != undefined) &&
            <>
              <View style={{borderWidth: 8, borderColor: 'white'}}>
                <QRCode
                  value={qr ? JSON.stringify(qr) : 'NA'}
                  color='black'
                  size={Dimensions.get('window').width / 1.8}
                  backgroundColor='white'/>
              </View>
              <Text style={{fontWeight: 'bold', margin: 15}}>{qr.description}</Text>
            </>
          }
          { (qr == undefined || qr.id == undefined) &&
            <>
              <Ionicons size={70} name='sad-outline'/>
              <Text style={{fontWeight: 'bold', margin: 15, textAlign: 'center'}}>
                No se a generado ningun cupón por esta busqueda. 
                Esto puede ser porque ya ha ganado un cupón en esta búsqueda o su puntaje final no fue suficiente para generar un cupón.
              </Text>
            </>
          }
          <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: 2}}>
            <Text style={{textAlign: 'justify', fontSize: 10}}>
              Recuerde que puede ver todos sus cupones ganados en la sección "Cupones" del menú lateral.
            </Text>  
          </View>
        </View>
        <View style={{flex: 1}}/>
      </CustomModal>

      <CustomModal visible={isStarModalVisible} dismiss={toggleStarModal}>
        <View style={{flex: 1}}/>
        <View style={styles.customRating}>
          <Text>¡Califica esta búsqueda!</Text>
          <CustomRatingBar/>
          <Text>{'\n'+starRating+'/'+maxRating.length+'\n'}</Text>
          <CustomButton
            onPress={() => {
              updateRating();
              toggleStarModal();
            }}
            style={{marginTop: 100}}
            bgColor= '#CA955C'
            fgColor = 'white'
            text = 'Guardar'/>
          <CustomButton
            onPress={() => {
              toggleStarModal();
            }}
            style={{marginTop: 100}}
            bgColor= 'grey'
            fgColor = 'white'
            text = 'Volver'/>
        </View>
        <View style={{flex: 1}}/>
      </CustomModal>
    </View>
  )
}
   
const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#FFF9CA',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    flex: 0.5, 
    fontWeight: 'bold', 
    color: '#a52a2a', 
    fontSize: 22, 
    alignSelf: 'stretch', 
    textAlign: 'center', 
    textAlignVertical: 'center',
    zIndex: -1
  },
  scoreContainer: {
    flex: 1.3, 
    padding: 10,
    flexDirection: 'row',
    backgroundColor: '#CA955C',
    borderRadius: 10,
    zIndex: -1
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
  },
  buttonStyle: {
    width: '40%',
  },
  buttonTextStyle: {
    flexBasis: 200,
    flexShrink: 1,
    flexGrow: 1,
    textAlign: 'center'
  },
  iconStyle: {
    // flexBasis: 100,
    // flexShrink: 1,
    // flexGrow: 1
  },
  scoreTitle: {
    fontWeight: 'bold',
    color: '#a52a2a',
    fontSize: 17
  },
  scoreValue: {
    fontWeight: 'bold', 
    color: 'white', 
    fontSize: 24
  },
  qrModal: {
    alignItems: 'center',
    backgroundColor: '#ffefd5',
    margin: 20,
    borderWidth: 3,
    borderRadius:10,
    borderColor: '#CA955C'
  },
});

