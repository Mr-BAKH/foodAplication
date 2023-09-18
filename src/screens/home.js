import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { UserCircleIcon, BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import axios from 'axios';

import { View, Text, ScrollView, Platform, Image, TextInput } from 'react-native'
import Categories from '../components/categories'
import Recipes from '../components/recipes'
import { StatusBar } from 'expo-status-bar'
import React from 'react'



export default function Home() {

  const AndroidClass = Platform.OS == 'android'? 'pt-[50px]': ''
  const [activecat, setActivecat] = React.useState('Beef')
  const [catigures, setCatigures] = React.useState([])
  const [recipes, setRecipes] = React.useState([])

  React.useEffect(()=>{
    getCatigures()
    getRecipes()
  },[])

  // React.useEffect(()=>{
  //   getRecipes()
  // },[catigures])

  const getCatigures = async()=>{
    const endPoint = 'https://themealdb.com/api/json/v1/1/categories.php'
    try{
      const response = await axios.get(endPoint);
      if(response && response.data){
        setCatigures(response.data.categories)
      }
    }catch(err){
      console.log('Error',err.message)
    }
  }
  const getRecipes = async(category='Beef')=>{
    const endPoint = `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`
    try{
      const response = await axios.get(endPoint);
      // console.log(response.data.meals)
      if(response && response.data){
        setRecipes(response.data.meals)
      }
    }catch(err){
      console.log('Error',err.message)
    }
  }

  const handleChangeCategory = (catigures)=>{
    getRecipes(catigures)
    setActivecat(catigures)
    setRecipes([])
  }
  
  return (
    <View className='flex-1 bg-white'>
     <StatusBar style='dark'/>
     <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom:50}}
      className={`${AndroidClass} space-y-6`}
     >

      {/* Avatar & bell Icon */}
      <View className='mx-3 flex-row justify-between items-center mb-2'>
       <UserCircleIcon size={hp(4)} color={'gray'}/>
       <BellIcon size={hp(4)} color={'gray'}/>
      </View>

      {/* greeting & punchline */}
      <View className='mx-4 space-y-2 mb-2'>
       <Text style={{fontSize: hp(1.7)}} className='text-neutral-600'>Hello, Mrbakh!</Text>
       <View>
        <Text style={{fontSize: hp(3.8)}} className='font-semibold text-neutral-600'>Make your own food,</Text>
       </View>
       <Text style={{fontSize: hp(3.8)}} className='font-semibold text-neutral-600'>
        stay at <Text className='text-amber-400' >home</Text>
       </Text>
      </View>

      {/* searchbar */}
      <View className='mx-4 flex-row items-center rounded-full bg-black/5 p-2'>
       <TextInput
        placeholder='Search any recipe'
        placeholderTextColor={'gray'}
        style={{fontSize: hp(1.7)}}
        className="flex-1 text-base mb-1 pl-3 tracking-wider"
       />
       <View className='bg-white rounded-full p-3'>
        <MagnifyingGlassIcon size={hp(2.5)} color={"gray"}/>
       </View>
      </View>

      {/* categories  */}
      <View>
       {catigures.length > 0  &&
        <Categories catigures={catigures} activeCategory={activecat} handleChangeCategory={handleChangeCategory}/>
       }
      </View>
      {/* recipes */}
      <View>
      {catigures.length > 0  &&
       <Recipes recipes={recipes} categories={catigures}/>
      }
      </View>
     </ScrollView>
    </View>
  )
}