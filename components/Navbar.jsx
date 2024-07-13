import globalData from "@/app/data";
import { auth } from "@/auth";
import Link from "next/link";
import { HiTranslate } from "react-icons/hi";
import GoogleTranslator from "react-multilingual-content";
import CartSheet from "./CartSheet";
import ProductSearchBar from "./ProductSearchBar";
import SignInButton from "./SignInButton";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import UserButton from "./UserButton";
import Translator from "./Translator";

async function Navbar() {
  const showCategories = true;

  const session = await auth();

  return (
    <div className="pb-2 fixed w-full bg-background z-10">
      <nav className="container pt-2">
        {/* Top Navbar */}
        <div className="flex justify-between gap-2 flex-wrap items-center">
          <div className="max-w-[750px] w-full flex-wrap flex gap-10 items-center ">
            <Link href="/">
              <img
                src={globalData?.logoUrl}
                alt="logo"
                className="max-w-[70px]"
              />
            </Link>
            <ProductSearchBar />
            <Link href="/about" className="text-sm">
              About
            </Link>
            <Link href="/faq" className="text-sm">
              FAQ
            </Link>
            <Link href="/contact" className="text-sm">
              Contact
            </Link>
            <Link href="/gallery" className="text-sm">
              Gallery
            </Link>
            <Translator />
          </div>

          <div className="flex items-center gap-6">
            {session?.user ? <UserButton /> : <SignInButton />}
            <CartSheet />
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
