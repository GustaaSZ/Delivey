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

    // Definindo interce Food que define os valores e os tipos que são esperados de um objeto Food
    interface Food {
        id: string;
        name: string;
        price: number;
        rating: number;
        image: string;
        time: string;
        ingredientes: string[];
        restaurantId: string;
    }
    
    // Definindo interce Restaurant que define os valores e os tipos que são esperados de um Objeto Restaurant
    interface Restaurant {
        id: string;
        name: string;
        image: string;
        imageLocal: string;
    }

export default function FoodDetails() {

    
    const { id } = useLocalSearchParams(); // Acesso os atributos do alimento passados como parâmetros na tela de ItemFood2 
    const [ quantity, setQuantity ] = useState(1); // Quantity inicializado com 1, onde setQuantity é func que att o valor de quantity
    const [ showModal, setShowModal ] = useState(false); // showModal inicializado como false , onde setShowModal é func que att o valor de showModal
    const [ food, setFood ] = useState< Food | null >(null); // Pode ser Food ou null. Neste caso, food começa como null para depois ser atualizado dentro da requisição
    const [ restaurant, setRestaurant ] = useState< Restaurant | null >(null); // Pode ser Restaurant ou null. Neste caso Restaurant é inicializado como null, para depois ser atualizado dentro da requisição
    
    // Funções que incrementam e decrementam a quantidade do itemFood
    const increaseQuantity = () => setQuantity((prev) => prev + 1);
    const decreaseQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

    useEffect(() => { // faz requisição assícrona de um alimento, sempre que o ID mudar
        
        const fetchDetails = async () => { // função async responsável por buscar os detalhes da comida e do restaurant
            try { // caso dê errado, primeiro renderizamos, depois tratamos
                
                // REQUISIÇÃO FOOD
                const foodResponse = await fetch(`http://192.168.1.12:3000/foods/${id}`); // requisição http usando fetch para obter os dados do alimento a partir do endpoint de foods que depende de id
                if (!foodResponse.ok) { // verificando se a requisição foi bem sucedida, caso não, lançamos mensagem de erro
                    throw new Error(`Erro ao buscar comida! Status: ${foodResponse.status}`);
                }
                // Se passou, convertemos o foodResponse com as infos do food para json
                const foodData = await foodResponse.json();
                setFood(foodData); // E mudamos o valor de food com foodData (json com dados do food) usando o SetFood
        
                // REQUISIÇÃO RESTAURANT

                // requisição http usando fetch para obter os dados do restaurant a partir do endpoint de restaurants que depende do restaurantId, presente no endpoint de foods
                // Neste cado, passamos foodData da requisição anterior e pegamos o valor de restaurantId que pertence ao endpoint de foods
                const restaurantResponse = await fetch(`http://192.168.1.12:3000/restaurants/${foodData.restaurantId}`); 
                if (!restaurantResponse.ok) {  // verificando se a requisição foi bem sucedida, caso não, lançamos mensagem de erro
                    throw new Error(`Erro ao buscar restaurante! Status: ${restaurantResponse.status}`);
                }
                // Se passou, convertemos o restaurantResponse com as infos do restaurant para json
                const restaurantData = await restaurantResponse.json();
                setRestaurant(restaurantData); // E mudamos o valor de restaurant com restaurantData (json com dados do restaurant) usando o SetRestaurant
            
            } catch (error) { // Tratando com um console.log caso o bloco de cod do try de errado
                console.error('Erro ao buscar detalhes:', error);
            }
        };
        
        if (id) {
          fetchDetails(); // A execução da função fetchDetails é condicionada à presença de um valor válido de id. 
            // Isso evita que o código tente buscar dados de comida e restaurante quando o id não 
            // estiver disponível (por exemplo, antes de o componente ser renderizado ou se o valor do id for null ou undefined).
        }
    }, [id]);

    return (
        <View 
            style={{ flex: 1, backgroundColor: '#18181b' }} 
            className="bg-zinc-900 text-zinc-300"
        >   
            {food ? ( // Caso food seja verdadeiro != de null, undefined, false, NaN...
                // Renderiza o 1º bloco
                <View className="w-full px-0 bg-zinc-900" >
                    <ImageBackground
                        source={{ uri: food.image }}
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
            ) : ( // Caso contrário, Renderiza o 2º bloco
                <Text style={{ color: '#fff' }}>Carregando detalhes do nome do prato...</Text>
            )}
            
               
            {/* Detalhes do alimento abaixo da imagem */}
            <ScrollView 
                style={{ paddingHorizontal: 10, paddingVertical: 16}}
                className="bg-zinc-900 text-zinc-300"
                showsVerticalScrollIndicator={false}
            >
                {food ? ( // Caso food seja verdadeiro != de null, undefined, false, NaN...
                    // Renderiza o primeiro bloco
                    <View> 
                        <Section 
                            name= {`${food.name}`}
                            size="text-3xl"
                            label="+"
                            action={ () => console.log("Clicou no veja mais")}
                        />
                    
                        <View className='px-4'>
                            <Text className='text-zinc-400 text-lg'>{food.ingredientes}</Text>
                            <Text className='text-zinc-300 text-lg' style={{marginTop: 15}}>Preço: R$ {food.price}</Text>
                        </View>
                    </View>
                ): ( // Caso contrário, Renderiza o 2º bloco
                    <Text style={{ color: '#fff' }}>Carregando detalhes dos ingredientes...</Text>
                )}

                {/* DETALHES DO RESTAURANTE */}
                {restaurant ? ( // Caso restaurant seja verdadeiro != de null, undefined, false, NaN...
                    // Renderiza o 1º bloco
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
                ) : ( // Caso contrário, Renderiza o 2º bloco 
                    <Text className='text-zinc-400'>Carregando detalhes do restaurante...</Text>
                )}

                <View className='mt-10 justify-center items-center'>

                    {food ? ( // Caso food seja verdadeiro != de null, undefined, false, NaN...
                        // Renderiza o 1º bloco 
                        <Modal visible={showModal} transparent={true} animationType='slide' onRequestClose={() => setShowModal(false)}>
                            <CustomModal //Passando os valores que CustomModal espera
                                showModal={showModal} setShowModal={setShowModal} quantity={quantity} 
                                id={food.id}
                                name={food.name}
                                price={food.price}
                                image={food.image}
                            />
                        </Modal>
                    ) : ( // Caso contrário, Renderiza o 2º bloco 
                        <Text className='text-xl text-zinc-200'>Não foi possível passar os valores do food como parâmetro para o modal</Text>
                    )}
                    
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