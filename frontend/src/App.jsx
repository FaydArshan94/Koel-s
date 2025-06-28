import React, { useEffect } from "react";
import Navbar from "./components/Navbar";

import MainRoutes from "./routes/MainRoutes";
import { useDispatch } from "react-redux";
import { setProducts } from "./store/product/productSlice";
import { getAllProducts } from "./api/productsApi";
import { useLocation } from "react-router-dom";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "./styles/loader.css";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    // ✅ Load products when app loads
    getAllProducts()
      .then((data) => dispatch(setProducts(data)))
      .catch((err) => console.error("Failed to load products", err));
  }, [dispatch]);



  const location = useLocation();

  useEffect(() => {
    NProgress.start(); // start progress bar on route change
    setTimeout(() => {
      NProgress.done(); // finish it after short delay (fake loading feel)
    }, 500); // 500ms delay
  }, [location.pathname]);




  return (
    <div className="font-sans overflow-hidden">
      <Navbar />
      <MainRoutes />
      {/* <TestButton /> */}


    </div>
  );
}

export default App;
