import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from 'lottie-react-native';

import {useState , useEffect } from 'react';

import Animated from "react-native-reanimated";

export default function CachImage(props){
 
  const [catchedsource, setCatchedsource] = useState(null)
  const {uri} = props;

  useEffect(()=>{
    const getCacheImageData = async()=>{
        try{
         const cacheImageData = await AsyncStorage.getItem(uri);
         if(cacheImageData){
            setCatchedsource({uri: cacheImageData})
         }else{
            const response = await fetch(uri);
            const imageBlob = await response.blob();
            const base64Data = await new Promise((resolve)=>{
                const reader = new FileReader();
                reader.readAsDataURL(imageBlob);
                reader.onload=()=>{
                    resolve(reader.result);
                };
            });
            await AsyncStorage.setItem(uri, base64Data);
            setCatchedsource({uri: base64Data});
         }
        }catch(e){
            console.log('Error catching Image!',e)
            setCatchedsource({uri});
        }
    }
    getCacheImageData();
  },[])

  return (
    <Animated.Image source={catchedsource}{...props}/>
  )
}