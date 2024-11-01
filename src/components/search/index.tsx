import { Feather } from '@expo/vector-icons';
import { View, TextInput } from 'react-native';

export function Search() {
 return (
   <View style={{ 
      borderColor: '#3f3f46', borderWidth: 1, height: 38, paddingLeft: 10, backgroundColor: '#18181b'}} 
      className='w-full flex-row mt-5 gap-2 rounded-full items-center'
   >
    <Feather name='search' size={20} color="#a3e635"/>
    <TextInput
      className='text-zinc-300 w-full h-full flex-1 bg-transparent'
      placeholder='Procure pelo prato...'
      placeholderTextColor="#a1a1aa"
    />
   </View>
  );
}