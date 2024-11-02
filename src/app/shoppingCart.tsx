import { Text, View, ScrollView } from "react-native";
import { Header } from "../components/header";
import Constants from 'expo-constants'
import { Banner } from "../components/banner";
import { Search } from "../components/search";
import { Section } from "../components/section";
import { DrawerSceneWrapper } from "../components/drawer-scene-wrapper";

// constante pra definir uma altura padrão e responsiva na view
const statusBarHeight = Constants.statusBarHeight;

export default function ShoppingCart() {
  return (
    <DrawerSceneWrapper>
      <ScrollView 
        style={{ flex: 1}} 
        className="bg-zinc-900 text-zinc-300"
        showsVerticalScrollIndicator={false}
      >
        {/* px = padding interno na esquerda e na direita */}
        <View className="w-full px-6" style={{ marginTop: statusBarHeight + 15}}>
          <Header/>

          {/* <Banner/> */}
          
          {/* <Search/> */}

          <Text className="items-center justify-center text-zinc-300 text-xl">Carrinho de compras</Text>
        </View>
      </ScrollView>
    </DrawerSceneWrapper>
  );
}
