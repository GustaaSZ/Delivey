import { router, useRouter } from 'expo-router';
import { View, Text, Pressable, ImageBackground } from 'react-native';
import BackButton from '../components/backButton';
import { useLocalSearchParams } from 'expo-router';
import Constants from 'expo-constants';
import { ScrollView } from 'react-native-gesture-handler';

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
            <View className="w-full px-0 bg-zinc-900" >
                <ImageBackground
                    source={{ uri: imageUri }}
                    style={{
                        width: '100%',
                        height: 200,  // Defina a altura que você deseja para a imagem de fundo
                        justifyContent: 'flex-start',
                        paddingTop: statusBarHeight + 15,
                    }}
                    resizeMode="cover"
                >
                    {/* Botão de voltar sobre a imagem */}
                    <BackButton rota='/search' />
                </ImageBackground>
               
                {/* Detalhes do alimento abaixo da imagem */}
                <ScrollView 
                    style={{ paddingHorizontal: 24, paddingVertical: 16 }}
                    className="bg-zinc-900 text-zinc-300"
                    showsVerticalScrollIndicator={false}
                >
                    <Text className='text-zinc-200 text-2xl text-center'>{name}</Text>
                    <Text className='text-zinc-400'>Id do alimento: {id}</Text>
                    <Text className='text-zinc-400'>Preço: R$ {price}</Text>
                    <Text className='text-zinc-400'>Ingredientes: {ingredientes}</Text>
                </ScrollView>
                
            </View>
        </View>
    );
}
