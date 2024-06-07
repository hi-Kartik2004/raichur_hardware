import React from "react";
import { Button } from "./ui/button";
import ImageCaurosel from "./ImageCaurosel";
import { HiArrowCircleRight, HiArrowRight } from "react-icons/hi";
import HeroAlertDialog from "./HeroAlertDialog";
import Link from "next/link";
import globalData from "@/app/data";
import { Separator } from "./ui/separator";

function HeroSection() {
  return (
    <section className="bg-muted pb-10">
      <div className="container flex flex-wrap justify-around">
        <div className="flex items-center justify-center xl:mt-10 mt-24 h-full lg:min-h-[100vh]">
          <div className="max-w-[525px] h-full xl:mt-0">
            {globalData?.heroTitleFunc()}
            <Separator className="my-2 text-red-500" />
            <p className="text-lg mb-2 mt-6">{globalData?.heroDescription}</p>

            {globalData?.heroDescriptionSecondLineFunc()}
            <Button size="lg" asChild>
              <Link href="/category/all">
                {globalData?.heroButtonText} <HiArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>

        <ImageCaurosel images={globalData?.heroImages} />
      </div>
    </section>
  );
}

export default HeroSection;
