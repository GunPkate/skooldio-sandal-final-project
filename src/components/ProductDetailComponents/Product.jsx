import React from "react";
import Carousel from "./Carousel";
import ProductDetailRight from "./ProductDetailRight";

const Product = () => {
  return (
    <div className="flex flex-col mt-10 mx-4 mb-20">
      <Carousel />
      <ProductDetailRight />
    </div>
  );
};

export default Product;
