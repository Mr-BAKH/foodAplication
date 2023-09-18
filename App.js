import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeRoute from './src/routes/index'

export default function App() {
  return (
    <NavigationContainer>
      <HomeRoute/>
    </NavigationContainer>
  );
}