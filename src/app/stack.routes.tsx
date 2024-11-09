import { createNativeStackNavigator } from '@react-navigation/native-stack'
import FoodDetails from './foodDetails';

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
 return (
   <Stack.Navigator screenOptions={{ title: '', headerShadowVisible: false}}>
      <Stack.Screen
        name='foodDetails'
        component={FoodDetails}
      />
   </Stack.Navigator>
  );
}