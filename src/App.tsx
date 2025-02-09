import ProductPage from "./pages/ProductPage";
import PaymentPage from "./pages/PaymentPage";
import { Route, Routes } from "react-router-dom";
import PaymentHistoryPage from "./pages/PaymentHistoryPage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<ProductPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/history" element={<PaymentHistoryPage />} />
    </Routes>
  );
}

export default App;
