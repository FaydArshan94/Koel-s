import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Products from "../pages/Products";
import Cart from "../pages/Cart";
import ProductDetails from "../pages/ProductDetails";
import Signup from "../pages/Signup";
import Login from "../pages/Login";

// Add more imports as needed

const MainRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/products" element={<Products />} />
    <Route path="/products/product-details/:id" element={<ProductDetails />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/about" element={<About />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login />} />

    {/* Add more routes as needed */}
  </Routes>
);

export default MainRoutes;
