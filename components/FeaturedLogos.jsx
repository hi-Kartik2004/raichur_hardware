import Link from "next/link";
import React from "react";

function FeaturedLogos() {
  return (
    <div className="bg-muted py-10">
      <div className="container">
        <p className="text-center">
          We have the most preimum products from premium companies.
        </p>

        <div className="flex justify-around gap-8 flex-wrap mt-10">
          <Link href="/">
            <img src="/placeholder.svg" alt="logo" className="max-w-[200px]" />
          </Link>
          <Link href="/">
            <img src="/placeholder.svg" alt="logo" className="max-w-[200px]" />
          </Link>
          <Link href="/">
            <img src="/placeholder.svg" alt="logo" className="max-w-[200px]" />
          </Link>
          <Link href="/">
            <img src="/placeholder.svg" alt="logo" className="max-w-[200px]" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FeaturedLogos;
