import React from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import BackButton from '../components/backButton';
import Constants from 'expo-constants';
import { Section } from '../components/section';
import { router } from 'expo-router';
import { usePayment } from '../components/contextCard';
import { TextInputMask } from 'react-native-masked-text';
import { ScrollView } from 'react-native-gesture-handler';

export default function Payment() {

    // constante pra definir uma altura padrão e responsiva na view
    const statusBarHeight = Constants.statusBarHeight;

    // Variaveis para ler a entrada dos usuários
    const {userName, setUserName} = usePayment();
    const {userAddressEmail, setUserAddressEmail} = usePayment();
    const {userPhone, setUserPhone} = usePayment();
    const {userAddress, setUserAddress} = usePayment();
    const [complement, setComplement] = React.useState('');
    const [cep, setCep] = React.useState('');
    const [error, setError] = React.useState('');

    // Função que insere maskara no CEP
    const insertMaskInCEP = (cep: string) => {
        return cep.replace(/(\d{5})(\d)/, '$1-$2');
    };

    // Função que verifica se os campos obrogatórios estão preenchidos
    const handleSubmit = () => {
        if(!userName || !userAddress || !userPhone || !cep){
            setError('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        setError('');
        // Se sim, navega pra tela seguinte
        router.navigate('/paymentCard');
    };

 return (
    <ScrollView className='flex flex-1 bg-zinc-900'>
        <View className='items-center justify-between'>
            <View className="w-full px-2 my-10 mr-2" style={{ marginTop: statusBarHeight + 15}}>
                <BackButton rota='./'/>
            </View>
            <View className='flex items-center justify-center'>
                <Text className='text-zinc-200 text-4xl'> Página de pagamento</Text>
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
                className='w-100 px-4 h-10 border border-zinc-600 rounded-lg text-zinc-300' 
                onChangeText={setUserName} 
                maxLength={40} // -> Limitando o tamanho para 40
                value={userName}
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

            {/* Numero */}
            <TextInputMask 
                type='cel-phone'
                options={{
                    maskType: 'BRL',
                    withDDD: true,
                    dddMask: '(99) '
                }}
                maxLength={15}// limitando o número de caracteres/numbers para 15
                style={{width: 340, borderColor: '#52525b',borderWidth: 1 ,borderRadius: 8, height: 36, paddingLeft: 16, color: '#d4d4d8'}}
                onChangeText={setUserPhone} 
                value={userPhone}
                placeholder='Numero de telefone'
                placeholderTextColor={'#a1a1aa'}
                underlineColorAndroid='transparent'
            >
            </TextInputMask>

            {/* Endereço */}
            <TextInput 
                className='w-100 px-4 h-10 border border-zinc-600 rounded-lg text-zinc-300' 
                onChangeText={setUserAddress} 
                value={userAddress}
                maxLength={40}
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
                maxLength={10}
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
                value={insertMaskInCEP(cep)}
                maxLength={9}
                keyboardType='number-pad'
                placeholder='CEP'
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
            onPress={ handleSubmit }
            >   
            <Text className='text-black font-bold text-xl'>Próximo</Text>
        </Pressable>

        </View>
    </ScrollView>
   
  );
}