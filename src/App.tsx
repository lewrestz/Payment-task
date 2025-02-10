import ProductPage from "./pages/ProductPage";
import PaymentPage from "./pages/PaymentPage";
import PaymentHistoryPage from "./pages/PaymentHistoryPage";
import { PaymentProvider } from "./context/PaymentHistoryPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <PaymentProvider>
        <Routes>
          <Route path="/" element={<ProductPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/history" element={<PaymentHistoryPage />} />
        </Routes>
    </PaymentProvider>
  );
}

export default App;