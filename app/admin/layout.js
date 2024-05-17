import { auth } from "@/auth";
import React from "react";
import data from "@/app/data";
import NotAuthorized from "@/components/NotAuthorized";
import Navbar from "@/components/Navbar";
import MobileNavbar from "@/components/MobileNavbar";
import AdminNavbar from "@/components/AdminNavbar";

async function layout({ children }) {
  const session = await auth();
  if (data?.adminEmails?.includes(session?.user?.email) === false) {
    return (
      <div>
        <NotAuthorized />
      </div>
    );
  }
  return (
    <div>
      <div className="text-center">
        <AdminNavbar />
      </div>
      <div className="">{children}</div>
    </div>
  );
}

export default layout;
