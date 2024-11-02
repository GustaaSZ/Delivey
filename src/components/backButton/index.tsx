import { Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

export default function BackButton() {
  const router = useRouter();

  return (
    <View className='w-full items-center justify-between flex flex-row text-zinc-400'>
        <Pressable 
            className='w-10 h-10 bg-zinc-800 rounded-full flex justify-center items-center'
            onPress={() => router.push("/search")} // Navegação para a tela anterior
        >
        <Feather name='chevron-left' color='#e4e4e7' size={25}/>
        </Pressable>
    </View>
  );
}