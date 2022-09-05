import React from 'react';
import { View, StyleSheet } from 'react-native';
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
import {closeSession} from '../../utils/storage/storage';
import {useNavigation} from '@react-navigation/native'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export function DrawerContent(props) {

  const navigation = useNavigation()

  return(
    <View style={{flex:1,backgroundColor: '#FFF9CA'}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection:'row',marginTop: 15}}>
              <Avatar.Image 
                source={{
                  uri: 'https://img.olympicchannel.com/images/image/private/f_auto/t_1-1_300/primary/wfrhxc0kh2vvq77sonki'}}
                size={50}
              />
              <View style={{marginLeft:15, flexDirection:'column'}}>
                <Title style={styles.title}>Lionel Messi</Title>
                <Caption style={styles.caption}>@messirve10</Caption>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>100M</Paragraph>
                <Caption style={styles.caption}>Amigos</Caption>
              </View>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>200</Paragraph>
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
              onPress={() => {
                                navigation.navigate('Quest Navigator')
                            }}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-group" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Amigos"
                            onPress={() => {console.log('Amigos')}}
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
                            onPress={() => {console.log('Perfil')}}
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
                            onPress={() => {console.log('Cupones')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="bell-badge" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Notificaciones"
                            onPress={() => {console.log('Notificaciones')}}
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
                    label="Sign Out"
                    onPress={() => {
                        closeSession()
                        navigation.navigate('Sign In')
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