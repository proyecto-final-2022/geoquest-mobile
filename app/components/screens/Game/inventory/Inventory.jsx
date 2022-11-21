/* eslint-disable indent */
/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable linebreak-style */
/* eslint-disable semi */
import React, { useState, useEffect } from "react";
import { StyleSheet, useWindowDimensions, ScrollView, Text, View, Image, Modal, TouchableOpacity, Pressable, FlatList} from "react-native";
import itemImage_1 from '../../../../../assets/questItems/paper.png'
import itemImage_2 from '../../../../../assets/questItems/key.png'
import itemImage_3 from '../../../../../assets/questItems/folder.png'
import itemImage_4 from '../../../../../assets/questItems/621.png'
import itemImage_5 from '../../../../../assets/questItems/cluecard.png'
import itemImage_6 from '../../../../../assets/questItems/page.png'
import QuestLocal from '../../../../redux/slices/questLocal'
import {useSelector, useDispatch} from "react-redux";


const Inventory = ({props}) => {
  const questState = useSelector(state => state.quest);
  const dispatch = useDispatch();
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    console.log("**********Inventory: ", questState.inventory)
    var inventory =  questState.inventory ?? []

    var inventoryItems = inventory.map(item => ({
      "title": props.questConfig.items[item].title,
      "description": props.questConfig.items[item].description,
      "image": props.questConfig.items[item].image,
      "questItemID": item,
      "visibleMenu": false,
      "marker": false,
      "selected": false
    }))

    setItems(inventoryItems)
  }, [questState.inventory]);


  const [items, setItems] = useState([])

  const hideMenu = (index) => {
    let itemsList = [...items];
    let itemNotVisible = {
      ...itemsList[index],
      visibleMenu: false,
      marker: false
    }
    itemsList[index] = itemNotVisible;
    setItems(itemsList);    
  }

  const showMenu = (index) => {
    let itemsList = [...items];
    itemsList.map((item) => item.visibleMenu = false)
    itemsList.map((item) => item.marker = false)
    let item = {
      ...itemsList[index],
      visibleMenu: true,
      marker: true
    }

    itemsList[index] = item;
    setItems(itemsList);
  }

  const setSelected = (index) => {
    let itemsList = [...items]
    itemsList.map((item) => item.selected = false)
    let item = {
      ...itemsList[index],
      visibleMenu: false,
      marker: false,
      selected: true
    }

    itemsList[index] = item;
    setItems(itemsList);
  }

  const options = [
    {
      title: 'Ver',
      action: (item, index) =>  {
        hideMenu(index)
        const action = QuestLocal.actions.setVisualizer({
          itemID: item.questItemID,
          title: item.title,
          description: item.description,
          image: item.image
        })
        console.log("***Actualizar ver")
        dispatch(action)   
        props.ctx.handleSnapPress(0)
      }
    },
    {
      title: 'Usar',
      action: (item, index) => {
        console.log("*******Item: ", item)
        const action = QuestLocal.actions.selectItem({
          selectedItem: {
            itemID: item.questItemID,
            name: item.title
          }
        })
        console.log("****dispatch usar")
        dispatch(action)  
        setSelected(index)
      }
    }
  ]
  
    
  const getItemImage = (imageNumber) => { 
    const itemImages = [itemImage_1, itemImage_2, itemImage_3, itemImage_4, itemImage_5, itemImage_6];
    return itemImages[imageNumber-1];
  }

  const Item = ({item, index}) => {
    const itemWidth = (0.17 * width)*1.1;

    const maxLenghtTitle = Math.max(...item.title.split(" ").map(item => item.length));
    const calculatedWidth = maxLenghtTitle >= 8? itemWidth*(maxLenghtTitle/8) : itemWidth;
    const numberOfLines = -100 - 14*(Math.ceil(item.title.length/(maxLenghtTitle < 8? 8 : maxLenghtTitle))-1);


    return (
      <View style={{
        flexDirection: 'column',
        marginTop: 5
      }}>
        {items[index].visibleMenu && <View style={{
          borderRadius: 8,
          borderColor: '#333',
          borderWidth: 1,
          backgroundColor: '#fff',
          paddingHorizontal: 10,
          marginTop: numberOfLines,
          position: 'absolute',
          width: calculatedWidth,
          zIndex: 5
        }}>
          <View style={{}}>
              <Text style={{fontSize:12, fontWeight: 'bold'}}>{item.title}</Text>
          </View>
          {options.map((op, i) => (
            <TouchableOpacity style={[styles.option, {borderBottomWidth: i === options.length - 1 ? 0 : 1}]} key={i} onPress={() => op.action(item, index)}>
              <Text>{op.title}</Text>
            </TouchableOpacity>
          ))}
        </View>}

        <TouchableOpacity key={index} onPress={() => {item.marker ? hideMenu(index) : showMenu(index)} }>
          <View style={[
            styles.itemContainer, 
            {width: 0.17 * width, height: 0.17 * width}, 
            item.marker ? {borderWidth: 8, borderColor: 'seagreen'} : {},
            item.selected ? {borderWidth: 8, borderColor: 'red'} : {}
          ]}> 
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
    //  <ScrollView horizontal>
    //    <FlatList
    //     contentContainerStyle={{alignItems: 'center'}}
    //      extraData={items}
    //      showsHorizontalScrollIndicator = {false}
    //     horizontal={true}
    //      showsVerticalScrollIndicator={false} 
    //     data={items}
    //     renderItem={({item, index}) => <Item item={item} index={index}/>}>      
    //  </FlatList>   
    //  </ScrollView>

//   const listData = props.data ?? [];
//const numColumns = Math.ceil(listData.length / 2);
    <View style={styles.view}>
      <FlatList
        contentContainerStyle={{paddingVertical: 0.15 * height, paddingHorizontal: 7}}
        scrollEnabled={true}
        numColumns={5}
        data={items}
        renderItem={({item, index}) => <Item item={item} key={index} index={index}/>}
      />
    </View> 
  )
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'linen',
    height: '100%'
  },
  container: {
    flexDirection: 'column',
    marginTop: 5
  },
  itemContainer: {
    marginRight: 10,
    backgroundColor: 'tan',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  itemImage: {
    width: '100%',
    maxWidth: 40,
    maxHeight: 40,
    resizeMode: 'contain',
  },
  popup: {
    borderRadius: 8,
    borderColor: '#333',
    borderWidth: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginBottom: 5,
    marginTop: -100
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