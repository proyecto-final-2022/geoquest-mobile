import React from 'react'
import {View, Text, StyleSheet, Pressable} from 'react-native'
import {FontAwesome, Ionicons} from '@expo/vector-icons'

export default CustomButton2 = ({onPress, text, type = "PRIMARY", bgColor, fgColor, icon, style = {}, textStyle = {}, iconStyle = {}, iconColor = 'white'}) => {
  return (
		<Pressable onPress={onPress} >  
      <View style={[
        styles.customButtonContainer,
        styles.container, 
        styles[`container_${type}`],
        bgColor ? {backgroundColor: bgColor} : {},
        style
        ]}>
        
        <Text 
          style={[
            styles.text, 
            styles[`text_${type}`],
            fgColor ? {color: fgColor} : {},
            textStyle
          ]}>{text}</Text>
        <Ionicons name ={icon} style={[styles.icon, iconStyle]} color={iconColor} size={30}/>
    
      </View>
		</Pressable>
  )
}

const styles = StyleSheet.create({
  customButtonContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
  },
  container: {
    width: '30%',

    padding: 15,
    marginVertical: 5,

    borderRadius: 5,
  },

  container_PRIMARY: {
    backgroundColor: '#CA955C',
  },

  container_TERTIARY: { },

  text: {
    fontWeight: 'bold',
    color: 'white',
		flexBasis: 55,
    flexShrink: 0,
    flexGrow: 0,
	
  },
  text_PRIMARY: {},
  text_TERTIARY: {
    color: '#CA955C',
  },
  icon: {
		flexBasis: 30,
    flexShrink: 0,
    flexGrow: 0,
  }
})