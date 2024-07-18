
import React, { useEffect, useState } from "react";
import Rating from "../components/Rating";
import { Check } from "@mui/icons-material";
import DataService from "../services/requestApi";
import { useCart } from "../contexts/CartContext";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { addToCart } = useCart();
  const { item_id } = useParams();
  const id = item_id;
  const [singleProduct, setSingleProduct] = useState(null);
  const [index, setIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [mainImage, setMainImage] = useState("");

  const fetchSingleProduct = async (id) => {
    try {
      const response = await DataService.FetchSingleProduct(id);
      const productData = response.data.data;
      setSingleProduct({ ...productData, product_qty: 1 });
      setSelectedColor(productData?.colorList[0]?.product_color);
      setMainImage(productData?.colorList[0]?.image_url);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(singleProduct);

  useEffect(() => {
    if (id) {
      fetchSingleProduct(id);
    }
  }, [id]);

  const handleColorClick = (color, index) => {
    setIndex(index);
    setSelectedColor(color);
    setMainImage(singleProduct?.colorList[index]?.image_url);
  };

  const handleSubImageClick = (url) => {
    setMainImage(url);
  };

  const handleAddToCart = () => {
    const selectedProduct = {
      ...singleProduct,
      colorList: [singleProduct?.colorList[index]],
      new_price: singleProduct.price,
    };

    addToCart(selectedProduct);
  };

  const addQty = () => {
    setSingleProduct((prevProduct) => ({
      ...prevProduct,
      product_qty: prevProduct.product_qty + 1,
    }));
  };

  const decQty = () => {
    setSingleProduct((prevProduct) => ({
      ...prevProduct,
      product_qty: Math.max(1, prevProduct.product_qty - 1),
    }));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      // Ensure the value is a valid number
      setSingleProduct((prevProduct) => ({
        ...prevProduct,
        product_qty: value === "" ? "" : Math.max(1, parseInt(value)),
      }));
    }
  };

  const handleBlur = () => {
    if (singleProduct.product_qty === "") {
      setSingleProduct((prevProduct) => ({
        ...prevProduct,
        product_qty: 1,
      }));
    }
  };

  return (
    <section className="container mx-auto my-8 p-4">
      <div className="flex flex-col lg:flex-row gap-8 justify-center items-start">
        <div className="flex flex-col items-center w-full lg:w-auto">
          <div
            className=" w-full sm:w-[500px] h-auto mb-4 flex items-center justify-center"
            id="main-image"
          >
            {mainImage && (
              <div className="">
                <img
                  alt="product image"
                  src={mainImage}
                  width={500}
                  height={500}
                  layout="responsive"
                  objectFit="cover"
                  className="rounded-xl sm:object-contain"
                />

                <div className="flex gap-4 mt-4 mx-auto flex-wrap">
                  {singleProduct?.colorList[index]?.subimage_url && (
                    <img
                      alt="subimage"
                      width={100}
                      height={100}
                      src={singleProduct?.colorList[index]?.subimage_url}
                      className={`cursor-pointer ${
                        mainImage ===
                        singleProduct?.colorList[index]?.subimage_url
                          ? "border-2 border-primary p-1"
                          : ""
                      } mx-auto`}
                      onClick={() =>
                        handleSubImageClick(
                          singleProduct?.colorList[index]?.subimage_url
                        )
                      }
                    />
                  )}
                  {singleProduct?.colorList[index]?.image_url && (
                    <img
                      alt="main image thumbnail"
                      width={100}
                      height={100}
                      src={singleProduct?.colorList[index]?.image_url}
                      className={`cursor-pointer ${
                        mainImage === singleProduct?.colorList[index]?.image_url
                          ? "border-2 border-blue-500"
                          : ""
                      } mx-auto`}
                      onClick={() =>
                        handleSubImageClick(
                          singleProduct?.colorList[index]?.image_url
                        )
                      }
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col max-w-full lg:max-w-lg w-full">
          {singleProduct && (
            <>
              <h2 className="text-3xl text-primary font-semibold mb-4">
                {singleProduct.item_name} ({selectedColor})
              </h2>
              <p className="text-2xl font-bold text-gray-700 mb-4">
                Rs {singleProduct.price}
              </p>
              <Rating />
              <h2 className="text-lg text-black font-semibold flex items-center my-2">
                Availability:
                <span className="text-green-500 flex items-center ml-2">
                  <Check /> In stock
                </span>
              </h2>

              <div className="flex items-center gap-4 my-4">
                Color:
                {singleProduct?.colorList?.map((el, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleColorClick(el?.product_color, idx)}
                    className={`w-[20px] h-[20px] cursor-pointer rounded-full border-2 border-gray-300 ${
                      el?.product_color === selectedColor ? "border-black" : ""
                    }`}
                    style={{
                      background: el?.product_color.toLowerCase(),
                    }}
                  ></div>
                ))}
              </div>

              <div className="flex items-center gap-4 my-4">
                Quantity:
                <div className="bg-gray-200 flex items-center border">
                  <button className="px-3 border-r" onClick={decQty}>
                    -
                  </button>
                  <input
                    type="text"
                    className="w-12 text-center px-3 bg-white text-dark"
                    value={singleProduct.product_qty}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                  />
                  <button className="px-3 border-l" onClick={addQty}>
                    +
                  </button>
                </div>
              </div>
              <div className="flex gap-4 my-6 flex-wrap justify-center lg:justify-start">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-yellow-500 text-white px-6 py-2 shadow hover:bg-yellow-600 transition"
                >
                  Add to cart
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-center mt-8 gap-4 flex-wrap">
        <button className="btn-second">Description</button>
        <button className="text-white border-[1px] bg-primary px-8 py-4 rounded-xl">
          Reviews
        </button>
      </div>
    </section>
  );
};

export default ProductDetails;
