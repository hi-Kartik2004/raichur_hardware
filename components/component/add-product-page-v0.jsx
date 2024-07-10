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
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import globalData from "@/app/data";
import { Cross2Icon } from "@radix-ui/react-icons";

export function AddProductPageV0({
  categories,
  isProductAlreadyCreatedFunction,
}) {
  const [submitting, setSubmitting] = useState(false);
  const [sections, setSections] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [formState, setFormState] = useState({
    name: "",
    price: 0,
    mrp: 0,
    discount: "",
    maxQuantity: "",
    description: "",
    inventory: "",
    category: "",
    images: [],
    sections: [],
    colors: [],
    sizes: [],
    hide: false,
    featured: false,
    brand: "",
    excelId: "",
    addons: [],
  });

  const [colorInput, setColorInput] = useState("");
  const [sizeInput, setSizeInput] = useState("");
  const [addonInput, setAddonInput] = useState("");

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
    const { name, value, type, checked } = e.target;
    const newValue =
      name === "price" || name === "mrp" // Include MRP in the number check
        ? parseFloat(value)
        : type === "checkbox"
        ? checked
        : value;

    // Calculate the discount if MRP and price are provided
    let discount = formState.discount;
    if (name === "price" || name === "mrp") {
      const price = name === "price" ? newValue : formState.price;
      const mrp = name === "mrp" ? newValue : formState.mrp;
      if (price && mrp) {
        discount = (((mrp - price) / mrp) * 100).toFixed(2);
      }
    }

    setFormState({ ...formState, [name]: newValue, discount });
  };

  const handleAddColor = () => {
    setFormState({
      ...formState,
      colors: [...formState.colors, colorInput],
    });
    setColorInput("");
  };

  const handleRemoveColor = (index) => {
    const updatedColors = formState.colors.filter((_, idx) => idx !== index);
    setFormState({ ...formState, colors: updatedColors });
  };

  const handleAddSize = () => {
    setFormState({
      ...formState,
      sizes: [...formState.sizes, sizeInput],
    });
    setSizeInput("");
  };

  const handleRemoveSize = (index) => {
    const updatedSizes = formState.sizes.filter((_, idx) => idx !== index);
    setFormState({ ...formState, sizes: updatedSizes });
  };

  const handleAddAddon = () => {
    setFormState({
      ...formState,
      addons: [...formState.addons, addonInput],
    });
    setAddonInput("");
  };

  const handleRemoveAddon = (index) => {
    const updatedAddons = formState.addons.filter((_, idx) => idx !== index);
    setFormState({ ...formState, addons: updatedAddons });
  };

  async function addProductToFirebaseFunction({ data }) {
    const ref = collection(db, "products");
    try {
      const doc = await addDoc(ref, {
        ...data,
        name_lowercase: data.name.toLowerCase(),
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

    const resp1 = await isProductAlreadyCreatedFunction(formState.name);
    if (resp1.resp) {
      toast({
        variant: "destructive",
        title: "Product already exists",
        description: resp1.message,
      });
      setSubmitting(false);
      return;
    }

    const imageUrls = await Promise.all(
      formState.images.map((image) => getImageUrl(image))
    );

    const nameKeywords = formState.name.toLowerCase().split(" ");

    const formStateWithImageUrls = {
      ...formState,
      images: imageUrls,
      sections: sections,
      name_keywords: nameKeywords,
    };

    const resp = await addProductToFirebaseFunction({
      data: formStateWithImageUrls,
    });

    if (resp.resp) {
      toast({
        title: "Product added successfully",
        description: resp.message + ", docId: " + resp.docId,
      });

      setFormState({
        name: "",
        price: 0,
        mrp: 0,
        discount: "",
        maxQuantity: "",
        description: "",
        inventory: "",
        category: "",
        images: [],
        sections: [],
        colors: [],
        sizes: [],
        hide: false,
        featured: false,
        brand: "",
        excelId: "",
        addons: [],
      });
      setSections([]);
      setImagePreviews([]);
      document.getElementById("images").value = "";
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
            <Label htmlFor="excelId">Excel ID</Label>
            <Input
              id="excelId"
              name="excelId"
              placeholder="Enter Excel ID"
              value={formState.excelId}
              onChange={handleInputChange}
            />
          </div>

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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="mrp">MRP</Label>
            <Input
              id="mrp"
              name="mrp"
              type="number"
              step="0.01"
              placeholder="Enter MRP"
              value={formState.mrp}
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
            <Label htmlFor="discount">Discount to be shown (in %)</Label>
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
          <Label htmlFor="brands">Brands</Label>
          <Select
            id="brand"
            name="brand"
            value={formState.brand}
            onValueChange={(value) =>
              setFormState({ ...formState, brand: value })
            }
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a brand" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {globalData?.brands?.map((brand) => (
                  <SelectItem key={brand} value={brand}>
                    {brand}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
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
        <div className="space-y-2">
          <Label htmlFor="colors">Product Colors</Label>
          <div className="flex items-center gap-2">
            <Input
              id="colors"
              name="colors"
              placeholder="Enter a color"
              value={colorInput}
              onChange={(e) => setColorInput(e.target.value)}
            />
            <Button type="button" onClick={handleAddColor}>
              Add Color
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formState.colors.map((color, index) => (
              <div key={index} className="flex items-center gap-2">
                <span>{color}</span>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleRemoveColor(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="sizes">Product Sizes</Label>
          <div className="flex items-center gap-2">
            <Input
              id="sizes"
              name="sizes"
              placeholder="Enter a size"
              value={sizeInput}
              onChange={(e) => setSizeInput(e.target.value)}
            />
            <Button type="button" onClick={handleAddSize}>
              Add Size
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formState.sizes.map((size, index) => (
              <div key={index} className="flex items-center gap-2">
                <span>{size}</span>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleRemoveSize(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="hide">Hide Product</Label>
          <Label className="flex gap-2 items-center">
            <Input
              type="checkbox"
              id="hide"
              name="hide"
              checked={formState.hide}
              onChange={handleInputChange}
              className="w-6 h-6"
            />
            If checked, this product will not be displayed on the website.
          </Label>
        </div>
        <Separator />
        <div className="space-y-2">
          <Label htmlFor="featured">Featured Product</Label>
          <Label className="flex gap-2 items-center">
            <Input
              type="checkbox"
              id="featured"
              name="featured"
              checked={formState.featured}
              onChange={handleInputChange}
              className="w-6 h-6"
            />
            If checked, this product will be displayed on the main page.
          </Label>
        </div>

        <div className="space-y-2">
          <Label>Add-ons</Label>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Enter add-on Excel ID"
              value={addonInput}
              onChange={(e) => setAddonInput(e.target.value)}
            />
            <Button type="button" onClick={handleAddAddon}>
              Add Add-on
            </Button>
          </div>
          <div className="flex flex-wrap space-x-2">
            {formState.addons.map((addon, index) => (
              <div
                key={index}
                className="flex items-center space-x-1 border px-2 py-1 rounded gap-2"
              >
                <span>{addon}</span>
                <Button
                  type="button"
                  variant="destructive"
                  size="xs"
                  className="p-[0.1rem]"
                  onClick={() => handleRemoveAddon(index)}
                >
                  <Cross2Icon />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <Button className="w-full" type="submit" disabled={submitting}>
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
