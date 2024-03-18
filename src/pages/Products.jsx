import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

// import ProductsDetail from "../hooks/ProductDetailMock";
import Navbar from "../components/Navbar/Navbar";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [catagoriesInclude, setCatagoriesInclude] = useState([]);
  const [categoriesExclude, setCategoriesExclude] = useState([]);

  const BASE_URL = "https://api.storefront.wdb.skooldio.dev/";

  useEffect(() => {
    setLoading(true);
    fetch(`${BASE_URL}products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setCatagoriesInclude(["all-ladies"]);
    setCategoriesExclude(["ladies-shoes", "ladies-accessories"]);
  }, []);

  let item = [];

  if (products) {
    item = products
      .filter((item) => {
        return catagoriesInclude.some((category) =>
          item.categories.includes(category)
        );
      })
      .filter((item) => {
        return !categoriesExclude.some((category) =>
          item.categories.includes(category)
        );
      })
      .map((item, index) => <ProductCard key={index} {...item} />);
  }

  return <>
    <Navbar/>
    {!loading ? (<>
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
        <header>
          <div className="my-6 mb-[22px] w-[340px] 2xl:flex 2xl:items-center 2xl:justify-between 2xl:mb-16 2xl:w-[1190px]">
            <h1 className="text-[32px] font-bold w-full text-center mb-10 2xl:w-auto 2xl:my-0 2xl:text-4xl">
              Woman's Cloth
            </h1>
            <div className="relative flex w-auto justify-end items-center">
              <p className="font-semibold mr-2">Sort by</p>
              <button onClick={() => setFilterOpen(!filterOpen)}>
                <img src="../src/assets/Filter.svg" />
              </button>
            </div>
          </div>
          {filterOpen ? (
            <div className="w-full py-2 px-4 bg-white">
              <ul class="grid w-full gap-6 lg:grid-cols-3 lg:gap-y-2">
                {[...Array(5)].map((value, index) => (
                  <li className="py-3 px-6 w-full hover:bg-primary-300 rounded-md text-center cursor-pointer">
                    <input
                      type="checkbox"
                      id={`filter${index}`}
                      value=""
                      className="hidden"
                      required=""
                    />
                    <label for={`filter${index}`} className="font-semibold">
                      Filter {index + 1}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </header>
        <div className="flex w-[370px] lg:ml-auto h-10 font-bold text-xl justify-end mb-4">
          <h2>Found {item.length}</h2>
        </div>
        {item.length > 0 ? (
          <section className="2xl:grid grid-cols-3 gap-x-10 gap-y-[60px] mb-40">
            {item}
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
  )
  }
  </>
}

export default Products;
