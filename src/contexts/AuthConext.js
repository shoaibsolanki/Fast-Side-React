import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import DataService from "../services/requestApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [allOrders, setAllOrders] = useState();
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  const [authData, setAuthData] = useState(() => {
    const storedAuthData = JSON.parse(localStorage.getItem("authData"));
    if (storedAuthData) {
      return storedAuthData;
    } else {
      return { token: null, user: null };
    }
  });
  const { id, saasId, storeId } = authData;
  const isAuthenticated = Cookies.get("authToken");
  console.log("isAuthenticated", isAuthenticated);
  const fetchProductApi = async () => {
    try {
      const response = await DataService.FetchProductApi("33001", "33", "1");
      return response.data;
    } catch (error) {
      console.error("product fetch", error);
      throw new Error(error);
    }
  };

  const fetchAndSetProducts = async () => {
    try {
      const productsData = await fetchProductApi();
      const updatedProducts = productsData.data.map((item) => ({
        ...item,
        new_price: item.price,
      }));
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  const getOrderHistory = async (storeId, saasId, id) => {
    try {
      const response = await DataService.OrderHistory(storeId, saasId, id);
      const reversedOrders = response.data.data.slice().reverse();
      setAllOrders(reversedOrders);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(allOrders);
  useEffect(() => {
    if(storeId,saasId,id){
      getOrderHistory(storeId, saasId, id);
    }
  }, [id]);

  useEffect(() => {
    fetchAndSetProducts();
  }, []);

  useEffect(() => {
    const storedAuthData = JSON.parse(localStorage.getItem("authData"));
    if (storedAuthData) {
      setAuthData(storedAuthData);
    }
  }, []);

  const login = (data, token) => {
    setAuthData(data);
    localStorage.setItem("authData", JSON.stringify(data));
    Cookies.set("authToken", token, { expires: 7 });
  };

  const logout = () => {
    console.log("Logged Out");
    setAuthData({ token: null, user: null });
    localStorage.removeItem("authData");
    localStorage.clear();
    Cookies.remove("authToken");
    window.location.reload();
  };

  return (
    <AuthContext.Provider
      value={{
        authData,
        isAuthenticated,
        allOrders,
        id,
        login,
        logout,
        products,
        setProducts,
        fetchAndSetProducts,
        isPaymentSuccessful,
        setIsPaymentSuccessful,
        getOrderHistory,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
