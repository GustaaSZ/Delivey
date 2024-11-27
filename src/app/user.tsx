import {View, Text, StyleSheet, ScrollView, TextInput, Pressable} from 'react-native'
import BackButton from '../components/backButton';
import Constants from 'expo-constants';
import { useState } from 'react';
import { Link } from 'expo-router';
import React from 'react';
import { Section } from '../components/section';
import { loginService } from '../components/services/loginService';

export default function User(){
    // constante pra definir uma altura padrão e responsiva na view
    const statusBarHeight = Constants.statusBarHeight;

    const [userAddressEmail, setUserAddressEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [error, setError] = React.useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async () => {
        const response = await loginService(userAddressEmail, userPassword);
        setMessage(response.message);

        if (response.success) {
            // Redirecionar ou salvar informações do usuário
            console.log('Usuário logado:', response.user);
        }
    };
    
    return (
        <ScrollView className='flex flex-1 bg-zinc-900'>
            <View className="w-full px-2 my-10 mr-2" style={{ marginTop: statusBarHeight + 15}}>
                <BackButton rota='./'/>
            </View>
        <View className='items-center justify-between'>
            <View className="w-full px-2 my-10 mr-2" style={{ marginTop: statusBarHeight + 45}}></View>
            <View className='flex items-center justify-center'>
                <Text className='text-zinc-200 text-4xl'> Página de Login </Text>
            </View>
            <View className='px-6'>
                <Section 
                    name="Insira seus dados"
                    size="text-xl"
                    label=""
                    action={ () => console.log("Clicou no veja mais")}
                />

            </View>
        </View>

        {/* VIEW DOS INPUTS */}
        <View className='px-6 gap-10'>

            {/* E-mail */}
            <TextInput 
                style={{height: 40}}
                className='w-100 px-4 border border-zinc-600 rounded-lg text-zinc-300' 
                onChangeText={setUserAddressEmail} 
                value={userAddressEmail}
                maxLength={30} // -> limitando o tamanho para 30
                placeholder='Email'
                keyboardType='email-address'
                placeholderTextColor={'#a1a1aa'}
                underlineColorAndroid='transparent'
                
                // editable
            >
            </TextInput>

            {/* Password */}
            <TextInput 
                style={{height: 40}}
                className='w-100 px-4 border border-zinc-600 rounded-lg text-zinc-300' 
                onChangeText={setUserPassword} 
                value={userPassword}
                maxLength={40}
                inputMode='numeric'
                placeholder='Senha'
                placeholderTextColor={'#a1a1aa'}
                underlineColorAndroid='transparent'
            >
            </TextInput>
            
        </View>

        <View className='items-center justify-center mt-10 px-10'>
            {error ? (
                <Text style={{ color: '#dc2626', marginBottom: 6, fontSize: 13 }}>{error}</Text>
            ) : null }
        <Pressable 
            style={{backgroundColor: '#fcd34d'}}
            className='w-full h-14 mt-10 flex items-center justify-center rounded-xl'
            onPress={ handleLogin }
            >   
            <Text className='text-black font-bold text-xl'>Login</Text>
        </Pressable>
        {/* <Link href={'/registerUser'} style={{fontSize: 13}} className=' mt-6 text-zinc-500 underline'> Ainda não possui uma conta? Cadastre-se</Link> */}

        </View>
    </ScrollView>
    )
}