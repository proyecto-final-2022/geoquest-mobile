import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, Text, View, Dimensions, Image, Pressable, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native'
import {FontAwesome, Entypo} from '@expo/vector-icons'
import Config from '../../../config.json'

const {width} = Dimensions.get('screen')

const WinScreen = () => {

  return (
    <ScrollView style={styles.view}> 
      <Text>Ganaste papáaaa</Text>

    </ScrollView> 
    )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#FFF9CA',
  }
});


export default WinScreen