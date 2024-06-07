import DesktopSidebar from "@/components/DesktopSidebar";
import MobileNavbar from "@/components/MobileNavbar";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/component/footer";
import { db } from "@/firebase/config";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

async function layout({ children }) {
  async function getAllCategories() {
    "use server";
    // Query categories collection and order by timestamp in descending order
    const q = query(collection(db, "categories"), orderBy("timestamp"));

    const snapshot = await getDocs(q);
    let data = [];
    snapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return data;
  }

  const categories = await getAllCategories();
  return (
    <div>
      <div className="hidden xl:block max-w-[1200px] w-full">
        <div>
          <Navbar showCategories={true} categories={categories} />
        </div>
      </div>

      <div className="block xl:hidden">
        <MobileNavbar />
      </div>

      <div className="grid grid-cols-12">
        <div className="col-span-2 relative bg-muted border-r hidden xl:block">
          <div className="sticky top-2">
            <DesktopSidebar />
          </div>
        </div>
        <div className="xl:col-start-3 xl:col-span-11 col-span-full w-full">
          {children}
        </div>
      </div>
      <Footer />
      {/* <Footer categories={categories} /> */}
    </div>
  );
}

export default layout;
