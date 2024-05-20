"use client";
import { Loader2Icon } from "lucide-react";
import React from "react";

function loading() {
  // quotes for an hardware store website
  const quotes = [
    "We have most of the products in the market.",
    "Building trust, faith and delivering quality services",
    "We have delivered services to more than 2 Lakh customers",
    "We have been in the business since 1990",
    "We are the most trusted hardware store in Raichur",
    "We have the best deals and enjoy a seamless shopping experience",
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  // fake delay of 2 seconds
  React.useEffect(() => {
    setTimeout(() => {
      console.log("loading done");
    }, 2000);
  }, []);
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-muted">
      <div className="flex flex-col gap-4 items-center">
        <Loader2Icon className=" animate-spin" size={50} />
        <p className="text-center">{randomQuote}</p>
      </div>
    </div>
  );
}

export default loading;
