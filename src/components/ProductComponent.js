import React, { useState, useEffect } from "react";
import AddToCartButton from "./MicroComponenets/AddToCartButton";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import keychain from ".././imgs/keychain.png";
import ColorShow from "./MicroComponenets/ColorShow";

const ProductComponent = ({ flex_direction, data }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const { cart } = useCart();
  const Productimage = data?.colorList[0]?.image_url;
  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const selectedProduct = {
    ...data,
    colorList: [data?.colorList[0]],
  };

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust this timeout as needed

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div
        className={`border-[1px] p-4 border-gray-400 rounded-xl flex ${
          flex_direction === "row"
            ? "flex-row items-center h-full w-full"
            : "flex-col"
        } max-w-[400px] relative animate-pulse`}
      >
        <div className="relative w-full h-[200px] overflow-hidden flex items-center justify-center bg-gray-300 rounded-xl"></div>
        <div className="flex justify-between mt-4 w-full">
          <div className="flex flex-col space-y-2 w-full">
            <div className="h-6 bg-gray-300 rounded w-3/4"></div>
            <div className="h-6 bg-gray-300 rounded w-1/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className={`border-[1px] p-4 border-gray-400 rounded-xl flex ${
          flex_direction === "row"
            ? "flex-row items-center h-full w-full"
            : "flex-col"
        } max-w-[400px] relative`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative w-full h-[200px] overflow-hidden flex items-center justify-center">
          <Link
            to={`/ProductDetails/${data?.item_id}`}
            className="w-full h-full flex items-center justify-center"
          >
            <img
              src={Productimage ? Productimage : keychain}
              alt=""
              width={200}
              height={200}
              className="rounded-xl"
            />
          </Link>
        </div>
        <div className="flex justify-between">
          <div>
            <h2 className="product-title text-primary">
              {data?.item_name?.length > 30
                ? `${data?.item_name?.slice(0, 30)}...`
                : data?.item_name}
            </h2>
            <p className="priceTitle">₹{data?.price}/-</p>
            <ColorShow item={data.colorList} />
          </div>
          <AddToCartButton item={selectedProduct} />
        </div>
      </div>
    </>
  );
};

export default ProductComponent;
