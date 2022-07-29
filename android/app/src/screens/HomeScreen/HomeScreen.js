import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, ScrollView, Text, View } from 'react-native';
import CustomButton from '../../components/CustomButton'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native'

const HomeScreen = () => {
    const navigation = useNavigation()
    
    const onSignOutGoogle = async () =>  {
        await GoogleSignin.signOut()
        navigation.navigate('Sign In')
      }
  
    return (
        <ScrollView style={styles.view}>
            <Text style = {styles.title}>Home</Text>
            <CustomButton 
                text ="Sign Out Google"
                onPress = {onSignOutGoogle}
                type="TERTIARY"
            />
        </ScrollView>
        
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
    }, 
});


export default HomeScreen