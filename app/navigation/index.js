import React from 'react'
import {
    NavigationContainer
} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import SignInScreen from '../screens/SignInScreen'
import SignUpScreen from '../screens/SignUpScreen'
import QuestNavigator from '../screens/QuestNavigator'
import HomeScreen from '../screens/HomeScreen'
import Scene from '../scenes/HelloUser'

import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from '../screens/DrawerContent/DrawerContent';

const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator()

const Navigation = () => {
    return(
        <NavigationContainer>
                
            <Drawer.Navigator screenOptions={{headerShown: false}} drawerContent={props => <DrawerContent {...props} />}>
                <Stack.Screen name="Sign In" component={SignInScreen} options={{ swipeEnabled: false }}/>
                <Stack.Screen name="Sign Up" component={SignUpScreen} options={{ swipeEnabled: false }}/>
                <Drawer.Screen name="Home" component={HomeScreen} options={{ headerShown: true }}/>
                <Drawer.Screen name="Quest Navigator" component={QuestNavigator} options={{ headerShown: true }}/>
                <Drawer.Screen name="Scene" component={Scene} options={{ headerShown: true }}/>
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default Navigation