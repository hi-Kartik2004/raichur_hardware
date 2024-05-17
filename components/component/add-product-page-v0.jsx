"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectGroup,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "@/firebase/config";
import { toast } from "../ui/use-toast";
import { Toaster } from "../ui/toaster";
import {
  Timestamp,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

export function AddProductPageV0({ categories }) {
  const [submitting, setSubmitting] = useState(false);
  const [sections, setSections] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [formState, setFormState] = useState({
    name: "",
    price: "",
    discount: "",
    maxQuantity: "",
    description: "",
    inventory: "",
    category: "",
    images: [],
    sections: [],
  });

  async function getImageUrl(categoryImage) {
    if (!categoryImage) return null;

    const storageRef = ref(storage, `productImages/${categoryImage.name}`);
    const snapshot = await uploadBytes(storageRef, categoryImage);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  }

  const handleAddSection = () => {
    setSections([...sections, { title: "", description: "" }]);
    setFormState({
      ...formState,
      sections: [...formState.sections, { title: "", description: "" }],
    });
  };

  const handleRemoveSection = (index) => {
    const updatedSections = sections.filter((_, idx) => idx !== index);
    setSections(updatedSections);
    const updatedFormSections = formState.sections.filter(
      (_, idx) => idx !== index
    );
    setFormState({ ...formState, sections: updatedFormSections });
  };

  const handleSectionChange = (index, field, value) => {
    const updatedSections = sections.map((section, idx) =>
      idx === index ? { ...section, [field]: value } : section
    );
    setSections(updatedSections);
    const updatedFormSections = formState.sections.map((section, idx) =>
      idx === index ? { ...section, [field]: value } : section
    );
    setFormState({ ...formState, sections: updatedFormSections });
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setImagePreviews(files.map((file) => URL.createObjectURL(file)));
    setFormState({ ...formState, images: files });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  async function addProductToFirebaseFunction({ data }) {
    const ref = collection(db, "products");
    try {
      const doc = await addDoc(ref, {
        ...data,
        timestamp: serverTimestamp(),
      });

      return {
        resp: true,
        message: "Product added successfully",
        docId: doc.id,
      };
    } catch (error) {
      return {
        resp: false,
        message: error.message,
        docId: null,
      };
    }
  }

  const handleSubmit = async (e) => {
    setSubmitting(true);
    e.preventDefault();
    console.log(formState);
    // for all images get their imageURls and then add to firebase
    const imageUrls = await Promise.all(
      formState.images.map((image) => getImageUrl(image))
    );

    const formStateWithImageUrls = {
      ...formState,
      images: imageUrls,
      sections: sections,
    };

    const resp = await addProductToFirebaseFunction({
      data: formStateWithImageUrls,
    });

    if (resp.resp) {
      toast({
        title: "Product added successfully",
        description: resp.message + ", docId: " + resp.docId,
      });

      // Reset form state
      setFormState({
        name: "",
        price: "",
        discount: "",
        maxQuantity: "",
        description: "",
        inventory: "",
        category: "",
        images: [],
        sections: [],
      });
      setSections([]);
      setImagePreviews([]);
      document.getElementById("images").value = ""; // Clear the file input
    } else {
      toast({
        variant: "destructive",
        title: "Failed to add Product",
        description: resp.message,
      });
    }
    setSubmitting(false);
  };

  return (
    <div key="1" className="mx-auto max-w-2xl space-y-8 py-12 px-4">
      <Toaster />
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Create a New Product</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Fill out the form below to add a new product to your store.
        </p>
      </div>
      <form className="grid gap-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter product name"
              required
              value={formState.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              placeholder="Enter price"
              type="number"
              required
              value={formState.price}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="discount">Discount (in %)</Label>
            <Input
              id="discount"
              name="discount"
              placeholder="Enter discount"
              type="number"
              max={100}
              required
              value={formState.discount}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxQuantity">Max per person</Label>
            <Input
              id="maxQuantity"
              name="maxQuantity"
              className="maxQuantity"
              placeholder="Maximum quantity one person can buy"
              type="number"
              required
              value={formState.maxQuantity}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            className="min-h-[120px]"
            id="description"
            name="description"
            placeholder="Enter product description"
            required
            value={formState.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="inventory">Inventory</Label>
            <Input
              id="inventory"
              name="inventory"
              placeholder="Enter inventory quantity"
              type="number"
              required
              value={formState.inventory}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              id="category"
              name="category"
              value={formState.category}
              onValueChange={(value) =>
                setFormState({ ...formState, category: value })
              }
              required
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories.map((category) => (
                    <SelectItem
                      key={category.categoryName}
                      value={category.categoryName}
                    >
                      {category.categoryName}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="images">Product Images</Label>
          <div className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="images"
                className="flex flex-col items-center justify-center space-y-2 border-2 border-dashed border-gray-300 rounded-md p-6 dark:border-gray-600 cursor-pointer"
              >
                <UploadIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Drag and drop files or click to upload
                </p>
              </label>
              <input
                className="sr-only"
                id="images"
                name="images"
                multiple
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                required
              />
            </div>
            <div className="flex flex-wrap gap-4">
              {imagePreviews.map((src, index) => (
                <img
                  key={index}
                  alt="Product Image"
                  className="rounded-md object-cover"
                  height={100}
                  src={src}
                  style={{
                    aspectRatio: "100/100",
                    objectFit: "cover",
                  }}
                  width={100}
                />
              ))}
            </div>
          </div>
        </div>
        {sections.map((section, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor={`section-title-${index}`}>Section Title</Label>
              <Button
                variant="outline"
                onClick={() => handleRemoveSection(index)}
              >
                Remove Section
              </Button>
            </div>
            <Input
              id={`section-title-${index}`}
              name={`section-title-${index}`}
              placeholder="Enter section title"
              value={section.title}
              onChange={(e) =>
                handleSectionChange(index, "title", e.target.value)
              }
              required
              className="mb-2"
            />
            <br />
            <Label htmlFor={`section-description-${index}`}>
              Section Description
            </Label>
            <Textarea
              id={`section-description-${index}`}
              name={`section-description-${index}`}
              placeholder="Enter section description"
              value={section.description}
              onChange={(e) =>
                handleSectionChange(index, "description", e.target.value)
              }
              required
            />
          </div>
        ))}
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Add Additional Section</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Add an additional section to the product form.
          </p>
          <Button
            className="w-full"
            type="button"
            variant="outline"
            onClick={handleAddSection}
          >
            Add Section
          </Button>
        </div>
        <Button className="w-full" type="submit">
          {submitting ? "Submitting..." : "Create Product"}
        </Button>
      </form>
    </div>
  );
}

function UploadIcon(props) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}
