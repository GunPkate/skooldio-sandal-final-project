import React, { useEffect, useState } from "react";

const Carousel = ({
  imageUrls,
  variants,
  readOnly: initialReadOnly,
  promotionalPrice,
  price,
}) => {
  const [readOnly, setReadOnly] = useState(initialReadOnly);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(imageUrls[0]);

  useEffect(() => {
    const sum = sumRemains(variants);
    setReadOnly(sum === 0 || initialReadOnly);
  }, [variants, initialReadOnly]);

  // calculate the sum of "remains"
  function sumRemains(variants) {
    return variants.reduce((sum, variant) => sum + variant.remains, 0);
  }

  const nextImage = () => {
    const newIndex = (currentImageIndex + 1) % imageUrls.length;
    setCurrentImageIndex(newIndex);
    setSelectedImage(imageUrls[newIndex]);
  };

  const prevImage = () => {
    const newIndex =
      (currentImageIndex - 1 + imageUrls.length) % imageUrls.length;
    setCurrentImageIndex(newIndex);
    setSelectedImage(imageUrls[newIndex]);
  };

  const selectImage = (index) => {
    setCurrentImageIndex(index);
    setSelectedImage(imageUrls[index]);
  };

  return (
    <div className=" flex flex-col justify-start items-center gap-2 min-w-[343px]">
      <div className=" relative w-[343px] h-[343px] laptop:w-[514.5px] laptop:h-[514.5px] desktop:w-[780px] desktop:h-[780px] desktop:mb-4">
        {/* main image */}
        <img
          src={selectedImage}
          alt="Product"
          className={`w-full h-full object-cover ${
            readOnly ? "brightness-50" : ""
          }`}
        />

        {/* Left arrow */}
        <button
          onClick={prevImage}
          className="absolute left-[16px] top-1/2 transform -translate-y-1/2  w-8 h-8"
        >
          {/*left arrow SVG */}
          <svg
            width="41"
            height="41"
            viewBox="0 0 31 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              opacity="0.3"
              cx="15.4262"
              cy="15.5358"
              r="15.391"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.7991 15.971L18.2958 20.4675C18.5726 20.7444 18.573 21.1922 18.297 21.4682C18.0191 21.7462 17.573 21.7437 17.2963 21.467L12.3013 16.472C12.301 16.4719 12.3009 16.4716 12.3007 16.4714C12.3004 16.4712 12.3003 16.471 12.3 16.4708C12.1613 16.332 12.0924 16.1513 12.0926 15.9708C12.0933 15.7897 12.1623 15.6091 12.3 15.4713C12.3003 15.4711 12.3004 15.4709 12.3007 15.4707C12.3009 15.4704 12.301 15.4702 12.3013 15.4701L17.2963 10.4749C17.5731 10.1981 18.021 10.1976 18.297 10.4737C18.575 10.7516 18.5725 11.1978 18.2958 11.4744L13.7991 15.971Z"
              fill="#222222"
            />
          </svg>
        </button>
        {/* Right arrow */}
        <button
          onClick={nextImage}
          className="absolute right-[16px] top-1/2 transform -translate-y-1/2 w-8 h-8"
        >
          {/*right arrow SVG */}
          <svg
            width="41"
            height="41"
            viewBox="0 0 31 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              opacity="0.3"
              cx="15.391"
              cy="15.391"
              r="15.391"
              transform="matrix(-1 0 0 1 30.9639 0.144775)"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M17.1999 15.971L12.7032 20.4675C12.4264 20.7444 12.426 21.1922 12.702 21.4682C12.9799 21.7462 13.426 21.7437 13.7027 21.467L18.6977 16.472C18.698 16.4719 18.6982 16.4716 18.6983 16.4714C18.6986 16.4712 18.6988 16.471 18.699 16.4708C18.8377 16.332 18.9066 16.1513 18.9064 15.9708C18.9057 15.7897 18.8368 15.6091 18.699 15.4713C18.6988 15.4711 18.6986 15.4709 18.6983 15.4707C18.6982 15.4704 18.698 15.4702 18.6977 15.4701L13.7027 10.4749C13.426 10.1981 12.978 10.1976 12.702 10.4737C12.4241 10.7516 12.4265 11.1978 12.7032 11.4744L17.1999 15.971Z"
              fill="#222222"
            />
          </svg>
        </button>
        {/* promotional price */}
        {promotionalPrice < price ? (
          <div
            className={`absolute right-0 top-8  ${
              readOnly
                ? "bg-black w-[85px] h-[25px] laptop:w-44 laptop:h-10 desktop:w-48 desktop:h-14"
                : "bg-[#FF000D] w-10 h-6 laptop:w-14 laptop:h-10 desktop:w-[91.5px] desktop:h-[57px]"
            } text-center text-xs laptop:text-xl desktop:text-2xl text-white flex justify-center items-center `}
          >
            {readOnly ? "Out Of Stock" : "Sale"}
          </div>
        ) : null}
      </div>
      {/* Thumbnails */}
      <div className=" flex justify-center gap-2 w-full ">
        {imageUrls.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index}`}
            onClick={() => selectImage(index)}
            className={`w-[62px] h-[62px] laptop:w-24 laptop:h-24 desktop:w-[149px] desktop:h-[149px] object-cover ${
              readOnly ? "brightness-50" : ""
            } ${index === currentImageIndex ? "border-2 border-black" : ""}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
