import MainLogin from "./Pages/MainLogin.jsx";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header.jsx";
import Registration from "./Pages/Registration.jsx"
import Profile from "./Pages/Profile.jsx";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLogin />} />
      <Route path="/header" element={<Header />} />
       <Route path="/profile" element={<Profile />} />
      <Route path="/registration" element={<Registration />} />
      {/* другие маршруты: /join, /forgot и т.д. */}
    </Routes>
  );
}


