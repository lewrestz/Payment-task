import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BiChip, BiPhoneIncoming } from "react-icons/bi";
import { FcCameraIdentification } from "react-icons/fc";
import { BsBatteryFull } from "react-icons/bs";

const ProductPage: React.FC = () => {
	const navigate = useNavigate();

	const handleBuyClick = () => {
		navigate("/payment");
	};

	const handleHistoryClick = () => {
		navigate("/history");
	};

	const features = [
		{ icon: <BiChip className="w-6 h-6" />, text: "A16 Bionic" },
		{ icon: <FcCameraIdentification className="w-6 h-6" />, text: "48MP Camera" },
		{ icon: <BsBatteryFull className="w-6 h-6" />, text: "All-day battery" },
	];

	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 flex items-center justify-center p-4">
			<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
				<div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl text-white">
					<div className="flex items-center justify-center mb-6">
						<div className="bg-gradient-to-r from-purple-400 to-pink-400 p-4 rounded-2xl">
							<BiPhoneIncoming className="w-12 h-12" />
						</div>
					</div>

					<motion.h2 className="text-3xl font-bold text-center mb-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
						transition={{ delay: 0.2 }}>
						Смартфон ProMax 15
					</motion.h2>

					<motion.div className="text-center mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
						<span className="text-xl text-white/70">Цена:</span>
						<span className="text-3xl font-bold ml-2">$0</span>
					</motion.div>

					<motion.div className="grid grid-cols-3 gap-4 mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
						{features.map((feature, index) => (
							<div key={index} className="bg-white/5 rounded-xl p-4 text-center backdrop-blur-sm">
								<div className="flex justify-center mb-2">
									{feature.icon}
								</div>
								<p className="text-sm">{feature.text}</p>
							</div>
						))}
					</motion.div>

					<div className="flex gap-4">
						<motion.button onClick={handleBuyClick}
							className="w-1/2 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}>
							Купить сейчас
						</motion.button>

						<motion.button onClick={handleHistoryClick}
							className="w-1/2 py-4 bg-gradient-to-r from-gray-600 to-gray-800 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}>
							История заказов
						</motion.button>
					</div>

					<motion.p className="text-center mt-4 text-white/60 text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
						transition={{ delay: 0.5 }}>
						Бесплатная доставка • Гарантия 1 год
					</motion.p>
				</div>
			</motion.div>
		</div>
	);
};

export default ProductPage;
