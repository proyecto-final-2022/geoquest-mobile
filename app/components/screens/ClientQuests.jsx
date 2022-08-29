import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, Text, View, Dimensions, Image, Pressable, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native'
import {FontAwesome, Entypo} from '@expo/vector-icons'
import Config from '../../../config.json'

const {width} = Dimensions.get('screen')

export default ClientQuests = ({route, navigation}) => {
  //  const navigation = useNavigation()

    const {ID, name, image} = route.params

    const [data, setData] = useState([])

    const url = Config.appUrl + "clients/" + ID + "/quests"

    useEffect(() => {
        fetch(url)
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error))
        .finally(()=>setLoading(false))
    }, [])

    return (
        <ScrollView style={styles.view}>
        <Text style = {styles.title}>{name}</Text> 
        </ScrollView> 
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
    }
});