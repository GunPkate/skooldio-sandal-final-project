import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
// import ProductsDetail from "../hooks/ProductDetailMock";
import Navbar from "../components/Navbar/Navbar";
import { Outlet, useParams } from "react-router-dom";

function Products() {

  const { Categories} = useParams();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const BASE_URL = "https://api.storefront.wdb.skooldio.dev/products?categories="+Categories;

  useEffect(() => {
    setLoading(true);
    fetch(`${BASE_URL}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("data",JSON.stringify(Object.keys(data.data[0])))
        setProducts(data.data);
        setLoading(false);
      });
  }, []);

  const productsContext = {products,loading}
  console.log("YYY",productsContext)
  return <>
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
        <Outlet context={{productsContext}}/>
      </div>
    </div>
  </>


}

export default Products;
