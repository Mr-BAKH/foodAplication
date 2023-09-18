import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated,{ FadeInDown } from 'react-native-reanimated';

import CachImage from '../constants/helpers/image';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import { categoryData } from '../constants/index'
import React from 'react'


export default function SliceApp({activeCategory,handleChangeCategory,catigures}) {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
     <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className='space-x-4'
      contentContainerStyle={{paddingHorizontal: 15}}
     >
      {
        catigures.map((item,index)=>{
          let isActive = item.strCategory === activeCategory;
          let acitveButtonClass = isActive? 'bg-amber-400': 'bg-black/10'
          return(
            <TouchableOpacity
             key={index}
             className='items-center space-y-1'
             onPress={()=> handleChangeCategory(item.strCategory)}
            >
             <View className={`rounded-full p-[6px] ${acitveButtonClass}`}>
               <CachImage
                uri={item.strCategoryThumb}
                style={{width:hp(6), height:hp(6), borderRadius:hp(6)}}
                // className='rounded-full'
               />
               {/* <Image
                source={{uri:item.strCategoryThumb}}
                style={{width:hp(6), height:hp(6)}}
                className='rounded-full'
               /> */}
             </View>
             <Text style={{fontSize:hp(1.6)}} className='text-neutral-600'>
              {item.strCategory}
             </Text>
            </TouchableOpacity>
          )
        })
      }
     </ScrollView>
    </Animated.View>
  )
}