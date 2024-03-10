const ProductsDetail = [
  {
    name: "Item1",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    description: "Product description",
    rating: 3,
    discount: true,
    originalPrice: 2000,
    price: 1000,
  },
  {
    name: "Item2",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    description: "Product description",
    rating: 4,
    discount: false,
    originalPrice: 2000,
    price: 2000,
  },
];

import ProductCard from "../components/ProductCard";

function Products() {
  return (
    <>
      <div className="font-poppins flex flex-col items-center w-full px-[18px]">
        <header className="my-6 w-[340px]">
          <h1 className="font-bold w-full text-center">Woman's Cloth</h1>
          <div className="flex w-full justify-end">
            <p className="font-semibold">Sort by</p>
            <span>icon</span>
          </div>
        </header>
        <section>
          <ProductCard />
        </section>
      </div>
    </>
  );
}

export default Products;
