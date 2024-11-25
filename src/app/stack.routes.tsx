import { createNativeStackNavigator } from '@react-navigation/native-stack'
import FoodDetails from './pages/foodDetails';
import Payment  from './payment';
import PaymentCard from './paymentCard';
import PaymentFinaly from './paymentFinaly';
import RegisterUser from './registerUser';
import RestaurantDetails from './pages/restaurantDetails';

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
 return (
   <Stack.Navigator screenOptions={{ title: '', headerShadowVisible: false}}>
      <Stack.Screen
        name='pages/foodDetails'
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
      <Stack.Screen
        name='paymentFinaly'
        component={PaymentFinaly}
      />
      <Stack.Screen
        name='registerUser'
        component={RegisterUser}
      />
      <Stack.Screen
        name='restaurantDetails'
        component={RestaurantDetails}
      />
   </Stack.Navigator>
  );
}