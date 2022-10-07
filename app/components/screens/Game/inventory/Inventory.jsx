import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, ActivityIndicator, Text, View, Dimensions, Image, Pressable, FlatList} from "react-native";
import {Avatar} from 'react-native-paper';
import userImage_1 from '../../../../../assets/medals/bronze.png'
import userImage_2 from '../../../../../assets/medals/silver.png'
import userImage_3 from '../../../../../assets/medals/gold.png'

const Inventory = () => {

  const items = [{
    id: 1,
    questItemID: 1,
    image: "1",
    combinable: [2]
  },
  {
    id: 2,
    questItemID: 2,
    image: "2",
    combinable: [1]
  },
  {
    id: 3,
    questItemID: 3,
    image: "3"
  } 
  ]
  
  const getUserImage = (imageNumber) => { 
    const userImages = [userImage_1, userImage_2, userImage_3];
    return userImages[imageNumber-1];
  }

  const Item = ({item, index}) => {
    return (
      <View style={styles.itemContainer}> 
        <Image 
          source={getUserImage(item.image)}
          size={50}
          style={styles.itemImage}
        />
      </View>
    )
  }

  return (
    <View style={styles.view}>
      {items.map((item, index) => <Item item={item} index={index}/>)}

    </View> 
    )
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'linen',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  itemContainer: {
    marginRight: 10,
    backgroundColor: 'tan',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: 70,
    height: 70
  },
  itemImage: {
    width: '100%',
    maxWidth: 40,
    maxHeight: 40,
  },
});


export default Inventory