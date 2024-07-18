import React from "react";
import BadgeReels from ".././imgs/coverPosterImage.jpg";
import ImageSwitchProduct from "./ImageSwitchProduct";
import ProductComponent from "./ProductComponent";
const SaleComponenet = () => {
  return (
    <div className="relative border-primary border-[1px] p-2 my-4 w-full md:w-auto rounded-xl">
      <img
        className="rounded-xl"
        src={BadgeReels}
        objectFit="contain"
        alt=""
      />
    </div>
  );
};

export default SaleComponenet;
