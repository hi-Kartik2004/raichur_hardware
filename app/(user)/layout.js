import MobileNavbar from "@/components/MobileNavbar";
import Navbar from "@/components/Navbar";
import React from "react";

function layout({ children }) {
  return (
    <div>
      <div className="hidden lg:block">
        <Navbar />
      </div>

      <div className="block lg:hidden">
        <MobileNavbar />
      </div>
      {children}
    </div>
  );
}

export default layout;
