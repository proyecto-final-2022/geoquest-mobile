import React from 'react'
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native'
import {AntDesign} from '@expo/vector-icons'

const CustomInput = ({value, setValue, placeholder, icon, secureTextEntry}) => {
    return (
        <View style = {styles.container}>
            <TextInput 
                value = {value}
                onChangeText={setValue}
                placeholder={placeholder}
                style={styles.input}
                secureTextEntry={secureTextEntry}>
            </TextInput>
            <AntDesign name ={icon} style = {styles.leftIcon} size={30}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '80%',

        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5, 

        paddingHorizontal: 10,
        paddingVertical: 10,
        marginVertical: 10,
    },
    input: {
        left: 35,
    },
    leftIcon: {
        left: 5,
        top: 10,
        position: 'absolute',
    }
})

export default CustomInput