import { router, useRouter } from 'expo-router';
import { View, Text, Image, Pressable } from 'react-native';
import BackButton from '../components/backButton';
import { useLocalSearchParams } from 'expo-router';


export default function FoodDetails() {
    const { id } = useLocalSearchParams(); // Acessa o ID do alimento
    
    // Exemplo de como você pode usar o ID para buscar o alimento
    // const food = findFoodById(id); // Função fictícia para buscar o alimento pelo ID

    return (
        <View className="flex-1 items-center justify-center bg-zinc-900 relative">
            <BackButton />
            <Text className='text-zinc-200 text-2xl text-center'>Detalhes do Alimento</Text>
            {/* Exemplo de renderização dos detalhes do alimento */}
            <Text className='text-zinc-400'>ID do alimento: {id}</Text>
            {/* <Text className='text-zinc-400'>ID do restaurante: {}</Text> */}
            {/* Renderize aqui as informações específicas do alimento */}
        </View>
    );
}
