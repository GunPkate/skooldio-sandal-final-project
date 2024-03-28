import React from "react";

const Modal = ({modalItems}) => {
  return (
    //back shadow
    <div className="flex justify-center items-center  w-full h-screen fixed top-0 left-0 bg-black/50">
      {/*custom modal  */}
      <div className="w-[343px] h-[518px] rounded-2xl bg-white p-6 lg:w-[900px] lg:h-[374px]">
        <div className="flex justify-between items-center w-[295px] h-10 mb-4 lg:w-[852px]">
          <h1 className="text-lg font-semibold lg:text-2xl">
            Items added to your cart
          </h1>
          <button>
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
          <div className="flex flex-col item-start w-full h-[82px] mb-6 lg:flex-row lg:justify-between lg:w-[652px] lg:h-40 lg:mb-0 ">
            <div className="flex flex-col justify-center  ">
              <h2 className="text-lg font-bold lg:text-2xl">
                {modalItems.nameModal}
              </h2>
              <p className=" text-[#222222] font-normal">Qty: {modalItems.quantity}</p>
            </div>
            <div className="text-lg font-bold flex justify-end lg:flex-col lg:justify-center lg:text-2xl ">
              {modalItems.priceModal}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 justify-center items-center lg:flex-row">
          <button className="w-full h-14 bg-[#222222]  text-white lg:w-1/2">
            View Cart
          </button>
          <button className="w-full h-14 bg-white border-[#E1E1E1] border lg:w-1/2">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

