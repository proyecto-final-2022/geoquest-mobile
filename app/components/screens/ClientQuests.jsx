import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, BackHandler, ActivityIndicator, Text, View, Dimensions, Image, Pressable, FlatList, TouchableOpacity, TextInput} from 'react-native';
import { useIsFocused } from '@react-navigation/native'
import {Button} from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import {FontAwesome, Entypo, Ionicons} from '@expo/vector-icons'
import Config from '../../../config.json'
import CustomModal from '../commons/CustomModal';

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

  const colors = ['sandybrown', 'indianred', 'darksalmon', 'darkseagreen']
  
  const isFocused = useIsFocused()

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('Quest Navigator')
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress',onBackPress);
      return () => { BackHandler.removeEventListener('hardwareBackPress',onBackPress) };
    }, []),
  );
  
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
  useEffect(() => {
    fetch(url)
    .then((response) => response.json())
    .then((json) => {
      setData(json) 
      setFilteredData(json)})
    .catch((error) => console.error(error))
    .finally(()=>setLoading(false))
  }, [])
  
  const options = [' Popularidad ', ' Calificación ']

  const onPressItem = (item) => {
    if (String(item).includes('Calificación')) {
      setFilteredData(filteredData.sort((a, b) => a.qualification < b.qualification))
      setView(false)
    }else if (String(item).includes('Popularidad')) {
      setFilteredData(filteredData.sort((a, b) => a.completions < b.completions))
      setView(false)
    }    
  }

  const option = options.map((item, index) => {
    return (
      <View style={styles.optionContainer} key={index}>
        <Pressable
          key={index}
          onPress={() => onPressItem(item)}>
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
  
  const Tags = ({tag, index}) => {
    return (
      <View style={[styles.tag, {backgroundColor: colors[index]}]}>
        <Text style={{fontWeight: 'bold', color: 'white'}}>{tag}</Text>
      </View>
    )
  }

  const Card = ({quest}) => {
    return (
      <Pressable onPress={() => navigation.navigate('Quest Visualizer', {...quest, clientID, clientName})}>
        <View style={[styles.card, {flex: 1}]}>
          <View style={[styles.infoDisplay, {flex: 1.5}]}>
            <View style={styles.questName}>
              <Text style={{marginTop: 5, fontSize: 20, fontWeight: 'bold'}}>{quest.name}</Text>
            </View>
            <View style={styles.questInfo}>
              <FontAwesome name ='clock-o' color={'#1A515B'} size={25}/>
              <Text style={styles.questInfoText}>{quest.duration}</Text>
            </View>
            <View style={styles.questInfo}>
              <Entypo name ='gauge' color={'firebrick'} size={25}/>
              <Text style={styles.questInfoText}>{quest.difficulty}</Text>
            </View>
            <View style={styles.questInfo}>
              <Entypo name ='star' color={'goldenrod'} size={25}/>
              <Text style={styles.questInfoText}>{quest.qualification}</Text>
            </View>
          </View>
          <View style={[styles.tagContainer, {flex: 1}]}>
            {quest.tags.map((tag, index) => <Tags tag={tag} key={index} index={index}/>)}
          </View>
        </View>
      </Pressable>
    ) 
  }
  
  return (
    <View style={styles.view}>
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

      <CustomModal visible={view} dismiss={() => {setView(false)}}>
        <View style={{
                  flex: 1,
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#ffefd5',
                  margin: 30,
                  borderWidth: 3,
                  borderRadius:10,
                  borderColor: '#CA955C'}}>
          <View style={styles.orderByContainer}>
            <Pressable onPress={() => {setView(false)}}>
              <Ionicons name='close' size={35}/>
            </Pressable>
          </View>
          <ScrollView>
              {option}
          </ScrollView>
        </View>
        <View style={{flex: 2}}/>
      </CustomModal>

      <FlatList
        horizontal= {false}
        contentContainerStyle={{paddingLeft: 20, paddingVertical: 20}}
        showsHorizontalScrollIndicator = {false}
        data={filteredData}
        renderItem={({item, index}) => <Card quest={item} key={index} index={index}/>}>
      </FlatList> 
    </View>
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
    marginTop: 5,
    backgroundColor: '#ffefd5',
    borderWidth: 3,
    borderRadius: 10,
    borderColor: '#CA955C',
    marginLeft: -13,
    marginRight: 5
  },
  infoDisplay:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
    marginLeft: 10
  },
  questInfo:{
    flexDirection: 'column',
    alignItems: 'center',
    flexBasis: 45,
    flexShrink: 0,
    flexGrow: 0
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
    alignItems:  'center',
    backgroundColor: 'mintcream',
    width: 90,
    padding: 5,
    borderRadius: 20,
    marginLeft: 5,
    marginBottom: 5
  },
  questInfoText: {
    color: '#696969',
    fontWeight: 'bold'
  },
  orderByContainer: {
    flexDirection: 'row-reverse',
    alignSelf: 'flex-end'
  },
  optionContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    borderWidth: 2,
    borderRadius:10,
    borderColor: '#CA955C',
    backgroundColor: 'white'
  }
});

