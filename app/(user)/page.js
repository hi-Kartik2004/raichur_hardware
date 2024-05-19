import { auth } from "@/auth";
import HeroSection from "@/components/HeroSection";
import { FeaturedProducts } from "@/components/component/featured-products";
import { HeroTestimonials } from "@/components/component/hero-testimonials";
import { Separator } from "@/components/ui/separator";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { db } from "@/firebase/config";

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
        <HeroSection />
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
