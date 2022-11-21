import React, { useState, useEffect } from 'react';
import { StyleSheet, PixelRatio , BackHandler, ActivityIndicator, Text, View, Dimensions, Image, Pressable, FlatList, TouchableOpacity, TextInput} from 'react-native';
import QRCode from 'react-native-qrcode-svg'
import {Button} from 'react-native'
import {useFocusEffect} from '@react-navigation/native'
import {FontAwesome, Entypo, Ionicons} from '@expo/vector-icons'
import Config from '../../../config.json'
import Tags from "react-native-tags"
import CustomModal from '../commons/CustomModal';

export default Coupons = ({route, navigation}) => {
  
  const user = route.params

  const [loading, setLoading] = useState(true)
  const [coupons, setCoupons] = useState([])
  const [couponView, setCouponView] = useState(false)
  const [description, setDescription] = useState("")
  const [qrValue, setQrValue] = useState("")

  const url = Config.appUrl + "users/" + user.id + "/coupons"

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Cupones',
      headerRight: () => (
        <Ionicons color='#a52a2a' name ='arrow-back' size={30} onPress={() => navigation.navigate('Quest Navigator')}/>
      ),
      headerTintColor: '#a52a2a',
    });
    setLoading(true);

    fetch(url)
    .then((response) => response.json())
    .then((json) => setCoupons(json))
    .catch((error) => console.error(error))
    .finally(()=>setLoading(false))
    .catch((error) => console.error(error))
  }, [route])
  
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('Quest Navigator')
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress',onBackPress);
      return () => { BackHandler.removeEventListener('hardwareBackPress',onBackPress) };
    }, []),
  );

  const Card = ({coupon}) => {
    return (
      <Pressable onPress={() => {
        setCouponView(true)
        setDescription(coupon.description)
        setQrValue(JSON.stringify(
          { 
            userId: user.id,
            couponId: coupon.id,
            clientId: coupon.client_id, 
            description: coupon.description, 
            expirationDate: coupon.expiration_date, 
            used: false
          }))
        }}>
        <View style={styles.cardContainer}>
          <View
            style={styles.couponInfo}>
              <Text style={{marginTop: 5, fontSize: 20, fontWeight: 'bold'}}>{coupon.description.length > 15? (coupon.description.substring(0,14))+'...' : coupon.description}</Text>
              <Text style={{marginTop: 20, fontSize: 15}}>{'Válido hasta: ' + coupon.expiration_date.split('T')[0]}</Text>
          </View>
          <Image source={{uri: "https://www.frba.utn.edu.ar/wp-content/uploads/2016/10/Fachada-medrano-en-baja-e1462221529402-1024x427.jpg"}} style={styles.image} />
        </View>
      </Pressable>
    ) 
  }

  return (
    <>
      {
        loading && 
        <View style={{flex: 1, justifyContent: "center"}}>
          <ActivityIndicator size="large" style={{justifyContent: "center", paddingTop: 50, transform: [{ scaleX: 2 }, { scaleY: 2 }]}}/>
        </View>
      }
      { !loading && 
        <View style={styles.view}>
          {/* <Text>{' width: '+Dimensions.get('window').width}</Text>
          <Text>{' height: '+Dimensions.get('window').height}</Text>
          <Text>{' '+PixelRatio.getPixelSizeForLayoutSize(Dimensions.get('screen').width)}</Text>
          <Text>{' '+PixelRatio.getPixelSizeForLayoutSize(Dimensions.get('screen').height)}</Text> */}
          <FlatList
            horizontal= {false}
            contentContainerStyle={{paddingLeft: 20, paddingVertical: 20}}
            showsHorizontalScrollIndicator = {false}
            data={coupons}
            renderItem={({item, index}) => <Card coupon={item} key={index}/>}>      
          </FlatList>

          <CustomModal visible={couponView} dismiss={() => {setCouponView(false)}}>
            <View style={{flex: 1}}/>
            <View style={{
                flex: 3,
                alignItems: 'center',
                backgroundColor: '#ffefd5',
                margin: 20,
                borderWidth: 3,
                borderRadius:10,
                borderColor: '#CA955C'
              }}>
                <Pressable style={{alignSelf:'flex-end'}} onPress={() => {setCouponView(false)}}>
                  <Ionicons size={35} name='close'/>
                </Pressable>
                <View style={{borderWidth: 8, borderColor: 'white'}}>
                  <QRCode
                    value={qrValue ? qrValue : 'NA'}
                    color='black'
                    size={Dimensions.get('window').width / 1.8}
                    backgroundColor='white'/>
                </View>
              <Text style={{fontWeight: 'bold', margin: 15}}>{description}</Text>  
            </View>
            <View style={{flex: 1}}/>

            {/* <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  height:'50%', 
                  width: '80%',
                  backgroundColor: 'aliceblue',
                  borderWidth: 10,
                  borderColor: '#a52a2a', 
                }}>
                <View
                  style={{
                    alignItems:'center'
                  }}>
                  <Pressable onPress={() => {setCouponView(false)}}>
                    <Ionicons name='close' size={35} style={{marginLeft:50}}/>
                  </Pressable>
                  <QRCode
                    value={qrValue ? qrValue : 'NA'}
                    size={200}
                    color='white'
                    backgroundColor='black'/>
                </View>
                <Text style={{marginTop: 15, marginLeft: 50, fontSize: 20, fontWeight: 'bold'}}>{description}</Text>  
              </View>
            </View> */}
          </CustomModal>
        </View>
      }
    </>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#FFF9CA',
  },
  cardContainer:{
    height: 150,
    width: '95%',
    backgroundColor: '#ffefd5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 5,
    marginTop:10,
    padding: 15, 
  },
  couponInfo:{
    flexDirection: 'column',
    justifyContent: 'space-around' 
  },
  image:{
    width: 100,
    height: 100,
    borderRadius: 100/2
  }
});

