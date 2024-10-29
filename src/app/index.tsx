import { Text, View, ScrollView } from "react-native";
import { Header } from "../components/header";
import Constants from 'expo-constants'
import { Banner } from "../components/banner";
import { Search } from "../components/search";
import { Section } from "../components/section";
import { DrawerSceneWrapper } from "../components/drawer-scene-wrapper"

const statusBarHeight = Constants.statusBarHeight;
// px = padding interno na esquerda e na direita

export default function Index() {
  return (
    <DrawerSceneWrapper>
      <ScrollView 
        style={{ flex: 1}} 
        className="bg-zinc-900 text-zinc-300"
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full px-6" style={{ marginTop: statusBarHeight + 15}}>
          <Header/>

          <Banner/>
          
          <Search/>

          <Section 
            name="Comidas em Alta"
            size="text-2xl"
            label="Veja mais"
            action={ () => console.log("Clicou no veja mais")}
          
          />
          {/* <Section 
            name="Famosos no Ifood"
            size="text-2xl"
            label="Veja mais"
            action={ () => console.log("Clicou no veja mais")}
          
          /> */}
        </View>
      </ScrollView>
    </DrawerSceneWrapper>
  );
}
