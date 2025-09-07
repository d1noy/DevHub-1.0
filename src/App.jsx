import MainLogin from "./Pages/MainLogin.jsx";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLogin />} />
      <Route path="/header" element={<Header />} />
      {/* другие маршруты: /join, /forgot и т.д. */}
    </Routes>
  );
}


