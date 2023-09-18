import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list';
import Animated,{ FadeInDown } from 'react-native-reanimated';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

import CachImage from '../constants/helpers/image';
import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'

export default function SliceApp({recipes,categories}) {
     
    const navigation = useNavigation()

  return (
    <View className="mx-4 space-y-3">
     <Text style={{fontSize:hp(3)}} className='font-semibold text-neutral-600'>
      Recipes
     </Text>
     <View>
      {
        categories.length == 0 && recipes.length == 0 ? 
         <LottieView 
          autoPlay 
          loop
          style={{width:wp(90),margin:'auto'}}
          source={require('../../assets/lottie/animation_lmoyk2oy.json')}
         />
        :
         <MasonryList
          data={recipes}
          keyExtractor={(item) => item.idMeal}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({item,i}) => <RecipeCard item={item} index={i} navigation={navigation} />}
          // refreshing={isLoadingNext}
          // onRefresh={() => refetch({first: ITEM_CNT})}
          onEndReachedThreshold={0.1}
          // onEndReached={() => loadNext(ITEM_CNT)}
         />
    }
     </View>
    </View>
  )
}

const RecipeCard = ({item, index, navigation})=>{
    const isEven = index%2;

    return(
        <Animated.View entering={FadeInDown.delay(index*100).duration(600).springify().damping(12)}>
         <Pressable
          style={[{width:'100%'},isEven? {paddingLeft:5}:{paddingRight:5}]}
          className='justify-center mb-4 space-y-1'
          onPress={()=> navigation.navigate('Recipes',{...item})}
         >
          {/* <Image
           source={{uri: item.strMealThumb}}
           style={{width:'100%', height:index%3==0?hp(25):hp(35), borderRadius:35}}
           className='bg-black/5 '
          /> */}
          <CachImage
           uri={item.strMealThumb}
           style={{width:'100%', height:index%3==0?hp(25):hp(35), borderRadius:35}}
           className='bg-black/5 '
           sharedTransitionTag={item.strMeal}
          />
          <Text style={{fontSize: hp(1.5)}}>
            {item.strMeal.length> 20? item.strMeal.slice(0,20)+'...' : item.strMeal}
            </Text>
         </Pressable>
        </Animated.View>
    )
}