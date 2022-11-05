import React, { useRef, useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, ScrollView, Modal, View, Pressable, Image} from 'react-native';
import itemImage_1 from '../../../../assets/questItems/paper.png'
import itemImage_2 from '../../../../assets/questItems/key.png'
import itemImage_3 from '../../../../assets/questItems/folder.png'

import {Ionicons} from '@expo/vector-icons'

export default function DescriptionModal({props}) {
  
  const getItemImage = (imageNumber) => { 
    const itemImages = [itemImage_1, itemImage_2, itemImage_3];
    return itemImages[imageNumber-1];
  }

  return (
    <View>        
      {/* // <Modal
      //   animationType="slide"
      //   onDismiss={() => console.log('close')}
      //   onShow={() => console.log('show')}
      //   transparent={true}
      //   visible={props.itemDescription.visible}
      // > */}
            <View
          // style={{
          //   flex: 1,
          //   marginTop: 200,
          //   flexDirection: 'column',
          //   justifyContent: 'center',
          //   alignItems: 'center',
          // }}
        >
          <View
            // style={{
            //   height:'40%', 
            //   width: '90%',
            //   flexDirection: 'column',
            //   justifyContent: 'space-evenly',
            //   backgroundColor: 'linen',
            //   borderWidth: 5,
            //   borderColor: '#a52a2a', 
            // }}  
          >



            {/* <ScrollView>
                <View style={{flexDirection: 'column', justifyContent: 'space-around'}}>
          
                  <Text style={{fontWeight: 'bold', color: 'darkred', fontSize: 20}}>{props.itemDescription.title}</Text>
            
                  <View style={{flexDirection: 'row'}}>
                    <View style={styles.descriptionText}>
                      <Text style={{fontWeight: 'bold', fontSize: 15, marginTop: 30}}>{props.itemDescription.description}</Text>
                    </View>

                    <View style={styles.descriptionImage}>
                      <Image 
                        source={getItemImage(props.itemDescription.image)}
                        style={styles.itemImage}
                        size={50}
                      />
                    </View>
                                        
                  </View>
                </View>
            </ScrollView> */}

  
          </View>
        </View>
        </View>
      // </Modal>
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
