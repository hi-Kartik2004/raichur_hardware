import { auth } from "@/auth";
import HeroSection from "@/components/HeroSection";
import { FeaturedProducts } from "@/components/component/featured-products";
import { HeroTestimonials } from "@/components/component/hero-testimonials";
import { Separator } from "@/components/ui/separator";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { db } from "@/firebase/config";
import FeaturedLogos from "@/components/FeaturedLogos";

export default async function Home() {
  const session = await auth();

  async function getAllCategories() {
    "use server";
    const q = query(collection(db, "categories"), orderBy("timestamp", "desc"));
    const snapshot = await getDocs(q);
    const data = [];
    snapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return data;
  }

  async function getFeaturedProductsByCategory(categoryName) {
    "use server";
    const q = query(
      collection(db, "products"),
      where("category", "==", categoryName),
      where("featured", "==", true),
      orderBy("timestamp", "desc")
    );
    const snapshot = await getDocs(q);
    const data = [];
    snapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return data;
  }

  const categories = await getAllCategories();
  const featuredProductsData = await Promise.all(
    categories
      .filter((category) => category.categoryName !== "all")
      .map(async (category) => {
        const products = await getFeaturedProductsByCategory(
          category.categoryName
        );
        return { category, products };
      })
  );

  return (
    <>
      <main>
        <h2 className="hidden">
          Raichur Hardware Store, PVC in raichur, CPVC in raichur, SWR in
          raichur & ASTM Pipes in raichur, Drainage & Sewage Pipes in raichur,
          CPVC fittings in raichur, Agricultural Fittings in raichur, PVC
          Self-Fit Pipes in raichur, PVC Plain Pipes in raichur, PVC Self-Fit
          (slotted) Pipes in raichur, PVC U Column Pipes Coupler in raichur,
          ASTM Plumbing Pipes in raichur, CPVC Pipes in raichur, SWR Pipes in
          raichur, Self-Fit Pipes in raichur, Ring-Fit Pipes in raichur, Coupler
          & Union in raichur, Elbows in raichur, Tee(s) in raichur, Reducer &
          Reducing Bush in raichur, End Cap & THRD End Plug in raichur, Threaded
          Adapters in raichur (MTA & FTA), Bends in raichur, Clip & Clamps in
          raichur, Tank & Hex Nipple in raichur, UPVC Valves in raichur,
          Converter Couplers in raichur, Reducer in raichur, End Cap in raichur,
          Bends & Transition Bush in raichur, Tank Nipple in raichur, CPVC Ball
          Valve in raichur, Flange with Gasket in raichur, Mixer in raichur,
          CPVC Fittings in raichur (SCH 40), CPVC Fittings in raichur (SCH 80),
          Elbow 90° in raichur (Plain and THRD), Elbow 45° in raichur(Plain),
          End Cap (Plain and THRD), Tail Piece in raichur, Butterfly Valve in
          raichur, Service Saddle in raichur (THRD), Reducing Bush in raichur,
          Single Y in raichur (Reducing & non-reducing), Bend in raichur (45° &
          90°), Repairing Coupler in raichur (R/R), Single Y & Double Y in
          raichur, Bend in raichur (Double Socket), Tee in raichur (Double
          Socket), Gully Trap in raichur, Multi-Floor Trap in raichur, Nahani
          Trap in raichur, P-Trap & S-Trap in raichur, Vent Cowl in raichur, WC
          Connector in raichur, Socket Plug & Door Cap in raichur, Drip
          Irrigation in raichur, Sprinkle Irrigation in raichur, Subsurface
          Drip, PVC Ball Valves, Faucets, Shower, Thermostatic Mixers in
          raichur, Shower panel in raichur, Water heaters in raichur, Sanitary
          ware in raichur, Wellness in raichur, Shower enclosures in raichur,
          Flushing systems in raichur, Drains in raichur, Bath Accessories in
          raichur, Digital locks in raichur, Mortise locks in raichur, Rim locks
          in raichur, Cylindrical locks in raichur, Padlocks, Furniture locks in
          raichur, Home décor handles in raichur, Door controls in raichur, Door
          fittings in raichur, Wardrobe fittings in raichur, Bed fittings in
          raichur, Furniture fittings in raichur, Kitchen fittings in raichur,
          Luxury Kitchen Sinks in raichur, Quartz Kitchen Sinks in raichur,
          Stainless steel sinks in raichur, Open Well Pumps in raichur,
          Submersible Pumps in raichur, Monoblock Pumps in raichur, Jet Pumps in
          raichur, Sewage Pumps in raichur, Electric Induction Motors in
          raichur, CMBE And CMBE Twin in raichur, CM Single Booster in raichur,
          SCALA1 and SCALA2 booster in raichur, Shower and other Boosters in
          raichur, Overhead Water Tanks in raichur, Ball Valve in raichur, Gate
          Valve in raichur, Sluice Valve in raichur, Horizontal Check Valve in
          raichur, Vertical Check Valve in raichur, Cast Iron Manhole covers in
          raichur.
        </h2>
        <HeroSection />
        <Separator />
        <FeaturedLogos />
        <Separator />
        {featuredProductsData.map(
          ({ category, products }, index) =>
            products.length > 0 && (
              <div key={category.id}>
                <FeaturedProducts
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-muted"}
                  category={category}
                  products={products}
                />
                <Separator />
              </div>
            )
        )}
        <HeroTestimonials />
      </main>
    </>
  );
}
