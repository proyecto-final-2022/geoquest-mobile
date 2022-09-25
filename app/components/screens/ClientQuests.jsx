import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Modal, ActivityIndicator, Text, View, Dimensions, Image, Pressable, FlatList, TouchableOpacity, TextInput} from 'react-native';
import { useIsFocused } from '@react-navigation/native'
import {Button} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {FontAwesome, Entypo, Ionicons} from '@expo/vector-icons'
import Config from '../../../config.json'
import Tags from "react-native-tags"

const {width} = Dimensions.get('screen')

export default ClientQuests = ({route, navigation}) => {
  
 // const navigation = useNavigation()

  const {clientID, clientName} = route.params
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [view, setView] = useState(false)
  const [search, setSearch] = useState([])
   const [loading, setLoading] = useState(true)

  const url = Config.appUrl + "clients/" + clientID + "/quests"
  
  const isFocused = useIsFocused()
  
  useEffect(() => {
    fetch(url)
    .then((response) => response.json())
    .then((json) => {
      setData(json) 
      setFilteredData(json)})
    .catch((error) => console.error(error))
    .finally(()=>setLoading(false))
  } , [isFocused])

  useEffect(() => {
    navigation.setOptions({
      headerTitle: clientName,
      headerRight: () => (
        <Ionicons color='#a52a2a' name ='arrow-back' size={30} onPress={() => navigation.navigate('Quest Navigator')}/>
      ),
      headerTintColor: '#a52a2a',
      headerSearchBarOptions: {
        placeholder: "Search",
      }
    })
  })
  
  const options = ['Popularidad', 'Calificación']

  const onPressItem = (item) => {
    if (item == "Calificación") {
      setFilteredData(filteredData.sort((a, b) => a.qualification < b.qualification))
      setView(false)
    }
    if (item == "Popularidad") {
      setFilteredData(filteredData.sort((a, b) => a.completions < b.completions))
      setView(false)
    }    
  }

  const option = options.map((item, index) => {
    return (
      <View style={styles.optionContainer}>
      <Pressable
        key={index}
        onPress={() => onPressItem(item)}
      >
        <Text style={styles.text}>
          {item}
        </Text>
      </Pressable>
      </View>
    )
  })

  const filterSearch = (text) => {

    if (text) {
    const newData = data.filter((quest) => {
      const questData = quest.name ? quest.name.toUpperCase() : ''.toUpperCase()
      const textData = text.toUpperCase()
      return questData.indexOf(textData) > -1
    })
    setFilteredData(newData)
    setSearch(text)
    } else {
    setFilteredData(data)
    setSearch(text)
    } 
  }
  
  const Tags = ({tag}) => {
    return (
      <View style={styles.tag}>
        <Text>{tag}</Text>
      </View>
    )
  }

  const Card = ({quest}) => {
    return (
      <Pressable onPress={() => navigation.navigate('Quest Visualizer', {...quest, clientID, clientName})}>
        <View style={styles.card}>
          <View style={styles.infoDisplay}>
            <View style={styles.questName}>
              <Text style={{marginTop: 5, fontSize: 20, fontWeight: 'bold'}}>{quest.name}</Text>
            </View>
            <View style={styles.questInfo}>
              <FontAwesome name ='clock-o' size={25}/>
              <Text style={styles.questInfoText}>{quest.duration}</Text>
            </View>
            <View style={styles.questInfo}>
              <Entypo name ='gauge' size={25}/>
              <Text style={styles.questInfoText}>{quest.difficulty}</Text>
            </View>
            <View style={styles.questInfo}>
              <Entypo name ='star' size={25}/>
              <Text style={styles.questInfoText}>{quest.qualification}</Text>
            </View>
          </View>
          <View style={styles.tagContainer}>
            {quest.tags.map((tag) => <Tags tag={tag}/>)}
          </View>

        </View>
      </Pressable>
    ) 
  }
  
  return (

    <ScrollView style={styles.view}>
      <View style={styles.headerContainer}>
        <TextInput 
          style={styles.textInput}
          onChangeText={(text) => filterSearch(text)}
        />
      
        <Pressable onPress={() => {setView(true)}}>
          <View style={styles.sortBtn}>
            <Ionicons name='filter' size={18} />
          </View>
        </Pressable>
      </View>

      <Modal
        animationType="slide"
        onDismiss={() => console.log('close')}
        onShow={() => console.log('show')}
        transparent
        visible={view}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              height:'25%', 
              width: '60%',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              backgroundColor: 'aliceblue',
              borderWidth: 10,
              borderColor: '#a52a2a', 
            }}  
          >
            <View style={styles.orderByContainer}>
              <Pressable onPress={() => {setView(false)}}>
                <Ionicons name='close' size={35}/>
              </Pressable>
            </View>
            <ScrollView>
                {option}
            </ScrollView>

  
          </View>
        </View>
      </Modal>

      <FlatList
        horizontal= {false}
        contentContainerStyle={{
          paddingLeft: 20, paddingVertical: 20}}
        showsHorizontalScrollIndicator = {false}
        data={filteredData}
        renderItem={({item}) => <Card quest={item}/>}>      
      </FlatList> 
    </ScrollView>

    )
}

const styles = StyleSheet.create({
  textInput: {
    flexBasis: 300,
    flexShrink: 0,
    flexGrow: 0,
    height: 40,
    borderWidth: 3,
    borderColor: '#a52a2a',
    backgroundColor: 'cornsilk',
    marginTop: 10
  },
  sortBtn: {
    backgroundColor: 'bisque',
    flexBasis: 50,
    flexShrink: 0,
    flexGrow: 0,
    height: 50,
    width: 50,
    borderRadius: 10,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  view: {
    flex: 1,
    backgroundColor: '#FFF9CA',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  card:{
    height: 120,
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginTop: 10,
    backgroundColor: '#ffefd5',
  },
  infoDisplay:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  questInfo:{
    flexDirection: 'column',
    alignItems: 'center',
    flexBasis: 45,
    flexShrink: 0,
    flexGrow: 0,
  },
  questName:{
    flexBasis: 220,
    flexShrink: 0,
    flexGrow: 0,
  },
  tagContainer:{
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  tag:{
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'mintcream',
    width: 90,
    padding: 5,
    borderRadius: 20,
    marginLeft: 5
  },
  questInfoText: {
    color: '#696969',
  },
  orderByContainer: {
    flexDirection: 'row-reverse'
  },
  optionContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    marginTop: 10
  },
  text: {
    marginLeft: 10,
    fontSize: 25,
    fontWeight: 'bold'
  }
});

