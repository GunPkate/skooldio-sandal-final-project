import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";


const ProductsByCategories = () => {
    const { Categories, Name } = useParams();
    const [filterOpen, setFilterOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
  
    const [catagoriesInclude, setCatagoriesInclude] = useState([]);
    const [categoriesExclude, setCategoriesExclude] = useState([]);
  
  
    const BASE_URL = "https://api.storefront.wdb.skooldio.dev/products?categories="+Categories;
  
    useEffect(() => {
      setLoading(true);
      fetch(`${BASE_URL}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("data",data.data)
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
    // console.log(Categories)
    return (
        <>
        {!loading ? 
            (<>
                <header>
                    <div className="my-6 mb-[22px] w-[340px] 2xl:flex 2xl:items-center 2xl:justify-between 2xl:mb-16 2xl:w-[1190px]">
                        <h1 className="text-[32px] font-bold w-full text-center mb-10 2xl:w-auto 2xl:my-0 2xl:text-4xl">
                        {Name}
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
                        <ul className="grid w-full gap-6 lg:grid-cols-3 lg:gap-y-2">
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
                {/* <div className="flex w-[370px] lg:ml-auto h-10 font-bold text-xl justify-end mb-4">
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
                )} */}

            </>) : (
                <>Loading</>
            )
        }
        </>
    )
}

export default ProductsByCategories;