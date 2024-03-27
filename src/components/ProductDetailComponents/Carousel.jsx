import React, { useEffect, useState } from "react";

const Carousel = (data) => {
  const [readOnly, setReadOnly] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  console.log("dataZOZOZOZO", data);

  let images = [];
  if (data && data?.imageUrls) {
    images = data?.imageUrls;
  }

  useEffect(() => {
    const sum = sumRemains(data.variants);

    if (sum === 0 || data.readOnly === true) {
      // If all variants are out of stock
      setReadOnly(true);
    } else {
      setReadOnly(false);
    }
  }, [data]);
  useEffect(() => {
    if (data.readOnly === true) {
      setReadOnly(true);
    } else {
      setReadOnly(false);
    }
  }, [data.readOnly]);

  // Function to calculate the sum of "remains" values
  function sumRemains(variants) {
    let sum = 0;
    for (const variant of variants) {
      sum += variant.remains;
    }
    return sum;
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const thumbnailImages = images.filter(
    (_, index) => index !== currentImageIndex
  );

  console.log("readOnly (Carousel)", readOnly);

  return (
    <div className="flex flex-col gap-4 mx-auto relative flex-1 w-[343px] md:w-[514.5px] 2xl:max-w-[780px] lg:mr-10">
      <div className="relative aspect-square w-full">
        {/* main image */}

        <img
          src={images[currentImageIndex]}
          alt="Product"
          className={`w-full h-full aspect-square object-cover ${
            readOnly ? "brightness-50" : ""
          }`}
        />
        {data.promotionalPrice < data.price ? (
          <div
            className={`absolute -right-1 top-8 w-24 h-14 ${
              readOnly ? "bg-black w-48 h-14" : "bg-[#FF000D]"
            } text-center text-2xl text-white flex justify-center items-center `}
          >
            {readOnly ? "Out Of Stock" : "Sale"}
          </div>
        ) : null}

        <button
          onClick={prevImage}
          className="absolute left-[16px] top-1/2 transform -translate-y-1/2  w-8 h-8"
        >
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
        <button
          onClick={nextImage}
          className="absolute right-[26px] top-1/2 transform -translate-y-1/2 w-8 h-8 "
        >
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
      </div>

      {/* 4 pictures below the main pic */}
      <div className="flex w-full justify-between">
        {thumbnailImages.map((image, index) => (
          <div
            key={index}
            className="w-20 h-20 md:w-[100px] md:h-[100px] lg:w-[140px] lg:h-[140px]"
          >
            <img
              src={image}
              alt={`Thumbnail ${index}`}
              className={`w-full h-full object-cover ${
                readOnly ? "brightness-50" : ""
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
