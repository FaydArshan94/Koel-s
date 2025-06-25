import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MainRoutes from "./routes/Mainroutes";

function App() {
  return (
    <div className="font-sans overflow-hidden">
      <Navbar />
      <MainRoutes />
    </div>
  );
}

export default App;
