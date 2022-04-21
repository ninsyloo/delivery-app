import React, {useState} from "react";
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
import Animated from "react-native-reanimated";
import { connect } from "react-redux";
import { setSelectedTab } from "../store/tabs/tabActions";



const Drawer = createDrawerNavigator();

const CustomDrawerItem = ({label, icon, isFocused, onPress}) =>{
  return(
    <TouchableOpacity
        style={{
          flexDirection:"row",
          height: 40,
          marginBottom: SIZES.base,
          alignItems:"center",
          paddingLeft: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: isFocused ? COLORS.transparentBlack1 : null
        }}
        onPress = {onPress}
    >
      <Image 
      source={icon}
      style={styles.drawer_img}
      />
      <Text style={styles.drawer_text}>{label}</Text>
    </TouchableOpacity>
  )
}

const CustomDrawerContent = ({navigation, selectedTab, setSelectedTab}) => {
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
              isFocused={selectedTab == constants.screens.home}
              onPress={()=>{
                setSelectedTab(constants.screens.home)
                navigation.navigate('Layout')
              }}
          />
          <CustomDrawerItem
              label={constants.screens.my_wallet}
              icon={icons.wallet}
              isFocused={selectedTab == constants.screens.my_wallet}
              onPress={()=>{
                setSelectedTab(constants.screens.my_wallet)
                navigation.navigate('Layout')
              }}
          />
          <CustomDrawerItem
              label={constants.screens.notification}
              icon={icons.notification}
              isFocused={selectedTab == constants.screens.notification}
              onPress={()=>{
                setSelectedTab(constants.screens.notification)
                navigation.navigate('Layout')
              }}
          />
          <CustomDrawerItem
              label={constants.screens.favourite}
              icon={icons.love}
              isFocused={selectedTab == constants.screens.favourite}
              onPress={()=>{
                setSelectedTab(constants.screens.favourite)
                navigation.navigate('Layout')
              }}
          />

          {/* divider */}

          <View style={styles.divider}></View>

          <CustomDrawerItem
              label="Track Your Order"
              icon={icons.location}
              isFocused={selectedTab == "Track Your Order"}
              onPress={()=>{
                setSelectedTab("Track Your Order")
                navigation.navigate('Layout')
              }}
          />
          <CustomDrawerItem
              label="Coupons"
              icon={icons.coupon}
              isFocused={selectedTab == "Coupons"}
              onPress={()=>{
                setSelectedTab("Coupons")
                navigation.navigate('Layout')
              }}
          />
          <CustomDrawerItem
              label="Settings"
              icon={icons.setting}
              isFocused={selectedTab == "Settings"}
              onPress={()=>{
                setSelectedTab("Settings")
                navigation.navigate('Layout')
              }}
          />
          <CustomDrawerItem
              label="Invite a Friend"
              icon={icons.profile}
              isFocused={selectedTab == "Invite a Friend"}
              onPress={()=>{
                setSelectedTab("Invite a Friend")
                navigation.navigate('Layout')
              }}
          />
          <CustomDrawerItem
              label="Help Center"
              icon={icons.help}
              isFocused={selectedTab == "Help Center"}
              onPress={()=>{
                setSelectedTab("Help Center")
                navigation.navigate('Layout')
              }}
          />

        </View>
        <View style={styles.logout}>
          <CustomDrawerItem
              label="Logout"
              icon={icons.logout}
              isFocused={selectedTab == "Logout"}
              onPress={()=>{
                setSelectedTab("Logout")
                navigation.navigate('Layout')
              }}
          />
        </View>

      </View>

    </DrawerContentScrollView>
  )
}


const CustomDrawer =({selectedTab, setSelectedTab})=>{

  const dimensions = useWindowDimensions();
  const isLargeScreen = dimensions.width >= 768;
  const [progress, setProgress] = useState(new Animated.Value(0))

  const scale = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8]
  })

  const borderRadius = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [0, 26]
  })

const animatedStyle = { borderRadius, transform: [{scale}], overflow:'hidden'}


  return(
    <View style={styles.container}>
      <Drawer.Navigator
          screenOptions={{
            headerShown: false,
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
                setTimeout(()=>{
                  setProgress(props.progress)
                }, 0)

                return (
                  <CustomDrawerContent
                      navigation={props.navigation}
                      selectedTab={selectedTab}
                      setSelectedTab={setSelectedTab}
                  />
                )
              }}
      >
        <Drawer.Screen name="Layout">
          {props => <Layout {...props}
          drawerAnimationStyle={animatedStyle}/>}
        </Drawer.Screen>

      </Drawer.Navigator>
    </View>
  )
}


function mapStateToProps(state){
  return {
    selectedTab: state.tabReducer.selectedTab
  }
}

function mapDispatchToProps(dispatch){
  return{
    setSelectedTab: (selectedTab) => { return dispatch
      (setSelectedTab(selectedTab))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawer)

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
    justifyContent:"center",
    marginBottom: SIZES.padding
  },
  img_close:{
    height: 20,
    width:20,
    tintColor: COLORS.white
  },
  button_profile:{
    flexDirection:"row",
    marginTop:SIZES.radius,
    alignItems: "center",
    marginBottom: SIZES.padding
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
    marginTop: 50
  },
})
