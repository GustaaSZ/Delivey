import { View, Pressable, Text } from 'react-native';

// Iterface que serve como contrato pra nosso componente
interface Props{
  name: String;
  size: "text-lg" | "text-xl" | "text-2xl";
  label: string;
  action: () => void;
}

// Section dinâmica que receba propiedades
export function Section({ name, size, label, action }: Props) {
 return (
    <View className='flex flex-row items-center justify-between px-4'>
      {/* my-6 self-start = Espaçamento externo de 6 ou 24px e alinhamento pra começar na esquerda com self-start*/}
      <Text className={`${size} font-semibold text-zinc-50 my-6 self-start`} >
        {name}
      </Text>

      <Pressable onPress={action}>
        <Text className='text-lg text-zinc-400'>{label}</Text>
      </Pressable>
    </View>
  );
}