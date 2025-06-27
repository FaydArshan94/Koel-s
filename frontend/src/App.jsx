import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MainRoutes from "./routes/MainRoutes";
import { useDispatch } from "react-redux";
import { setProducts } from "./store/product/productSlice";
import { getAllProducts } from "./api/productsApi";


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    // ✅ Load products when app loads
    getAllProducts()
      .then((data) => dispatch(setProducts(data)))
      .catch((err) => console.error("Failed to load products", err));
  }, [dispatch]);

  return (
    <div className="font-sans overflow-hidden">
      <Navbar />
      <MainRoutes />
      {/* <TestButton /> */}


    </div>
  );
}

export default App;
