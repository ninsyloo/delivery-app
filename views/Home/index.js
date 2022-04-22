import React from 'react';
import {
    View, 
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList
} from 'react-native';
import {FONTS, SIZES, COLORS, icons, dummyData} from "../../constants"

const Home =()=>{
    return(
        <View
          style={{
              flex:1,
              alignItems: 'center',
              justifyContent: 'center'
          }}
        >
            <Text>HOME</Text>
        </View>
    )
}

export default Home;