import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductDetailRight = (data) => {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectColor, setSelectColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [remains, setRemains] = useState(0);

  let description = [];
  if (data) {
    description = data;
  }

useEffect(() => {
  if (selectColor === "") {
    setRemains(0); // Reset remains if color is not selected
  } else {
    const remains = getRemains(selectedSize, selectColor);
    setRemains(remains);
  }
}, [selectedSize, selectColor]);
  

  // function to handle size selection
  const handleSizeSelection = (size) => {
    setSelectedSize(size);
    const remains = getRemains(size, selectColor);
    setRemains(remains);

    console.log(`1)Remains for size ${size} and color ${selectColor}: ${remains}`);
  };

  const handleColorSelection = (color) => {
    setSelectedSize("");
    setRemains(prevState => 0);

    // setRemains((preProv) => getRemains(selectedSize, color  || ''));
    setSelectColor(color);
    const remains = getRemains(selectedSize || "", color);
    setRemains(remains);
    console.log(`2)Remains for size ${selectedSize} and color ${color}: ${remains}`);

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
  const getRemains = (selectedSize, selectColor) => {
    const variant = variants.find((v) => {
      if(uniqueDataSize[0].size?.length > 0){
        return v.size === selectedSize || null && v.color === selectColor ||'';
      }else{
        return  v.color === selectColor ||''; }
    });
    return variant ? variant.remains : 0;
  };
  

  // const remains = getRemains(selectedSize, selectColor);
  // console.log(`Remains for size ${selectedSize} and color ${selectColor}: ${remains}`);

  const order = { S: 1, M: 2, L: 3, XL: 4 };

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
                      //comment: เมื่อคลิกอยากขึ้น border ให้ user รู้ว่าเลือกแล้ว
                      className="w-14 h-14 "
                      style={{ background: value.colorCode }}
                      onClick={() => {
                        handleColorSelection(value.color);
                      }}
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

                      className="w-14 h-14 "
                      style={{
                        background: value.colorCode,
                        border:
                          selectColor === value.color
                            ? "5px solid black"
                            : null,
                      }}
                      onClick={() => {
                        setRemains(0);
                        handleColorSelection(value.color);
                      }}
                    ></div>

                    <div className="text-center mt-[6.5px]">{value.color}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        

        {/* size options */}

        {uniqueDataSize[0].size?.length > 0 && (
          <>
          
            <div className="font-normal text-base mb-2">Size</div>
            <div className="flex gap-2 mb-6">
              <div className="flex justify-evenly gap-6 mb-6">
                {" "}
                {uniqueDataSize.map((value, index) => (
                  <div key={index}>
                    <button
                      key={value.size}
                      disabled={selectColor === "" ? true : false}
                      className={`w-16 h-14 border border-gray-300 desktop:w-36  ${
                        selectedSize === value.size ? "bg-yellow-300" : ""
                      }`}
                      onClick={() => selectColor!=''?handleSizeSelection(value.size):null}
                    >
                      {value.size}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        <div className="font-normal text-base mb-2">Qty. <text className="text-red-500 font-semibold text-xl">{`In stock : ${remains}`}</text></div>

        <form className=" max-w-xs mx-auto">
          <div class="relative flex items-start max-w-[8rem]">
            <button
              type="button"
              id="decrement-button"
              disabled={remains === 0 ? true : false || quantity === 1 ? true : false}
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
             disabled
              required
            />
            <button
              type="button"
              id="increment-button"
              disabled={remains === 0 ? true : false || quantity >= remains ? true : false}
              data-input-counter-increment="quantity-input"
              class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
              onClick={() => {
                if (quantity < remains) {
                setQuantity(quantity + 1);
                }
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
          
        </form>
      </div>

      {/* Add to cart button */}
      <button className="w-full h-[54px] bg-black text-white py-2 ">
        <Link to="/Mycart/">Add to cart</Link>
      </button>
    </div>
  );
};

export default ProductDetailRight;
