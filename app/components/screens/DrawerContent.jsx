import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem
} from '@react-navigation/drawer';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch
} from 'react-native-paper';
import {areYouSureAlert} from '../../utils/storage/storage';
import Storage from '../../utils/storage/storage';
import {useNavigation} from '@react-navigation/native'

import userImage_1 from '../../../assets/userImages/userImage_1.png'
import userImage_2 from '../../../assets/userImages/userImage_2.png'
import userImage_3 from '../../../assets/userImages/userImage_3.png'
import userImage_4 from '../../../assets/userImages/userImage_4.png'
import userImage_5 from '../../../assets/userImages/userImage_5.png'
import userImage_6 from '../../../assets/userImages/userImage_6.png'
import userImage_7 from '../../../assets/userImages/userImage_7.png'
import userImage_8 from '../../../assets/userImages/userImage_8.png'
import userImage_9 from '../../../assets/userImages/userImage_9.png'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export function DrawerContent(props) {

  const navigation = useNavigation()
  
  const [name, setName] = useState("")
  const [userID, setUserID] = useState("")
  const [username, setUsername] = useState("")
  const [image, setImage] = useState(1)
  const [friends, setFriends] = useState(0)
  const [notifications, setNotifications] = useState(0)

  const getUserImage = (imageNumber) => { 
    const userImages = [userImage_1, userImage_2, userImage_3, userImage_4, userImage_5, userImage_6, userImage_7, userImage_8, userImage_9];
    return userImages[imageNumber-1];
  }

  useEffect(() => {
    Storage.getObject('user').
    then(user => {
      setName(user.name);
      setUsername(user.username);
      setImage(user.image);
      setFriends(user.friends);
      setNotifications(user.notifications);
    })
  }, [props])

  useEffect(() => {
    Storage.getObject('user').
    then(user => setUserID(user.id))
  }, [props])

  return(
    <View style={{flex:1,backgroundColor: '#FFF9CA'}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection:'row',marginTop: 15}}>
              <Pressable onPress={() => {navigation.navigate('Profile')}}>
                <Avatar.Image 
                  source={getUserImage(image)}
                  size={50}
                />
              </Pressable>
              <View style={{marginLeft:15, flexDirection:'column'}}>
                <Title style={styles.title}>{username}</Title>
                <Caption style={styles.caption}>{name}</Caption>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>{friends}</Paragraph>
                <Caption style={styles.caption}>Amigos</Caption>
              </View>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>{notifications}</Paragraph>
                <Caption style={styles.caption}>Notificaciones</Caption>
              </View>
            </View>
          </View>

      <Drawer.Section style={styles.drawerSection}>
        <DrawerItem 
          icon={({color, size}) => (
            <Icon 
              name="map" 
              color={color}
              size={size}
            />)}
              label="Búsquedas"
              onPress={() => { navigation.navigate('Quest Navigator') }}/>
                  <DrawerItem 
                      icon={({color, size}) => (
                          <Icon 
                            name="account-group" 
                            color={color}
                            size={size}
                          />
                      )}
                      label="Amigos"
                      onPress={() => {
                        Storage.getObject('user').
                        then(user => navigation.navigate('Friends List', user))
                      }}
                  />
                  <DrawerItem 
                      icon={({color, size}) => (
                          <Icon 
                            name="account-cog" 
                            color={color}
                            size={size}
                          />
                      )}
                      label="Perfil"
                      onPress={() => {
                        navigation.navigate('Profile')
                      }}
                  />
                  <DrawerItem 
                      icon={({color, size}) => (
                        <Icon 
                          name="ticket-percent" 
                          color={color}
                          size={size}
                        />
                      )}
                      label="Cupones"
                      onPress={() => {
                        Storage.getObject('user').
                        then(user => navigation.navigate('Coupons', user))
                      }}
                  />
                  <DrawerItem 
                      icon={({color, size}) => (
                        <Icon 
                          name={notifications != 0? "bell-badge" : "bell"}
                          color={color}
                          size={size}
                        />
                      )}
                      label="Notificaciones"
                      onPress={() => {
                        Storage.getObject('user').
                        then(user => navigation.navigate('Notifications', user))
                      }}
                  />
                  <DrawerItem 
                      icon={({color, size}) => (
                        <Icon 
                          name={"flag-checkered"}
                          color={color}
                          size={size}
                        />
                      )}
                      label="Test finalizar búsqueda"
                      onPress={() => {
                        navigation.navigate('Quest Completed', 
                        {
                          questId: 1, 
                          questName: "Nombre de la Búsqueda",
                          questScore: 12345678,
                          questTime: "3:12:23.123",
                          questDifficulty: "Dificil",
                          questDuration: "Media",
                          qr: {
                            id: 1,
                            user_id: 2,
                            description: "hola esto es una descripcion"
                          }
                        })
                      }}
                  />
              </Drawer.Section>
          </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem 
              icon={({color, size}) => (
                <Icon 
                  name="exit-to-app" 
                  color={color}
                  size={size}
                />
              )}
              label="Cerrar Sesión"
              onPress={() => {
                areYouSureAlert({navigation});
              }}
          />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });