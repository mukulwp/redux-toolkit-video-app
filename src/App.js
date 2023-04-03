import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SingleVideo from "./pages/SingleVideo";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/single-video/:videoId" element={<SingleVideo />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
