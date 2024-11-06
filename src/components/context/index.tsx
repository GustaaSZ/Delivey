import React, { createContext, useState, useContext, ReactNode } from 'react';

// Defina o tipo do item no carrinho, por exemplo:
type CartItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
};

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};
