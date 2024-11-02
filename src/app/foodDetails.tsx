import { router, useRouter } from 'expo-router';
import { View, Text, Pressable, ImageBackground } from 'react-native';
import BackButton from '../components/backButton';
import { useLocalSearchParams } from 'expo-router';
import Constants from 'expo-constants';
import { ScrollView } from 'react-native-gesture-handler';
import { Section } from '../components/section';
import { useEffect, useState } from 'react';
import { RestaurantProps as TrendingRestaurantProps } from '../components/trendingRe';

// Constante pra definir uma altura padrão na view
const statusBarHeight = Constants.statusBarHeight;

export default function FoodDetails() {
    
    // Acessa os atributos do alimento
    const { id, name, price, rating, time, image, ingredientes, restaurantId } = useLocalSearchParams(); 
    // Verifique se image é uma string
    const imageUri = Array.isArray(image) ? image[0] : image; // Pega o primeiro valor se for um array
    const [restaurant, setRestaurant] = useState<TrendingRestaurantProps  | null>(null);

    // useEffect(() => {
    //     // Função anônima
    //     async function fetchRestaurantDetails () {
            
    //         try {
    //             // Requisição HTTP (Busca da API)
    //             const response = await fetch(`http://192.168.1.12:3000/restaurants/${restaurantId}`);
    //             // Transformando o response em json que agora será armazenado no data
    //             const data = await response.json();
    //             setRestaurant(data); // passando os dados para o setRestaurant
    //         } catch (error) {
    //             console.error("Error fetching restaurant details:", error);
    //         }
    //     }
    //     fetchRestaurantDetails ();
    // }, [restaurantId]);

    useEffect(() => {
        const fetchRestaurantDetails = async () => {
            try {
                const response = await fetch("http://192.168.1.12:3000/restaurants");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setRestaurant(data);
            } catch (error) {
                console.error("Error fetching restaurant details:", error);
            }
        };

        fetchRestaurantDetails();
    }, [restaurantId]);

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
            </View>
               
                {/* Detalhes do alimento abaixo da imagem */}
                <ScrollView 
                    style={{ paddingHorizontal: 24, paddingVertical: 16}}
                    className="bg-zinc-900 text-zinc-300"
                    showsVerticalScrollIndicator={false}
                >
                    <Section 
                        name= {`${name}`}
                        size="text-3xl"
                        label=""
                        action={ () => console.log("Clicou no veja mais")}
                    />
                    <View className='px-4'>
                        <Text className='text-zinc-400'>Id do alimento: {id}</Text>
                        <Text className='text-zinc-400'>Preço: R$ {price}</Text>
                        <Text className='text-zinc-400'>Ingredientes: {ingredientes}</Text>
                        <Text className='text-zinc-400'>Id do restaurante: {restaurantId}</Text>
                        {restaurant ? (
                            <View style={{ marginTop: 16 }}>
                                <Text className='text-zinc-100 text-xs'>Vendidos por: {restaurant.name}</Text>
                            </View>
                        ) : (
                            <Text className='text-zinc-400'>Carregando detalhes do restaurante...</Text>
                        )}
                    </View>

                </ScrollView>
        </View>
    );
}

