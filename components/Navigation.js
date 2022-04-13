import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, useWindowDimensions } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";

import {Layout} from '../views';
import {
    COLORS,
    FONTS,
    SIZES,
    constants,
    icons,
    dummyData
} from '../constants';

const Drawer = createDrawerNavigator();
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:COLORS.primary
  }
})


const CustomDrawer =()=>{

  const dimensions = useWindowDimensions();
  const isLargeScreen = dimensions.width >= 768;

  return(
    <View style={styles.container}>
      <Drawer.Navigator
          screenOptions={{
            drawerStyle: isLargeScreen ? null : {
              flex:1,
              width:"65%",
              paddingRight: 20,
              backgroundColor:"transparent" 
            },
            overlayColor:"transparent",
            drawerType: isLargeScreen ? 'permanent' : 'slide',
            sceneContainerStyle:{
              backgroundColor:'transparent'
            }
          }}
              initialRouteName="Layout"
      >
        <Drawer.Screen name="Layout">
          {props => <Layout {...props}/>}
        </Drawer.Screen>

      </Drawer.Navigator>
    </View>
  )
}

export default CustomDrawer;