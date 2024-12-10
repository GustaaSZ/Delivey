import { Text, View, ScrollView, } from "react-native";
import { Header } from "../components/header";
import Constants from 'expo-constants'
import { Banner } from "../components/banner";
import { Section } from "../components/section";
import { DrawerSceneWrapper } from "../components/drawer-scene-wrapper"
import { TrendingFoods } from "../components/trending";
import { TrendingRestaurants } from "../components/trendingRe";

// Constante pra definir uma altura padrão na view
const statusBarHeight = Constants.statusBarHeight;

export default function Index() {
  return (
    <DrawerSceneWrapper>
      <ScrollView 
        style={{ flex: 1, backgroundColor: '#18181b' }} 
        className="bg-zinc-900 text-zinc-300"
        showsVerticalScrollIndicator={false}
      >
        {/* px = padding interno na esquerda e na direita */}
        <View className="w-full px-6" style={{ marginTop: statusBarHeight + 15 }}>
          <Header/>

          <Banner/>
          
          {/* <Search/> */}
          <View style={{ height: 1 }} className="rounded-full w-90 gap-1 bg-zinc-600 my-6"></View>
        </View>

        {/* --- COMIDAS EM ALTA NO APP --- */}
        <Section 
          name="Queridinhos no DeliveryExpress"
          size="text-xl"
          label=""
          action={ () => console.log("Clicou no veja mais")}
        />
        <TrendingFoods categoryId="9"/>
        <View className="mb-5"></View>

        {/* --- HAMBUERGUERES EM ALTA --- */}
        <Section 
          name="Hamburgueres em Alta "
          size="text-xl"
          label="Veja mais"
          action={ () => console.log("Clicou no veja mais")}
        />
        <TrendingFoods categoryId="1"/>
        <View className="mt-10"></View>


        {/* --- PIZZAS EM ALTA --- */}
        <Section 
          name="Pizzas mais Pedidas"
          size="text-xl"
          label="Veja mais"
          action={ () => console.log("Clicou no veja mais")}
        />
        <TrendingFoods categoryId="2"/>
        <View className="mt-10"></View>

        {/* --- RESTAURANTES CADASTRADOS NO APP --- */}
        <Section 
          name="Restaurantes Famosos no DeliveryExpress"
          size="text-xl"
          label=""
          action={ () => console.log("Clicou no veja mais")}
        />
        <TrendingRestaurants/>
        <View className="mb-2"></View>

        {/* --- PETISCOS EM ALTA --- */}
        <Section 
          name="Petiscos Inesquecíveis"
          size="text-xl"
          label="Veja mais"
          action={ () => console.log("Clicou no veja mais")}
        />
        <TrendingFoods categoryId="7"/>
        <View className="mt-10"></View>


        {/* --- SOBREMESAS EM ALTA --- */}
        <Section 
          name="Sobremesas Surpreendentes"
          size="text-xl"
          label="Veja mais"
          action={ () => console.log("Clicou no veja mais")}
        />
        <TrendingFoods categoryId="6"/>
        <View className="mt-10"></View>

         {/* --- BEBIDAS EM ALTA --- */}
         <Section 
          name="Bebidas Refrescantes"
          size="text-xl"
          label="Veja mais"
          action={ () => console.log("Clicou no veja mais")}
        />
        <TrendingFoods categoryId="5"/>
        <View className="mt-10"></View>

      </ScrollView>
    </DrawerSceneWrapper>
  );
}
