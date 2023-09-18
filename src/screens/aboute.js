import {View, Text, Image, TouchableOpacity} from 'react-native'

const About = ({navigation})=>{
    return(
        <View
          style={{gap:10}}
          className='flex-1 px-[10px] bg-slate-800 justify-between py-[40px] items-center'
        >
            <View 
              style={{gap:10}}
                className='flex-1 items-center justify-center' >
            <Image
              className='w-[200px] h-[200px]'
              resizeMode='contain'
              source={require('../../assets/image/logo192.png')}
            />
            <Text className='text-white font-semibold text-[20px]'>Designed by Mr.bakh</Text>
            <View
               className="bg-white/10 flex p-[10px] flex-row items-center rounded-md "
             >
              <Image source={require('../../assets/image/vecteezy_whatsapp-logo-transparent-png_22101124_293.png')}
               className="w-10 h-10"
              />
              <Text
                className='text-white font-bold text-[19px]'
              >+98 915 496 8488</Text>
            </View>
            <View
             className='p-5 mt-[20px] w-full justify-center items-center '
            >
            </View>
            </View>
            <TouchableOpacity
                className='w-full py-[15px] rounded-full items-center'
                onPress={()=> navigation.navigate('Welcome')}
            >
                <Text
                className='text-[20px] text-white'
                >Start Application</Text>
            </TouchableOpacity>
        </View>
    )
}

export default About;