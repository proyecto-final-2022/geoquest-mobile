import React from "react";
import {
  NavigationContainer
} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import QuestNavigator from "../screens/QuestNavigator";
import HomeScreen from "../screens/HomeScreen";
import QuestVisualizer from "../screens/QuestVisualizer";
import Scene from "../scenes/HelloUser";
import ClientQuests from "../screens/ClientQuests";
import Ranking from "../screens/Ranking";
import Game from "../screens/Game";
import Game2 from "../screens/Game2";
import Game3 from "../screens/Game3";
import Game4 from "../screens/Game4";
import Game5 from "../screens/Game5";
import WinScreen from "../screens/WinScreen";
import Profile from "../screens/ProfileScreen";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContent } from "../screens/DrawerContent";


const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return(
    <NavigationContainer>
      <Drawer.Navigator screenOptions={{headerShown: false}} drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="Game" component={Game} options={{ headerShown: true, headerStyle: {backgroundColor: "#FFF9CA"}}}/>
        <Drawer.Screen name="Game2" component={Game2} options={{ headerShown: true, headerStyle: {backgroundColor: "#FFF9CA"}}}/>
        <Drawer.Screen name="Game3" component={Game3} options={{ headerShown: true, headerStyle: {backgroundColor: "#FFF9CA"}}}/>
        <Drawer.Screen name="Game4" component={Game4} options={{ headerShown: true, headerStyle: {backgroundColor: "#FFF9CA"}}}/>
        <Drawer.Screen name="Game5" component={Game5} options={{ headerShown: true, headerStyle: {backgroundColor: "#FFF9CA"}}}/>
        <Drawer.Screen name="WinScreen" component={WinScreen} options={{ headerShown: true, headerStyle: {backgroundColor: "#FFF9CA"}}}/>
        <Stack.Screen name="Sign In" component={SignInScreen} options={{ swipeEnabled: false }}/>
        <Stack.Screen name="Sign Up" component={SignUpScreen} options={{ swipeEnabled: false }}/>
        <Drawer.Screen name="Home" component={HomeScreen} options={{ headerShown: true, headerTitle: "" }}/>
        <Drawer.Screen name="Quest Navigator" component={QuestNavigator} options={{ headerShown: true, headerTitle: "Elige tu lugar de búsqueda", headerTintColor: "#a52a2a", headerStyle: {backgroundColor: "#FFF9CA"}}}/>
        <Drawer.Screen name="Client Quests" component={ClientQuests} options={{headerShown: true, headerTitle: "Búsquedas", headerStyle: {backgroundColor: "#FFF9CA"}}}/>
        <Drawer.Screen name="Scene" component={Scene} options={{ headerShown: true, headerStyle: {backgroundColor: "#FFF9CA"}}}/>
        <Drawer.Screen name="Quest Visualizer" component={QuestVisualizer} options={{ headerShown: true, headerStyle: {backgroundColor: "#FFF9CA"}}}/>
        <Drawer.Screen name="Ranking" component={Ranking} options={{ headerShown: true, headerStyle: {backgroundColor: "#FFF9CA"}}}/>
        <Drawer.Screen name="Profile" component={Profile} options={{ headerShown: true, headerTitle: "", headerStyle: {backgroundColor: "#FFF9CA"}}}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
