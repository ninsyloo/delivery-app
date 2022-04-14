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
  },
  close_container:{
    alignItems:"flex-start",
    justifyContent:"center"
  },
  button_close:{
    alignItems:"center",
    justifyContent:"center"
  },
  img_close:{
    height: 35,
    width:35,
    tintColor: COLORS.white
  },
  button_profile:{
    flexDirection:"row",
    marginTop:SIZES.radius,
    alignItems: "center"
  },
  img_profle:{
    width:50,
    height: 50,
    borderRadius: SIZES.radius
  },
  pcontainer_profile:{
    marginLeft: SIZES.radius
  },
  p_profile:{
    color:COLORS.white,
    ...FONTS.h3
  },
  p_profle1:{
    color: COLORS.white,
    ...FONTS.body4
  },
  con_items:{

  },
  drawer_item:{
    flexDirection:"row",
    height: 40,
    marginBottom: "center",
    alignItems:"center",
    paddingLeft: SIZES.radius,
    borderRadius: SIZES.radius
  },
  drawer_img:{
    width: 20,
    height: 20,
    tintColor: COLORS.white
  },
  drawer_text:{
    marginLeft: 15,
    color: COLORS.white,
    ...FONTS.h3
  },
  divider:{
    height: 1,
    marginVertical:SIZES.radius,
    marginLeft:SIZES.radius,
    marginLeft: SIZES.radius,
    backgroundColor: COLORS.lightGray1
  },
  logout:{
    marginBottom: SIZES.padding
  },
})

const CustomDrawerItem = ({label, icon}) =>{
  return(
    <TouchableOpacity
        style={styles.drawer_item}
    >
      <Image 
      source={icon}
      style={styles.drawer_img}
      />
      <Text style={styles.drawer_text}>{label}</Text>
    </TouchableOpacity>
  )
}

const CustomDrawerContent = ({navigation}) => {
  return(
    <DrawerContentScrollView
      scrollEnabled={true}
      contentContainerStyle={{ flex: 1}}
    >
      <View
      style={{
        flex:1,
        paddingHorizontal: SIZES.radius
      }}
      >
        {/* Close */}
        <View style={styles.close_container}>
          <TouchableOpacity 
          style={styles.button_close}
          onPress={()=>navigation.closeDrawer()}
          >
            <Image
                 source={icons.cross}
                 style={styles.img_close}
            />

          </TouchableOpacity>
        </View>
        {/* Profile */}
        <TouchableOpacity 
        style={styles.button_profile}
        onPress={()=> console.log('Profile Button')} 
        >
          <Image
             source={dummyData.myProfile?.profile_image}
             style={styles.img_profle}
          />
          <View style={styles.pcontainer_profile}>
            <Text style={styles.p_profile}>{dummyData.myProfile?.name}</Text>
            <Text style={styles.p_profle1}>View your profile</Text>
          </View>
        </TouchableOpacity>

        {/* Drawer Items */}
        <View style={styles.con_items}>
          <CustomDrawerItem 
              label={constants.screens.home}
              icon={icons.home}
          />
          <CustomDrawerItem
              label={constants.screens.my_wallet}
              icon={icons.wallet}
          />
          <CustomDrawerItem
              label={constants.screens.notification}
              icon={icons.notification}
          />
          <CustomDrawerItem
              label={constants.screens.favourite}
              icon={icons.love}
          />

          {/* divider */}

          <View style={styles.divider}></View>

          <CustomDrawerItem
              label="Track Your Order"
              icon={icons.location}
          />
          <CustomDrawerItem
              label="Coupons"
              icon={icons.coupon}
          />
          <CustomDrawerItem
              label="Settings"
              icon={icons.setting}
          />
          <CustomDrawerItem
              label="Invite a Friend"
              icon={icons.profile}
          />
          <CustomDrawerItem
              label="Help Center"
              icon={icons.help}
          />

        </View>
        <View style={styles.logout}>
          <CustomDrawerItem
              label="logout"
              icon={icons.logout}
          />
        </View>

      </View>

    </DrawerContentScrollView>
  )
}


const CustomDrawer =()=>{

  const dimensions = useWindowDimensions();
  const isLargeScreen = dimensions.width >= 768;

  return(
    <View style={styles.container}>
      <Drawer.Navigator
          screenOptions={{
            /* headerShown: false, */
            drawerStyle: isLargeScreen ? {backgroundColor:"transparent"} : {
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
              drawerContent={props=>{
                return (
                  <CustomDrawerContent
                      navigation={props.navigation}
                  />
                )
              }}
      >
        <Drawer.Screen name="Layout">
          {props => <Layout {...props}/>}
        </Drawer.Screen>

      </Drawer.Navigator>
    </View>
  )
}

export default CustomDrawer;