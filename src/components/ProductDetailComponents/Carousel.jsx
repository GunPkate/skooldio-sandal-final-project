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
    <div className="flex flex-col gap-4 mx-auto relative flex-1 min-w-[375px]">
      <div className="relative w-[343px] h-[343px] laptop:w-[514.5px] laptop:h-[514.5px] desktop:w-[780px] desktop:h-[780px] desktop:mb-4">
        {/* main image */}
        <img
          src={images[currentImageIndex]}
          alt="Product"
          className="w-full h-full object-cover relative"
        />
        {data.promotionalPrice < data.price ? <div className="absolute -right-1 top-8 w-24 h-14 bg-[#FF000D] text-center text-2xl text-white flex justify-center items-center ">Sale</div>: null}
        
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
      <div className=" flex gap-2 laptop:gap-3 desktop:gap-[30.7px]">
        {thumbnailImages.map((image, index) => (
          <div
            key={index}
            className=" w-20 h-20 laptop:w-[120px] laptop:h-[120px] desktop:w-[172.21px] desktop:h-[172.21px]"
          >
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
