import { Text, View, ScrollView, Image } from "react-native";
import { Header } from "../components/header";
import Constants from 'expo-constants'
import { Section } from "../components/section";
import { DrawerSceneWrapper } from "../components/drawer-scene-wrapper";
import { useCart } from '../components/context';

// constante pra definir uma altura padrão e responsiva na view
const statusBarHeight = Constants.statusBarHeight;

export default function ShoppingCart() {
  const { cartItems } = useCart();

  // calculo do valor total dos itens adicionados ao carrinho
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <DrawerSceneWrapper>
      <ScrollView 
        style={{ flex: 1 }} 
        className="bg-zinc-900 text-zinc-300"
        showsVerticalScrollIndicator={false}
      >
        {/* px = padding interno na esquerda e na direita */}
        <View className="w-full px-6" style={{ marginTop: statusBarHeight + 15}}>
          <Header/>
          <View className="flex items-center justify-center">
            <Text className="mt-10 text-zinc-300 text-xl">Carrinho de compras</Text>

            {cartItems.length === 0 ? (
              <Text className="text-zinc-400 mt-10">Seu carrinho está vazio.</Text>
            ) : (
              cartItems.map((item, index) => (
                <View key={index} className="mt-10">
                  <Text className="text-zinc-300 text-lg">{item.name}</Text>
                  <Text className="text-zinc-400">Preço: R$ {item.price}</Text>
                  <Image source={{ uri: item.image }} className='w-72 h-36 rounded-xl mt-2'/>
                  
                </View>
                // <View className="mt-10"></View>
              ))
              
            )}

            <View style={{backgroundColor: '#4d7c0f', opacity: 90}} className="flex w-48 h-10 items-center justify-center rounded-xl mt-10">
              <Text className='text-zinc-50 font-semibold'>   Total: R$ {total.toFixed(2)}   </Text>
            </View>

            <View className="mt-10"></View>
              
          </View>
        </View>
      </ScrollView>
    </DrawerSceneWrapper>
  );
}
