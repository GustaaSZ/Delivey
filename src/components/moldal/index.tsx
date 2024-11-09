import React, { Dispatch, SetStateAction } from 'react';
import { Modal, Text, Pressable, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useCart } from '../context';

// Adionando props que serve como contrato aco chamar a customModal
interface CustomModalProps {
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
    quantity: number;
    id: string;
    name: string;
    price: number;
    image: string;
}

const CustomModal: React.FC<CustomModalProps> = ({ showModal, setShowModal, quantity, id, name, price, image }) => {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        const itemToAdd = {
            id,
            name,
            price,
            quantity,
            image,
        };
        addToCart(itemToAdd);
        console.log(`Adicionou no carrinho ${quantity}x ${name}`);
        setShowModal(false);
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView className="flex-1 justify-center items-center">
                {/* Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showModal}
                    onRequestClose={() => setShowModal(false)}
                >
                    <Pressable
                        className="flex-1 bg-opacity-50 justify-center items-center"
                        onPress={() => setShowModal(false)} // Fechar ao clicar fora
                    >
                        {/*onStartShouldSetResponder -> Não fecha ao clicar no modal  */}
                        <View className="w-72 p-6 rounded-lg items-center bg-zinc-800" onStartShouldSetResponder={() => true}>
                            <Text className="text-lg mb-4 text-zinc-300">Adicionar ao carrinho?</Text>

                            {/* Botões de Sim e Não */}
                            <View className="flex-row justify-between w-full">
                                <Pressable
                                    className="flex-1 p-3 bg-green-500 rounded-md mr-2 items-center"
                                    onPress={handleAddToCart}
                                >
                                    <Text className="text-white font-bold">Sim</Text>
                                </Pressable>

                                <Pressable
                                    className="flex-1 p-3 bg-red-500 rounded-md ml-2 items-center"
                                    onPress={() => setShowModal(false)} // Fechar o modal ao clicar em "Não"
                                >
                                    <Text className="text-white font-bold">Não</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Pressable>
                </Modal>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};
export default CustomModal;
