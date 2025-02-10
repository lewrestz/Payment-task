import React, { useState, useEffect } from "react";
import { PiCreditCardBold } from "react-icons/pi";
import { RiCustomerService2Fill } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import validateCard from "../algorithm/validateCard";
import { IoClose } from "react-icons/io5";
import { usePayment } from "../context/PaymentHistoryPage";

const PaymentPage: React.FC = () => {
	const { addPayment } = usePayment();
	const [phone, setPhone] = useState("");
	const [cardNumber, setCardNumber] = useState("");
	const [expiry, setExpiry] = useState("");
	const [name, setName] = useState("");
	const [error, setError] = useState("");
	const [chatVisible, setChatVisible] = useState(false);
	const [newMessage, setNewMessage] = useState(false);
	const [chatOpen, setChatOpen] = useState(false);
	const [cardType, setCardType] = useState("unknown");

	const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/\D/g, "");
		let formattedValue = "";

		if (value.length <= 12) {
			if (value.length > 0) {
				formattedValue = "+998 ";
			}
			if (value.length > 3) {
				formattedValue += `(${value.slice(3, 5)}) `;
			}
			if (value.length > 5) {
				formattedValue += `${value.slice(5, 8)} `;
			}
			if (value.length > 8) {
				formattedValue += `${value.slice(8, 10)} `;
			}
			if (value.length > 10) {
				formattedValue += value.slice(10, 12);
			}
			setPhone(formattedValue.trim());
		}
	};

	const handleExpiryInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		let value = e.target.value.replace(/\D/g, "");

		if (value.length >= 1) {
			const month = parseInt(value.substring(0, 2));
			if (month > 12) {
				value = "12" + value.slice(2);
			}
		}

		if (value.length >= 2) {
			value = value.slice(0, 2) + (value.length > 2 ? "/" + value.slice(2) : "");
		}

		setExpiry(value);
	};

	const handleExpiryKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Backspace" && expiry.endsWith("/")) {
			e.preventDefault();
			setExpiry(expiry.slice(0, -1));
		}
	};

	const detectCardType = (number: string) => {
		const cleaned = number.replace(/\D/g, "");
		if (cleaned.startsWith("4")) return "visa";
		if (/^5[1-5]/.test(cleaned)) return "mastercard";
		if (/^3[47]/.test(cleaned)) return "amex";
		return "unknown";
	};

	const handleCardNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/\D/g, "");
		setCardType(detectCardType(value));
		let formattedValue = "";

		for (let i = 0; i < value.length && i < 16; i++) {
			if (i > 0 && i % 4 === 0) {
				formattedValue += " ";
			}
			formattedValue += value[i];
		}

		setCardNumber(formattedValue);
	};

	const validateForm = () => {
		const phoneRegex = /^\+998 \(\d{2}\) \d{3} \d{2} \d{2}$/;
		if (!phoneRegex.test(phone)) {
			return "Введите корректный номер телефона Узбекистана";
		}

		if (!validateCard(cardNumber.replace(/\s/g, ""))) {
			return "Неверный номер карты";
		}

		const [month, year] = expiry.split("/");
		const currentYear = new Date().getFullYear() % 100;
		const currentMonth = new Date().getMonth() + 1;

		if (
			!/^\d{2}\/\d{2}$/.test(expiry) ||
			parseInt(month) < 1 ||
			parseInt(month) > 12 ||
			parseInt(year) < currentYear ||
			(parseInt(year) === currentYear && parseInt(month) < currentMonth)
		) {
			return "Неверный срок действия карты";
		}

		return null;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const validationError = validateForm();
		if (validationError) {
			setError(validationError);
			return;
		}

		try {
			const paymentData = {
				id: Math.random().toString(36).substr(2, 4),
				phone,
				cardNumber: cardNumber.replace(/\s/g, ""),
				expiry,
				name,
				cardType,
				timestamp: new Date().toISOString()
			};

			addPayment(paymentData);
			setChatVisible(true);
			setNewMessage(true);
			setError("");

			setPhone("");
			setCardNumber("");
			setExpiry("");
			setName("");
			setCardType("unknown");
		} catch (err) {
			console.error("Payment error:", err);
			setError("Ошибка при обработке платежа");
		}
	};

	useEffect(() => {
		setPhone("");
		setCardNumber("");
		setExpiry("");
		setName("");
		setCardType("unknown");
		setError("");
		setChatVisible(false);
		setNewMessage(false);
		setChatOpen(false);
	}, []);

	return (
		<div className="min-h-screen bg-gradient-to-br from-violet-700 via-purple-600 to-indigo-800 flex items-center justify-center p-4 md:p-6 lg:p-8">
			<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-6xl mx-auto">
				<div className="bg-white/10 backdrop-blur-lg rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl border border-white/20">
					<div className="flex flex-col lg:flex-row lg:items-center lg:space-x-8 xl:space-x-12">
						<div className="w-full lg:w-1/2 lg:order-1">
							<form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
								<AnimatePresence>
									{error && (
										<motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
											className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
											<p className="text-red-200 text-center text-sm">{error}</p>
										</motion.div>
									)}
								</AnimatePresence>

								<div className="space-y-1 sm:space-y-2">
									<label className="text-white/90 text-sm font-medium">Номер телефона</label>
									<input type="tel" placeholder="+998 (00) 000 00 00" value={phone}
										onChange={handlePhoneInput}
										className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-xl 
										text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent 
										transition-all text-sm sm:text-base" />
								</div>

								<div className="space-y-1 sm:space-y-2">
									<label className="text-white/90 text-sm font-medium">Номер карты</label>
									<input type="text" placeholder="0000 0000 0000 0000"
										value={cardNumber}
										onChange={handleCardNumberInput}
										className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-xl 
										text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400/50 
										focus:border-transparent transition-all text-sm sm:text-base"/>
								</div>

								<div className="grid grid-cols-2 gap-3 sm:gap-4">
									<div className="space-y-1 sm:space-y-2">
										<label className="text-white/90 text-sm font-medium">Срок действия</label>
										<input type="text" placeholder="MM/YY" value={expiry} onChange={handleExpiryInput} onKeyDown={handleExpiryKeyDown}
											maxLength={5}
											className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-xl 
											text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400/50 
											focus:border-transparent transition-all text-sm sm:text-base"/>
									</div>

									<div className="space-y-1 sm:space-y-2">
										<label className="text-white/90 text-sm font-medium">Имя владельца</label>
										<input type="text" placeholder="JOHN DOE" value={name}
											onChange={(e) => setName(e.target.value.toUpperCase())}
											className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-xl 
											text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400/50 
											focus:border-transparent transition-all text-sm sm:text-base"/>
									</div>
								</div>

								<motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit"
									className="w-full py-3 sm:py-4 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl 
									font-medium shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 
									focus:ring-purple-400/50 mt-4 sm:mt-6 text-sm sm:text-base">
									Подтвердить
								</motion.button>
							</form>
						</div>

						<div className="w-full lg:w-1/2 lg:order-2 mb-6 lg:mb-0 mt-8 lg:mt-0">
							<div className="relative w-full h-48 sm:h-52 md:h-56 lg:h-96 perspective-1000">
								<motion.div className="w-full h-full relative transform-gpu transition-all duration-700">
									<div className="absolute w-full h-full bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-700 rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 shadow-xl">
										<div className="h-full flex flex-col justify-between">
											<div className="flex justify-between items-start">
												<div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-white/30 rounded-lg flex items-center justify-center">
													<PiCreditCardBold className="text-white text-xl sm:text-2xl lg:text-4xl" />
												</div>
												<div className="text-white/90 text-sm sm:text-base lg:text-lg font-medium">
													{cardType.toUpperCase()}
												</div>
											</div>

											<div className="space-y-4 sm:space-y-6 lg:space-y-8">
												<div className="text-lg sm:text-xl md:text-2xl lg:text-4xl text-white tracking-wider font-mono">
													{cardNumber || "•••• •••• •••• ••••"}
												</div>

												<div className="flex justify-between">
													<div>
														<div className="text-white/60 text-xs lg:text-sm uppercase">Card Holder</div>
														<div className="text-white text-sm sm:text-base lg:text-xl font-medium mt-1">
															{name || "YOUR NAME"}
														</div>
													</div>
													<div>
														<div className="text-white/60 text-xs lg:text-sm uppercase">Expires</div>
														<div className="text-white text-sm sm:text-base lg:text-xl font-medium mt-1">
															{expiry || "MM/YY"}
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</motion.div>
							</div>
						</div>
					</div>
				</div>
			</motion.div>

			{chatVisible && (
				<div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6">
					<motion.button initial={{ scale: 0 }} animate={{ scale: 1 }}
						className="relative bg-gradient-to-r from-violet-500 to-purple-500 text-white p-3 sm:p-4 rounded-full 
						shadow-lg hover:shadow-xl transition-all duration-200"
						onClick={() => {
							setChatOpen(true);
							setNewMessage(false);
						}}>
						<RiCustomerService2Fill className="w-5 h-5 sm:w-6 sm:h-6" />
						<AnimatePresence>
							{newMessage && (
								<motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
									className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 sm:w-6 sm:h-6 flex 
									items-center justify-center rounded-full">
									1
								</motion.span>
							)}
						</AnimatePresence>
					</motion.button>
				</div>
			)}

			<AnimatePresence>
				{chatOpen && (
					<motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }}
						className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 w-[calc(100%-2rem)] sm:w-80 max-w-sm 
						bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
						<div className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 p-3 sm:p-4">
							<div className="flex justify-between items-center">
								<div className="flex items-center space-x-2 sm:space-x-3">
									<RiCustomerService2Fill className="text-white text-lg sm:text-xl" />
									<h3 className="text-base sm:text-lg font-bold text-white">Чат поддержки</h3>
								</div>
								<button
									className="text-white hover:text-white/70 transition-colors text-lg sm:text-xl"
									onClick={() => setChatOpen(false)}
								>
									<IoClose />
								</button>
							</div>
						</div>
						<div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
							<div className="bg-white/5 rounded-lg p-2.5 sm:p-3 backdrop-blur-sm">
								<p className="text-white text-sm">👋 Ваш карта подтверждена</p>
							</div>
							<div className="bg-violet-500/10 rounded-lg p-2.5 sm:p-3 backdrop-blur-sm">
								<p className="text-blue-200 text-sm break-words">
									<a href="https://fake-payment.com/checkout" target="_blank" rel="noopener noreferrer"
										className="hover:text-blue-100 transition-colors">
										🔗 https://fake-payment.com/checkout
									</a>
								</p>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);

};

export default PaymentPage;