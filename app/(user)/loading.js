"use client";
import { Loader2Icon } from "lucide-react";
import React from "react";

function loading() {
  // quotes for an hardware store website
  const quotes = [
    "Offering a wide range of products to meet your needs.",
    " Building trust, faith and delivering quality services.",
    "Proudly serving over 2,00,000+ happy customers.",
    "Providing reliable service since 1970.",
    "One of the most trusted hardware store in Raichur.",
    "Discover great deals and enjoy a seamless shopping experience.",
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  // fake delay of 2 seconds
  React.useEffect(() => {
    setTimeout(() => {
      console.log("loading done");
    }, 2000);
  }, []);
  return (
    <div className="w-full h-screen flex justify-center items-center bg-muted">
      <div className="flex flex-col gap-4 items-center">
        <Loader2Icon className=" animate-spin" size={50} />
        <p className="text-center">{randomQuote}</p>
      </div>
    </div>
  );
}

export default loading;
