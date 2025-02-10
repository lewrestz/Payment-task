import React from "react";
import { motion } from "framer-motion";
import { FaHistory } from "react-icons/fa";
import { BiTime } from "react-icons/bi";
import { PiCreditCardBold } from "react-icons/pi";
import { usePayment } from "../context/PaymentHistoryPage";

const PaymentHistoryPage: React.FC = () => {
  const { payments } = usePayment();

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCardNumber = (number: string) => {
    return `•••• ${number.slice(-4)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-700 via-purple-600 to-indigo-800 p-4 md:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 md:p-8 shadow-2xl border border-white/20">
          <div className="flex items-center space-x-4 mb-8">
            <div className="bg-gradient-to-r from-violet-500 to-purple-500 p-3 rounded-xl">
              <FaHistory className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">История платежей</h1>
          </div>

          {payments.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-white/70">История платежей пуста</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {payments.map((payment) => (
                <motion.div
                  key={payment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 rounded-xl p-4 md:p-6 backdrop-blur-sm border border-white/10"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                    <div className="flex items-center space-x-4">
                      <div className="bg-white/10 p-3 rounded-lg">
                        <PiCreditCardBold className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{payment.name}</p>
                        <p className="text-white/60 text-sm">
                          {payment.cardType} {formatCardNumber(payment.cardNumber)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="bg-white/10 p-3 rounded-lg">
                        <BiTime className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-medium">
                          {formatDate(payment.timestamp)}
                        </p>
                        <p className="text-white/60 text-sm">{payment.phone}</p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 px-4 py-2 rounded-lg">
                      <p className="text-green-200 text-sm font-medium">Подтверждено</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentHistoryPage;