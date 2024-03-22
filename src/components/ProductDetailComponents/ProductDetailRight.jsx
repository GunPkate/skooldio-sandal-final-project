import React, { useState } from "react";

const ProductDetailRight = (data) => {
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  let description = [];
  if (data) {
    description = data;
  }

  // function to handle size selection
  const handleSizeSelection = (size) => {
    setSelectedSize(size);
  };

  // price with commas from k'Ter (product cart)
  function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  //rating section from k'Ter (product cart)
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

  return (
    <div className="flex flex-col gap-4 mt-10 mx-auto relative flex-1 min-w-[375px] desktop:mt-0  ">
      {/* upper infomation */}
      <div>
        <div className="text-lg font-semibold mb-1 desktop:text-2xl desktop:bold">
          ID : {data.skuCode}
        </div>
        <div className="text-5xl font-bold mb-1 leading-[60px]">
          {data.name}
        </div>
        <div className="text-lg font-semibold mb-6 leading-6 text-secondary-700 desktop:text-2xl">
          {data.description}
        </div>
        <div className="flex flex-col justify-center">
          {data.promotionalPrice < data.price ? (
            <>
              <div className="flex justify-center items-center text-3xl font-bold mb-2 w-56 h-16 bg-[#FF000D] text-white w-16 h-10 ">
                THB {numberWithCommas(data.promotionalPrice) + ".00"}
              </div>

              <div className="text-lg font-semibold mb-6 ">
                From
                <span className="line-through">
                  {" " + " THB " + numberWithCommas(data.price) + ".00"}
                </span>
              </div>
            </>
          ) : (
            <div className="text-3xl font-bold mb-7"> {data.price}</div>
          )}

          <div className="flex gap-[10px]">{createStars(data.ratings)}</div>
        </div>
      </div>

      {/* lower information from color below*/}
      <div className="mb-6 mt-14">
        <div className="laptop:w-72 desktop:w-80">
          <div className="font-normal text-base mb-2">Color</div>
          <div className="flex  justify-evenly gap-6 mb-6">
            {/* Color options */}
            {Array.from(
              new Set(data?.variants?.map((variant) => variant.colorCode))
            )
              .slice(0, 3)
              .map((colorCode, index) => (
                <div>
                  <div
                    key={index}
                    className="w-14 h-14 "
                    style={{ background: colorCode }}
                  ></div>
                  <div className="text-center mt-[6.5px]">xoxo</div>
                </div>
              ))}
          </div>
        </div>

        <div className="font-normal text-base mb-2">Size</div>
        <div className="flex gap-2 mb-6">
          {/* Size options */}
          {["XS", "S", "M", "L", "XL"].map((size) => (
            <button
              key={size}
              className={`w-16 h-14 border border-gray-300 desktop:w-36  ${
                selectedSize === size ? "bg-yellow-300" : ""
              }`}
              onClick={() => handleSizeSelection(size)}
            >
              {size}
            </button>
          ))}
        </div>
        <div className="font-normal text-base mb-2">Qty.</div>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full h-14 px-2  border border-gray-300 desktop:w-36"
          min="1"
        />
        
      </div>
      <button className="w-full h-[54px] bg-black text-white py-2 ">
        Add to cart
      </button>
    </div>
  );
};

export default ProductDetailRight;
