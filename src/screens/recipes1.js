import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/solid'
import { ClockIcon, UserIcon, FireIcon, Square3Stack3DIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import Animated,{ FadeIn, FadeInDown } from 'react-native-reanimated';


import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import CachImage from '../constants/helpers/image';
import React, { useEffect, useState } from 'react'

export default function Recipes(props) {
    // console.log(props.route.params)
    const navigation = useNavigation()
    let item = props.route.params;

    const [hearclass, toggleHeartclass] = useState(false)
    const [meal, setMeal]= useState(null); 
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
      getMealData(item.idMeal);
    },[])

    const getMealData = async(id)=>{
      const endPoint = `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      try{
        const response = await axios.get(endPoint);
        // console.log(response.data)
        if(response && response.data){
          setMeal(response.data.meals[0])
          setLoading(true)
        }
      }catch(err){
        console.log('Error',err.message)
      }
    }

    const ingredientsIndex = (meal)=>{
      if(!meal) return [];
      let index = [];
      for(let i = 1 ; i< 20; i++){
        if(meal['strIngredient'+i]){
          index.push(i);
        }
      }
      return index;
    }

  return (
    <ScrollView
     className="bg-white flex-1"
     showsVerticalScrollIndicator={false}
     contentContainerStyle={{paddingBottom: 30}}
    >
     <StatusBar style={'light'}/>
     {/* recipe image */}
     <View className='flex-row justify-center'>
      <CachImage
       uri={item.strMealThumb}
       style={{width: wp(100), height:hp(50), borderBottomRightRadius:53, borderBottomLeftRadius:53}}
       resizeMode='cover'
       sharedTransitionTag={item.strMeal}
      />
     </View>
     {/* back button */}
     <Animated.View entering={FadeIn.delay(200).duration(500)} className='w-full absolute flex-row justify-between items-center pt-[50px]'>
      <TouchableOpacity
       className='p-2 rounded-full ml-5  bg-white/25'
       onPress={()=> navigation.goBack()}
      >
        <ChevronLeftIcon size={hp(5)} color={'white'}/>
      </TouchableOpacity>
      <TouchableOpacity
       className='p-2 rounded-full mr-5 bg-white/25'
       onPress={()=> toggleHeartclass(!hearclass)}
       >
        <HeartIcon size={hp(5)} color={hearclass?'darkred':'lightgray'}/>
      </TouchableOpacity>
     </Animated.View>
     {/* meal description */}
     {
      loading?
      <View className='px-4 justify-between space-y-4 pt-8'>
       {/* name and area */}
       <Animated.View entering={FadeInDown.duration(700).springify().damping(12)} className='space-y-2'>
        <Text style={{fontSize:hp(3)}} className='flex-1 font-bold text-neutral-700'>
         {meal?.strMeal}
        </Text>
        <Text style={{fontSize:hp(2)}} className='flex-1 font-mediom text-neutral-500'>
         {meal?.strArea}
        </Text>
       </Animated.View>
       {/* misc */}
       <Animated.View entering={FadeInDown.delay(100).duration(700).springify().damping(12)} className='flex-row justify-around'>
        <View className='flex rounded-full bg-amber-300 p-2'>
         <View
          style={{height: hp(6.5), width:hp(6.5)}}
          className='bg-white rounded-full items-center justify-center'
         >
          <ClockIcon size={hp(4)} strokeWidth={2.5} color={'#525252'}/>
         </View>
         <View className='items-center py-2 space-y-1'>
          <Text style={{fontSize:hp(2)}} className='font-bold text-neutral-700'>
           35
          </Text>
          <Text style={{fontSize:hp(1.3)}} className='font-bold text-neutral-700'>
           Mins
          </Text>
         </View>
        </View>
        {/* ------------- */}
        <View className='flex rounded-full bg-amber-300 p-2'>
         <View
          style={{height: hp(6.5), width:hp(6.5)}}
          className='bg-white rounded-full items-center justify-center'
         >
          <UserIcon size={hp(4)} strokeWidth={2.5} color={'#525252'}/>
         </View>
         <View className='items-center py-2 space-y-1'>
          <Text style={{fontSize:hp(2)}} className='font-bold text-neutral-700'>
           3
          </Text>
          <Text style={{fontSize:hp(1.3)}} className='font-bold text-neutral-700'>
           Servings
          </Text>
         </View>
        </View>
        {/* ------------- */}
        <View className='flex rounded-full bg-amber-300 p-2'>
         <View
          style={{height: hp(6.5), width:hp(6.5)}}
          className='bg-white rounded-full items-center justify-center'
         >
          <FireIcon size={hp(4)} strokeWidth={2.5} color={'#525252'}/>
         </View>
         <View className='items-center py-2 space-y-1'>
          <Text style={{fontSize:hp(2)}} className='font-bold text-neutral-700'>
           103
          </Text>
          <Text style={{fontSize:hp(1.3)}} className='font-bold text-neutral-700'>
           Cal
          </Text>
         </View>
        </View>
        {/* ------------- */}
        <View className='flex rounded-full bg-amber-300 p-2'>
         <View
          style={{height: hp(6.5), width:hp(6.5)}}
          className='bg-white rounded-full items-center justify-center'
         >
          <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color={'#525252'}/>
         </View>
         <View className='items-center py-2 space-y-1'>
          <Text style={{fontSize:hp(2)}} className='font-bold text-neutral-700'>
           1/10
          </Text>
          <Text style={{fontSize:hp(1.3)}} className='font-bold text-neutral-700'>
           Is it hard?
          </Text>
         </View>
        </View>
       </Animated.View>
       {/* ingredients */}
       <Animated.View entering={FadeInDown.delay(200).duration(700).springify().damping(12)} className='space-y-4'>
        <Text style={{fontSize: hp(2.5)}} className='font-bold flex-1 text-neutral-700'>
         ingredients
        </Text>
        <View className='space-y-2 ml-3'>
         {
          ingredientsIndex(meal).map(items =>{
            return(
              <View key={items} className='flex-row space-x-4'>
               <View 
                style={{height: hp(1.5), width: hp(1.5)}}
                className='bg-amber-300 rounded-full '
               ></View>
               <View className='flex-row space-x-2'>
                 <Text style={{fontSize:hp(1.7)}} className='font-extrabold text-neutral-700'>{meal['strMeasure'+items]}</Text>
                 <Text style={{fontSize:hp(1.7)}} className='font-medium text-neutral-500'>{meal['strIngredient'+items]}</Text>
               </View>
              </View>
            )
          })
         }
        </View>
       </Animated.View>
       {/* Instruction */}
       <Animated.View entering={FadeInDown.delay(500).duration(700).springify().damping(12)} className='space-y-4'>
        <Text style={{fontSize: hp(2.5)}} className='font-bold flex-1 text-neutral-700'>
         Instructions
        </Text>
        <Text style={{fontSize:hp(1.6)}} className='text-neutral-700'>
         {
          meal?.strInstructions
         }
        </Text>
       </Animated.View>
      </View>
      :
      <LottieView 
       autoPlay 
       loop
       style={{width:wp(100),margin:'auto'}}
       source={require('../../assets/lottie/loading2.json')}
      />
     }

    </ScrollView>
  )
}