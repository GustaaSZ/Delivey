import { View, Text, Pressable, Image } from 'react-native';
import { FoodProps } from '..'
import { Ionicons, Feather } from '@expo/vector-icons' 

export function ItemFood2({ food }: { food: FoodProps }) {
    return (
        <Pressable 
            className='flex flex-col rounded-xl relative '
            onPress={() => console.log("Clicou no/na " +food.name)}
        >
            {/* Adicionando a Imagem ao Item/card */}
            <Image
                source={{ uri: food.image}}
                className='w-72 h-36 rounded-xl'
            />
            <View className='flex flex-row bg-neutral-900/70 rounded-2xl absolute top-1 left-2 px-2 py-1 items-center justify-center'>
                <Ionicons name='star' size={13} color="#eab308" />
                <Text className='text-zinc-100 text-sm px-2'>{food.rating}</Text>
            </View>
            <Text className='text-green-400 text-sm mt-1'>R$ {food.price}</Text>
            <Text className='text-zinc-100 text-lg font-semibold'>{food.name}</Text>
            <Text className='text-zinc-300 text-xs mt-1'>{food.time}</Text>
            
        </Pressable>
    );
}