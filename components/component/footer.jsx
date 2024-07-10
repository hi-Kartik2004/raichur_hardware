/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/WYorILK6Cga
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
"use client";
import Link from "next/link";
import globalData from "@/app/data";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa6";
import { Separator } from "../ui/separator";
import { useEffect, useState } from "react";

export function Footer() {
  const [categories, setCategories] = useState({});

  useEffect(() => {
    const fetchCategories = () => {
      const categoriesFromStorage = localStorage.getItem("categories");
      if (categoriesFromStorage) {
        setCategories(JSON.parse(categoriesFromStorage));
      }
    };

    fetchCategories(); // Initial fetch

    // Set interval to fetch categories every second
    const intervalId = setInterval(fetchCategories, 1000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const allDropdowns = globalData?.globalDropdowns.reduce(
    (accumulator, currentValue) => {
      return [...accumulator, ...currentValue.dropdowns];
    },
    []
  );

  return (
    <>
      <footer className="bg-gray-100 dark:bg-gray-800 pt-12 pb-6 md:pt-16 md:pb-8 px-6">
        <div className="flex justify-evenly gap-10 flex-wrap w-full">
          <div className="space-y-4 md:pr-4 md:border-r-2 col-span-4 max-w-[500px] w-full">
            <Link
              className="flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-50"
              href="#"
            >
              <span>{globalData?.companyName}</span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400">
              {globalData?.footerDescription}
            </p>
            <div className="flex justify-between gap-4 flex-wrap items-center">
              <img
                src={globalData?.logoUrl}
                alt="logo"
                className="max-w-[120px]"
              />

              <div>
                <img
                  src="/care_agency_logo_nobg.png"
                  alt="care_agency_logo"
                  className="rounded max-w-[150px]"
                />
              </div>
            </div>

            <Separator />
            <div className="w-full flex justify-center md:justify-end flex-col">
              <div className="">
                <h4 className="text-md">Connect with us!</h4>
                <div className="flex justify-between gap-2 flex-wrap mt-4 max-w-[200px]">
                  <Link href={globalData?.facebook} target="_blank">
                    <FaFacebook size={30} />
                  </Link>

                  <Link href={globalData?.instagram} target="_blank">
                    <FaInstagram size={30} />
                  </Link>

                  <Link href={globalData?.linkedin} target="_blank">
                    <FaLinkedin size={30} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-4 max-w-[900px]">
            <div className="flex flex-wrap justify-between gap-10">
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900 dark:text-gray-50">
                  Quick Links
                </h4>
                <ul className="space-y-1">
                  <li>
                    <Link
                      className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 text-sm"
                      href="/about"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 text-sm"
                      href="/faq"
                    >
                      FAQs
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 text-sm"
                      href="/gallery"
                    >
                      Gallery
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 text-sm"
                      href="/contact"
                    >
                      Contact
                    </Link>
                  </li>

                  {/* <li>
                <Link
                  className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  href="#"
                >
                  Shipping & Returns
                </Link>
              </li> */}
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900 dark:text-gray-50">
                  About
                </h4>
                <ul className="space-y-1">
                  <li>
                    <Link
                      className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 text-sm"
                      href={`/`}
                    >
                      Brands
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 text-sm"
                      href={`${globalData?.privacy}`}
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 text-sm"
                      href={`${globalData?.termsOfService}`}
                    >
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 text-sm"
                      href={`${globalData?.returnAndCancellationPolicy}`}
                    >
                      Returns & Cancellation Policy
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900 dark:text-gray-50">
                  Socials
                </h4>
                <ul className="space-y-1">
                  <li>
                    <Link
                      className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 text-sm"
                      href={`${globalData?.facebook}`}
                    >
                      Facebook
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 text-sm"
                      href={`${globalData?.instagram}`}
                    >
                      Instagram
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 text-sm"
                      href={`${globalData?.linkedin}`}
                    >
                      Linkedin
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900 dark:text-gray-50">
                  Related Links
                </h4>
                <ul className="space-y-1">
                  <li>
                    <Link
                      className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 text-sm"
                      href={`/my-orders`}
                    >
                      My orders
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 text-sm"
                      href={`${globalData?.termsOfService}`}
                    >
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>

              {/* {allDropdowns &&
            allDropdowns.map((dropdown) => (
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900 dark:text-gray-50 capitalize">
                  {dropdown}
                </h4>
                <ul className="space-y-1">
                  {categories &&
                    categories[dropdown] &&
                    categories[dropdown].map((category) => (
                      <li key={category.categoryName}>
                        <Link
                          href={`/category/${category.categoryName}`}
                          className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 text-sm"
                        >
                          {category.categoryTitle}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))} */}
            </div>

            <div>
              <Separator />
              <div className="mt-6">
                <h4 className="text-semibold text-start">Our Reach</h4>
                <div className="flex justify-between gap-4 flex-wrap mt-4 max-w-full">
                  {globalData?.footerReach.map((ele, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-1 items-start"
                    >
                      <h3 className="text-xl font-semibold">{ele?.stat}+</h3>
                      <p className="text-sm text-muted-foreground">
                        {ele?.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="flex flex-col gap-4 w-full"></div> */}
      </footer>
      <div className="container max-w-8xl p-4 flex items-center justify-center bg-white">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          ©{new Date().getFullYear()} Raichur hardware Store. All rights
          reserved.
        </p>
      </div>
    </>
  );
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
