import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./Context/CartContext";
import { NotificationProvider } from "./Context/NotificationContext";
import NavBar from "./Components/layout/NavBar";
import Footer from "./Components/layout/Footer";
import { Home } from "./Pages/Home";
import { Shop } from "./Pages/Shop";
import { ProductDetail } from "./Pages/ProductDetail";
import { Cart } from "./Pages/Cart";
import { NotFound } from "./Pages/NotFound";

export default function App() {
  return (
    <CartProvider>
      <NotificationProvider>
        <BrowserRouter>
          <div className="app-layout">
            <NavBar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </NotificationProvider>
    </CartProvider>
  );
}