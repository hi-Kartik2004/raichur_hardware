import Link from "next/link";
import React from "react";
import globalData from "@/app/data";
import Marquee from "react-fast-marquee";

function FeaturedLogos() {
  return (
    <div className="bg-muted py-10">
      <div className="container">
        <p className="text-center font-semibold text-lg">
          We provide exclusive products from more than 18 renowned brands
        </p>

        <Marquee pauseOnHover={true} className="flex gap-16">
          <div className="flex justify-around gap-16 mt-10 items-center">
            {globalData?.featuredLogos.map((item, index) => (
              <Link href={item?.link} target="_blank">
                <img
                  src={item?.logo}
                  alt={item?.logo}
                  className="max-w-[200px]"
                />
              </Link>
            ))}
          </div>
        </Marquee>
      </div>
    </div>
  );
}

export default FeaturedLogos;
