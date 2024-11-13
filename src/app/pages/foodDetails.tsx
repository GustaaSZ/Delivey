import { useLocalSearchParams } from 'expo-router';
import { View, Text, Pressable, ImageBackground, Image, Modal } from 'react-native';
import { useEffect, useState } from 'react';
import BackButton from '../../components/backButton';
import Constants from 'expo-constants';
import { ScrollView } from 'react-native-gesture-handler';
import { Section } from '../../components/section';
import { Feather } from '@expo/vector-icons';
import CustomModal  from '../../components/moldal';

// Constante pra definir uma altura padrão na view
const statusBarHeight = Constants.statusBarHeight;

export default function FoodDetails() {

    // Acessa os atributos do alimento
    const { id, name, price, rating, time, image, ingredientes, restaurantId } = useLocalSearchParams(); 

    // Verificando se os atribbutos (name, id, image) são uma string e price um number
    const itemId = Array.isArray(id) ? id[0] : id;
    const itemName = Array.isArray(name) ? name[0] : name;
    const imageUri = Array.isArray(image) ? image[0] : image; // Pega o primeiro valor se for um array

    const itemPrice = Array.isArray(price) ? parseFloat(price[0]) : Number(price);
    const [restaurant, setRestaurant] = useState<{ id: string, name: string, image: string, imageLocal: string}  | null>(null);

    const [quantity, setQuantity] = useState(1)
    const [showModal, setShowModal] = useState(false);

    // Funções que incrementam e decrementam a quantidade do itemFood
    const increaseQuantity = () => setQuantity((prev) => prev + 1);
    const decreaseQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

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
                    <BackButton rota='pages/search' />
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
                        
                        <Section 
                            name={`Vendido por:  ${restaurant.name}`}
                            size="text-xl"
                            label=""
                            action={() => console.log("Clicou no veja mais")}
                        />
                        
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

                <View className='mt-10 justify-center items-center'>
                    {/* CustomModal Controlado */}
                    <Modal visible={showModal} transparent={true} animationType='slide' onRequestClose={() => setShowModal(false)}>
                        <CustomModal //Passando os valores que CustomModal espera
                            showModal={showModal} setShowModal={setShowModal} quantity={quantity} 
                            id={itemId}
                            name={itemName}
                            price={itemPrice}
                            image={imageUri}
                        />
                    </Modal>
                    <View className='flex flex-row justify-between'>
                        
                        {/* Botão de diminuir a quantidade  */}
                        <Pressable 
                            className='w-10 h-10 bg-red-600/60 flex items-center justify-center rounded-full mx-3'
                            onPress={ decreaseQuantity }
                        >
                            <Feather name='minus' size={22} color='#f4f4f5'/>
                        </Pressable>

                        {/* Botão de Adicionar no carrinho -> Abre Modal  */}
                        <Pressable 
                            className='w-14 h-14 bg-zinc-800/85 flex items-center justify-center rounded-full mx-3'
                            onPress={() => setShowModal(true)}
                        >
                            <Feather name='shopping-bag' size={24} color='#84cc16'/>
                        </Pressable>

                        {/* Botão de aumentar a quantidade  */}
                        <Pressable 
                            className='w-10 h-10 bg-green-600/60 flex items-center justify-center rounded-full mx-3'
                            onPress={ increaseQuantity  }
                        >
                            <Feather name='plus' size={22} color='#f4f4f5'/>
                        </Pressable>

                    </View>
                        <Text style={{}} className='text-zinc-400 text-xs mt-2'>Adiconar ao Carrinho</Text>
                        <View className='mt-2'></View>
                        <Text className='text-zinc-200 text-xl'>{quantity}</Text>
                        <View className='mt-10'></View>
                </View>
            </ScrollView>
        </View>
    );
}