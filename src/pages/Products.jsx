import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

import ProductsDetail from "../hooks/ProductDetailMock";

function Products() {
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    setProducts(ProductsDetail);
    setLoading(false);
  }, []);

  return !loading ? (
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
            <button onClick={() => setFilterOpen(true)}>
              {filterOpen ? (
                <>
                  <img src="src/assets/Filter.svg" />
                  <div className="absolute top-0 right-0 z-10 w-fit h-fit py-2 px-4 bg-white">
                    <ul className="gap-2">
                      <li className="my-2 mx-4">
                        <a href="#" onClick={() => setFilterOpen(false)}>
                          Filter 1
                        </a>
                      </li>
                      <li className="my-2">Filter 2</li>
                      <li className="my-2">Filter 3</li>
                      <li className="my-2">Filter 4</li>
                      <li className="my-2">Filter 5</li>
                    </ul>
                  </div>
                </>
              ) : (
                <img src="src/assets/Filter.svg" />
              )}
            </button>
          </div>
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
  ) : (
    <>Loading</>
  );
}

export default Products;
