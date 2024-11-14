import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import BackButton from '../components/backButton';
import Constants from 'expo-constants';
import { Section } from '../components/section';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePayment } from '../components/contextCard';
import { TextInputMask } from 'react-native-masked-text';
import { ScrollView } from 'react-native-gesture-handler';
import { Link } from 'expo-router';

export default function Login() {

    // constante pra definir uma altura padrão e responsiva na view
    const statusBarHeight = Constants.statusBarHeight;

    // Variaveis para ler a entrada dos usuários
    
    const [ userAddressEmail, setUserAddressEmail ] = useState('');
    const [ userPassword, setUserPassword ] = useState('');
    const [error, setError] = React.useState('');


    // Função para adiconar um novo usuário
    const handleLogin = async () => {

        // Verificando se todos os campos (são obrigatórios) forma preenchidos
        if(!userAddressEmail || !userPassword){
            setError('Por favor, preencha todos os campos!')
            return;
        }
        // Limpando o erro
        setError('')

        // Criando um objeto para enviar as credenciais
        const loginData = {
            email: userAddressEmail,
            password: userPassword,
        };
        
        // Cód que pode apresentar erro, por isso, usamos try catch()
        try {
            // Fazendo uma requisição GET com parâmetros de consulta (query params)
        const response = await fetch(`http://192.168.1.12:3000/users?email=${encodeURIComponent(userAddressEmail)}&password=${encodeURIComponent(userPassword)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

            // Verificando se o response deu certo
            if(response.ok){
                
                const users = await response.json();

                // Verificando se algum usuário foi encontrado
                if (users.length > 0) {
                    // Usuário encontrado, redireciona para a página principal
                    const simulatedToken = 'fake-token'; // Token fictício
                    await AsyncStorage.setItem('userToken', simulatedToken); // Defina um token real aqui, se necessário
                    router.navigate('/pages/search');
                } else {
                    Alert.alert('Erro', 'Email ou senha incorretos. Tente novamente.');
                 }
            } else {
                // Caso o login falhe, exibir mensagem de erro
                Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer login.');
            }
        } catch (error) {
            console.error('Erro ao tentar fazer login:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer login.');
        }

    }
 return (
    <ScrollView className='flex flex-1 bg-zinc-900'>
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
                className='w-100 px-4 h-10 border border-zinc-600 rounded-lg text-zinc-300' 
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
                className='w-100 px-4 h-10 border border-zinc-600 rounded-lg text-zinc-300' 
                onChangeText={setUserPassword} 
                value={userPassword}
                maxLength={40}
                inputMode='text'
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
        <Link href={'/registerUser'} style={{fontSize: 13}} className=' mt-6 text-zinc-500 underline'> Ainda não possui uma conta? Cadastre-se</Link>

        </View>
    </ScrollView>
   
  );
}