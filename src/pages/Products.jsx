import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar/Navbar";
import { Drawer } from "vaul";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const [filterSelect, setFilterSelect] = useState("");

  const pId = "all-ladies";
  const BASE_URL =
    "https://api.storefront.wdb.skooldio.dev/products?categories=" + pId;

  useEffect(() => {
    setLoading(true);
    fetch(`${BASE_URL}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
        setLoading(false);
      });
  }, []);

  const priceAsc = (a, b) => {
    return b.promotionalPrice - a.promotionalPrice;
  };

  const priceDesc = (a, b) => {
    return a.promotionalPrice - b.promotionalPrice;
  };

  const ratingDesc = (a, b) => {
    console.log("a", a.ratings, "b", b.ratings);
    return a.ratings - b.ratings;
  };

  const sortedProduct = (item, filter) => {
    if (filter === "Price - Low to high") {
      return item.sort(priceAsc);
    } else if (filter === "Price - High to low") {
      return item.sort(priceDesc);
    } else if (filter === "Rating") {
      return item.sort(ratingDesc);
    } else {
      return item;
    }
  };

  let item = [];

  if (products) {
    item = products.map((item, index) => {
      return <ProductCard key={index} {...item} />;
    });
  }

  useEffect(() => {
    setProducts(sortedProduct(products, filterSelect));
  }, [filterSelect]);

  useEffect(() => {
    item = products.map((item, index) => <ProductCard key={index} {...item} />);
  }, [products]);

  return (
    <>
      <Navbar />
      {!loading ? (
        <div className="flex justify-center">
          <div className="lg:flex lg:h-fit lg:max-w-[1600px] 2xl:justify-between px-auto pt-24">
            <div className="hidden 2xl:flex lg:flex-col lg:w-[280px] lg:min-h-max text-secondary font-semibold px-4 gap-4">
              <h1 className="font-bold">Tops</h1>
              <p className="text-primary">Catagory</p>
              <p>Catagory</p>
              <p>Catagory</p>
              <p>Catagory</p>
              <p>Catagory</p>
            </div>
            <div className="font-poppins flex flex-col items-center w-full lg:w-fit px-[18px]">
              <header className="lg:w-full">
                <div className="my-6 mb-[22px] w-[340px] lg:flex lg:items-center lg:justify-between lg:mb-16 lg:w-full ">
                  <h1 className="text-[32px] font-bold w-full text-center mb-10 lg:my-0 lg:text-4xl lg:mr-auto lg:w-fit">
                    Woman's Cloth
                  </h1>
                  <Drawer.Root>
                    <Drawer.Trigger className="lg:hidden flex items-center justify-end w-full">
                      Sort By <img src="../src/assets/Filter.svg" />
                    </Drawer.Trigger>
                    <Drawer.Portal>
                      <Drawer.Content>
                        <p>Sort By</p>
                      </Drawer.Content>
                      <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                      <Drawer.Content className="bg-zinc-100 flex flex-col rounded-t-[10px] mt-24 fixed bottom-0 left-0 right-0">
                        <div>
                          <h2>Sort By</h2>
                          <ul className="dropdown-content z-20 menu p-2 shadow bg-base-100 rounded-none w-52 hover:bg-white active:bg-white focus:bg-white">
                            <li
                              className="rounded-none bg-white hover:bg-white active:bg-white focus:bg-white"
                              onClick={() => {
                                return setFilterSelect("Price - Low to high");
                              }}
                            >
                              <a>
                                {filterSelect === "Price - Low to high" ? (
                                  <img src="../src/assets/radioSelected.svg" />
                                ) : (
                                  <img src="../src/assets/radioUnselected.svg" />
                                )}
                                Price - Low to high
                              </a>
                            </li>
                            <li
                              className="rounded-none"
                              onClick={() => {
                                return setFilterSelect("Price - High to low");
                              }}
                            >
                              <a>
                                {filterSelect === "Price - High to low" ? (
                                  <img src="../src/assets/radioSelected.svg" />
                                ) : (
                                  <img src="../src/assets/radioUnselected.svg" />
                                )}
                                Price - High to low
                              </a>
                            </li>
                            <li
                              className="rounded-none"
                              onClick={() => {
                                return setFilterSelect("Rating");
                              }}
                            >
                              <a>
                                {filterSelect === "Rating" ? (
                                  <img src="../src/assets/radioSelected.svg" />
                                ) : (
                                  <img src="../src/assets/radioUnselected.svg" />
                                )}
                                Rating
                              </a>
                            </li>
                          </ul>
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
                        src="../src/assets/chevron.svg"
                        className={filterOpen ? "rotate-180" : "rotate-0"}
                      />
                    </summary>
                    <ul className="dropdown-content z-20 menu p-2 shadow bg-base-100 rounded-none w-52 hover:bg-white active:bg-white focus:bg-white">
                      <li
                        className="rounded-none bg-white hover:bg-white active:bg-white focus:bg-white"
                        onClick={() => {
                          return setFilterSelect("Price - Low to high");
                        }}
                      >
                        <a>
                          {filterSelect === "Price - Low to high" ? (
                            <img src="../src/assets/radioSelected.svg" />
                          ) : (
                            <img src="../src/assets/radioUnselected.svg" />
                          )}
                          Price - Low to high
                        </a>
                      </li>
                      <li
                        className="rounded-none"
                        onClick={() => {
                          return setFilterSelect("Price - High to low");
                        }}
                      >
                        <a>
                          {filterSelect === "Price - High to low" ? (
                            <img src="../src/assets/radioSelected.svg" />
                          ) : (
                            <img src="../src/assets/radioUnselected.svg" />
                          )}
                          Price - High to low
                        </a>
                      </li>
                      <li
                        className="rounded-none"
                        onClick={() => {
                          return setFilterSelect("Rating");
                        }}
                      >
                        <a>
                          {filterSelect === "Rating" ? (
                            <img src="../src/assets/radioSelected.svg" />
                          ) : (
                            <img src="../src/assets/radioUnselected.svg" />
                          )}
                          Rating
                        </a>
                      </li>
                    </ul>
                  </details>
                </div>
              </header>
              {/* <div className="flex w-[340px] lg:ml-auto h-10 font-bold text-xl justify-end mb-4">
                <h2>Found {item.length}</h2>
              </div> */}
              {item.length > 0 ? (
                <section className="lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-[60px] mb-40">
                  {item}
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

export default Products;
