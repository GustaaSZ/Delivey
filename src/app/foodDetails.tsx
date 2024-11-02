import { router, useRouter } from 'expo-router';
import { View, Text, Image, Pressable } from 'react-native';
import BackButton from '../components/backButton';
import { useLocalSearchParams } from 'expo-router';
import Constants from 'expo-constants';

// Constante pra definir uma altura padrão na view
const statusBarHeight = Constants.statusBarHeight;

export default function FoodDetails() {
    
    // Acessa os atributos do alimento
    const { id, name, price, rating, time, image, ingredientes } = useLocalSearchParams(); 
    // Verifique se image é uma string
    const imageUri = Array.isArray(image) ? image[0] : image; // Pega o primeiro valor se for um array

    return (
        <View 
            style={{ flex: 1, backgroundColor: '#18181b' }} 
            className="bg-zinc-900 text-zinc-300"
        >
            {/* px = padding interno na esquerda e na direita */}
            <View className="w-full px-6 bg-zinc-900" style={{ marginTop: statusBarHeight + 15}}>
                <BackButton  rota='/search'/>
                <View className='mt-10' >
                    <Image
                        source={{ uri: imageUri }} 
                        className='w-72 h-36 rounded-xl' 
                    />
                </View>
                {/* <Text className='text-zinc-200 text-2xl text-center'>Detalhes do Alimento</Text> */}
                {/* Renderização dos detalhes do alimento */}
                <Text className='text-zinc-200 text-2xl text-center'>{name}</Text>
                <Text className='text-zinc-400'>Id do alimento: {id}</Text>
                <Text className='text-zinc-400'>Preço : R$ {price}</Text>
                <Text className='text-zinc-400'>Ingredientes : {ingredientes}</Text>
                
            </View>
        </View>
    );
}
