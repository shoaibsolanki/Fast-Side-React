
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import {  useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import { AuthProvider } from "./contexts/AuthConext";
import { CartProvider } from "./contexts/CartContext";

export default function RootLayout({ children }) {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/Signup';

  return (
    <div className={isAuthPage ? 'bg-white mx-auto' : 'bg-white w-full'}>
      {!isAuthPage && <Navbar />}
      <main className="bg-white w-full max-w-[1600px] mx-auto px-4">
        {children}
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
}
