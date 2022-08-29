import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {Controller} from 'react-hook-form';
import {AntDesign} from '@expo/vector-icons'

export default CustomInput = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
  icon,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <View
            style={[
              styles.container,
              {borderColor: error ? 'red' : '#e8e8e8'},
            ]}>
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              style={styles.input}
              secureTextEntry={secureTextEntry}
            />
            <AntDesign name ={icon} style = {styles.leftIcon} size={30}/>
          </View>
          {error && (
            <Text style={{color: 'red', right: 70}}>{error.message || 'Error'}</Text>
          )}
        </>
      )}
    />
  );
};

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