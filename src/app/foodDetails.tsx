import { router, useRouter } from 'expo-router';
import { View, Text, Image, Pressable } from 'react-native';
import BackButton from '../components/backButton';
import { useLocalSearchParams } from 'expo-router';

export default function FoodDetails() {
    
    // Acessa os atributos do alimento
    const { id, name, price, rating, time, image, ingredientes } = useLocalSearchParams(); 
    // Verifique se image é uma string
    const imageUri = Array.isArray(image) ? image[0] : image; // Pega o primeiro valor se for um array

    return (
        <View className="flex-1 items-center justify-center bg-zinc-900 relative">
            <BackButton />
            <Text className='text-zinc-200 text-2xl text-center'>Detalhes do Alimento</Text>
            {/* Renderização dos detalhes do alimento */}
            <Text className='text-zinc-400'>ID do alimento: {id}</Text>
            <Text className='text-zinc-400'>Nome do prato : {name}</Text>
            <Text className='text-zinc-400'>Preço : R$ {price}</Text>
            <Text className='text-zinc-400'>Ingredientes : {ingredientes}</Text>
            <Image 
                source={{ uri: imageUri }} 
                className='w-72 h-36 rounded-xl' 
            />
        </View>
    );
}
