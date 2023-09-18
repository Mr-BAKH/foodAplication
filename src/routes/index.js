import { createStackNavigator } from '@react-navigation/stack'

import React from 'react'
import HomeScreen from '../screens/home'
import WelcomeScreen from '../screens/welcome'
import RecipesScreen from '../screens/recipes1'
import AbouteScreen from '../screens/aboute'

const stack = createStackNavigator()

export default function HomeRoute() {
  return (
    <stack.Navigator
     initialRouteName='Aboute'
    >
     <stack.Screen component={HomeScreen} name='Home' options={{headerShown:false}}/>
     <stack.Screen component={WelcomeScreen} name='Welcome' options={{headerShown:false}}/>
     <stack.Screen component={RecipesScreen} name='Recipes' options={{headerShown:false}}/>
     <stack.Screen component={AbouteScreen} name='Aboute' options={{headerShown:false}}/>
    </stack.Navigator>
  )
}