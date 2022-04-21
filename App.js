import React, {useState} from 'react';

import {createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './store/rootReducer.js';

import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import CustomDrawer from './components/Navigation.js';

const loadFonts = () =>{
  return Font.loadAsync({
      "Poppins-Black": require("./assets/fonts/Poppins-Black.ttf"),
      "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
      "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
      "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf")
  })
}

const Stack = createStackNavigator();
const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)


export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded){
    return(
      <AppLoading
      startAsync={loadFonts}
      onFinish={()=> setFontLoaded(true)}
      onError={(err)=>console.error(err)}
      
      />
    )
  }

  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
          initialRouteName={'Home'}
      >
        <Stack.Screen
           name='Home'
           component={CustomDrawer}
        />

      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}
