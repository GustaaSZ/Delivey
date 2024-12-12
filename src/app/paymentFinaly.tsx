import React, { useEffect, useRef } from 'react';
import { View, Text, TextInput, Pressable, Image } from 'react-native';
import BackButton from '../components/backButton';
import Constants from 'expo-constants';
import { Section } from '../components/section';
import { router } from 'expo-router';
import { useCart } from '../components/context';
import { usePayment } from '../components/contextCard';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInputMask } from 'react-native-masked-text';
import { Alert } from 'react-native';
export default function PaymentFinaly() {
    // constante pra definir uma altura padrão e responsiva na view
    const statusBarHeight = Constants.statusBarHeight;

    const {cartItems, getTotalPrice} = useCart();
    const {userName} = usePayment();
    const {userAddressEmail} = usePayment();
    const {userPhone} = usePayment();
    const {userAddress} = usePayment();
    const {userCardNumber} = usePayment();

    const handleSubmit = () => {
        Alert.alert(
            'Confirmação',
            'Tem certeza que deseja finalizar o seu pedido?',
            [
                {
                    text: 'Cancelar',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Confirmar',
                    onPress: () => router.navigate('/'),
                },
            ],
            { cancelable: false }
        );
    }

 return (
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
                className='w-100 px-4 border border-zinc-600 rounded-lg text-zinc-300' 
                value={userName}
                placeholder='Nome'
                placeholderTextColor={'#a1a1aa'}
                underlineColorAndroid='transparent'
                editable={false}
                style={{height: 40}}
            >
            </TextInput>

            {/* E-MAIL DO USER */}
            <TextInput 
                className='w-100 px-4 border border-zinc-600 rounded-lg text-zinc-300' 
                value={userAddressEmail}
                placeholder='E-mail'
                placeholderTextColor={'#a1a1aa'}
                underlineColorAndroid='transparent'
                editable={false}
                style={{height: 40}}
            >
            </TextInput>

            {/* NUMERO DO USER */}
            <TextInput 
                className='w-100 px-4 border border-zinc-600 rounded-lg text-zinc-300' 
                value={userPhone}
                placeholder='Número de telefone'
                placeholderTextColor={'#a1a1aa'}
                underlineColorAndroid='transparent'
                editable={false}
                style={{height: 40}}
            >
            </TextInput>

            {/* ENDERESSO DO USER */}
            <TextInput 
                className='w-100 px-4 border border-zinc-600 rounded-lg text-zinc-300' 
                value={userAddress}
                placeholder='Endereço'
                placeholderTextColor={'#a1a1aa'}
                underlineColorAndroid='transparent'
                editable={false}
                style={{height: 40}}
            >
            </TextInput>

            {/* NUmero do cartão do user */}
            <TextInputMask 
                type={'credit-card'}
                options={{
                    obfuscated: true,
                    issuer: 'visa-or-mastercard',
                }}
                style={{width: 340, borderColor: '#52525b',borderWidth: 1 ,borderRadius: 8, height: 40, paddingLeft: 16, color: '#d4d4d8'}}
                value={userCardNumber}
                placeholder='Número do Cartão'
                placeholderTextColor={'#a1a1aa'}
                underlineColorAndroid='transparent'
                editable={false}
            >
            </TextInputMask>
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
            onPress={  handleSubmit }
            >   
            <Text className='text-black font-bold text-xl'>Confirmar Compra</Text>
        </Pressable>
        <View className='mt-16'></View>

        </View>
    </ScrollView>
   
  );
}