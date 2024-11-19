import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import BackButton from '../components/backButton';
import Constants from 'expo-constants';
import { Section } from '../components/section';
import { Link, router } from 'expo-router';
import { usePayment } from '../components/contextCard';
import { TextInputMask } from 'react-native-masked-text';
import { ScrollView } from 'react-native-gesture-handler';

export default function RegisterUser() {

    // constante pra definir uma altura padrão e responsiva na view
    const statusBarHeight = Constants.statusBarHeight;

    // Variaveis para ler a entrada dos usuários
    const [ userName, setUserName ] =  useState('');
    const [ userAddressEmail, setUserAddressEmail ] = useState('');
    const [ userPhone, setUserPhone ] = useState('');
    const [ userCPF, setUserCPF ] = useState('');
    const [ userPassword, setUserPassword ] = useState('');
    const [ userConfirmPassword, setUserConfirmPassword ] = useState('');
    const [error, setError] = React.useState('');

    // Funções para validar o cpf
    const [ isValidCPF, setIsValidCPF ] = useState< boolean | null> (null);
    const handleCPFChange = (text: string ) => {
        setUserCPF(text);
        // Verificando se o cpf é válido
        // ...
    }


    // Função para adiconar um novo usuário
    const handleAddUser = async () => {
        // Verificando se todos os campos obrigatórios foram preenchidos
        if (!userName || !userAddressEmail || !userPhone || !userCPF || !userPassword) {
            setError('Por favor, preencha todos os campos!');
            return;
        }
    
        // Limpando o erro
        setError('');
    
        // Verificação se a senha é igual à senha confirmada
        if (userPassword !== userConfirmPassword) {
            Alert.alert('Erro', 'As senhas não correspondem!');
            return;
        }
    
        try {
            
            // // Gerar o hash da senha
           
    
            // Criando a estrutura do usuário
            const newUser = {
                name: userName.trim(),
                email: userAddressEmail.trim(),
                cpf: userCPF.trim(),
                phone: userPhone.trim(),
                password: userPassword,
            };
    
            // Fazendo a requisição POST para cadastrar o usuário
            const response = await fetch("http://192.168.1.12:3000/users", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });
    
            // Verificando o resultado da requisição
            if (response.ok) {
                Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
                // Limpando os campos após o cadastro
                setUserName('');
                setUserAddressEmail('');
                setUserCPF('');
                setUserPhone('');
                setUserPassword('');
                setUserConfirmPassword(''); // Certifique-se de limpar o campo de confirmação de senha também
                router.push('/login'); // Redirecionando para a tela de login
            } else {
                const errorMessage = await response.text();
                Alert.alert("Erro", `Não foi possível cadastrar o usuário: ${errorMessage}`);
            }
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            Alert.alert("Erro", "Ocorreu um erro ao tentar cadastrar o usuário.");
        }
    };

 return (
    <ScrollView className='flex flex-1 bg-zinc-900'>
        <View className='items-center justify-between'>
            <View className="w-full px-2 my-10 mr-2" style={{ marginTop: statusBarHeight + 45}}></View>
            <View className='flex items-center justify-center'>
                <Text className='text-zinc-200 text-4xl'> Cadastro de Usuário</Text>
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

            {/* Nome */}
            <TextInput 
                style={{height: 40}}
                className='w-100 px-4 border border-zinc-600 rounded-lg text-zinc-300' 
                onChangeText={setUserName} 
                maxLength={40} // -> Limitando o tamanho para 40
                value={userName}
                inputMode='text'
                placeholder='Nome Completo'
                placeholderTextColor={'#a1a1aa'}
                underlineColorAndroid='transparent'
                // editable
            >
            </TextInput>

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

            {/* CPF */}
           <TextInputMask 
                type={'cpf'}
                maxLength={14}// limitando o número de caracteres/numbers para 15
                style={{width: 340, borderColor: '#52525b',borderWidth: 1 ,borderRadius: 8, height: 40, paddingLeft: 16, color: '#d4d4d8'}}
                value={userCPF}
                onChangeText={ handleCPFChange }
                placeholder='CPF'
                placeholderTextColor={'#a1a1aa'}
                underlineColorAndroid='transparent'
            >
            </TextInputMask>

            {/* Numero */}
            <TextInputMask 
                type='cel-phone'
                options={{
                    maskType: 'BRL',
                    withDDD: true,
                    dddMask: '(99) '
                }}
                maxLength={15}// limitando o número de caracteres/numbers para 15
                style={{width: 340, borderColor: '#52525b',borderWidth: 1 ,borderRadius: 8, height: 40, paddingLeft: 16, color: '#d4d4d8'}}
                onChangeText={setUserPhone} 
                value={userPhone}
                placeholder='Numero de telefone'
                placeholderTextColor={'#a1a1aa'}
                underlineColorAndroid='transparent'
            >
            </TextInputMask>

            {/* Password */}
            <TextInput 
                style={{height: 40}}
                className='w-100 px-4 border border-zinc-600 rounded-lg text-zinc-300' 
                onChangeText={setUserPassword} 
                value={userPassword}
                maxLength={40}
                inputMode='text'
                placeholder='Senha'
                placeholderTextColor={'#a1a1aa'}
                underlineColorAndroid='transparent'
            >
            </TextInput>
            
            {/* Confirm Password */}
            <TextInput 
                style={{height: 40}}
                className='w-100 px-4 border border-zinc-600 rounded-lg text-zinc-300' 
                onChangeText={setUserConfirmPassword} 
                value={userConfirmPassword}
                maxLength={40}
                inputMode='text'
                placeholder='Confirme sua Senha'
                placeholderTextColor={'#a1a1aa'}
                underlineColorAndroid='transparent'
            >
            </TextInput>
            
            
        </View>

        <View className='items-center justify-center mt-10 px-10'>
            {error ? (
                <Text style={{ color: '#dc2626', marginBottom: 1, fontSize: 13 }}>{error}</Text>
            ) : null }
        <Pressable 
            style={{backgroundColor: '#fcd34d'}}
            className='w-full h-14 mt-10 flex items-center justify-center rounded-xl'
            onPress={ handleAddUser }
            >   
            <Text className='text-black font-bold text-xl'>Cadastrar</Text>
        </Pressable>
        <Link href={'/login'} style={{fontSize: 13}} className=' mt-6 text-zinc-500 underline'> Já possui uma conta? Faça Login</Link>
        </View>
        <View className='mb-20'></View>
    </ScrollView>
   
  );
}