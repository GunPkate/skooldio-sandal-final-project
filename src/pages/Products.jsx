import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
// import ProductsDetail from "../hooks/ProductDetailMock";
import Navbar from "../components/Navbar/Navbar";
import { Outlet, useLocation, useParams } from "react-router-dom";

function Products() {
  const location = useLocation();
  const productsContext = { value: "2" };
  console.log("YYY", productsContext);

  return (
    <>
      <Navbar />

      <div className="2xl:flex 2xl:h-fit 2xl:max-w-[1600px] justify-between mx-auto">
        <div className="hidden 2xl:flex 2xl:flex-col 2xl:w-[280px] 2xl:min-h-max text-secondary font-semibold px-4 gap-4">
          <h1 className="font-bold">Tops</h1>
          <p className="text-primary">Catagory</p>
          <p>Catagory</p>
          <p>Catagory</p>
          <p>Catagory</p>
          <p>Catagory</p>
        </div>
        <div className="font-poppins flex flex-col items-center w-full 2xl:w-fit px-[18px]">
          <Outlet context={{ productsContext }} key={location.pathname} />
        </div>
      </div>
    </>
  );
}

export default Products;
