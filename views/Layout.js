import React, {useEffect} from 'react';
import {
    View, 
    Text, 
    TouchableOpacity, 
    TouchableWithoutFeedback, 
    Image, 
    FlatList} from 'react-native';

import Animated, {
    useSharedValue, 
    useAnimatedStyle, 
    withTiming} from 'react-native-reanimated';

import { connect } from 'react-redux';
import { setSelectedTab } from '../store/tabs/tabActions';

import {
    Home, 
    Search,
    Cart,
    Favourite,
    Notification
} from './index'

import {
    COLORS,
    FONTS,
    SIZES,
    icons,
    constants,
    dummyData
} from '../constants'
import {LinearGradient} from 'expo-linear-gradient';
import Header from '../components/Header';


/* !!!LinearGradient Not working */


const TabButton = ({label, icon, isFocused, onPress}) => {
    return(
        <TouchableWithoutFeedback
           onPress={onPress}
        >
            <Animated.View
              style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center'
              }}
            >
                <Animated.View
                  style={{
                      flexDirection: 'row',
                      width: '80%',
                      height: 50,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 25
                  }}
                >
                    <Image
                       source={icon}
                       style={{
                           width: 20,
                           height: 20,
                           tintColor: COLORS.gray
                       }}
                    />
                    {
                        isFocused &&
                        <Text 
                        numberOfLines={1}
                        style={{
                            marginLeft: SIZES.base,
                            color: COLORS.gray,
                            ...FONTS.h3
                        }}
                        >
                            {label}
                        </Text>
                    }
                </Animated.View>
            </Animated.View>

        </TouchableWithoutFeedback>
    )
}

const Layout =({drawerAnimationStyle, navigation, selectedTab, setSelectedTab})=>{
    
    useEffect(()=>{
        setSelectedTab(constants.screens.home)
    }, [])
    
    return (
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
          ...drawerAnimationStyle,
        }}
      >
        {/* Header */}
        <Header
          containerStyle={{
            height: 50,
            paddingHorizontal: SIZES.padding,
            marginTop: 40,
            alignItems: "center",
          }}
          title={selectedTab.toUpperCase()}
          leftComponent={
            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
                alignItems: "center",
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: COLORS.gray2,
                borderRadius: SIZES.radius
              }}
              onPress={()=> navigation.openDrawer()}
            >
                <Image
                  style={{
                      width:20,
                      height:20,
                      tintColor: COLORS.gray2
                  }}
                  source={icons.menu}
                />
            </TouchableOpacity>
          }
          rightComponent={
              <TouchableOpacity
                style={{
                    borderRadius: SIZES.radius,
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow:'hidden'
                }}
              >
                  <Image
                    source={dummyData?.myProfile?.profile_image}
                    style={{
                        width:40,
                        height: 40
                    }}
                  />
              </TouchableOpacity>
          }
        />

        {/* Content */}
        <View
          style={{
            flex: 1,
          }}
        >
          <Text>Hello Woorllldd! :D</Text>
        </View>
        {/* Footer */}
        <View
          style={{
              height: 100,
              justifyContent: 'flex-end'
          }}
        >
            {/* Shadow */}
            <LinearGradient
                start={{x:0, y:0}}
                end={{x:0, y:4}}
                colors={[
                    COLORS.transparent,
                    COLORS.lightGray1
                ]}
                style={{
                    position: 'absolute',
                    top: -20,
                    left: 0,
                    right: 0,
                    height: 100,
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15
                }}
            >
            </LinearGradient>

            {/* Tab */}
            <View
              style={{
                  flex: 1,
                  flexDirection: 'row',
                  paddingHorizontal: SIZES.radius,
                  paddingBottom: 10,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  backgroundColor: COLORS.white
              }}
            >
                <TabButton
                    label={constants.screens.home}
                    icon={icons.home}
                    isFocused={selectedTab == constants.screens.home}
                    onPress={()=>setSelectedTab(constants.screens.home)}
                />
                <TabButton
                    label={constants.screens.search}
                    icon={icons.search}
                    isFocused={selectedTab == constants.screens.search}
                    onPress={()=>setSelectedTab(constants.screens.search)}
                />
                <TabButton
                    label={constants.screens.cart}
                    icon={icons.cart}
                    isFocused={selectedTab == constants.screens.cart}
                    onPress={()=>setSelectedTab(constants.screens.cart)}
                />
                <TabButton
                    label={constants.screens.favourite}
                    icon={icons.love}
                    isFocused={selectedTab == constants.screens.favourite}
                    onPress={()=>setSelectedTab(constants.screens.favourite)}
                />
                <TabButton
                    label={constants.screens.notification}
                    icon={icons.notification}
                    isFocused={selectedTab == constants.screens.notification}
                    onPress={()=>setSelectedTab(constants.screens.notification)}
                />
            </View>

        </View>
      </Animated.View>
    );
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(Layout)
  