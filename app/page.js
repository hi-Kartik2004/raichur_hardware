import { signIn } from "@/auth";
import HeroSection from "@/components/HeroSection";
import MobileNavbar from "@/components/MobileNavbar";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main>
      <div className="hidden lg:block">
        <Navbar />
      </div>

      <div className="block lg:hidden">
        <MobileNavbar />
      </div>

      <HeroSection />
    </main>
  );
}
