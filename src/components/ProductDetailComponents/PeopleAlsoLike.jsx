import React, { useState, useEffect } from "react";
import ProductCard from "../ProductCard";
import LoadingSpinner from "../LoadingSpinner";

const PeopleAlsoLike = (data) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);


//   curl --request GET \
  const BASE_URL = "https://api.storefront.wdb.skooldio.dev/";

  useEffect(() => {
    setLoading(true);
    fetch(`${BASE_URL}products?categories=${data.categories[data.categories.length-1]}`)
      .then((res) => res.json())
      .then((data) => {
        
        // Randomly select 4 products
        const shuffled = [...data.data].sort(() => 0.5 - Math.random());
        setProducts(shuffled.slice(0, 4));
        setLoading(false);
      });
  }, []);

  return (
    <div className="mt-20 flex flex-col gap-8">
      <h1 className="text-4xl font-bold">People Also Like</h1>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex flex-col items-center gap-8 justify-around desktop:flex-row">
          {" "}
          {/* Use flexbox to arrange cards in a row */}
          {products.map((item, index) => (
            <ProductCard key={index} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PeopleAlsoLike;
