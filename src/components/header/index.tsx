import { View, Pressable, Text } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons' 
import {DrawerToggleButton} from "@react-navigation/drawer"
import { useRouter } from 'expo-router';

export function Header() {
    const router = useRouter();
 return (
   <View className='w-full items-center justify-between flex flex-row text-zinc-400'>
    <Pressable className='w-10 h-10 bg-zinc-800 rounded-full flex justify-center items-center'>
        <DrawerToggleButton
            tintColor='#9ca3af'
        />
    </Pressable>

    <View className='flex flex-col items-center justify-center'>
        <Text className='text-zinc-400 text-center text-sm'>Localização</Text>
        <View className='flex-row items-center justify-center gap-2'>
            <Feather name='map-pin' size={12} color="#a3e635"/>
            <Text className='text-zinc-300'>Brasília- DF</Text>
        </View>
    </View>

    <Pressable className='w-10 h-10 bg-zinc-800 rounded-full flex justify-center items-center'
        onPress={() => router.navigate({
            pathname: '/location'
        })}
    >
        <Feather name="map-pin" size={20} color="#a1a1aa"/>
    </Pressable>
   </View>
  );
}