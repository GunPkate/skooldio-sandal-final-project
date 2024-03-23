import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar/Navbar";
import { Drawer } from "vaul";
import { useParams } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState("");
  const [filterSelect, setFilterSelect] = useState("Price - Low to high");
  const { Categories, Name } = useParams();

  console.log(Categories);

  const BASE_URL =
    "https://api.storefront.wdb.skooldio.dev/products?categories=" + Categories;

  useEffect(() => {
    setLoading(true);
    fetch(`${BASE_URL}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(sortedProduct(data.data, filterSelect));
        setLoading(false);
      });
  }, []);

  const priceAsc = (a, b) => {
    return a.promotionalPrice - b.promotionalPrice;
  };

  const priceDesc = (a, b) => {
    return b.promotionalPrice - a.promotionalPrice;
  };

  const ratingDesc = (a, b) => {
    return b.ratings - a.ratings;
  };

  const sortedProduct = (items, filter) => {
    if (filter === "Price - Low to high") {
      return items.sort(priceAsc);
    } else if (filter === "Price - High to low") {
      return items.sort(priceDesc);
    } else if (filter === "Rating") {
      return items.sort(ratingDesc);
    } else {
      return items;
    }
  };

  const handleFilterSelect = (filter) => {
    setFilterSelect(filter);
    setFilterOptions(filter);
    const sorted = sortedProduct(products, filter);
    setProducts(sorted);
  };

  return (
    <>
      {!loading ? (
        <div className="flex justify-center">
          <div className="lg:flex lg:h-fit lg:max-w-[1600px] 2xl:justify-between px-auto pt-24">
            <div className="font-poppins flex flex-col items-center w-full lg:w-fit px-[18px]">
              <header className="lg:w-full">
                <div className="my-6 mb-[22px] w-[370px] lg:flex lg:items-center lg:justify-between lg:mb-16 lg:w-full ">
                  <h1 className="text-[32px] font-bold w-full text-center mb-10 lg:my-0 lg:text-4xl lg:mr-auto lg:w-fit">
                    {Name}
                  </h1>
                  <Drawer.Root>
                    <Drawer.Trigger className="lg:hidden flex items-center justify-end w-full">
                      Sort By <img src="../../src/assets/Filter.svg" />
                    </Drawer.Trigger>
                    <Drawer.Portal>
                      <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                      <Drawer.Content className="bg-zinc-100 flex flex-col rounded-t-[10px] mt-24 fixed bottom-0 left-0 right-0">
                        <div className="flex flex-col w-full bg-white items-center px-[18px] pb-8 rounded-xl">
                          <div className="flex justify-between w-full py-8 text-info text-[16px]">
                            <Drawer.Trigger>Cancel</Drawer.Trigger>
                            <h2 className="font-semibold text-lg text-black">
                              Sort By
                            </h2>
                            <button
                              onClick={() =>
                                handleFilterSelect("Price - Low to high")
                              }
                            >
                              Reset
                            </button>
                          </div>
                          <ul className="menu rounded-none w-full p-0 gap-6 mb-6">
                            <li
                              className="rounded-none bg-white hover:bg-white active:bg-white focus:bg-white"
                              onClick={() =>
                                setFilterOptions("Price - Low to high")
                              }
                            >
                              <a className="p-0 active:!bg-white active:!text-primary-700">
                                {filterOptions === "Price - Low to high" ? (
                                  <img src="../../src/assets/radioSelected.svg" />
                                ) : (
                                  <img src="../../src/assets/radioUnselected.svg" />
                                )}
                                Price - Low to high
                              </a>
                            </li>
                            <li
                              className="rounded-none"
                              onClick={() =>
                                setFilterOptions("Price - High to low")
                              }
                            >
                              <a className="p-0 active:!bg-white active:!text-primary-700">
                                {filterOptions === "Price - High to low" ? (
                                  <img src="../../src/assets/radioSelected.svg" />
                                ) : (
                                  <img src="../../src/assets/radioUnselected.svg" />
                                )}
                                Price - High to low
                              </a>
                            </li>
                            <li
                              className="rounded-none"
                              onClick={() => setFilterOptions("Rating")}
                            >
                              <a className="p-0 active:!bg-white active:!text-primary-700">
                                {filterOptions === "Rating" ? (
                                  <img src="../../src/assets/radioSelected.svg" />
                                ) : (
                                  <img src="../../src/assets/radioUnselected.svg" />
                                )}
                                Rating
                              </a>
                            </li>
                          </ul>
                          <button
                            className="bg-black text-white py-[17px] px-auto w-full"
                            onClick={() => handleFilterSelect(filterOptions)}
                          >
                            Apply
                          </button>
                        </div>
                      </Drawer.Content>
                    </Drawer.Portal>
                  </Drawer.Root>

                  <details className="hidden lg:block dropdown dropdown-bottom dropdown-end ">
                    <summary
                      tabIndex={0}
                      role="button"
                      className="btn m-1 rounded-none border-solid border-primary-700 bg-white gap-0 hover:bg-white hover:border-primary focus:bg-white focus:border-primary-700"
                      onClick={() => setFilterOpen(!filterOpen)}
                    >
                      Sort By
                      <img
                        src="../../src/assets/chevron.svg"
                        className={filterOpen ? "rotate-180" : "rotate-0"}
                      />
                    </summary>
                    <ul className="dropdown-content z-20 menu p-2 shadow bg-base-100 rounded-none w-52 hover:bg-white active:bg-white focus:bg-white">
                      <li
                        className="rounded-none bg-white hover:bg-white active:bg-white focus:bg-white"
                        onClick={() =>
                          handleFilterSelect("Price - Low to high")
                        }
                      >
                        <a>
                          {filterSelect === "Price - Low to high" ? (
                            <img src="../../src/assets/radioSelected.svg" />
                          ) : (
                            <img src="../../src/assets/radioUnselected.svg" />
                          )}
                          Price - Low to high
                        </a>
                      </li>
                      <li
                        className="rounded-none"
                        onClick={() =>
                          handleFilterSelect("Price - High to low")
                        }
                      >
                        <a>
                          {filterSelect === "Price - High to low" ? (
                            <img src="../../src/assets/radioSelected.svg" />
                          ) : (
                            <img src="../../src/assets/radioUnselected.svg" />
                          )}
                          Price - High to low
                        </a>
                      </li>
                      <li
                        className="rounded-none"
                        onClick={() => handleFilterSelect("Rating")}
                      >
                        <a>
                          {filterSelect === "Rating" ? (
                            <img src="../../src/assets/radioSelected.svg" />
                          ) : (
                            <img src="../../src/assets/radioUnselected.svg" />
                          )}
                          Rating
                        </a>
                      </li>
                    </ul>
                  </details>
                </div>
              </header>
              {products.length > 0 ? (
                <section className="grid grid-cols-1 gap-y-10 lg:grid-cols-2 xl:grid-cols-3 md:gap-x-10 md:gap-y-[60px] mb-40">
                  {products.map((items, index) => {
                    return <ProductCard key={index} {...items} />;
                  })}
                </section>
              ) : (
                <div className="flex w-full h-[800px] py-auto justify-center items-center">
                  <p>No item found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>Loading</>
      )}
    </>
  );
}
