import { Text, View, ScrollView } from "react-native";
import { Header } from "../components/header";
import Constants from 'expo-constants'

const statusBarHeight = Constants.statusBarHeight;
// px = padding interno na esquerda e na direita

export default function Index() {
  return (
    <ScrollView 
      style={{ flex: 1}} 
      className="bg-zinc-900 text-zinc-300"
      showsVerticalScrollIndicator={false}
    >
      <View className="w-full px-6" style={{ marginTop: statusBarHeight + 15}}>
        <Header/>
      </View>
    </ScrollView>
  );
}
