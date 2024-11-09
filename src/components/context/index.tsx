import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// Define o tipo para o contexto de carrinho
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
}

// Defina o tipo para as props do CartProvider, incluindo children
interface CartProviderProps {
  children: ReactNode;
}

// Criação do contexto
export const CartContext = createContext<CartContextType | undefined>(undefined);

// Função de hook customizada para acessar o contexto
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};

// CartProvider
export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<Array<{ id: string; name: string; price: number; quantity: number; image: string }>>([]);

  // Função para adicionar item ao carrinho
  const addToCart = (item: { id: string; name: string; price: number; quantity: number; image: string }) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }
      return [...prevItems, item];
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};