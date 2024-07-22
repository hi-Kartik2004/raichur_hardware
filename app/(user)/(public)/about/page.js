import { AboutPageV0 } from "@/components/component/about-page-v0";
import React from "react";

export const metadata = {
  title: "About",
  description:
    "About raichur hardware store, popular hardware store in raichur",
};

function AboutPage() {
  return (
    <div className="pt-20 md:pt-24">
      <AboutPageV0 />
    </div>
  );
}

export default AboutPage;
