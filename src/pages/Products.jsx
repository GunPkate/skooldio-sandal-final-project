import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

import ProductsDetail from "../hooks/ProductDetailMock";
import Navbar from "../components/Navbar/Navbar";

function Products() {
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    setProducts(ProductsDetail);
    setLoading(false);
  }, []);

  return !loading ? (<>
    <Navbar/>
    <div className="2xl:flex 2xl:h-fit 2xl:max-w-[1600px] justify-between mx-auto pt-24">
      <div className="hidden 2xl:flex 2xl:flex-col 2xl:w-[280px] 2xl:min-h-max text-secondary font-semibold px-4 gap-4">
        <h1 className="font-bold">Tops</h1>
        <p className="text-primary">Catagory</p>
        <p>Catagory</p>
        <p>Catagory</p>
        <p>Catagory</p>
        <p>Catagory</p>
      </div>
      <div className="font-poppins flex flex-col items-center w-full 2xl:w-fit px-[18px]">
        <header className="my-6 mb-[22px] w-[340px] 2xl:flex 2xl:items-center 2xl:justify-between 2xl:mb-16 2xl:w-[1190px]">
          <h1 className="text-[32px] font-bold w-full text-center mb-10 2xl:w-auto 2xl:my-0 2xl:text-4xl">
            Woman's Cloth
          </h1>
          <div className="relative flex w-auto justify-end items-center">
            <p className="font-semibold mr-2">Sort by</p>
            <button onClick={() => setFilterOpen(!filterOpen)}>
              <img src="src/assets/Filter.svg" />
            </button>
          </div>
          {filterOpen ? (
            <div className="w-full py-2 px-4 bg-white">
              <ul className="flex flex-col w-full gap-2 text-center">
                {[...Array(5)].map((value, index) => (
                  <li className="py-2 px-4 w-full hover:bg-primary-300 rounded-md">
                    <a href="#">Filter {index + 1}</a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </header>
        {products.length > 0 ? (
          <section className="2xl:grid grid-cols-3 gap-x-10 gap-y-[60px] mb-40">
            {products.map((item, index) => (
              <ProductCard key={index} {...item} />
            ))}
          </section>
        ) : (
          <div className="flex w-full h-[800px] py-auto justify-center items-center">
            <p>No item found</p>
          </div>
        )}
      </div>
    </div>
  </>) : (
    <>Loading</>
  );
}

export default Products;
