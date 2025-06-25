import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Feature from "../pages/Feature";
import Blog from "../pages/Blog";
import Products from "../pages/Products";
import Cart from "../pages/Cart";
import ProductDetails from "../pages/ProductDetails";

// Add more imports as needed

const MainRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/products" element={<Products />} />
    <Route path="/products/product-details/:id" element={<ProductDetails />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/about" element={<About />} />
    <Route path="/blog" element={<Blog />} />
    {/* Add more routes as needed */}
  </Routes>
);

export default MainRoutes;
