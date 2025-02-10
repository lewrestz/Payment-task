import React, { createContext, useContext, useState } from 'react';
import { Payment } from '../types/types';

interface PaymentContextType {
  payments: Payment[];
  addPayment: (payment: Payment) => void;
  clearPayments: () => void;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const PaymentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [payments, setPayments] = useState<Payment[]>([]);

  const addPayment = (payment: Payment) => {
    setPayments((prev) => [...prev, payment]);
  };

  const clearPayments = () => {
    setPayments([]);
  };

  return (
    <PaymentContext.Provider value={{ payments, addPayment, clearPayments }}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error('Error');
  }
  return context;
};