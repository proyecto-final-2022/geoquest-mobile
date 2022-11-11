import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, ScrollView, ActivityIndicator, Text, View, Dimensions, Image, Modal, TouchableOpacity, Pressable, FlatList} from "react-native";
import itemImage_1 from '../../../../../assets/questItems/paper.png'
import itemImage_2 from '../../../../../assets/questItems/key.png'
import itemImage_3 from '../../../../../assets/questItems/folder.png'
import QuestLocal from '../../../../redux/slices/questLocal'
import {useSelector, useDispatch} from "react-redux";


const Inventory = ({props}) => {
  const questState = useSelector(state => state.quest);
  const dispatch = useDispatch();

    useEffect(() => {
      console.log("**********Inventory: ", questState.inventory)
      var inventory =  questState.inventory ?? []

      var inventoryItems = inventory.map(item => 
      ({
        "title": props.questConfig.items[item].title,
        "description": props.questConfig.items[item].description,
        "image": props.questConfig.items[item].image,
        "questItemID": item,
        "visibleMenu": false,
        "marker": false
      })
      )
    
    setItems(inventoryItems)
      
  }, [questState.inventory]);


  const [items, setItems] = useState([])

  const hideMenu = (index) => {
    let itemsList = [...items];
    let itemNotVisible = {
    ...itemsList[index],
    visibleMenu: false
    }
    itemsList[index] = itemNotVisible;
    setItems(itemsList);    
  }

  const showMenu = (index) => {
    let itemsList = [...items];
    let item = {
    ...itemsList[index],
    visibleMenu: true
  }

  itemsList[index] = item;
  setItems(itemsList);
}

  const options = [
    {
      title: 'Ver',
      action: (item, index) =>  {
        hideMenu(index)
        const action = QuestLocal.actions.setVisualizer(
          {
            itemID: item.questItemID,
            title: item.title,
            description: item.description,
            image: item.image
          })
        dispatch(action)   
        props.ctx.handleSnapPress(0)
      }
    },
    {
      title: 'Usar',
      action: (item, index) => {
        const action = QuestLocal.actions.selectItem(
        { selectedItem: {
          itemID: item.questItemID,
          name: item.title
          }        
          })
        dispatch(action)  
        hideMenu(index)
      }
    }
  ]
  
    
  const getItemImage = (imageNumber) => { 
    const itemImages = [itemImage_1, itemImage_2, itemImage_3];
    return itemImages[imageNumber-1];
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

      <TouchableOpacity key={index} onPress={() => {item.marker ? combineItem(item) : showMenu(index)} }>
         
        <View style={[styles.itemContainer, item.marker ? {borderWidth: 8, borderColor: 'seagreen'} : {} ]}> 
          <Image 
            source={getItemImage(item.image)}
            size={50}
            style={styles.itemImage}
          />
        </View>
      </TouchableOpacity>
        </View>
          
    )
  }

  return (
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