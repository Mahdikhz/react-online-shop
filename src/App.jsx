import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Auth from "./pages/Auth";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Account from "./pages/Account";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";

function App() {
  return (
    // <Routes>
    //   <Route element={<Layout />}>
    //     <Route path="/" element={<Home />} />
    //     <Route path="/products" element={<Products />} />
    //     <Route path="/products/:id" element={<ProductDetail />} />
    //     <Route path="/login" element={<Auth />} />
    //     <Route path="/cart" element={<Cart />} />
    //     <Route path="/wishlist" element={<Wishlist />} />
    //     <Route path="/account" element={<Account />} />
    //     <Route path="/checkout" element={<Checkout />} />
    //     <Route path="/order-success/:id" element={<OrderSuccess />} />
    //   </Route>
    // </Routes>
    <Routes>
      {/* صفحه ورود بدون Layout */}
      <Route path="/login" element={<Auth />} />

      {/* بقیه صفحات با Layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/account" element={<Account />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success/:id" element={<OrderSuccess />} />
      </Route>
    </Routes>
  );
}

export default App;
