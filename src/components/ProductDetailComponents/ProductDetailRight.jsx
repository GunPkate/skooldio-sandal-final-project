import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../App";
import axios from "axios";
import Dropdown from "./Dropdown";

const ProductDetailRight = (data) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectColor, setSelectColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [remains, setRemains] = useState(0);
  const [readOnly, setReadOnly] = useState(false);
  const { permalink } = useParams();
  const { userPurhcase, setuserPurhcase } = useContext(UserContext);
  const [myCart, setMyCart] = useState([]);

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

  useEffect(() => {
    const sum = sumRemains(data.variants);
    if (sum === 0) {
      // If all variants are out of stock
      setReadOnly(true);
    } else {
      // If all variants are in stock }
      setReadOnly(false);
    }
  }, []);

  // Function to calculate the sum of "remains" values
  function sumRemains(variants) {
    let sum = 0;
    for (const variant of variants) {
      sum += variant.remains;
    }
    return sum;
  }

  // function to handle size selection
  const handleSizeSelection = (size) => {
    setSelectedSize(size);
    const remains = getRemains(size, selectColor);
    if (remains === 0) {
      data.sendDataToParent(true);
      setReadOnly(true);
    } else {
      data.sendDataToParent(false);
      setReadOnly(false);
    }
    setRemains(remains);
  };

  const handleColorSelection = (color) => {
    setSelectedSize("");

    setSelectColor(color);
    const remains = getRemains(selectedSize || "", color);
    if (uniqueDataSize[0].size?.length == 0) {
      if (remains === 0) {
        data.sendDataToParent(true);
        setReadOnly(true);
      } else {
        data.sendDataToParent(false);
        setReadOnly(false);
      }
    } else {
      data.sendDataToParent(false);
      setReadOnly(false);
    }

    setRemains(remains);
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
        <img src="/src/assets/star-fill.svg" key={Math.random()} />
      ));
      const unstar = [...Array(5 - amount)].map(() => (
        <img src="/src/assets/star-grey.svg" key={Math.random()} />
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
            let itemCart = res.data;
            console.log("Navbar get", itemCart);
            let myCartTemp = [];
            res.data.items.forEach(async (x) => {
              await axios
                .get(
                  "https://api.storefront.wdb.skooldio.dev/products/" +
                    x.productPermalink
                )
                .then((resDetail) => {
                  const dataDetail = resDetail.data;

                  let displayBody = {
                    id: x.id,
                    name: dataDetail.name,
                    skuCode: x.skuCode,
                    quantity: x.quantity,
                    variants: dataDetail.variants,
                    price: dataDetail.price,
                    image: dataDetail.imageUrls[0],
                    color: Array.from(
                      new Set(dataDetail.variants.map((x) => x.color))
                    ).sort(),
                    size: Array.from(
                      new Set(dataDetail.variants.map((x) => x.size))
                    ).sort(),
                  };

                  myCartTemp.push(displayBody);

                  setMyCart(Array.from(new Set(myCartTemp.map((x) => x))));
                  setuserPurhcase(myCartTemp);
                });
            });
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddItem = async () => {
    const id = localStorage.getItem("id");
    console.log("Add Item ID", id);

    let addItem = {
      skuCode: uniqueDataSize[0].skuCode,
      quantity: quantity,
      productPermalink: permalink,
    };

    let mycartBody = [];
    mycartBody.push(addItem);

    console.log("Add Item", addItem);
    if (mycartBody.length) {
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

              if (statusCode == 200 || statusCode == 201) {
                fetchMycart(data.id);
              }
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
              console.log("add old cart statusCode", statusCode);
              console.log("add old cart data", data);
              console.log("add old res", res);

              if (statusCode == 200 || statusCode == 201) {
                fetchMycart(id);
              }
              setTimeout(() => {
                window.location.reload();
              }, 500);
            });
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const variants = data.variants;
  const getRemains = (selectedSize, selectColor) => {
    const hasSize = uniqueDataSize[0].size?.length > 0;

    const variant = variants.find((v) => {
      if (hasSize) {
        return v.size === selectedSize && v.color === selectColor;
      } else {
        return v.color === selectColor;
      }
    });
    return variant ? variant.remains : 0;
  };

  const sizeOrder = { S: 1, M: 2, L: 3, XL: 4 };
  uniqueDataSize.sort((a, b) => {
    // for number case
    if (!isNaN(a.size) && !isNaN(b.size)) {
      return parseInt(a.size) - parseInt(b.size);
    }

    // letters (S, M, L, XL)
    if (isNaN(a.size) && isNaN(b.size)) {
      return sizeOrder[a.size] - sizeOrder[b.size];
    }
  });

  const onQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
    console.log(`Quantity updated to: ${newQuantity}`);
  };

  return (
    <div className="flex flex-col lg:gap-0  gap-4 mt-10 mx-auto relative flex-1 min-w-[343px] lg:mt-0  ">
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
              <div className="flex justify-center items-center text-[40px] font-bold mb-2 bg-[#FF000D] text-white w-fit  px-[10px] py-2 ">
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
        </div>
        <div className="text-danger text-2xl">
          {readOnly === true ? (
            <div className="text-xl font-bold mb-6">Out of stock</div>
          ) : null}
        </div>
        {/* {readOnly ? <div className="text-danger text-2xl">Out of stock</div> : null} */}
        <div className="flex gap-[10px]">{createStars(data.ratings)}</div>
      </div>

      {/* lower information from color below*/}
      <div className="mb-6 mt-14">
        <div className="laptop:w-72 desktop:w-80 mb-6">
          <div className="font-normal text-secondary-700 mb-2">Color</div>
          <div className="w-full flex ">
            {/* Color options */}

            {uniqueDataColor.length === 1 ? (
              <>
                {uniqueDataColor.map((value, index) => (
                  <div key={index}>
                    <div
                      //comment: เมื่อคลิกอยากขึ้น border ให้ user รู้ว่าเลือกแล้ว
                      className="w-14 h-14 "
                      style={{
                        background: value.colorCode,
                        border:
                          selectColor === value.color
                            ? "3px solid #C1CD00"
                            : "0.5px solid lightgrey",
                      }}
                      onClick={() => {
                        handleColorSelection(value.color);
                      }}
                    ></div>

                    <div className="text-center mt-[6.5px]">{value.color}</div>
                  </div>
                ))}
              </>
            ) : (
              <div className="w-full flex justify-evenly gap-6 mb-6">
                {" "}
                {uniqueDataColor.map((value, index) => (
                  <div key={index}>
                    <div
                      className="w-14 h-14 "
                      style={{
                        background: value.colorCode,
                        border:
                          selectColor === value.color
                            ? "3px solid #C1CD00"
                            : "0.5px solid lightgrey",
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
            <div className="font-normal text-secondary-700 mb-4">Size</div>
            <div className="flex gap-2 mb-6 lg:mb-0">
              <div className="flex  flex-wrap gap-6 mb-6">
                {" "}
                {uniqueDataSize.map((value, index) => (
                  <div key={index}>
                    <button
                      key={value.size}
                      disabled={selectColor === "" ? true : false}
                      className={`w-16 h-14 laptop:w-[149.6px] laptop:h-[54px] border border-gray-300  ${
                        selectedSize === value.size ? "bg-yellow-300" : ""
                      }`}
                      onClick={() =>
                        selectColor != ""
                          ? handleSizeSelection(value.size)
                          : null
                      }
                    >
                      {value.size}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        <div className="font-normal text-secondary-700 text-base mb-4">
          Qty.{" "}
          <span className="text-red-500 font-semibold text-xl">{`(In stock : ${remains})`}</span>
        </div>
        {/* dropdown to select Qty */}
        <Dropdown onQuantityChange={onQuantityChange} />
      </div>

      {/* Add to cart button */}
      {remains === 0 && readOnly === true ? (
        <button className="w-full h-[54px] bg-black text-white" disabled>
          Out of Stock
        </button>
      ) : (
        <Link
          className="flex justify-center items-center w-full h-[54px] bg-black text-white"
          to="/Mycart/"
          onClick={() => {
            handleAddItem();
          }}
        >
          Add to cart
        </Link>
      )}
    </div>
  );
};

export default ProductDetailRight;
