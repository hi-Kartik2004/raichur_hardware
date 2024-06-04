"use client";
import React, { useEffect, useState } from "react";

function ImageCarousel({ images }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    setIntervalId(interval);

    return () => {
      clearInterval(interval);
    };
  }, [images.length]);

  const handleDotClick = (index) => {
    clearInterval(intervalId);
    setImageIndex(index);

    const interval = setInterval(() => {
      setImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    setIntervalId(interval);
  };

  return (
    <div className="max-w-[550px] mt-10 xl:mt-0 w-full lg:p-0 p-2 border-gray-400 lg:border-none border rounded">
      <img
        src={images[imageIndex]}
        alt="hero_img"
        className="w-full h-full object-cover rounded object-top"
      />

      <div className="flex justify-center -mt-4">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 mx-2 rounded-full cursor-pointer ${
              imageIndex === index ? "bg-blue-500" : "bg-secondary"
            }`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageCarousel;
