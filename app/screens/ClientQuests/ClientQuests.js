import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, Text, View, Dimensions, Image, Pressable, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native'
import {FontAwesome, Entypo} from '@expo/vector-icons'
import Config from '../../../config.json'

const {width} = Dimensions.get('screen')

const ClientQuests = ({route, navigation}) => {
  //  const navigation = useNavigation()

    const {ID, name, image} = route.params

    return (
        <Text style = {styles.title}>{name}</Text> 
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#a52a2a',
    }
});


export default ClientQuests