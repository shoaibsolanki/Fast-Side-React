import React, { useState } from "react";
import { useCart } from "../../contexts/CartContext";
import { Remove } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
<<<<<<< HEAD

=======
import { useAuth } from "../../contexts/AuthConext";
>>>>>>> c246d75f4c1329d84a858c6203b2d6bc78fe504c
const ItemsShowInSide = ({ items }) => {
  const { totalPrice, handleIncrease, handleDecrease, cart } = useCart();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(totalPrice);
const {isAuthenticated}=useAuth()
  const handleApplyCoupon = () => {};

  const handleRemoveCoupon = () => {
    setDiscount(0);
  };
  console.log(items);
  console.log("without login cart", cart);
  return (
    <div className="my-4 w-full md:w-[500px] h-full mx-auto border border-gray-300 p-6 rounded-md text-dark">
      <h2 className="text-lg font-semibold mb-4">Order summary</h2>
      <div className="space-y-4">
        {items?.map((item, index) => {
          return (
            <div className="flex items-center space-x-4" key={index}>
              <img
<<<<<<< HEAD
                src={item.image_url ? item.image_url : item.image_name1}
=======
              src={
                isAuthenticated
                  ? item?.image_url
                    ? item?.image_url
                    : "/default-image.jpg"
                  : item?.colorList?.length > 0 && item?.colorList[0].image_url
              }
>>>>>>> c246d75f4c1329d84a858c6203b2d6bc78fe504c
                alt="Badge Reel"
                width={50}
                height={50}
              />
              <div className="flex-1">
                <h3 className="font-semibold">
                  {item.itemName
                    ? item.itemName?.slice(0, 30)
                    : item.item_name?.slice(0, 30)}
                  {item.itemName?.length > 30 ? "..." : ""}
                </h3>
                <p>Color: {item.image_name}</p>
              </div>
              <div>
                <p className="font-semibold">Rs {item.price}.00</p>
                <div className="flex items-center space-x-2 mt-2">
                  <button className="p-1 " onClick={() => handleDecrease(item)}>
                    <Remove />
                  </button>
                  <span>{item.product_qty}</span>
                  <button className="p-1 " onClick={() => handleIncrease(item)}>
                    <AddIcon />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        <div className="flex justify-between text-sm">
          <p>Shipping</p>
          <p>Free</p>
        </div>

        <div className="flex justify-between text-sm">
          <p>Subtotal</p>
          <p>Rs {totalPrice}</p>
        </div>

        <div className="flex justify-between text-lg font-semibold">
          <p>Total</p>
          <p>Rs {totalPrice - discount}.00</p>
        </div>
      </div>
    </div>
  );
};

export default ItemsShowInSide;
