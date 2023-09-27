import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./Pages/HomePage/Home";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;
