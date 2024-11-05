import { router, useRouter } from 'expo-router';
import { View, Text, Pressable, ImageBackground, Image } from 'react-native';
import BackButton from '../components/backButton';
import { useLocalSearchParams } from 'expo-router';
import Constants from 'expo-constants';
import { ScrollView } from 'react-native-gesture-handler';
import { Section } from '../components/section';
import { useEffect, useState } from 'react';

// Constante pra definir uma altura padrão na view
const statusBarHeight = Constants.statusBarHeight;

export default function FoodDetails() {
    
    // Acessa os atributos do alimento
    const { id, name, price, rating, time, image, ingredientes, restaurantId } = useLocalSearchParams(); 
    // Verifique se image é uma string
    const imageUri = Array.isArray(image) ? image[0] : image; // Pega o primeiro valor se for um array
    const [restaurant, setRestaurant] = useState<{ id: string, name: string, image: string, imageLocal: string}  | null>(null);

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
                const foundRestaurant = data.find((rest: {id: string}) => rest.id == restaurantId);

                // Define o restaurante específico ou null caso não encontre
                setRestaurant(foundRestaurant || null); 

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
                        height: 200,  // Defina a altura 
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
                    style={{ paddingHorizontal: 10, paddingVertical: 16}}
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
                        <Text className='text-zinc-400 text-lg'>{ingredientes}</Text>
                        <Text className='text-zinc-300 text-lg' style={{marginTop: 15}}>Preço: R$ {price}</Text>
                    </View>

                        {/* DETALHES DO RESTAURANTE */}
                        {restaurant ? (
    
                            <View>
                               <View className='' style={{ }}>
                                    <Section 
                                        name={`Vendido por:  ${restaurant.name}`}
                                        size="text-xl"
                                        label=""
                                        action={() => console.log("Clicou no veja mais")}
                                    />
                                </View>
                               <View className='px-4'>
                                    {restaurant.image && (
                                        <Image
                                            source={{ uri: restaurant.image }}
                                            style={{ width: 70, height: 70, borderRadius: 50 }}
                                        />
                                    )}
                                </View>
                                
                                <View className='px-4'>
                                    <Text className='text-zinc-100 text-xl' style={{marginTop: 15}} >Mais perto de sua localização Atual:</Text>
                                    <Text className='text-zinc-400 text-xs'>{restaurant.name} de Taguatinga </Text>
                                    {restaurant.imageLocal && (
                                        <Image
                                            source={{ uri: restaurant.imageLocal }}
                                            style={{
                                                width: '100%',
                                                height: 180,
                                                borderRadius: 25,
                                                marginTop: 20
                                            }}
                                        />
                                    )}
                                </View>
                            </View>
                        ) : (
                            <Text className='text-zinc-400'>Carregando detalhes do restaurante...</Text>
                        )}
                        
                    {/* </View> */}

                </ScrollView>
        </View>
    );
}

