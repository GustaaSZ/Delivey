import React, { useEffect, useRef } from 'react';
import { View, Text, TextInput, Pressable, Image } from 'react-native';
import BackButton from '../components/backButton';
import Constants from 'expo-constants';
import { Section } from '../components/section';
import { BannerCard } from '../components/bannerCard';
import { router } from 'expo-router';
import { TextInputMask } from 'react-native-masked-text';
import { usePayment } from '../components/contextCard';

export default function PaymentCard() {
    // constante pra definir uma altura padrão e responsiva na view
    const statusBarHeight = Constants.statusBarHeight;

    // Variaveis para ler a entrada dos usuários
    const [name, setName] = React.useState('');
    const {userCardNumber, setUserCardNumber} = usePayment()
    const [number, setNumber] = React.useState('');
    const [validity, setValidity] = React.useState('');
    const [cvv, setCvv] = React.useState('');

    // Função pra pegar o estado do inputs
    const hanfdlePayment = () => {
        console.log('Nome do cartão: ', name);
        console.log('Numero do cartão: ',number );
        console.log('Validade: ', validity);
        console.log('CVV: ', cvv);
    }

    // Função que insere maskara no CEP
    const insertMaskInValidityDate = (date: string) => {
        return date.replace(/(\d{2})(\d)/, '$1/$2');
    };

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
                    name="Dados do Cartão"
                    size="text-xl"
                    label=""
                    action={ () => console.log("Clicou no veja mais")}
                />
            </View>
        </View>

        {/* VIEW DOS INPUTS */}
        <View className='px-6 gap-10'>
            <View style={{marginBottom: -30}} className='px-4'>
                <BannerCard/> 
            </View>
            
            {/* NOME DO CARTÃO  */}
            <TextInput 
                className='w-100 px-4 h-10 border border-zinc-600 rounded-lg text-zinc-300' 
                onChangeText={setName} 
                value={name}
                inputMode='text'
                placeholder='Nome do Cartão'
                placeholderTextColor={'#a1a1aa'}
                underlineColorAndroid='transparent'
                // editable
            >
            </TextInput>

            {/* NUMERO DO CARTÃO */}
            <TextInputMask 
                type={'credit-card'}
                options={{
                    obfuscated: false,
                    issuer: 'visa-or-mastercard',
                }}
                style={{width: 340, borderColor: '#52525b',borderWidth: 1 ,borderRadius: 8, height: 36, paddingLeft: 16, color: '#d4d4d8'}}
                onChangeText={setUserCardNumber} 
                maxLength={19} // limitando o tamanho para 19 pois com a maskara de cardNumber, terá espaço em 3 lugares, ou seja = 16 + 3 
                value={userCardNumber}
                keyboardType='number-pad'
                placeholder='Número do Cartão'
                placeholderTextColor={'#a1a1aa'}
                underlineColorAndroid='transparent'
            >
            </TextInputMask>

            <View className='flex flex-row justify-between'>
                {/* VALIDADE */}
                <TextInput 
                    style={{width: 150}}
                    maxLength={5} // limitando o número de caracteres/numbers para 5
                    className='px-4 h-10 border border-zinc-600 rounded-lg text-zinc-300' 
                    onChangeText={setValidity} 
                    value={insertMaskInValidityDate(validity)}
                    placeholder='Validade'
                    inputMode='numeric'
                    placeholderTextColor={'#a1a1aa'}
                    underlineColorAndroid='transparent'
                    // editable
                >
                </TextInput>

                {/* CVV */}
                <TextInput 
                    style={{width: 100}}
                    maxLength={3} // limitando o número de caracteres/numbers para 3
                    className='px-4 h-10 border border-zinc-600 rounded-lg text-zinc-300' 
                    onChangeText={setCvv} 
                    value={cvv}
                    keyboardType='number-pad'
                    placeholder='CVV'
                    placeholderTextColor={'#a1a1aa'}
                    underlineColorAndroid='transparent'
                >
                </TextInput>
            </View>
        </View>

        <View className='items-center justify-center mt-10 px-10'>
        <Pressable 
            style={{ backgroundColor: '#fcd34d' }}
            className='w-full h-14 mt-10 flex items-center justify-center rounded-xl'
            onPress={  () => router.navigate('/paymentFinaly') }
            >   
            <Text className='text-black font-bold text-xl'>Próximo</Text>
        </Pressable>

        </View>
    </View>
   
  );
}