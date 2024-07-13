/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/Rb0WSuSxAdJ
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

/** Add fonts into your Next.js project:

import { Arimo } from 'next/font/google'
import { Libre_Franklin } from 'next/font/google'

arimo({
  subsets: ['latin'],
  display: 'swap',
})

libre_franklin({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/

"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "../ui/separator";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/config";
import { toast } from "../ui/use-toast";
import { Toaster } from "../ui/toaster";
import globalData from "@/app/data";
import { MailIcon } from "lucide-react";
import Link from "next/link";

export function ContactPage() {
  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      timestamp: serverTimestamp(),
    };

    const ref = collection(db, "queries");
    try {
      const snapshot = await addDoc(ref, data);
      toast({
        title: "Query Submitted Successfully",
        description: "We will reach you out on your email!",
      });
      // reset the form
      form.reset();
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Unable to submit Query",
        description: `There was some error submitting your query${err}`,
      });
    }
  }
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <Toaster />
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                {globalData?.contactTitle}
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                {globalData?.contactDescription}
              </p>
            </div>
            <div className="space-y-4">
              <form className="space-y-4" onSubmit={(e) => handleSubmit(e)}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                      required={true}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Phone (without +91)</Label>
                    <Input
                      id="email"
                      placeholder="Enter your phone number"
                      min={1000000000}
                      max={9999999999}
                      type="number"
                      name="email"
                      required={true}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="Enter a subject"
                    name="subject"
                    required={true}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Enter your message"
                    name="message"
                    required={true}
                  />
                </div>
                <Button className="w-full" type="submit">
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
                Contact Information
              </h2>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <p className="text-gray-500 dark:text-gray-400">
                    {globalData?.address}
                  </p>
                </div>
                {globalData?.phones &&
                  globalData?.phones.map((phone) => (
                    <div className="flex items-center gap-2" key={phone}>
                      <PhoneIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      <Link
                        href={`tel:${phone}`}
                        className="text-gray-500 dark:text-gray-400"
                      >
                        {phone}
                      </Link>
                    </div>
                  ))}

                {globalData?.emails &&
                  globalData?.emails.map((email) => (
                    <div className="flex items-center gap-2" key={email}>
                      <MailIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      <Link
                        href={`mailto:${email}`}
                        className="text-gray-500 dark:text-gray-400"
                      >
                        {email}
                      </Link>
                    </div>
                  ))}

                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <Link
                    href={globalData?.googleMaps}
                    target="_blank"
                    className="text-gray-500 dark:text-gray-400"
                  >
                    {globalData?.googleMaps}
                  </Link>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
                Find Us
              </h2>
              <div className="rounded-lg overflow-hidden">
                <img
                  alt="Map"
                  className="w-full h-auto"
                  height="400"
                  src={`${globalData?.contactImageUrl}`}
                  style={{
                    aspectRatio: "600/400",
                    objectFit: "cover",
                  }}
                  width="600"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Separator />
    </>
  );
}

function ClockIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function MapPinIcon(props) {
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
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PhoneIcon(props) {
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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
