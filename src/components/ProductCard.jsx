function numberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const createStars = (rating) => {
  const amount = Math.floor(rating);
  if (amount) {
    const fill = [...Array(amount)].map(() => (
      <img src="../src/assets/star-fill.svg" key={Math.random()} />
    ));
    const unstar = [...Array(5 - amount)].map(() => (
      <img src="../src/assets/star-grey.svg" key={Math.random()} />
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
}) {
  const discount = promotionalPrice < price ? true : false;
  return (
    <div className="mb-10 2xl:mb-0" key={id}>
      <div className="relative">
        {discount && (
          <p className="font-light text-white py-1 px-[10px] bg-danger w-fit absolute top-6 right-0">
            -{Math.round(((price - promotionalPrice) / price) * 100)}%
          </p>
        )}
        <img
          src={imageUrls[0]}
          className="h-[370px] min-w-[340px] 2xl:min-w-[370px] object-cover mb-6"
          alt={`${name}`}
        />
      </div>
      <div className="grid grid-cols-1 gap-2 w-[340px] 2xl:w-[370px]">
        <h2 className="font-bold text-2xl text-secondary whitespace-nowrap text-ellipsis overflow-hidden">
          {name}
        </h2>
        <p className="font-light text-secondary-700 text-base h-24 line-clamp-3">
          {description}
        </p>
        <div className="flex gap-[10px]">{createStars(ratings)}</div>
        <div>
          {discount ? (
            <div className="flex items-center gap-4 justify-end">
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
    </div>
  );
}

export default ProductCard;
