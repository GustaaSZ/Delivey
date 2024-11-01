import '../styles/global.css'
import { Slot, Stack  } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { Drawer } from "expo-router/drawer"
import { Feather, Ionicons } from '@expo/vector-icons';
import { transform } from '@babel/core';
import FoodDetails from './foodDetails';

export default function RootLayout() {
  return (
    // <Slot/>
    <GestureHandlerRootView>
      <Drawer 
        screenOptions={{
          headerShown: false,
          drawerStyle: {backgroundColor: '#09090b', width: "55%", paddingTop: 32}, // define a cor a largura e o espaço superior do drawer
          drawerActiveBackgroundColor: "transparent", // cor do background quando ativo
          drawerInactiveBackgroundColor: "transparent", // cor do background quando inativo
          drawerActiveTintColor: '#84cc16', // Cor do texto quando ativo
          drawerInactiveTintColor: '#71717a', // Cor do texto quando inativo
          drawerHideStatusBarOnOpen: false, // deixa a statusbar visivel quando seleciona o drawer
          overlayColor: 'transparent',
          drawerLabelStyle: {
            marginLeft: -14, // espaço entre icone e texto
          },
          sceneContainerStyle: {
            backgroundColor: '#09090b' // mudando a cor do fundo do scene quando a tela muda de tamanho
          }
        }}
      >
          {/* Estilização do Icone */}
          <Drawer.Screen name='index' options={{ 
            drawerLabel: "Home", // Nome personalizado
            drawerIcon: ({ focused }) => ( // Logica pra que ele fique preenchido quando clicado
              <Ionicons 
                name={focused ? 'home' : 'home-outline'} 
                color={focused ? '#d4d4d8' : '#e4e4e7'} 
                size={18} 
              />
            ),
          }}
          />

        <Drawer.Screen 
          name="search" 
          options={{ 
            drawerLabel: "Pesquisa", 
            drawerIcon: ({ focused }) => (
              <Ionicons 
                name={focused ? 'search' : 'search-outline'} 
                color={focused ? '#d4d4d8' : '#e4e4e7'} 
                size={18} 
              />
            ),
          }}
        />
        <Drawer.Screen 
          name="shoppingCart" 
          options={{ 
            drawerLabel: "Carrinho", 
            drawerIcon: ({ focused }) => (
              <Feather 
                name={focused ? 'shopping-cart' : 'shopping-cart'} 
                color={focused ? '#d4d4d8' : '#e4e4e7'} 
                size={18} 
              />
            ),
          }}
        />
        {/* Ocultando as rotas indesejadas */}
        <Drawer.Screen 
          name="foodDetails" 
          options={{ 
            drawerItemStyle: { display: 'none' } // ocultando do drawer
          }}
        />
        <Drawer.Screen 
          name="stack.routes" 
          options={{ 
            drawerItemStyle: { display: 'none' } // ocultando do drawer
          }}
        />
      </Drawer>
      {/* Configura Stack para rotas como 'foodDetails' */}
      {/* <Stack.Screen name="foodDetails" component={FoodDetails} options={{ headerShown: true, title: "Detalhes do Alimento" }} /> */}
    </GestureHandlerRootView>
    // </Slot>
  );
}
