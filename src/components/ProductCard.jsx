const ProductsDetail = [
  {
    name: "Reyon Long Sleeve Shirt",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    description: "Product description",
    rating: 5,
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
    originalPrice: 3000,
    price: 1000,
  },
  {
    name: "Reyon Long Sleeve Shirt",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    description: "Product description",
    rating: 1,
    discount: true,
    originalPrice: 2000,
    price: 1000,
  },
  {
    name: "Boxy Tailored Jacket",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    description: "Product description",
    rating: 2,
    discount: true,
    originalPrice: 2000,
    price: 1900,
  },
  {
    name: "Premium Linen Long Sleeve",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    description: "Product description",
    rating: 4,
    discount: false,
    originalPrice: 3000,
    price: 1000,
  },
];

function numberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const createStars = (amount) => {
  return amount ? [...Array(amount)].map(() => <span>⭐</span>) : null;
};

function ProductCard() {
  return ProductsDetail.map((item) => {
    return (
      <div className="mb-10 2xl:mb-0" key={item.name}>
        <div className="relative">
          {item.discount && (
            <p className="font-light text-white py-1 px-[10px] bg-danger w-fit absolute top-6 right-0">
              -
              {Math.round(
                ((item.originalPrice - item.price) / item.originalPrice) * 100
              )}
              %
            </p>
          )}
          <img
            src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
            className="h-[370px] min-w-[340px] 2xl:min-w-[370px] object-cover mb-6"
            alt={`${item.name}`}
          />
        </div>
        <div className="grid grid-cols-1 gap-2 w-[340px] 2xl:w-[370px]">
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
                  {numberWithCommas(item.originalPrice)}
                </p>
                <p className="font-bold text-2xl text-danger">
                  THB {numberWithCommas(item.price)}
                </p>
              </div>
            ) : (
              <div className="flex items-center gap-4 justify-end">
                <p className="font-bold text-2xl text-secondary">
                  THB {numberWithCommas(item.price)}
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
