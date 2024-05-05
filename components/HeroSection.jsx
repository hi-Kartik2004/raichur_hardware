import React from "react";
import { Button } from "./ui/button";
import ImageCaurosel from "./ImageCaurosel";
import { HiArrowCircleRight, HiArrowRight } from "react-icons/hi";

function HeroSection() {
  return (
    <section className="bg-muted mb-10">
      <div className="container flex flex-wrap justify-around">
        <div className="flex items-center justify-center h-full xl:min-h-[80vh]">
          <div className="max-w-[635px] h-full mt-10 xl:mt-0">
            <h1 className="text-5xl font-bold" style={{ lineHeight: "3.5rem" }}>
              Most <span className="text-amber-950"> Trusted Hardware</span>{" "}
              Wholesale Store in{" "}
              <span className="text-amber-950">Raichur ✨</span>
            </h1>
            <p className="text-lg my-2">
              We have most of the products in the market. Check them out!
            </p>

            <p className="text-lg my-6">
              Building trust, faith and having delivered services to{" "}
              <span className="underline underline-offset-4">
                more than 2 Lakh
              </span>{" "}
              customers and counting in Raichur and near{" "}
              <span className="underline underline-offset-4">since 1990</span>.
            </p>
            <Button size="lg">
              Shop Now <HiArrowRight className="ml-2" />
            </Button>
          </div>
        </div>

        <ImageCaurosel />
      </div>
    </section>
  );
}

export default HeroSection;
