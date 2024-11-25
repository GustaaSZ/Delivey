import { View, Text, Pressable, Image } from 'react-native';
import {RestaurantProps} from '..'
import { Ionicons, Feather } from '@expo/vector-icons' 
import { router } from 'expo-router';

export function ItemRestaurant({ restaurant }: { restaurant: RestaurantProps }) {
    return (
        <Pressable 
            className='flex flex-col items-center px-1 gap-2'

            // Adiconando navegação para o arquivo de restaurantDetails
            onPress={() => router.navigate({
                pathname: '/pages/restaurantDetails',
                params: {
                    id: restaurant.id
                }  // Passando o ID do restaurante para a tela de restaurantDetails
            })}
        
        >
            {/* Adicionando a Imagem ao Item/card */}
            <Image
                source={{ uri: restaurant.image}}
                className='w-20 h-20 rounded-full'
            />
            <Text className='text-zinc-300 text-sm w-20 text-center leading-4' numberOfLines={2}>{restaurant.name}</Text>
        
        </Pressable>
    );
}