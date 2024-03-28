import React, { useState, useEffect } from "react";
import ProductCard from "../ProductCard";
import LoadingSpinner from "../LoadingSpinner";

const PeopleAlsoLike = (data) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const BASE_URL = "https://api.storefront.wdb.skooldio.dev/";

  useEffect(() => {
    fetch(`${BASE_URL}products`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch products. Please try again later.");
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div><LoadingSpinner /></div>;
  }

  const shuffledProducts = [...products].sort(() => Math.random() - 0.5);

  const topProducts = shuffledProducts.slice(0, 4);
  const items = topProducts.map((item) => <ProductCard key={item.id} {...item} />);

  return (
    <>
      <div className="flex flex-col items-center lg:items-start font-bold mt-[80px] lg:mt-[180px] lg:mt-45 min-w-[351px]">
        <p className="text-[32px] font-bold mb-16">People also like these</p>
        <div className="grid grid-cols-1 lg:mb-[130px] gap-y-10 lg:grid-cols-2 xl:grid-cols-4 md:gap-x-10 md:gap-y-[60px]">
          {items}
        </div>
      </div>
    </>
  );
};

export default PeopleAlsoLike;
