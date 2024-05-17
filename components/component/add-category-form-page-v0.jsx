"use client";
import { useState } from "react";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "@/firebase/config";
import { toast } from "../ui/use-toast";
import { Toaster } from "../ui/toaster";
import {
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { Search } from "lucide-react";
import { Dialog, DialogContent } from "../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Router, useRouter } from "next/navigation";

export function AddCategoryFormPageV0({
  addCategoryToFirebaseFunction,
  isCategoryAlreadyCreatedFunction,
  deleteCategoryFunction,
  categories,
}) {
  const [submitting, setSubmitting] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  async function getImageUrl(categoryImage) {
    if (!categoryImage) return null;

    const storageRef = ref(storage, `categoryImages/${categoryImage.name}`);
    const snapshot = await uploadBytes(storageRef, categoryImage);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.target);
    const categoryName = formData.get("categoryName");
    const isCategoryAlreadyCreatedResp = await isCategoryAlreadyCreatedFunction(
      categoryName
    );
    if (isCategoryAlreadyCreatedResp.resp === true) {
      toast({
        variant: "destructive",
        title: "Category already exists",
        description: isCategoryAlreadyCreatedResp.message,
      });
      setSubmitting(false);
      return;
    }
    const categoryImage = formData.get("categoryImage");
    const categoryImageUrl = categoryImage
      ? await getImageUrl(categoryImage)
      : "";
    const categoryTitle = formData.get("categoryTitle");
    const categoryDescription = formData.get("categoryDescription");
    const resp = await addCategoryToFirebaseFunction(
      categoryName,
      categoryTitle,
      categoryDescription,
      categoryImageUrl
    );

    if (resp.resp) {
      toast({
        title: "Category added successfully",
        description: resp.message + ", docId: " + resp.docId,
      });
      router.refresh();
    } else {
      toast({
        variant: "destructive",
        title: "Failed to add Category",
        description: resp.message,
      });
    }
    setSubmitting(false);
  }

  async function handleCategoryDelete(categoryName) {
    try {
      const q = query(
        collection(db, "categories"),
        where("categoryName", "==", categoryName)
      );

      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        toast({
          variant: "destructive",
          title: "Failed to delete Category",
          description: "Category not found",
        });
        return;
      }

      for (const doc of snapshot.docs) {
        await deleteDoc(doc.ref);
      }

      toast({
        title: "Category deleted successfully",
        description: "Category " + categoryName + " deleted",
      });

      router.refresh();
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Failed to delete Category",
        description: err.message,
      });
    }
  }

  const filteredCategories = categories.filter((category) =>
    category.categoryName.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 px-4 md:px-6 py-8 max-w-4xl mx-auto">
      <Toaster />
      <div>
        <h1 className="text-2xl font-bold">Category Management</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Manage your product categories here.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Add New Category</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="name">Category Name</Label>
              <Input
                id="name"
                name="categoryName"
                placeholder="Enter category name"
                required={true}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="title">Category Title</Label>
              <Input
                id="title"
                name="categoryTitle"
                placeholder="Enter category title"
                required={true}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Category Description</Label>
              <Textarea
                id="description"
                placeholder="Enter category description"
                name="categoryDescription"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="categoryImage">Category Image</Label>
              <Input type="file" id="categoryImage" name={"categoryImage"} />
            </div>
            <Button className="justify-self-end" type="submit">
              {submitting ? "Adding Category..." : "Add Category"}
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex">
          <div className="mb-2 flex justify-between gap-2 items-center flex-wrap">
            <CardTitle>Existing Categories</CardTitle>
            <span
              className="underline underline-offset-4 text-sm cursor-pointer"
              onClick={() => {
                window.location.reload();
              }}
            >
              Refresh
            </span>
          </div>
          <div className="mt-2 relative">
            <Input
              placeholder="Search categories"
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
            <Search className="h-5 w-5 text-primary absolute right-2 top-[50%] -translate-y-[50%]" />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Image</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.map((category) => (
                <TableRow key={category?.categoryName}>
                  <TableCell>{category?.categoryName}</TableCell>
                  <TableCell>{category?.categoryTitle}</TableCell>
                  <TableCell>{category?.categoryDescription}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>View Image</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <h3 className="text-lg">
                          Category {category?.categoryName} Image
                        </h3>
                        <img
                          src={category?.categoryImageUrl}
                          alt="category-image"
                          className=""
                        />
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => {
                        handleCategoryDelete(category?.categoryName);
                      }}
                    >
                      <TrashIcon className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function TrashIcon(props) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
