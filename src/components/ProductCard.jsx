import { Link } from "react-router-dom";

function numberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const createStars = (rating) => {
  const amount = Math.floor(rating);
  if (amount) {
    const fill = [...Array(amount)].map(() => (
      <img src="../../src/assets/star-fill.svg" key={Math.random()} />
    ));
    const unstar = [...Array(5 - amount)].map(() => (
      <img src="../../src/assets/star-grey.svg" key={Math.random()} />
    ));
    return [...fill, ...unstar];
  } else {
    return null;
  }
};

function ProductCard({
  id,
  name,
  imageUrls,
  description,
  promotionalPrice,
  price,
  ratings,
  permalink,
}) {
  const discount = promotionalPrice < price ? true : false;
  return (
    <Link
      to={`/ProductDetail/${permalink}`}
      className="transition-all 2xl:mb-0 hover:scale-105 hover:rounded-xl hover:bg-white hover:z-10 hover:shadow-lg min-w-[370px] lg:min-w-[300px]"
      key={id}
    >
      <div className="relative">
        {discount && (
          <p className="font-light text-white py-1 px-[10px] bg-danger w-fit absolute top-6 right-0">
            -{Math.round(((price - promotionalPrice) / price) * 100)}%
          </p>
        )}
        <img
          src={imageUrls[0]}
          className="h-[370px] w-full object-cover mb-6 hover:rounded-t-xl"
          alt={`${name}`}
        />
      </div>
      <div className="grid grid-cols-1 gap-2 w-[340px] lg:w-full p-2">
        <h2 className="font-bold text-2xl text-secondary whitespace-nowrap text-ellipsis overflow-hidden">
          {name}
        </h2>
        <p className="font-light text-secondary-700 text-base truncate">
          {description}
        </p>
        <div className="flex gap-[10px]">{createStars(ratings)}</div>
        <div>
          {discount ? (
            <div className="flex items-center gap-4 justify-end mb-2">
              <p className="font-semibold text-sm line-through text-secondary-700">
                {numberWithCommas(price)}
              </p>
              <p className="font-bold text-2xl text-danger">
                THB {numberWithCommas(promotionalPrice)}
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-4 justify-end">
              <p className="font-bold text-2xl text-secondary">
                THB {numberWithCommas(promotionalPrice)}
              </p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
