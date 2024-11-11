import React from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import BackButton from '../components/backButton';
import Constants from 'expo-constants';
import { useState } from 'react';
import { Section } from '../components/section';

export default function PaymentCard() {
    // constante pra definir uma altura padrão e responsiva na view
    const statusBarHeight = Constants.statusBarHeight;

    // Variaveis para ler a entrada dos usuários
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [number, setNumber] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [complement, setComplement] = React.useState('');
    const [cep, setCep] = React.useState('');

 return (
    <View className='flex flex-1 bg-zinc-900'>
        <View className='items-center justify-between'>
            <View className="w-full px-2 my-10 mr-2" style={{ marginTop: statusBarHeight + 15}}>
                <BackButton rota='/payment'/>
            </View>
            <View className='flex items-center justify-center'>
                <Text className='text-zinc-200 text-4xl'> Página de pagamento</Text>
            </View>
            <View className='px-6'>
                <Section 
                    name="Insira os dados do cartão"
                    size="text-xl"
                    label=""
                    action={ () => console.log("Clicou no veja mais")}
                />

            </View>
        </View>

        {/* VIEW DOS INPUTS */}
        <View className='px-6 gap-10'>

            {/* Nome */}
            <TextInput 
                className='w-100 px-4 h-10 border border-zinc-600 rounded-lg text-zinc-300' 
                onChangeText={setName} 
                value={name}
                inputMode='text'
                placeholder='Nome'
                placeholderTextColor={'#a1a1aa'}
                underlineColorAndroid='transparent'
                // editable
            >
            </TextInput>

            {/* E-mail */}
            <TextInput 
                className='w-100 px-4 h-10 border border-zinc-600 rounded-lg text-zinc-300' 
                onChangeText={setEmail} 
                value={email}
                placeholder='Email'
                keyboardType='email-address'
                placeholderTextColor={'#a1a1aa'}
                underlineColorAndroid='transparent'
                // editable
            >
            </TextInput>

            {/* Numero */}
            <TextInput 
                className='w-100 px-4 h-10 border border-zinc-600 rounded-lg text-zinc-300' 
                onChangeText={setNumber} 
                value={number}
                keyboardType='phone-pad'
                placeholder='Numero de telefone'
                placeholderTextColor={'#a1a1aa'}
                underlineColorAndroid='transparent'
            >
            </TextInput>

            {/* Endereço */}
            <TextInput 
                className='w-100 px-4 h-10 border border-zinc-600 rounded-lg text-zinc-300' 
                onChangeText={setAddress} 
                value={address}
                inputMode='text'
                placeholder='Endereço'
                placeholderTextColor={'#a1a1aa'}
                underlineColorAndroid='transparent'
            >
            </TextInput>
            
            {/* Complemento */}
            <TextInput 
                className='w-100 px-4 h-10 border border-zinc-600 rounded-lg text-zinc-300' 
                onChangeText={setComplement} 
                value={complement}
                inputMode='text'
                placeholder='Complemento'
                placeholderTextColor={'#a1a1aa'}
                underlineColorAndroid='transparent'
            >
            </TextInput>

            {/* CEP */}
            <TextInput 
                className='w-100 px-4 h-10 border border-zinc-600 rounded-lg text-zinc-300' 
                onChangeText={setCep} 
                value={cep}
                keyboardType='number-pad'
                placeholder='CEP'
                placeholderTextColor={'#a1a1aa'}
                underlineColorAndroid='transparent'
            >
            </TextInput>
        </View>

        <View className='items-center justify-center mt-10 px-10'>
        <Pressable 
            style={{backgroundColor: '#fcd34d'}}
            className='w-full h-14 mt-10 flex items-center justify-center rounded-xl'
            // onPress={ () => router.navigate('/payment') }
            >   
            <Text className='text-black font-bold text-xl'>Próximo</Text>
        </Pressable>

        </View>
    </View>
   
  );
}