import { useLocalSearchParams } from 'expo-router';
import { View, Text, Pressable, ImageBackground, Image } from 'react-native';
import { useEffect, useState } from 'react';
import BackButton from '../../components/backButton';
import Constants from 'expo-constants';
import { ScrollView } from 'react-native-gesture-handler';
import { Section } from '../../components/section';
import { Feather } from '@expo/vector-icons';

// Constante pare definir uma altura padrão na view
const statusBarHeight = Constants.statusBarHeight;

// Definindo interce Restaurant que define os valores e os tipos que são esperados de um objeto restaurant
interface Restaurant {
    id: string;
    name: string;
    image: string;
    imageLocal: string;
    description: string;
}

export default function RestaurantDetails() {
    const { id } = useLocalSearchParams(); // Acessando o atributo id do restaurant que foi passando com param  
    const [ restaurant, setRestaurant ] = useState< Restaurant | null >(null); // Pode ser Restaurant ou null. Neste caso Restaurant é inicializado como null, para depois ser atualizado dentro da requisição

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                // Requisição HTTP (Busca da API)
                const response = await fetch(`http://192.168.1.30:3000/restaurants/${id}`);
                if(!response.ok){
                    throw new Error(`Erro ao buscar o restaurant! Status: ${response.status}`);
                }
                // Transformando o response em json que agora será armazenado no data
                const data = await response.json();
                // console.log(data) // -> Usado pra verificar se os dados do Json estão sendo listados
                setRestaurant(data); // PASSANDO o data para o useState
            
            } catch (error) { // Tratando com um console.log caso o bloco de cod do try de errado
                console.error('Erro ao buscar detalhes:', error);
            }
        };
            
        if(id) {
            fetchRestaurant(); // Chamando a função que busca o restaurant caso o id seja valido
            // Isso evita que o código tente buscar dados de restaurants  quando o id não 
            // estiver disponível (por exemplo, antes de o componente ser renderizado ou se o valor do id for null ou undefined).
        }
    }, [id])
    
    return (
        <View style={{ flex: 1, backgroundColor: '#18181b' }} className='text-zinc-300 bg-zinc-900'>
           {restaurant ? (
                 <View className="w-full px-0 bg-zinc-900" >
                 <ImageBackground
                     source={{ uri: restaurant.image }}
                     style={{
                         width: '100%',
                         height: 200,  // Defina a altura 
                         justifyContent: 'flex-start',
                         paddingTop: statusBarHeight + 15,
                     }}
                     resizeMode="cover"
                >
                    {/* Botão de voltar sobre a imagem */}
                    <BackButton rota='../' />
                 </ImageBackground>
             </View>
            ) : (
                <Text className='text-zinc-400'>Carregando detalhes do restaurante...</Text>
            )}
           <ScrollView
                style={{ paddingHorizontal: 10, paddingVertical: 16}}
                className="bg-zinc-900 text-zinc-300"
                showsVerticalScrollIndicator={false}
            >
            
            {/* Carregando os detalhes do restaunta caso ele seja válido */}
            {restaurant ? (
                <View>
                    <View className='justify-center items-center'>
                        <Section
                            name={restaurant.name}
                            size='text-4xl'
                            label=''
                            action={() => console.log('Clicou no veja mais')}
                        />
                    </View>

                    {/* View para description */}
                    <View className='justify-center items-center px-4'>
                        <Text className='text-zinc-300 text-lg mb-10'> {restaurant.description} </Text>    
                    </View>

                    <View className='px-4'>
                        
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

                    <View className='justify-center items-center'>
                        <Text className='text-zinc-100 text-xl' style={{marginTop: 15}} >Mais perto de sua localização Atual:</Text>
                        <Text className='text-zinc-400 text-xs mb-10'>{restaurant.name} de Taguatinga </Text>
                    </View>
                </View>
            ) : (
                // Caso contrário, renderiza um texto informando que a busca falhou
                <Text style={{ color: '#fff' }}>Carregando detalhes do restaurante...</Text>
            )}
           </ScrollView>
        </View>
    );
}
