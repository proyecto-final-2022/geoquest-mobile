import React, { useEffect, useState } from 'react'
import {
    NavigationContainer
} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import SignInScreen from '../screens/SignInScreen'
import SignUpScreen from '../screens/SignUpScreen'
import QuestNavigator from '../screens/QuestNavigator'
import HomeScreen from '../screens/HomeScreen'
import QuestVisualizer from '../screens/QuestVisualizer'
import Scene from '../scenes/HelloUser'
import ClientQuests from '../screens/ClientQuests'
import Ranking from '../screens/Ranking'
import QuestTeam from '../screens/QuestTeam'
import Notifications from '../screens/Notifications'
import FriendsList from '../screens/FriendsList'
import FriendsSearch from '../screens/FriendsSearch'
import WaitRoom from '../screens/WaitRoom'
import Profile from '../screens/ProfileScreen'

import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from '../screens/DrawerContent';

const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator()

export default Navigation = () => {
  return(                
      <Drawer.Navigator screenOptions={{headerShown: false}} drawerContent={props => <DrawerContent {...props} />}>
        <Stack.Screen name="Sign In" component={SignInScreen} options={{ swipeEnabled: false }}/>
        <Stack.Screen name="Sign Up" component={SignUpScreen} options={{ swipeEnabled: false }}/>
        <Drawer.Screen name="Home" component={HomeScreen} options={{ headerShown: true, headerTitle: "" }}/>
        <Drawer.Screen name="Quest Navigator" component={QuestNavigator} options={{ headerShown: true, headerTitle: "Elige tu lugar de búsqueda", headerTintColor: '#a52a2a', headerStyle: {backgroundColor: '#FFF9CA'}}}/>
        <Drawer.Screen name="Client Quests" component={ClientQuests} options={{headerShown: true, headerTitle: "Búsquedas", headerStyle: {backgroundColor: '#FFF9CA'}}}/>
        <Drawer.Screen name="Scene" component={Scene} options={{ headerShown: true, headerStyle: {backgroundColor: '#FFF9CA'}}}/>
        <Drawer.Screen name="Quest Visualizer" component={QuestVisualizer} options={{ headerShown: true, headerStyle: {backgroundColor: '#FFF9CA'}}}/>
        <Drawer.Screen name="Ranking" component={Ranking} options={{ headerShown: true, headerStyle: {backgroundColor: '#FFF9CA'}}}/>
        <Drawer.Screen name="Quest Team" component={QuestTeam} options={{ headerShown: true, headerStyle: {backgroundColor: '#FFF9CA'}}}/>
        <Drawer.Screen name="Notifications" component={Notifications} options={{ headerShown: true, headerStyle: {backgroundColor: '#FFF9CA'}}}/>
        <Drawer.Screen name="Wait Room" component={WaitRoom} options={{ headerShown: true, headerStyle: {backgroundColor: '#FFF9CA'}}}/>
        <Drawer.Screen name="Friends List" component={FriendsList} options={{ headerShown: true, headerStyle: {backgroundColor: '#FFF9CA'}}}/>
        <Drawer.Screen name="Friends Search" component={FriendsSearch} options={{ headerShown: true, headerStyle: {backgroundColor: '#FFF9CA'}}}/>
        <Drawer.Screen name="Profile" component={Profile} options={{ headerShown: true, headerTitle: "", headerStyle: {backgroundColor: '#FFF9CA'}}}/>
      </Drawer.Navigator>
  )
}