import React from "react";
import Carousel from "./Carousel";
import ProductDetailRight from "./ProductDetailRight";

const Product = () => {
  return (
    <div className="flex mt-28 mx-40 mb-36">
      <Carousel />
      <ProductDetailRight />
    </div>
  );
};

export default Product;
