import React from 'react'
import {View, Text, StyleSheet, Pressable} from 'react-native'
import {FontAwesome, Ionicons} from '@expo/vector-icons'

export default IconButton = ({onPress, text, type = "PRIMARY", bgColor, fgColor, icon}) => {
  return (
		<Pressable 
      onPress={onPress} >  
		<View style={[
			styles.customButtonContainer,
			styles.container, 
			styles[`container_${type}`],
			bgColor ? {backgroundColor: bgColor} : {},
			]}>
			
		<Ionicons name ={icon} color={'white'} size={35}/>
  
    </View>
		</Pressable>
    )
}

const styles = StyleSheet.create({
  customButtonContainer: {
		flexDirection: 'row',

  },
  container: {
    width: '30%',

    padding: 15,
    marginVertical: 5,

    borderRadius: 30,
  },

  container_PRIMARY: {
    backgroundColor: '#CA955C',
  },

  container_TERTIARY: { },

  text_PRIMARY: {},
  text_TERTIARY: {
    color: '#CA955C',
  },
})