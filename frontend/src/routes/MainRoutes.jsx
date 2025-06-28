import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Products from "../pages/Products";
import Cart from "../pages/Cart";
import ProductDetails from "../pages/ProductDetails";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import PrivateRoute from "../components/PrivateRoute";
import PublicRoute from "../components/PublicRoute";
import AdminRoute from "./AdminRoute";
import AddProduct from "../pages/AddProduct";
import EditProduct from "../pages/EditProduct";

// Add more imports as needed

const MainRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/products" element={<Products />} />
    <Route path="/products/product-details/:id" element={<ProductDetails />} />

    <Route path="/about" element={<About />} />

    <Route
      path="/add-product"
      element={
        <AdminRoute>
          <AddProduct />
        </AdminRoute>
      }
    />

    <Route
      path="/edit-product/:id"
      element={
        <AdminRoute>
          <EditProduct />
        </AdminRoute>
      }
    />
    <Route
      path="/signup"
      element={
        <PublicRoute>
          <Signup />
        </PublicRoute>
      }
    />

    <Route
      path="/login"
      element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      }
    />

    <Route
      path="/cart"
      element={
        <PrivateRoute>
          <Cart />
        </PrivateRoute>
      }
    />

    <Route
      path="/profile"
      element={
        <PrivateRoute>
          <Profile />
        </PrivateRoute>
      }
    />

    {/* Add more routes as needed */}
  </Routes>
);

export default MainRoutes;
