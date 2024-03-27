import React from "react";

const Modal = () => {
  return (
    //back shadow
    <div className="flex justify-center items-center  w-full h-screen fixed top-0 left-0 bg-black/50">
      {/*custom modal  */}
      <div className="w-[900px] h-[374px] rounded-2xl bg-white p-6">
        <div className="flex justify-between items-center w-[852px] h-10 mb-6">
          <h1 className="text-2xl font-bold">Items added to your cart</h1>
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
        <div className="flex justify-between py-6 gap-x-10 ">
          <img
            src="https://fastly.picsum.photos/id/1003/160/160.jpg?hmac=E2JDyHeevPoJ7onoYYBQwmFvDmm3vZLdqJ4Z8L_pUdA"
            alt="mock-img"
          />
          <div className="flex justify-between items-center w-[652px] h-40 ">
            <div className="flex flex-col  ">
              <h2 className="text-2xl font-bold">Product Name: Rayon</h2>
              <p className="text-lg font-semibold text-[#222222]">Qty: 2</p>
            </div>
            <div className="text-2xl font-bold">THB 2,000</div>
          </div>
        </div>
        <div className="flex gap-4 justify-center items-center h-[54px] ">
          <button className="w-1/2 h-full bg-[#222222]  text-white">
            View Cart
          </button>
          <button className="w-1/2 h-full bg-white border-[#E1E1E1] border">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
