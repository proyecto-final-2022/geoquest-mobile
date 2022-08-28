import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import SignInScreen from '../screens/SignInScreen'
import SignUpScreen from '../screens/SignUpScreen'
import QuestNavigator from '../screens/QuestNavigator'
import HomeScreen from '../screens/HomeScreen'
import Scene from '../scenes/HelloUser'
import ClientQuests from '../screens/ClientQuests/ClientQuests'

const Stack = createNativeStackNavigator()

const Navigation = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Sign In" component={SignInScreen} />
                <Stack.Screen name="Sign Up" component={SignUpScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Quest Navigator" component={QuestNavigator} />
                <Stack.Screen name="Client Quests" component={ClientQuests} />
                <Stack.Screen name="Scene" component={Scene} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation