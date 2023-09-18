import { createStackNavigator } from '@react-navigation/stack'

import React from 'react'
import HomeScreen from '../screens/home'
import WelcomeScreen from '../screens/welcome'

const stack = createStackNavigator()

export default function HomeRoute() {
  return (
    <stack.Navigator
     initialRouteName='Welcome'
    >
     <stack.Screen component={HomeScreen} name='Home' options={{headerShown:false}}/>
     <stack.Screen component={WelcomeScreen} name='Welcome' options={{headerShown:false}}/>
    </stack.Navigator>
  )
}