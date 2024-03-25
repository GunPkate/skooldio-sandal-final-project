import React, { useState } from "react";
import { Link } from "react-router-dom";

const ProductDetailRight = (data) => {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectColor, setSelectColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  let description = [];
  if (data) {
    description = data;
  }

  // console.log("dataYOLO", data.variants);

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

  //about color
  const uniqueByKey = (array, key) => {
    return array.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t[key] === item[key])
    );
  };

  const uniqueDataColor = uniqueByKey(data.variants, "color");
  const uniqueDataSize = uniqueByKey(data.variants, "size");

  const fetchMycart = async (id) => {
    try {
      if (id !== null || id !== undefined || id !== "") {
        await axios
          .get(`https://api.storefront.wdb.skooldio.dev/carts/${id}`)
          .then((res) => {
            console.log(res.data);
            setuserPurhcase(res.data.items);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddItem = async () => {
    const id = localStorage.getItem("id");
    console.log("Add Item", id);

    let addItem = {
      skuCode: myItem[0].skuCode,
      quantity: quantity,
      productPermalink: permalink,
    };

    let mycartBody = [];
    mycartBody.push(addItem);

    console.log("Add Item", addItem);
    if (mycartBody.length) {
      setuserPurhcase(mycartBody);
      console.log(mycartBody);

      let statusCode = "";

      if (id === null || id === undefined || id === "") {
        try {
          await axios
            .post("https://api.storefront.wdb.skooldio.dev/carts", {
              items: mycartBody,
            })
            .then((res) => {
              let data = res.data;
              console.log("add new res", res);
              console.log("add new cart data", data);
              statusCode = res.status;
              localStorage.setItem("id", data.id);
            });
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          axios
            .post(`https://api.storefront.wdb.skooldio.dev/carts/${id}/items`, {
              items: mycartBody,
            })
            .then((res) => {
              let data = res.data;
              statusCode = res.status;
              console.log("add old cart data", data);
              console.log("add old res", res);
            });
        } catch (error) {
          console.log(error);
        }
      }

      if (statusCode == 200 || statusCode == 201) {
        fetchMycart(id);
      }
    }
  };

  const variants = data.variants;
  console.log("variants>>>>", variants);
  const getRemains = (size, color) => {
    const variant = variants.find((v) => {
      console.log("VVVVV", v.size, v.color, size, color);

      return v.size === size && v.color === color;
    });
    return variant ? variant.remains : 0;
  };
  // usage
  const size = "L";
  const color = "Black";
  const remains = getRemains(size, color);
  console.log(`Remains for size ${size} and color ${color}: ${remains}`);


  const order = { 'S': 1, 'M': 2, 'L': 3, 'XL': 4 };

uniqueDataSize.sort((a, b) => order[a.size] - order[b.size]);


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
            <div className="text-3xl font-bold mb-7">
              {" " + " THB " + numberWithCommas(data.price) + ".00"}
            </div>
          )}

          <div className="flex gap-[10px]">{createStars(data.ratings)}</div>
        </div>
      </div>

      {/* lower information from color below*/}
      <div className="mb-6 mt-14">
        <div className="laptop:w-72 desktop:w-80">
          <div className="font-normal text-base mb-2">Color</div>
          <div className="flex justify-start gap-6 mb-6">
            {/* Color options */}

            {uniqueDataColor.length === 1 ? (
              <>
                {uniqueDataColor.map((value, index) => (
                  <div key={index}>
                    <div
                      className="w-14 h-14"
                      style={{ background: value.colorCode }}
                    ></div>

                    <div className="text-center mt-[6.5px]">{value.color}</div>
                  </div>
                ))}
              </>
            ) : (
              <div className="flex justify-evenly gap-6 mb-6">
                {" "}
                {uniqueDataColor.map((value, index) => (
                  <div key={index}>
                    <div
                      className="w-14 h-14"
                      style={{ background: value.colorCode }}
                    ></div>

                    <div className="text-center mt-[6.5px]">{value.color}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Size options */}
        {/* {["XS", "S", "M", "L", "XL"].map((size) => (
            <button
              key={size}
              className={`w-16 h-14 border border-gray-300 desktop:w-36  ${
                selectedSize === size ? "bg-yellow-300" : ""
              }`}
              onClick={() => handleSizeSelection(size)}
            >
              {size}
            </button>
          ))} */}

        {/* size options */}

        {console.log("uniqueDataSize>>>>>", uniqueDataSize[0].size === "")}
        {uniqueDataSize[0].size != "" && (
          <>
            <div className="font-normal text-base mb-2">Size</div>
            <div className="flex gap-2 mb-6">
              <div className="flex justify-evenly gap-6 mb-6">
                {" "}
                {uniqueDataSize.map((value, index) => (
                  <div key={index}>
                    <button
                    
                      key={value.size}
                      className={`w-16 h-14 border border-gray-300 desktop:w-36  ${
                        selectedSize === value.size ? "bg-yellow-300" : ""
                      }`}
                      onClick={() => handleSizeSelection(value.size)}
                    >
                      {value.size}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        <div className="font-normal text-base mb-2">Qty.</div>
        {/* <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full h-14 px-2  border border-gray-300 desktop:w-36"
          min="1"
        /> */}

        {/* <form class="max-w-sm mx-auto"> */}
        {/* <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label> */}

        <form className=" max-w-xs mx-auto">
          {/* <label for="quantity-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Choose quantity:</label> */}
          <div class="relative flex items-start max-w-[8rem]">
            <button
              type="button"
              id="decrement-button"
              data-input-counter-decrement="quantity-input"
              class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
              onClick={() => {
                if (quantity > 1) {
                  setQuantity(quantity - 1);
                }
              }}
            >
              <svg
                class="w-3 h-3 text-gray-900 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 2"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h16"
                />
              </svg>
            </button>
            <input
              type="text"
              id="quantity-input"
              data-input-counter
              aria-describedby="helper-text-explanation"
              class="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={quantity}
              required
            />
            <button
              type="button"
              id="increment-button"
              data-input-counter-increment="quantity-input"
              class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
              onClick={() => {
                setQuantity(quantity + 1);
              }}
            >
              <svg
                class="w-3 h-3 text-gray-900 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </button>
          </div>
          {/* <p
              id="helper-text-explanation"
              class="mt-2 text-sm text-gray-500 dark:text-gray-400"
            >
              Please select a 5 digit number from 0 to 9.
            </p> */}
        </form>
        {/* </form> */}
      </div>

      {/* Add to cart button */}
      <button className="w-full h-[54px] bg-black text-white py-2 ">
        <Link to="/Mycart/">Add to cart</Link>
      </button>
    </div>
  );
};

export default ProductDetailRight;
