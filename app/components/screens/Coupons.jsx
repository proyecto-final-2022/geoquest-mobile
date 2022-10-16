import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Modal, ActivityIndicator, Text, View, Dimensions, Image, Pressable, FlatList, TouchableOpacity, TextInput} from 'react-native';
import QRCode from 'react-native-qrcode-svg'
import {Button} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {FontAwesome, Entypo, Ionicons} from '@expo/vector-icons'
import Config from '../../../config.json'
import Tags from "react-native-tags"

const {width} = Dimensions.get('screen')

export default Coupons = ({route, navigation}) => {
  
  const user = route.params

  const [loading, setLoading] = useState(true)
  const [coupons, setCoupons] = useState([])
  const [view, setView] = useState(false)
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

  const Card = ({coupon}) => {
    return (
      <Pressable onPress={() => {
        setView(true)
        setDescription(coupon.description)
        setQrValue(JSON.stringify(
          { 
            userId: user.id,
            couponId: coupon.id, 
            description: coupon.description, 
            expirationDate: coupon.expiration_date, 
            used: false
          }))
        }}>
        <View style={styles.cardContainer}>
          <View
            style={styles.couponInfo}>
              <Text style={{marginTop: 5, fontSize: 20, fontWeight: 'bold'}}>{coupon.description}</Text>
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
          <FlatList
            horizontal= {false}
            contentContainerStyle={{paddingLeft: 20, paddingVertical: 20}}
            showsHorizontalScrollIndicator = {false}
            data={coupons}
            renderItem={({item}) => <Card coupon={item}/>}>      
          </FlatList>

          <Modal
            animationType="slide"
            transparent
            visible={view}>
            <View
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
                  <Pressable onPress={() => {setView(false)}}>
                    <Ionicons name='close' size={35} style={{marginLeft:270}}/>
                  </Pressable>
                  <QRCode
                    value={qrValue ? qrValue : 'NA'}
                    size={200}
                    color='white'
                    backgroundColor='black'/>
                </View>
                <Text style={{marginTop: 15, marginLeft: 50, fontSize: 20, fontWeight: 'bold'}}>{description}</Text>  
              </View>
            </View>
          </Modal>
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

