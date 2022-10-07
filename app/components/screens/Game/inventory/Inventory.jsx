import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, ScrollView, ActivityIndicator, Text, View, Dimensions, Image, Modal, TouchableOpacity, Pressable, FlatList} from "react-native";
import {Avatar} from 'react-native-paper';
import userImage_1 from '../../../../../assets/medals/bronze.png'
import userImage_2 from '../../../../../assets/medals/silver.png'
import userImage_3 from '../../../../../assets/medals/gold.png'

const Inventory = () => {
  //Despues cambiar esto con un useEffect despues de ejecutar el llamado
  const [items, setItems] = useState([
    {
      questItemID: 1,
      image: "2",
      combinable: [
        {
          combinableQuestItemID: 2,
          image: "3"
        }    
      ],
      visibleMenu: false,
      marker: false
    },
    {
    questItemID: 2,
    image: "1",
    combinable: [
      {
        combinableQuestItemID: 1,
        image: "3"
      }
    ],
    visibleMenu: false,
    marker: false
  },
  {
    questItemID: 3,
    image: "2",
    visibleMenu: false,
    marker: false
  } 
  ])

  const options = [
    {
      title: 'Ver',
      action: (item, index) =>  {
        let itemsList = [...items];
        let itemNotVisible = {
        ...itemsList[index],
        visibleMenu: false
      }
     itemsList[index] = itemNotVisible;
     setItems(itemsList);
      }

    },
    {
      title: 'Combinar',
      action: (item, index) => {
        var itemsToCombine = []
        item.combinable.forEach(combine => itemsToCombine.push(items.find(item => item.questItemID == combine.combinableQuestItemID)) )
        var combinableItemsIDs = []
        itemsToCombine.forEach(item => combinableItemsIDs.push(items.indexOf(item)))
        combinableItemsIDs.forEach(id => {
          let itemsList = [...items];
          let itemMarked = {
          ...itemsList[id],
          marker: true
          }
         itemsList[id] = itemMarked;
         setItems(itemsList);       
        })

      }
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
                {options.map((op, i) => (
                  <TouchableOpacity style={[styles.option, {borderBottomWidth: i === options.length - 1 ? 0 : 1}]} key={i} onPress={() => op.action(item, index)}>
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
        <View style={[styles.itemContainer, item.marker ? {borderWidth: 8, borderColor: 'seagreen'} : {} ]}> 
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
    marginTop: -100,
   },
   option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 7,
    borderBottomColor: '#ccc'
   }
});


export default Inventory