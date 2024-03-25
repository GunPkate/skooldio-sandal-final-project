import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function Products() {
  const location = useLocation();
  const productsContext = { value: "2" };

  const [accordianOpen, setAccordianOpen] = useState("shirt");

  return (
    <>
      <Navbar />

      <div className="2xl:flex h-[100vh] 2xl:max-w-[1600px] justify-between mx-auto">
        {/* accordian */}
        <div className="hidden 2xl:flex 2xl:flex-col 2xl:w-[280px] 2xl:min-h-max text-secondary font-semibold px-4 gap-0 pt-24 join join-vertical w-full sticky top-0">
          <h2 className="text-[32px] font-extrabold mt-10 mb-16">Ladies</h2>
          <div className="collapse collapse-arrow join-item">
            <input
              type="radio"
              name="my-accordion-4"
              defaultChecked={accordianOpen === "shirt" ? true : false}
              onClick={() => setAccordianOpen("Shirt")}
            />
            <div className="collapse-title text-lg font-semibold">Shirt</div>
            <div className="collapse-content border-solid border-b-[1px] border-secondary-300">
              <div className="h-10 text-[14px] active:bg-primary flex items-center px-[10px]">
                <a href="">All-Shirt</a>
              </div>
              <div className="h-10 text-[14px] active:bg-primary flex items-center px-[10px]">
                <a href="">T-Shirt</a>
              </div>
              <div className="h-10 text-[14px] active:bg-primary flex items-center px-[10px]">
                <a href="">Shorts</a>
              </div>
              <div className="h-10 text-[14px] active:bg-primary flex items-center px-[10px]">
                <a href="">Polo</a>
              </div>
              <div className="h-10 text-[14px] active:bg-primary flex items-center px-[10px]">
                <a href="">Formal</a>
              </div>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item">
            <input
              type="radio"
              name="my-accordion-4"
              defaultChecked={accordianOpen === "shoes" ? true : false}
              onClick={() => setAccordianOpen("shoes")}
            />
            <div className="collapse-title text-lg font-semibold">Shoes</div>
            <div className="collapse-content border-solid border-b-[1px] border-secondary-300">
              <div className="h-10 text-[14px] active:bg-primary flex items-center px-[10px]">
                <a href="">All-Shoes</a>
              </div>
              <div className="h-10 text-[14px] active:bg-primary flex items-center px-[10px]">
                <a href="">Sneaker</a>
              </div>
              <div className="h-10 text-[14px] active:bg-primary flex items-center px-[10px]">
                <a href="">Formal</a>
              </div>
              <div className="h-10 text-[14px] active:bg-primary flex items-center px-[10px]">
                <a href="">Boots</a>
              </div>
              <div className="h-10 text-[14px] active:bg-primary flex items-center px-[10px]">
                <a href="">Sandals</a>
              </div>
              <div className="h-10 text-[14px] active:bg-primary flex items-center px-[10px]">
                <a href="">Flip-Flops</a>
              </div>
              <div className="h-10 text-[14px] active:bg-primary flex items-center px-[10px]">
                <a href="">Slippers</a>
              </div>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item">
            <input
              type="radio"
              name="my-accordion-4"
              defaultChecked={accordianOpen === "accessories" ? true : false}
              onClick={() => setAccordianOpen("accessories")}
            />
            <div className="collapse-title text-lg font-semibold">
              Accessories
            </div>
            <div className="collapse-content border-solid border-b-[1px] border-secondary-300">
              <div className="h-10 text-[14px] active:bg-primary flex items-center"></div>
              <div className="h-10 text-[14px] active:bg-primary flex items-center px-[10px]">
                <a href="">All-Accessories</a>
              </div>
              <div className="h-10 text-[14px] active:bg-primary flex items-center px-[10px]">
                <a href="">Wallets</a>
              </div>
              <div className="h-10 text-[14px] active:bg-primary flex items-center px-[10px]">
                <a href="">Belts</a>
              </div>
              <div className="h-10 text-[14px] active:bg-primary flex items-center px-[10px]">
                <a href="">Handbags</a>
              </div>
              <div className="h-10 text-[14px] active:bg-primary flex items-center px-[10px]">
                <a href="">Wallets</a>
              </div>
              <div className="h-10 text-[14px] active:bg-primary flex items-center px-[10px]">
                <a href="">Belts</a>
              </div>
              <div className="h-10 text-[14px] active:bg-primary flex items-center px-[10px]">
                <a href="">Handbags</a>
              </div>
            </div>
          </div>
        </div>

        {/* product list */}
        <Outlet context={{ productsContext }} key={location.pathname} />
      </div>
    </>
  );
}

export default Products;
