import React, { createContext, useContext, useState, ReactNode } from 'react';

// Interface para os dados de pagamento
interface PaymentContextType {
    userName: string;
    userPhone: string;
    userAddress: string;
    userAddressEmail: string;
    setUserName: (name: string) => void;
    setUserPhone: (phone: string) => void;
    setUserAddress: (address: string) => void;
    setUserAddressEmail: (address: string) => void;
}

// Define o tipo para as props do PaymentProvider
interface PaymentProviderProps {
  children: ReactNode;
}

// Criação do contexto de pagamento
export const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

// Função de hook customizada para acessar o contexto de pagamento
export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayment deve ser usado dentro de um PaymentProvider');
  }
  return context;
};

// Provider para o contexto de pagamento
export const PaymentProvider = ({ children }: PaymentProviderProps) => {

  const [userName, setUserName] = useState<string>('');
  const [userAddressEmail, setUserAddressEmail] = useState<string>('');
  const [userPhone, setUserPhone] = useState<string>('');
  const [userAddress, setUserAddress] = useState<string>('');

  return (
    <PaymentContext.Provider value={{ userName, setUserName, userAddressEmail, setUserAddressEmail ,userPhone, setUserPhone, userAddress, setUserAddress }}>
      {children}
    </PaymentContext.Provider>
  );
};
