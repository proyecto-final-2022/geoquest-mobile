import React, { useRef, useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, ScrollView, Modal, View, Pressable, Image} from 'react-native';
import Lebron from '../../../../assets/medals/silver.png'
import {Ionicons} from '@expo/vector-icons'

export default function DescriptionModal2({ctx}) {

  return (        
      <Modal
        animationType="slide"
        onDismiss={() => console.log('close')}
        onShow={() => console.log('show')}
        transparent
        visible={ctx.visualize2}
      >
        <View
          style={{
            flex: 1,
            marginTop: 200,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              height:'40%', 
              width: '90%',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              backgroundColor: 'linen',
              borderWidth: 5,
              borderColor: '#a52a2a', 
            }}  
          >
            <View style={{flexDirection: 'row-reverse'}}>
              <Pressable onPress={() => {
                ctx.setObjectVisualize2(false)}}>
                <Ionicons name='close' size={35}/>
              </Pressable>
            </View>


            <ScrollView>
                <View style={{flexDirection: 'column', justifyContent: 'space-around'}}>
          
                  <Text style={{fontWeight: 'bold', color: 'darkred', fontSize: 20}}>hola</Text>
          
                </View>
            </ScrollView>

  
          </View>
        </View>
      </Modal>
  );
}


const styles = StyleSheet.create({
  hintModal: {

  },
  itemImage: {
    width: '100%',
    marginTop: 30,
    maxWidth: 60,
    maxHeight: 60,
  },
  descriptionText: {
    flexBasis: 300,
    flexShrink: 0,
    flexGrow: 0
  },
  descriptionImage: {
    flexBasis: 50,
    flexShrink: 0,
    flexGrow: 0
  }
});
