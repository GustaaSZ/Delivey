import { View, Text } from 'react-native';
import BackButton from '../components/backButton';
import Constants from 'expo-constants';

export default function Payment() {
    // constante pra definir uma altura padrão e responsiva na view
    const statusBarHeight = Constants.statusBarHeight;

 return (
    <View className='flex flex-1 bg-zinc-900'>
        <View className='items-center justify-between'>
            <View className="w-full px-2 my-10 mr-2" style={{ marginTop: statusBarHeight + 15}}>
                <BackButton rota='/shoppingCart'/>
            </View>
            <View className='flex items-center justify-center'>
                <Text className='text-zinc-200 text-3xl mt-10'> Página de pagamento</Text>
            </View>
        </View>
    </View>
   
  );
}