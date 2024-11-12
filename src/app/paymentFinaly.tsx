import React, { useEffect, useRef } from 'react';
import { View, Text, TextInput, Pressable, Image } from 'react-native';
import BackButton from '../components/backButton';
import Constants from 'expo-constants';
import { Section } from '../components/section';
import { router } from 'expo-router';
import { useCart } from '../components/context';
import { usePayment } from '../components/contextCard';
import { ScrollView } from 'react-native-gesture-handler';

export default function PaymentFinaly() {
    // constante pra definir uma altura padrão e responsiva na view
    const statusBarHeight = Constants.statusBarHeight;

    const {cartItems, getTotalPrice} = useCart();

    // Função pra pegar o estado do inputs
    // const hanfdlePayment = () => {
        
    // }

    const {userName} = usePayment();
    const {userAddressEmail} = usePayment();
    const {userPhone} = usePayment();
    const {userAddress} = usePayment();

 return (
    // <ScrollView></ScrollView>
    <ScrollView className='flex flex-1 bg-zinc-900'>
        <View className='items-center justify-between'>
            <View className="w-full px-2 my-10 mr-2" style={{ marginTop: statusBarHeight + 15}}>
                <BackButton rota='/paymentCard'/>
            </View>
            <View className='flex items-center justify-center'>
                <Text className='text-zinc-200 text-3xl'>Confirmação de Pagamento</Text>
            </View>
            <View className='px-6'>
                <Section 
                    name="Dados do Usuário"
                    size="text-xl"
                    label=""
                    action={ () => console.log("Clicou no veja mais")}
                />
            </View>
        </View>

        {/* VIEW DOS INPUTS */}
        <View className='px-6 gap-10'>
           
            
            {/* NOME DO USUÁRIO  */}
            <TextInput 
                className='w-100 px-4 h-10 border border-zinc-600 rounded-lg text-zinc-300' 
                value={userName}
                inputMode='text'
                placeholderTextColor={'#a1a1aa'}
                underlineColorAndroid='transparent'
                editable={false}
            >
            </TextInput>

            {/* E-MAIL DO USER */}
            <TextInput 
                className='w-100 px-4 h-10 border border-zinc-600 rounded-lg text-zinc-300' 
                value={userAddressEmail}
                placeholderTextColor={'#a1a1aa'}
                underlineColorAndroid='transparent'
                editable={false}
            >
            </TextInput>

            {/* NUMERO DO USER */}
            <TextInput 
                className='w-100 px-4 h-10 border border-zinc-600 rounded-lg text-zinc-300' 
                value={userPhone}
                placeholderTextColor={'#a1a1aa'}
                underlineColorAndroid='transparent'
                editable={false}
            >
            </TextInput>
            {/* ENDERESSO DO USER */}
            <TextInput 
                className='w-100 px-4 h-10 border border-zinc-600 rounded-lg text-zinc-300' 
                value={userAddress}
                placeholderTextColor={'#a1a1aa'}
                underlineColorAndroid='transparent'
                editable={true}
            >
            </TextInput>
        </View>
        <View className='items-center justify-between'>
            <Section 
                name="Dados da Compra"
                size="text-xl"
                label=""
                action={ () => console.log("Clicou no veja mais")}
            />
            {cartItems.map((item, index) => (
                <View key={index} className=' border border-zinc-500 px-4 py-4 gap-2 my-4'style={{borderRadius: 10}}>
                    <Text className='text-xl text-zinc-300'> {item.name} - R$ {item.price} </Text>
                    <Text className='text-xl text-zinc-300' > Quantidade {item.quantity} </Text>
                </View>
            ))}
            <Text className='text-xl text-zinc-300 mt-7'> Total: R$ {getTotalPrice().toFixed(2)}</Text>
        </View>
        

        <View className='items-center justify-center mt-5 px-10'>
        <Pressable 
            style={{ backgroundColor: '#fcd34d' }}
            className='w-full h-14 mt-10 flex items-center justify-center rounded-xl'
            // onPress={ () => router.navigate('/payment') }
            onPress={  () => router.navigate('/') }
            >   
            <Text className='text-black font-bold text-xl'>Confirmar Compra</Text>
        </Pressable>
        <View className='mt-16'></View>

        </View>
    </ScrollView>
   
  );
}