import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../App";
import { numberWithCommas } from "./ProductDetailRight";

const Modal = ({ modalItems, onClose, selectedData }) => {
  const { permalink } = useParams();
  const { userPurhcase, setuserPurhcase } = useContext(UserContext);
  const [myCart, setMyCart] = useState([]);

  const handleAddItem = async () => {
    const id = localStorage.getItem("id");
    console.log("Add Item ID", id);

    let addItem = {
      skuCode: selectedData[0].skuCode,
      quantity: modalItems.quantity,
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

  return (
    //back shadow
    <div className="flex justify-center items-center  w-full h-screen fixed top-0 left-0 bg-black/50 z-[999]">
      {/*custom modal  */}
      <div className="w-[343px] h-[518px] rounded-2xl bg-white p-6 lg:w-[900px] lg:h-[374px] gap-6">
        <div className="flex justify-between items-center w-[295px] h-10 lg:w-[852px]">
          <h1 className="text-lg font-semibold lg:text-2xl p-0 m-0">
            Items added to your cart
          </h1>
          <button onClick={onClose}>
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 12L28 28"
                stroke="#222222"
                stroke-width="2"
                stroke-linecap="round"
              />
              <path
                d="M28 12L12 28"
                stroke="#222222"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col items-center lg:flex-row lg:justify-between lg:py-6 lg:gap-x-10">
          <img
            className="w-40 h-40 object-cover mb-4 lg:mb-0"
            src={modalItems.imgModal}
            alt="mock-img"
          />
          <div className="flex items-start-start w-full lg:h-fit mb-6 lg:flex-row lg:justify-between lg:w-[652px]  lg:mb-0 ">
            <div className="flex w-full justify-between flex-col lg:justify-center  ">
              <h2 className="text-lg font-bold lg:text-2xl">
                {modalItems.nameModal}
              </h2>
              <p className=" text-secondary-700 text-[18px] font-semibold">
                Qty: {modalItems.quantity}
              </p>
            </div>
            <div className="text-2xl my-auto lg:my-0 font-bold flex justify-end items-center lg:items-start lg:flex-col lg:justify-start lg:text-2xl ">
              THB{" "}
              {numberWithCommas(modalItems.priceModal * modalItems.quantity)}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 justify-center items-center lg:flex-row">
          <Link
            to="/Mycart/"
            onClick={() => {
              handleAddItem();
            }}
            className="w-full h-14 bg-[#222222]  text-white lg:w-1/2 flex justify-center items-center"
          >
            View Cart
          </Link>{" "}
          <Link
            to="/"
            onClick={() => {
              handleAddItem();
            }}
            className="w-full h-14 bg-white text-secondary lg:w-1/2 flex justify-center items-center border-solid border-secondary-300 border-[0.5px]"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Modal;
