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
      <div className="hidden lg:block">
        <Navbar showCategories={true} categories={categories} />
      </div>

      <div className="block lg:hidden">
        <MobileNavbar />
      </div>
      {children}
      <Footer categories={categories} />
    </div>
  );
}

export default layout;
