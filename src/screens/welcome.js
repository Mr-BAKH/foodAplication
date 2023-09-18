import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

import { View, Text, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import React from 'react'

export default function Welcome({navigation}) {
  const widthShape = useSharedValue(0);7
  React.useEffect(()=>{
    setTimeout(() => {
      widthShape.value = withSpring(widthShape.value+ wp(80))
    }, 1000);
    setTimeout(()=>{
        navigation.navigate("Home")
    },4000)
  },[])

  return (
    <View className='flex-1 justify-center items-center space-y-10 bg-amber-500'>
     <StatusBar style='light'/>
     {/* logo image */}
     <Animated.View 
      style={{width:widthShape, height:widthShape}} 
      className='bg-black/10 rounded-full justify-center item-center'
     >
       <LottieView 
        autoPlay 
        loop
        style={{width:wp(80)}}
        source={require('../../assets/lottie/animation_lmomjnb0.json')}
      />
     </Animated.View>
     {/* title and punchline */}
     <View className="items-center space-y-2">
      <Text style={{fontSize:hp(7)}} className='font-blod text-white tracking-widest'>Foody</Text>
      <Text style={{fontSize:hp(2)}} className='font-medium text-white tracking-widest'>
       Food is always right!
      </Text>
     </View>

    </View>
  )
}