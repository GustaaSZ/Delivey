import { createNativeStackNavigator } from '@react-navigation/native-stack'
import FoodDetails from './foodDetails';
import Payment  from './payment';
import PaymentCard from './paymentCard';

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
 return (
   <Stack.Navigator screenOptions={{ title: '', headerShadowVisible: false}}>
      <Stack.Screen
        name='foodDetails'
        component={FoodDetails}
      />
      <Stack.Screen
        name='payment'
        component={Payment}
      />
      <Stack.Screen
        name='paymentCard'
        component={PaymentCard}
      />
   </Stack.Navigator>
  );
}