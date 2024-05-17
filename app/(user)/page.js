import { auth, signIn } from "@/auth";
import HeroAlertDialog from "@/components/HeroAlertDialog";
import HeroSection from "@/components/HeroSection";
import MobileNavbar from "@/components/MobileNavbar";
import Navbar from "@/components/Navbar";
import { FeaturedProducts } from "@/components/component/featured-products";
import { HeroTestimonials } from "@/components/component/hero-testimonials";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";

export default async function Home() {
  const session = await auth();
  return (
    <>
      <main>
        <HeroAlertDialog />

        <HeroSection />
        <Separator />
        <FeaturedProducts className={"bg-gray-100"} />
        <Separator />
        <FeaturedProducts className={"bg-muted"} />
        <Separator />
        <FeaturedProducts className={"bg-gray-100"} />
        <Separator />
        <HeroTestimonials />
      </main>
    </>
  );
}
