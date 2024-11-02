import { Pressable, Text, View } from 'react-native';
import { Href, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

// Iterface que serve como contrato pra nosso componente backButton
interface Props {
  // Atributo rota obrigatório
  rota: string;
}
// BackButton dinâmico que recebe o parametro rota pra navegação
export default function BackButton( { rota }: Props ) {
  const router = useRouter();

  return (
    <View className='w-full items-center justify-between flex flex-row text-zinc-400'>
      <Pressable 
        style={{ left: 20 }}
        className='w-10 h-10 bg-zinc-800 rounded-full flex justify-center items-center'
        // Navegação para a rota passada ao chamar o componente BackButton
        // Passando rota como pathname as href
        onPress={() => router.push({ pathname: rota} as Href)}
      >
      <Feather name='chevron-left' color='#e4e4e7' size={25}/>
      </Pressable>
    </View>
  );
}