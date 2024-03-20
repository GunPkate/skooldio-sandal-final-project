import React, { useState } from "react";

const ProductDetailRight = () => {
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [starRating] = useState(4); // Static rating for demonstration

  // Function to handle size selection
  const handleSizeSelection = (size) => {
    setSelectedSize(size);
  };

  return (
    <div className="w-80 font-poppins">
      <div>
        <div className="text-lg font-semibold mb-1">ID: 104860</div>
        <div className="text-5xl font-bold mb-1">Reyon Long Sleeve Shirt</div>
        <div className="text-lg font-semibold mb-6">
          Soft and smooth feel. Wrinkle-resistant for easy care after washing.
        </div>
        <div className="flex flex-col align-center">
          <div className="text-3xl font-bold mb-7">THB 1,000.00</div>
          {/* star from the */}
          <div className="flex-none w-[180px] h-[40px] mb-[72px]">
            <div className="flex ">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-6 w-6 ${
                    index < starRating ? "text-yellow-400" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.602-.921 1.902 0l1.868 5.754a1.001 1.001 0 00.95.674h6.027c.97 0 1.37 1.24.588 1.81l-4.884 3.546a1.001 1.001 0 00-.36 1.107l1.868 5.754c.3.921-.755 1.686-1.54 1.107l-4.884-3.546a1.001 1.001 0 00-1.176 0l-4.884 3.546c-.785.579-1.84-.186-1.54-1.107l1.868-5.754a1.001 1.001 0 00-.36-1.107l-4.884-3.546c-.782-.57-.382-1.81.588-1.81h6.027a1.001 1.001 0 00.95-.674l1.868-5.754z"
                  />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <div className="font-normal text-base mb-2">Color</div>
        <div className="flex gap-6 mb-6">
          {/* Color options */}
          <div className="w-14 h-14 bg-black rounded-md"></div>
          <div className="w-14 h-14 bg-primary rounded-md"></div>
          <div className="w-14 h-14 bg-secondary rounded-md"></div>
        </div>
        <div className="font-normal text-base mb-2">Size</div>
        <div className="flex gap-2 mb-6">
          {/* Size options */}
          {["XS", "S", "M", "L", "XL"].map((size) => (
            <button
              key={size}
              className={`w-16 h-14 border border-gray-300  ${
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
          className="w-full h-14 px-2"
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
