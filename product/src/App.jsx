// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Favourites from "./pages/Favourites";
import Cart from "./pages/Cart";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favourites />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
};

export default App;
