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
    image:
      "https://fastly.picsum.photos/id/910/300/375.jpg?hmac=LoJqI1ntYFLS1kJGMkzHTTMcyKyR_z8FM-9JDahwjcQ",
    description: "Product description",
    rating: 4,
    discount: false,
    originalPrice: 2000,
    price: 2000,
  },
  {
    name: "Item3",
    image:
      "https://fastly.picsum.photos/id/878/200/300.jpg?hmac=nSy0W5kdisSxfmRdWV95EFyG0HgfqQzD9D2IkWG76ho",
    description: "Product description",
    rating: 5,
    discount: true,
    originalPrice: 3000,
    price: 2000,
  },
  {
    name: "Item4",
    image:
      "https://fastly.picsum.photos/id/6/200/300.jpg?hmac=a4Gfsl7hyAvOnmQtzoEkQmbiLJFl7otISIdoYQWqJCo",
    description: "Product description",
    rating: 2,
    discount: true,
    originalPrice: 2000,
    price: 2000,
  },
];

import ProductCard from "../components/ProductCard";

function Products() {
  return (
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
        <header className="my-6 w-[340px] 2xl:flex 2xl:items-center 2xl:justify-between 2xl:mb-16 2xl:w-[1190px]">
          <h1 className="font-bold w-full text-center 2xl:w-auto 2xl:my-0 2xl:text-4xl">
            Woman's Cloth
          </h1>
          <div className="flex w-auto justify-end">
            <p className="font-semibold">Sort by</p>
            <span>icon</span>
          </div>
        </header>
        {ProductsDetail.length > 0 ? (
          <section className="2xl:grid grid-cols-3 gap-x-10 gap-y-[60px] mb-40">
            {ProductsDetail.map((item, index) => (
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
  );
}

export default Products;
