function numberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const createStars = (amount) => {
  if (amount) {
    const fill = [...Array(amount)].map(() => (
      <img src="src/assets/star-fill.svg" />
    ));
    const unstar = [...Array(5 - amount)].map(() => (
      <img src="src/assets/star-grey.svg" />
    ));
    return [...fill, ...unstar];
  } else {
    return null;
  }
};

function ProductCard({
  name,
  image,
  description,
  discount,
  originalPrice,
  price,
  rating,
}) {
  return (
    <div className="mb-10 2xl:mb-0" key={name}>
      <div className="relative">
        {discount && (
          <p className="font-light text-white py-1 px-[10px] bg-danger w-fit absolute top-6 right-0">
            -{Math.round(((originalPrice - price) / originalPrice) * 100)}%
          </p>
        )}
        <img
          src={image}
          className="h-[370px] min-w-[340px] 2xl:min-w-[370px] object-cover mb-6"
          alt={`${name}`}
        />
      </div>
      <div className="grid grid-cols-1 gap-2 w-[340px] 2xl:w-[370px]">
        <h2 className="font-bold text-2xl text-secondary whitespace-nowrap text-ellipsis overflow-hidden">
          {name}
        </h2>
        <p className="font-light text-secondary-700 text-base">{description}</p>
        <div className="flex gap-[10px]">{createStars(rating)}</div>
        <div>
          {discount ? (
            <div className="flex items-center gap-4 justify-end">
              <p className="font-semibold text-sm line-through text-secondary-700">
                {numberWithCommas(originalPrice)}
              </p>
              <p className="font-bold text-2xl text-danger">
                THB {numberWithCommas(price)}
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-4 justify-end">
              <p className="font-bold text-2xl text-secondary">
                THB {numberWithCommas(price)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
