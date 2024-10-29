import { View, Text, Pressable, Image } from 'react-native';
import PagerView from 'react-native-pager-view'

export function Banner() {
 return (
   <View className='w-full h-36 rounded-2xl mt-8 mb-4'>
    {/* Aplicamos o style direto no componente pois ele n reconhece o className */}
        <PagerView style={{ flex: 1 }} initialPage={0} pageMargin={14}>
            <Pressable 
                className='w-full h-36 rounded-2xl' 
                key="1"
                onPress={() => console.log("Clicou no Banner")}
            >
                <Image
                    source={require("../../assets/banner1.png")}
                    className='w-full h-36 rounded-2xl'
                />
            </Pressable>

            <Pressable 
                className='w-full h-36 rounded-2xl' 
                key="2"
                onPress={() => console.log("Clicou no Banner")}
            >
                <Image
                    source={require("../../assets/banner2.png")}
                    className='w-full h-36 rounded-2xl'
                />
            </Pressable>
            

            <Pressable 
                className='w-full h-36 rounded-2xl' 
                key="3"
                onPress={() => console.log("Clicou no Banner")}
            >
                <Image
                    source={require("../../assets/banner3.png")}
                    className='w-full h-36 rounded-2xl'
                />
            </Pressable>

            <Pressable 
                className='w-full h-36 rounded-2xl' 
                key="4"
                onPress={() => console.log("Clicou no Banner")}
            >
                <Image
                    source={require("../../assets/banner4.png")}
                    className='w-full h-36 rounded-2xl'
                />
            </Pressable>

            <Pressable 
                className='w-full h-36 rounded-2xl' 
                key="5"
                onPress={() => console.log("Clicou no Banner")}
            >
                <Image
                    source={require("../../assets/banner5.png")}
                    className='w-full h-36 rounded-2xl'
                />
            </Pressable>
            
        </PagerView>
   </View>
  );
}