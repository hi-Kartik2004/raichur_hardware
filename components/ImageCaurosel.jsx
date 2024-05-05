"use client";
import React, { useEffect, useState } from "react";

function ImageCarousel() {
  const images = [
    "https://images.pexels.com/photos/1727684/pexels-photo-1727684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/19882232/pexels-photo-19882232/free-photo-of-woman-on-wheelchair-in-supermarket.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/1797428/pexels-photo-1797428.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];

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
      clearInterval(intervalId);
    };
  }, []);

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
    <div className="max-w-[600px] mt-10 xl:mt-0 w-full lg:p-0 p-2 border-gray-400 lg:border-none border rounded">
      <img
        src={images[imageIndex]}
        alt="hero_img"
        className="w-full h-full object-cover rounded"
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
