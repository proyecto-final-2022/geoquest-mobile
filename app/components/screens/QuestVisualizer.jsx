import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, Text, View, Dimensions, Image, Pressable, TouchableOpacity, BackHandler} from "react-native";
import {FontAwesome, Entypo, Ionicons} from "@expo/vector-icons";
import CustomButton from "../commons/CustomButton";
import CustomButton2 from "../commons/CustomButton2";
import CustomModal from "../commons/CustomModal";
import Storage from "../../utils/storage/storage";
import Config from "../../../config.json";
import {updateQuestRating} from "../../utils/apicalls/ApiCalls";
import { useFocusEffect } from "@react-navigation/native";

import starFilled from "../../../assets/ratingStars/star_filled.png";
import starCorner from "../../../assets/ratingStars/star_corner.png";

const {width} = Dimensions.get("screen");

export default function QuestVisualizer({route, navigation}) {

  const {id: questId, name, qualification, description, difficulty, duration, completions, image_url, tags, clientID, clientName} = route.params;
  const colors = ["sandybrown", "indianred", "darksalmon", "darkseagreen"];
  const [userID, setUserID] = useState()

  const Tag = ({tag, index}) => {
    return (
      <View style={[styles.tag, {backgroundColor: colors[index]}]}>
        <Text style={{fontWeight: "bold", color: "white"}}>{tag}</Text>
      </View>
    );
  };

  const Button = ({text, onPress}) => {
    return (
      <Pressable 
        onPress={onPress} 
        style={styles.container}>  
        <Text 
          style={styles.text}>{text}</Text>
      </Pressable>
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("Client Quests", {clientID, clientName});
        return true;
      };
      BackHandler.addEventListener("hardwareBackPress",onBackPress);
      return () => { BackHandler.removeEventListener("hardwareBackPress",onBackPress); };
    }, []),
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: route.params.name,
      headerTintColor: "#a52a2a",
      headerRight: () => (
        <Ionicons color='#a52a2a' name ='arrow-back' size={30} onPress={() => navigation.navigate("Client Quests", {clientID, clientName})}/>
      ),
      headerSearchBarOptions: {
        placeholder: "Search",
      }
    });

    Storage.getObject('user')
    .then(user => {
      setUserID(user.id);
    })
  });

  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [starRating, setDefaultRating] = useState(3);
  const maxRating = [1,2,3,4,5];

  const CustomRatingBar = () => {
    return (
      <View style={styles.customRatingBar}>
        {
          maxRating.map((item, key) => {
            return (
              <TouchableOpacity activeOpacity={0.7} key={item} onPress={() => setDefaultRating(item)}>
                <Image style={styles.starImg} source={item <= starRating ? starFilled : starCorner}/>
              </TouchableOpacity>
            );
          })
        }
      </View>
    );
  };

  const refreshUserRanking = () => {
    Storage.getObject("user").then(user => {
      fetch(
        Config.appUrl+"quests/"+questId+"/rating/"+user.id, {
          method: "GET",
          headers: {"Content-Type": "application/json"}
        })
        .then(response => {
          if(!response.ok) return;
          else response.json().then( (data) => {
            setDefaultRating(data.rate);
          })
            .catch((error) => {
              console.log("error: " + error);
              this.setState({ requestFailed: true });
            });
        })
        .catch(error => {
          console.error(error);
        });
    });
  };

  const updateRating = () => {
    Storage.getObject("user").then(user => {
      updateQuestRating(user.id, questId, starRating);
    });
  };

  return (
    <View style={styles.view}> 
      <Image style={styles.image} source={{uri: image_url}} />

      <View style={styles.card}>
        <View style={styles.questInfoContainer}>
          <View style={styles.questInfo}>
            <Entypo name ='star' size={25} color={"goldenrod"}/>
            <Text style={{fontWeight: "bold"}}>{qualification.toFixed(1)}</Text>
          </View>
          <View style={styles.questInfo}>
            <Entypo name ='gauge' color={"firebrick"} size={25}/>
            <Text style={{fontWeight: "bold"}}>{difficulty}</Text>
          </View>
          <View style={styles.questInfo}>
            <FontAwesome name ='clock-o' color={"black"} size={25}/>
            <Text style={{fontWeight: "bold"}}>{duration}</Text>
          </View>
        </View>
        <View style={styles.description}>
          <ScrollView>
            <Text style={{
  //            flex: 3,
              marginHorizontal: 0,
              textAlign: 'justify'}}>{description}</Text>
          </ScrollView>
        </View>
  
        <View style={styles.tagContainer}>
          {tags.map((tag, index) => <Tag tag={tag} key={index} index={index}/>)}
        </View>

      </View>
   
      <View style={styles.teamButtonsContainer}> 
        <CustomButton2 
          onPress = {() =>
            navigation.navigate("Quest Tutorial", {data: {questID: questId, mode: "singlePlayer", userID: userID,rol: "host"} })
            // fetch(
            //   Config.appUrl+'teams/' + userID, {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json'},
            //   body: JSON.stringify({ 
            //     user_ids: [userID],
            //     quest_id: questId})
            //   }).then(response => response.json()).catch(error => console.log(error))
            //   .then(teamID => 
            //     fetch(
            //       Config.appUrl+'quests/' + questId + '/progressions/' + teamID, {
            //       method: 'POST',
            //       headers: { 'Content-Type': 'application/json'},
            //       }).then(navigation.navigate("Quest Tutorial", {questID: questId, teamID: teamID}))
            //       ).catch(error => console.log(error)) 
            }
          icon = "arrow-forward-circle"
          bgColor= 'darkseagreen'
          fgColor = 'white'
          text = 'Comenzar'
          style={styles.buttonStyle}
          textStyle={styles.buttonTextStyle}
          iconStyle={styles.iconStyle}
        />
        <CustomButton2 
          onPress = {() => 
            Storage.getObject("user")
              .then( (user) => {
                navigation.navigate("Quest Team", {...{id: questId, name, qualification, description, difficulty, duration, completions, image_url, tags, user}});
              })
          }
          icon = "people-sharp"
          bgColor= '#CA955C'
          fgColor = 'white'
          text = 'Armar Equipo'
          style={styles.buttonStyle}
          textStyle={styles.buttonTextStyle}
          iconStyle={styles.iconStyle}/>
        <CustomButton2 
          onPress={() => navigation.navigate("Ranking", {...{id: questId, name, qualification, description, difficulty, duration, completions, image_url, tags, clientID, clientName}})}
          icon = "ios-podium-sharp"
          bgColor= '#CA955C'
          fgColor = 'white'
          text = 'Podio'
          style={styles.buttonStyle}
          textStyle={styles.buttonTextStyle}
          iconStyle={styles.iconStyle}/>
        <CustomButton2 
          onPress={() => {
            refreshUserRanking();
            toggleModal();
          }}
          icon = "star"
          bgColor= '#CA955C'
          fgColor = 'white'
          text = 'Calificar Búsqueda'
          style={styles.buttonStyle}
          textStyle={styles.buttonTextStyle}
          iconStyle={styles.iconStyle}/>
      </View>

      <CustomModal visible={isModalVisible} dismiss={toggleModal}>
        <View style={{flex: 1}}/>
        <View style={styles.customRating}>
          <Text>¡Califica esta búsqueda!</Text>
          <CustomRatingBar/>
          <Text>{"\n"+starRating+"/"+maxRating.length+"\n"}</Text>
          <CustomButton
            onPress={() => {
              updateRating();
              toggleModal();
            }}
            style={{marginTop: 100}}
            bgColor= '#CA955C'
            fgColor = 'white'
            text = 'Guardar'/>
          <CustomButton
            onPress={toggleModal}
            style={{marginTop: 100}}
            bgColor= 'grey'
            fgColor = 'white'
            text = 'Volver'/>
        </View>
        <View style={{flex: 1}}/>
      </CustomModal>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "#FFF9CA",
  },
  card:{
    height: 250,
    flexDirection: "column",
    backgroundColor: "#ffefd5",
    elevation: 5,
    marginTop:0,
    padding: 15, 
    flex: 1
  },
  questInfoContainer: {
    flex: 1,
    flexDirection: "row-reverse",
  },
  questInfo: {
    flexDirection: "column",
    alignItems: "center",
    flexBasis: 45,
    flexShrink: 0,
    flexGrow: 0,
  },
  description: {
    marginVertical: 20,
    flex: 2  
  },
  tagContainer:{
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  tag:{
    flexDirection: "row",
    justifyContent: "center",
    alignItems:  "center",
    width: 90,
    padding: 5,
    borderRadius: 20,
    marginLeft: 5
  },
  image: {
    height: 160,
    width: '100%'
  },
  container: {
    width: "50%",

    padding: 15,
    marginVertical: 5,
    marginLeft: 100,
    marginTop: 20,

    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#CA955C"
  },
  teamButtonsContainer: {
    marginVertical: 5,
    flexDirection: "column",
    alignItems: "center"
  },
  text: {
    fontWeight: "bold",
    color: "white",
  },
  customRatingBar: {
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 30
  },
  starImg: {
    width: 40,
    height: 40,
    resizeMode: "cover"
  },
  customRating: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffefd5",
    margin: 30,
    borderWidth: 3,
    borderRadius:10,
    borderColor: '#CA955C'
  },
  buttonStyle: {
    width: '40%',
  },
  buttonTextStyle: {
    flexBasis: 200,
    flexShrink: 1,
    flexGrow: 1
  },
  iconStyle: {
    flexBasis: 100,
    flexShrink: 1,
    flexGrow: 1
  }
});
