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

    useEffect(() => {
        // Função anônima
        const fetchRestaurantDetails = async () => {
            // Código que irá executar com potencial de erro
            try {
                // Requisição HTTP (Busca da API)
                // A função fetch faz uma requisição GET para o endereço fornecido.
                //  Como está sendo usada com await, o código espera a resposta da requisição
                //  antes de continuar, garantindo que response contenha a resposta da API.
                const response = await fetch("http://192.168.1.12:3000/restaurants");
                if (!response.ok) {
                    // O objeto response possui uma propriedade ok,
                    //  que será true se a resposta tiver um status 
                    // de sucesso (códigos 200–299) e false caso contrário.
                    //  Se ok for false (indicando erro), o código lança (throw) 
                    // uma nova Error com uma mensagem personalizada que inclui o status HTTP da resposta.
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                // Transformando o response em json que agora será armazenado no data
                const data = await response.json();
                // Filtrando o restaurante pelo restaurantId do prato
                const restaurantData = data.find((rest: TrendingRestaurantProps) => rest.id == restaurantId);

                // Define o restaurante específico ou null caso não encontre
                setRestaurant(restaurantData || null); 

                // Caso ocorra algum erro, printando o erro
            } catch (error) {
                console.error("Error fetching restaurant details:", error);
            }
        };

        if (restaurantId) { // Somente busca se o restaurantId estiver presente
            fetchRestaurantDetails();
        }
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
                        label="+"
                        action={ () => console.log("Clicou no veja mais")}
                    />
                    <View className='px-4'>
                        <Text className='text-zinc-400'>Id do alimento: {id}</Text>
                        <Text className='text-zinc-400'>Preço: R$ {price}</Text>
                        <Text className='text-zinc-400'>Ingredientes: {ingredientes}</Text>
                        <Text className='text-zinc-400'>Id do restaurante: {restaurantId}</Text>
                        {/* DETALHES DO RESTAURANTE */}
                        {restaurant ? (
                            <View style={{ marginTop: 16 }}>
                                <Text className='text-zinc-100 text-xs'>Vendido por: {restaurant.name}</Text>
                                <Text className='text-zinc-100 text-xs'>id do restaurante: {restaurant.id}</Text>
                            </View>
                            // <Image
                            //     source={{ uri: restaurant.image}}
                            //     className='w-20 h-20 rounded-full'
                            // />
                        ) : (
                            <Text className='text-zinc-400'>Carregando detalhes do restaurante...</Text>
                        )}
                    </View>

                </ScrollView>
        </View>
    );
}

