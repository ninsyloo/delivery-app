import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { Layout } from './views';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
          initialRouteName={'Home'}
      >
        <Stack.Screen
           name='Home'
           component={Layout}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
