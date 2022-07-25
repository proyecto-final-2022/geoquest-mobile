import React from 'react'
import {View, Text, StyleSheet, Pressable} from 'react-native'
import {Entypo} from '@expo/vector-icons'

const CustomButton = ({onPress, text, type = "PRIMARY", bgColor, fgColor, icon}) => {
    return (
        <Pressable 
            onPress={onPress} 
            style={[
                styles.container, 
                styles[`container_${type}`],
                bgColor ? {backgroundColor: bgColor} : {},
            ]}>
        
            <Text 
            style={[
                styles.text, 
                styles[`text_${type}`],
                fgColor ? {color: fgColor} : {}
            ]}>{text}</Text>

            <Entypo name ={icon} style = {styles.leftIcon} size={30}/>

        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '80%',

        padding: 15,
        marginVertical: 5,

        alignItems: 'center',
        borderRadius: 5,
    },

    container_PRIMARY: {
        backgroundColor: '#CA955C',
    },

    container_TERTIARY: {
    },

    text: {
        fontWeight: 'bold',
        color: 'white',
    },

    text_PRIMARY: {
    },

    text_TERTIARY: {
        color: '#CA955C',
    },
    leftIcon: {
        left: 5,
        top: 10,
        position: 'absolute',
    }
})

export default CustomButton