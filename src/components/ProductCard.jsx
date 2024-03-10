const ProductsDetail = [
  {
    name: "Reyon Long Sleeve Shirt",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    description: "Product description",
    rating: 3,
    discount: true,
    originalPrice: 2000,
    price: 1000,
  },
  {
    name: "Boxy Tailored Jacket",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    description: "Product description",
    rating: 4,
    discount: false,
    originalPrice: 2000,
    price: 2000,
  },
  {
    name: "Premium Linen Long Sleeve",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    description: "Product description",
    rating: 3,
    discount: true,
    originalPrice: 2000,
    price: 1000,
  },
];

const createStars = (amount) => {
  return amount ? [...Array(amount)].map(() => <span>⭐</span>) : null;
};

function ProductCard() {
  return ProductsDetail.map((item) => {
    return (
      <div className="mb-10" key={item.name}>
        <img
          src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
          className="h-[370px] sm:min-w-[340px] 2xl:min-w-[370px] object-cover mb-6"
          alt={`${item.name}`}
        />
        <div className="grid grid-cols-1 gap-2 sm:w-[340px] md:w-[370px]">
          <h2 className="font-bold text-2xl text-secondary whitespace-nowrap text-ellipsis overflow-hidden">
            {item.name}
          </h2>
          <p className="font-light text-secondary-700 text-base">
            {item.description}
          </p>
          <div className="flex gap-[10px]">{createStars(item.rating)}</div>
          <div>
            {item.discount ? (
              <div className="flex items-center gap-4 justify-end">
                <p className="font-semibold text-sm line-through text-secondary-700">
                  OG price
                </p>
                <p className="font-bold text-2xl text-danger">Discount Price</p>
              </div>
            ) : (
              <div className="flex items-center gap-4 justify-end">
                <p className="font-bold text-2xl text-secondary">
                  Discount Price
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  });
}

export default ProductCard;
