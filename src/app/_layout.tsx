import '../styles/global.css'
import { Slot } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { Drawer } from "expo-router/drawer"
import { Feather, Ionicons } from '@expo/vector-icons';

export default function RootLayout() {
  return (
    // <Slot/>
    <GestureHandlerRootView>
      <Drawer 
        screenOptions={{
          headerShown: false,
          drawerStyle: {backgroundColor: '#3f3f46'} // define a cor do drawer
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
