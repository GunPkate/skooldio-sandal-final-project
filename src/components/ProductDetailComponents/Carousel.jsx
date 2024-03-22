import React, { useState } from "react";
import chevron_left from "../../assets/ProductDetailAssets/chevron_left.png";
import chevron_right from "../../assets/ProductDetailAssets/chevron_right.png";

const Carousel = (data) => {
  let images = [];
  if (data && data?.imageUrls) {
    images = data?.imageUrls;
  }

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  return (
    <div className="flex flex-col gap-4 mx-auto relative flex-1">
      <div className="relative w-[343px] h-[343px] 2xl:w-[780px] 2xl:h-[780px]">
        {/* main image */}
        <img
          src={images[currentImageIndex]}
          alt="Product"
          className="w-full h-full object-cover "
        />
        <button
          onClick={prevImage}
          className="absolute left-[16px] top-1/2 transform -translate-y-1/2  w-8 h-8"
        >
          <img src={chevron_left} alt="" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-[16px] top-1/2 transform -translate-y-1/2 w-8 h-8 "
        >
          <img src={chevron_right} alt="" />
        </button>
      </div>

      {/* 4 pictures below the main pic */}
      <div className=" flex gap-2 2xl:w-[780px]">
        {thumbnailImages.map((image, index) => (
          <div key={index} className=" w-20 h-20 2xl:w-44 2xl:h-44 2xl:gap-8">
            <img
              src={image}
              alt={`Thumbnail ${index}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
