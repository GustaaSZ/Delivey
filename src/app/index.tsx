import { Text, View, ScrollView, } from "react-native";
import { Header } from "../components/header";
import Constants from 'expo-constants'
import { Banner } from "../components/banner";
import { Search } from "../components/search";
import { Section } from "../components/section";
import { DrawerSceneWrapper } from "../components/drawer-scene-wrapper"
import { TrendingFoods } from "../components/trending";
import { TrendingRestaurants } from "../components/trendingRe";

const statusBarHeight = Constants.statusBarHeight;
// px = padding interno na esquerda e na direita

export default function Index() {
  return (
    <DrawerSceneWrapper>
      <ScrollView 
        style={{ flex: 1, backgroundColor: '#18181b' }} 
        className="bg-zinc-900 text-zinc-300"
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full px-6" style={{ marginTop: statusBarHeight + 15 }}>
          <Header/>

          <Banner/>
          
          {/* <Search/> */}
          <View style={{ height: 1 }} className="rounded-full w-90 gap-1 bg-zinc-600 my-6"></View>
        </View>

        <Section 
          name="Comidas em Alta"
          size="text-xl"
          label="Veja mais"
          action={ () => console.log("Clicou no veja mais")}
        />

        {/* Chamando o  trendingFoods*/}
        <TrendingFoods/>

        <Section 
          name="Famosos no DelivExpress"
          size="text-xl"
          label="Veja mais"
          action={ () => console.log("Clicou no veja mais")}
        />

        {/* Chamando o  trendingRestaurants*/}
        <TrendingRestaurants/>

      </ScrollView>
    </DrawerSceneWrapper>
  );
}
