import React, { useState, useEffect } from 'react'
import {View, Text, StyleSheet, Pressable, Modal} from 'react-native'
import {FontAwesome} from '@expo/vector-icons'

export default PopUpWindow = ({onPress}) => {

  const [show, setShow] = useState(false)

  const showWindow = () => {setShow(true)}

  const Close = () => {setShow(false)}

  return (
    <Modal
      animationType={'fade'}
      transparent = {true}
      visible = {show}
      onRequestClose = {Close()}
    >
    
    <View style={{flex: 1, backgroundColor: '#000000AA', justifyContent: 'flex-end'}}>
    </View>
            
    </Modal>      
      )
  }