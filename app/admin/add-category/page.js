import { AddCategoryFormPageV0 } from "@/components/component/add-category-form-page-v0";
import { db } from "@/firebase/config";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import React from "react";
// import { db } from "@/firebase/config";

async function CreateCategory() {
  async function isCategoryAlreadyCreated(categoryName) {
    "use server";
    // check if category already exists
    const q = query(
      collection(db, "categories"),
      where("categoryName", "==", categoryName)
    );
    const snapshot = await getDocs(q);
    if (snapshot.size > 0) {
      let data = [];
      snapshot.forEach((doc) => {
        data.push(doc.data());
      });
      return {
        resp: true,
        message: "The category you're tried with already exists",
        data: data,
      };
    } else {
      return {
        resp: false,
        message: "This category is not found",
        data: null,
      };
    }
  }

  async function addCategoryToFirebase(
    categoryName,
    categoryTitle,
    categoryDescription,
    categoryImageUrl,
    dropdown,
    globalDropdown
  ) {
    "use server";
    const ref = collection(db, "categories");
    try {
      const doc = await addDoc(ref, {
        categoryName: categoryName,
        categoryTitle: categoryTitle,
        categoryDescription: categoryDescription,
        categoryImageUrl: categoryImageUrl,
        dropdown: dropdown,
        globalDropdown: globalDropdown,
        timestamp: serverTimestamp(),
      });

      return {
        resp: true,
        message: "Category added successfully",
        docId: doc.id,
      };
    } catch (error) {
      console.error("Error addCategoryToFirebase: ", error);
      return {
        resp: false,
        message: error.message,
        docId: null,
      };
    }
  }

  async function getAllCategories() {
    "use server";
    // const q = query(collection(db, "categories"));
    // order by timestamp
    const q = query(collection(db, "categories"), orderBy("timestamp", "desc"));

    const snapshot = await getDocs(q);
    let data = [];
    snapshot.forEach((doc) => {
      data.push(doc.data());
    });
    return data;
  }

  async function deleteCategory(categoryName) {
    "use server";

    try {
      const q = query(
        collection(db, "categories"),
        where("categoryName", "==", categoryName)
      );
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        return {
          resp: false,
          message: "Category not found",
        };
      }

      snapshot.forEach((doc) => {
        deleteDoc("/categories/" + doc.id);
      });

      return {
        resp: true,
        message: "Category deleted successfully",
      };
    } catch (error) {
      return {
        resp: false,
        message: "Failed to delete category",
        error: error.message,
      };
    }
  }
  const data = await getAllCategories();

  return (
    <AddCategoryFormPageV0
      addCategoryToFirebaseFunction={addCategoryToFirebase}
      isCategoryAlreadyCreatedFunction={isCategoryAlreadyCreated}
      deleteCategoryFunction={deleteCategory}
      categories={data}
    />
  );
}

export default CreateCategory;
