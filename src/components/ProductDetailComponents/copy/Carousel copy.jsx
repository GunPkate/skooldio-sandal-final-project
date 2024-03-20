import React, { useState } from "react";
import chevron_left from "../../assets/ProductDetailAssets/chevron_left.png";
import chevron_right from "../../assets/ProductDetailAssets/chevron_right.png";

const Carousel = () => {
  const images = [
    "https://picsum.photos/id/237/780/780",
    "https://picsum.photos/id/238/780/780",
    "https://picsum.photos/id/239/780/780",
    "https://picsum.photos/id/240/780/780",
    "https://picsum.photos/id/241/780/780",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  // Calculate the thumbnail images to display
  const thumbnailImages = images.filter(
    (_, index) => index !== currentImageIndex
  );

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[780px] h-[780px]">
        <img
          src={images[currentImageIndex]}
          alt="Product"
          className="w-full h-full object-cover"
        />
        <button
          onClick={prevImage}
          className="absolute left-[16px] top-1/2 transform -translate-y-1/2 rounded-full w-[70px] h-[70px] bg-slate-50/50 text-black"
        >
          <img src={chevron_left} alt="" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-[16px] top-1/2 transform -translate-y-1/2 rounded-full w-[70px] h-[70px] bg-slate-50/50 text-black"
        >
          <img src={chevron_right} alt="" />
        </button>
      </div>
      <div className="mt-[31px] grid grid-cols-4 gap-[30.79px] w-[780px]">
        {thumbnailImages.map((image, index) => (
          <div key={index} className="w-[172.21px] h-[172.21px]">
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
