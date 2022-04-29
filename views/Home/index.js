import React, {useState, useEffect} from 'react';
import {
    View, 
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList
} from 'react-native';
import {FONTS, SIZES, COLORS, icons, dummyData} from "../../constants"
import HorizontalFoodCard from '../../components/HorizontalFoodCard';


const Home =()=>{

    const [selectedCategoryId, setSelectedCategoryId] = useState(1)
    const [selectedMenu, setSelectedMenu] = useState(1)
    const [menuList, setMenuList] = useState([])
    const [recommends, setRecommends] = useState([])

    useEffect(()=>{
         handleChangeCategory(selectedCategoryId, selectedMenu)
    }, [])

    //handler

    function handleChangeCategory(categoryId, menuId){

        //Retrieve the recommended menu
        let selectedRecommend = dummyData.menu.find(a => a.name == "Recommended")
        //find the menu based on the menuId
        let selectedMenu = dummyData.menu.find(a=> a.id == menuId)
        //Set the recommended menu based on the categoryid
        setRecommends(selectedRecommend?.list.filter(a=>a.categories.includes(categoryId)))
        //find the menu based on the categoryId
        setMenuList(selectedMenu?.list.filter(a => a.categories.includes(categoryId)))
    }

    
    function renderSearch(){
        return(
            <View
               style={{
                   flexDirection:'row',
                   height: 40,
                   alignItems: 'center',
                   marginHorizontal: SIZES.padding,
                   marginVertical: SIZES.base, 
                   paddingHorizontal: SIZES.radius,
                   borderRadius: SIZES.radius,
                   backgroundColor: COLORS.lightGray2
               }}
            >
                {/* ICON */}

               <Image
                   source={icons.search}
                   style={{
                       height: 20,
                       width: 20,
                       tintColor: COLORS.black
                   }}
               />

                {/* TEXT INPUT */}
                <TextInput
                     style={{
                         flex: 1,
                         marginLeft: SIZES.radius,
                         ...FONTS.body3
                     }}
                     placeholder="search..."
                />
                {/* FILTER BUTTON */}
                <TouchableOpacity
                //onPress
                >
                    <Image
                        source={icons.filter}
                        style={{
                            height: 20,
                            width: 20,
                            tintColor: COLORS.black
                        }}
                    />
                </TouchableOpacity>

            </View>
        )
    }

    function renderMenuTypes(){
        return(
            <FlatList
                horizontal
                data={dummyData.menu}
                keyExtractor={item=>`${item.id}`}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    marginTop: 30,
                    marginBottom: 20
                }}
                renderItem={({item, index})=>{
                    return(
                    <TouchableOpacity
                         style={{
                             marginLeft: SIZES.padding,
                             marginRight: index == dummyData.menu.length -1 ? SIZES.padding : 0
                         }}
                         onPress={()=>{
                             setSelectedMenu(item.id)
                             handleChangeCategory(selectedCategoryId, item.id)
                         }}
                    >
                        <Text
                          style={{
                              color: selectedMenu == item.id ? COLORS.primary : COLORS.black,
                              ...FONTS.h3
                          }}
                        >
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                    )
                }}
            />
        )
    }

    const Section = ({title, onPress, children})=>{
        return(
            <View>
                {/* Header */}
                <View
                  style={{
                      flexDirection: 'row',
                      marginHorizontal: SIZES.padding,
                      marginTop: 30,
                      marginBottom: 20
                  }}
                >
                    <Text 
                       style={{
                           flex: 1,
                           ...FONTS.body3
                       }}
                    >
                        {title}
                    </Text>
                    <TouchableOpacity
                       onPress={onPress}
                    >
                        <Text
                           style={{
                               color: COLORS.primary,
                               ...FONTS.body3
                           }}
                        >
                            Show All
                        </Text>
                    </TouchableOpacity>

                </View>

                {/* Content */}
                {children}
            </View>
        )
    }

    function renderRecommendedSection(){
        return(
            <Section
               title='Recommended'
               onPress={()=> console.log('Show all recommended')}
            >
                <FlatList
                data={recommends}
                keyExtractor={item=>`${item.id}`}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index})=>{
                    return(
                        <HorizontalFoodCard
                            containerStyle={{
                                height: 180,
                                width: SIZES.width * 0.85,
                                marginLeft: index == 0 ? SIZES.padding : 0,
                                paddingRight: SIZES.radius,
                                alignItems: 'center'
                            }}
                            imageStyle={{
                                marginTop: 35,
                                height: 150,
                                width: 150
                            }}
                            item={item}
                            onPress={()=>console.log('HorizontalFoodCard')}
                        />
                    )
                }}
                />

            </Section>
        )
    }
    //RENDER



    return(
        <View
          style={{
              flex:1,
          }}
        >
            {/* SEARCH */}

            {renderSearch()}

            {/* LIST */}
            <FlatList
                data={menuList}
                keyExtractor={(item)=> `${item.id}`}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View>
                        {/* Recommended Section */}
                        {renderRecommendedSection()}
                        {/* MenuType */}
                        {renderMenuTypes()}
                    </View>
                }
                renderItem={({item, index})=>{
                    return(
                        <HorizontalFoodCard
                             containerStyle = {{
                                 height: 130,
                                 alignItems: 'center',
                                 marginHorizontal: SIZES.padding,
                                 marginBottom: SIZES.radius
                             }}
                             imageStyle={{
                                 marginTop: 20,
                                 height: 110,
                                 width: 110
                             }}
                             item={item}
                             onPress={()=>console.log('HorizontalFoodCard')}
                        />
                    )
                }}
            /> 

        </View>
    )
}

export default Home;