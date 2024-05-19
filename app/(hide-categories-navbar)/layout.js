import MobileNavbar from "@/components/MobileNavbar";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/component/footer";
import React from "react";

function layout({ children }) {
  return (
    <div>
      <div className="hidden lg:block">
        <Navbar showCategories={false} />
      </div>

      <div className="block lg:hidden">
        <MobileNavbar />
      </div>
      {children}
      <Footer />
    </div>
  );
}

export default layout;
