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

  const [view, setView] = useState(false)
  const [description, setDescription] = useState("")
  const [qrValue, setQrValue] = useState("")

  const coupons = [
    {clientId: 1, userId: 1, description: "Medialunas Buffet 1", expirationDate: '22/11/2022', used: false, image: "https://www.frba.utn.edu.ar/wp-content/uploads/2016/10/Fachada-medrano-en-baja-e1462221529402-1024x427.jpg"},
    {clientId: 1, userId: 1, description: "Medialunas Buffet 2", expirationDate: '22/11/2022', used: false, image: "https://www.frba.utn.edu.ar/wp-content/uploads/2016/10/Fachada-medrano-en-baja-e1462221529402-1024x427.jpg"},
    {clientId: 1, userId: 1, description: "Medialunas Buffet 3", expirationDate: '22/11/2022', used: false, image: "https://www.frba.utn.edu.ar/wp-content/uploads/2016/10/Fachada-medrano-en-baja-e1462221529402-1024x427.jpg"},
    {clientId: 1, userId: 1, description: "Medialunas Buffet 4", expirationDate: '22/11/2022', used: false, image: "https://www.frba.utn.edu.ar/wp-content/uploads/2016/10/Fachada-medrano-en-baja-e1462221529402-1024x427.jpg"},
    {clientId: 1, userId: 1, description: "Medialunas Buffet 5", expirationDate: '22/11/2022', used: false, image: "https://www.frba.utn.edu.ar/wp-content/uploads/2016/10/Fachada-medrano-en-baja-e1462221529402-1024x427.jpg"},
  ]
  
  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Cupones',
      headerRight: () => (
        <Ionicons color='#a52a2a' name ='arrow-back' size={30} onPress={() => navigation.navigate('Quest Navigator')}/>
      ),
      headerTintColor: '#a52a2a',
    })
  })

  const Card = ({coupon}) => {
    return (
      <Pressable onPress={() => {
        setView(true)
        setDescription(coupon.description)
        setQrValue(JSON.stringify(
          {clientId: 1, 
            userId: 1, 
            description: "Medialunas Buffet 1", 
            expirationDate: '22/11/2022', 
            used: false
          }))
        }}>
        <View style={styles.cardContainer}>
          <View
            style={styles.couponInfo}>
              <Text style={{marginTop: 5, fontSize: 20, fontWeight: 'bold'}}>{coupon.description}</Text>
              <Text style={{marginTop: 20, fontSize: 15}}>{'Válido hasta: ' + coupon.expirationDate}</Text>
          </View>
          <Image source={{uri: coupon.image}} style={styles.image} />
        </View>
      </Pressable>
      ) 
    }

  return (
  <ScrollView style={styles.view}>
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
      visible={view}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            height:'50%', 
            width: '80%',
            backgroundColor: 'aliceblue',
            borderWidth: 10,
            borderColor: '#a52a2a', 
            }}  
        >
          <View
            style={{
              alignItems:'center'
            }}
          >
            <Pressable onPress={() => {setView(false)}}>
              <Ionicons name='close' size={35} style={{marginLeft:270}}/>
            </Pressable>
            <QRCode
              value={qrValue ? qrValue : 'NA'}
              size={290}
              color='white'
              backgroundColor='black'
            />
          </View>
          <Text style={{marginTop: 15, marginLeft: 50, fontSize: 20, fontWeight: 'bold'}}>{description}</Text>  
        </View>
      </View>
    </Modal>

  </ScrollView>
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

