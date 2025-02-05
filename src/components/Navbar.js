import { Call, WhatsApp } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthConext";
import { useNavigate } from "react-router-dom";
import logoImg from ".././imgs/logo.png";
import shoppingCartImage from "../imgs/shopping-cart.png";
import user from "../imgs/user.png";
import truck from "../imgs/truck.png";
import location from "../imgs/location.png";

const Navbar = ({ search, setSearch, data }) => {
  const { cart, totalItems } = useCart();
  const { authData } = useAuth();

  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (authData && authData.id) {
      setUserId(authData.id);
    }
  }, [authData]);

  const handleProceedToProfile = () => {
    if (userId) { 
      window.location.href = '/profile'
      // navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav id="navbar" className="w-full">
      {/* upper navbar */}
      {/* <div className=" bg-lightgray text-dark p-4 flex flex-col md:flex-row justify-between items-center">
        <h2 className="text-sm md:text-lg flex items-center gap-2">
          Call with us:{" "}
          <a
            target="_blank"
            href="tel:+917755821175"
            className=" hover:underline flex items-center gap-2"
            rel="noreferrer"
          >
            <Call className=" text-green-500" /> (+91) 775-582-1175
          </a>
        </h2>

        <div className=" max-md:hidden flex flex-col md:flex-row justify-between gap-5 items-center text-sm md:text-lg">
          <h2 className="flex gap-2 items-center">
            <img src={location} alt="Location" /> Our Store
          </h2>
          <h2 className="flex gap-2 items-center">
            <img src={truck} alt="track_your_order" /> Track Your Order
          </h2>
        </div>
      </div> */}
      {/* Middle Navbar */}
      <div
        id="lower-navbar"
        className="w-full bg-primary p-4 md:p-8 flex flex-col min-md:flex-row justify-between items-center"
      >
        <div className="flex justify-between items-center w-full">
          <div className="max-md:w-full flex gap-8 items-center">
            <Link to="/">
              <img
                src={logoImg}
                alt="FastSide Logo"
                style={{
                  width: "100%",
                  height: "auto",
                  maxWidth: "150px",
                  maxHeight: "150px",
                }}
              />
            </Link>
          </div>
          <div className="flex gap-4 items-center mt-4 md:mt-0">
            <button
              className="flex items-center gap-2"
              onClick={handleProceedToProfile}
            >
              <div className="flex gap-2 items-center text-white">
                <img
                  src={user}
                  alt="profile_button"
                  className="hover:scale-105  duration-300"
                />{" "}
                <p className="hidden xl:block text-sm md:text-xl">
                  {userId ? "Profile" : "Login"}
                </p>
              </div>
            </button>
            <Link to="/cart">
              <div className="flex gap-1 items-center text-white ">
                <img
                  className="hover:scale-105  duration-300"
                  src={shoppingCartImage}
                  alt="shopping-cart"
                />

                <h3 className="flex items-center justify-center  rounded-full text-center text-xs md:text-sm">
                  {totalItems}
                </h3>
                <p className="hidden xl:block text-sm md:text-lg ml-2">Cart</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
