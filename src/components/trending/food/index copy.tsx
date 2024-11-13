import { View, Text, Pressable, Image } from 'react-native';
import { router, useRouter } from "expo-router";
import { FoodProps } from '..'
import { Ionicons, Feather } from '@expo/vector-icons' 

// --- FUNÇÃO ItemFood2 que será Usado na tela de Search --- 
export function ItemFood2({ food }: { food: FoodProps }) {
    const router = useRouter();
    return (
        <Pressable 
            className='flex flex-col rounded-xl relative items-center justify-center'
            onPress={() => router.navigate({ 
                // Caminho de navegação
                pathname: './foodDetails', // caminho alternativo pro tsx reconhecer
                // Passando os parâmetros para navegação pra tela de foodDetails
                params: {
                    id: food.id,
                    name: food.name,
                    price: food.price,
                    rating: food.rating,
                    image: food.image,
                    time: food.time,
                    ingredientes: food.ingredientes,
                    restaurantId: food.restaurantId,
                } 
            })} 
        >
            {/* Adicionando a Imagem ao Item/card */}
            <Image
                source={{ uri: food.image}}
                className='w-72 h-36 rounded-xl'
            />
            <View style={{ left: 60 }} className='flex flex-row bg-neutral-900/70 rounded-2xl absolute top-1 px-2 py-1 items-center justify-center'>
                <Ionicons name='star' size={13} color="#eab308" />
                <Text className='text-zinc-100 text-sm px-2'>{food.rating}</Text>
            </View>
            <Text className='text-green-400 text-sm mt-1'>R$ {food.price}</Text>
            <Text className='text-zinc-100 text-lg font-semibold'>{food.name}</Text>
            <Text className='text-zinc-300 text-xs mt-1'>{food.time}</Text>
            
        </Pressable>
    );
}