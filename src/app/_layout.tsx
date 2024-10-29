import '../styles/global.css'
import { Slot } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { Drawer } from "expo-router/drawer"
import { Feather, Ionicons } from '@expo/vector-icons';
import { transform } from '@babel/core';

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
          name="notifications" 
          options={{ 
            drawerLabel: "Notificações", 
            drawerIcon: ({ focused }) => (
              <Ionicons 
                name={focused ? 'notifications' : 'notifications-outline'} 
                color={focused ? '#d4d4d8' : '#e4e4e7'} 
                size={18} 
              />
            ),
          }}
        />
      </Drawer>
      
    </GestureHandlerRootView>
    // </Slot>
  );
}
