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

function ProductCard() {
  return ProductsDetail.map((item) => {
    return (
      <div className="mb-10">
        <img
          src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
          className="h-[370px] sm:min-w-[340px] 2xl:min-w-[370px] object-cover mb-6"
          alt={`Product ${item.name}`}
        />
        <div className="grid grid-cols-1 gap-2">
          <h2 className="font-bold text-2xl">{item.name}</h2>
          <p className="font-thin text-secondary-700 text-base">
            {item.description}
          </p>
          <span>⭐️⭐️⭐️⭐️⭐️</span>
          <div className="flex items-center gap-4 justify-end">
            {item.discount && (
              <p className="font-semibold text-sm line-through text-secondary-700">
                OG price
              </p>
            )}
            <p className="font-bold text-2xl text-danger">Discount Price</p>
          </div>
        </div>
      </div>
    );
  });
}

export default ProductCard;
