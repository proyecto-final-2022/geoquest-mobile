import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, Text, View, Dimensions, Image} from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native'
import { CloseSession, GetData } from '../../storage/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from '../../../../../config.json'
import { Colors } from 'react-native/Libraries/NewAppScreen';

const {width} = Dimensions.get('screen')

const QuestNavigator = () => {
    const navigation = useNavigation()

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    const url = Config.appUrl + "clients/"

    useEffect(() => {
        fetch(url)
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error))
        .finally(()=>setLoading(false))
    }, [])

    const getData = () => {
        if (loading) {
            return <ActivityIndicator size="large" />
         }
         return (
            data.map( (client, index) => 
            <View  style={styles.optionCard} key = {index}>
                <Image style={styles.optionCardImage} source={{uri: client.image}} />
                <Text style={{textAlign: 'center', marginTop:10, fontSize:18, fontWeight: 'bold'}}>{client.name}</Text>
            </View>        
            )
         )
    
    }
    return (
        <ScrollView style={styles.view}> 
        <Text style = {styles.title}>Elige tu lugar de búsqueda</Text>

        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{height: 400}}
        >

        <View style={styles.optionListContainer}>
        {getData()}
        </View>

        </ScrollView> 


        </ScrollView> 
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#a52a2a',
        margin: 10,
    },
    view: {
        flex: 1,
        backgroundColor: '#FFF9CA',
        height: 400
    }, 
    optionListContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        paddingHorizontal: 20,
    },
    optionCard: {
        height: 240,
        marginRight: 20,
        width: width/2 - 30,
        elevation: 15,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        borderRadius: 20,
        paddingTop: 10,
        paddingHorizontal: 10
    },
    optionCardImage: {
        height: 140,
        borderRadius: 10,
        width: '100%'
    },

});


export default QuestNavigator