import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, ScrollView, ActivityIndicator, Text, View, Dimensions, Image, Modal, TouchableOpacity, Pressable, FlatList} from "react-native";
import {Avatar} from 'react-native-paper';
import userImage_1 from '../../../../../assets/medals/bronze.png'
import userImage_2 from '../../../../../assets/medals/silver.png'
import userImage_3 from '../../../../../assets/medals/gold.png'

const Inventory = () => {
  //Despues cambiar esto con un useEffect despues de ejecutar el llamado
  const [visibleMenu, setVisibleMenu] = useState([false, false, false])
  const [items, setItems] = useState([{
    questItemID: 1,
    image: "1",
    combinable: [2],
    visibleMenu: false
  },
  {
    questItemID: 2,
    image: "2",
    combinable: [1],
    visibleMenu: false
  },
  {
    questItemID: 3,
    image: "3",
    visibleMenu: false
  } 
  ])

  const options = [
    {
      title: 'Ver',
      action: (index) =>  {
        let itemsList = [...items];
        let item = {
        ...itemsList[index],
        visibleMenu: false
      }
     itemsList[index] = item;
     setItems(itemsList);
      }

    },
    {
      title: 'Combinar',
      action: () => {console.log('Combinar')}
    },
    {
      title: 'Usar',
      action: () => {console.log('Usar')}
    }
  ]
  
  const getUserImage = (imageNumber) => { 
    const userImages = [userImage_1, userImage_2, userImage_3];
    return userImages[imageNumber-1];
  }

  const Item = ({item, index}) => {
    return (
            
      <View style={styles.container}>
           {items[index].visibleMenu && 
                <View style={styles.popup}>
                {console.log(visibleMenu)}
                {options.map((op, i) => (
                  <TouchableOpacity key={i} onPress={() => op.action(index)}>
                    <Text>{op.title}</Text>
                  </TouchableOpacity>
                )
                )}
              </View>      
          }

      <TouchableOpacity key={index} onPress={() =>       
        {
          let itemsList = [...items];
          let item = {
          ...itemsList[index],
          visibleMenu: true
        }

      itemsList[index] = item;
      setItems(itemsList);
      }
      }>
        <View style={styles.itemContainer}> 
          <Image 
            source={getUserImage(item.image)}
            size={50}
            style={styles.itemImage}
          />
        </View>
      </TouchableOpacity>
        </View>
          
    )
  }

  return (
    <>
      <View style={styles.view}>
        <FlatList
          contentContainerStyle={{alignItems: 'center'}}
          extraData={items}
          showsHorizontalScrollIndicator = {false}
          horizontal={true}
          data={items}
          renderItem={({item, index}) => <Item item={item} index={index}/>}>      
        </FlatList> 
    </View> 
    </> 
    
    )
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'linen',
    alignItems: 'center',
    height: '100%'
  },
  container: {
    flexDirection: 'column'
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
  popup: {
    borderRadius: 8,
    borderColor: '#333',
    borderWidth: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginBottom: 5,
    marginTop: -70,

   }
});


export default Inventory