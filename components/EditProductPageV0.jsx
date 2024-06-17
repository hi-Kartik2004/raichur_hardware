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
import { Timestamp, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "./ui/use-toast";
import { Toaster } from "./ui/toaster";
import { useRouter } from "next/navigation";
import { Separator } from "./ui/separator";
import { Cross2Icon } from "@radix-ui/react-icons";
import { UploadIcon } from "lucide-react";

export function EditProductPageV0({
  categories,
  isProductAlreadyCreatedFunction,
  product,
}) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [sections, setSections] = useState(product?.sections || []);
  const [addonInput, setAddonInput] = useState("");
  const [colorInput, setColorInput] = useState("");
  const [sizeInput, setSizeInput] = useState("");
  const [imagePreviews, setImagePreviews] = useState(product?.images || []);
  const [formState, setFormState] = useState({
    name: product?.name || "",
    price: product?.price || 0,
    mrp: product?.mrp || 0,
    discount: product?.discount || "",
    maxQuantity: product?.maxQuantity || "",
    description: product?.description || "",
    inventory: product?.inventory || "",
    category: product?.category || "",
    images: [],
    sections: product?.sections || [],
    colors: product?.colors || [],
    sizes: product?.sizes || [],
    hide: product?.hide || false,
    featured: product?.featured || false,
    brand: product?.brand || "",
    excelId: product?.excelId || "",
    addons: product?.addons || [],
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
    const newImagePreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newImagePreviews]);
    setFormState((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const handleRemoveImage = (index) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setFormState((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
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

  async function updateProductInFirebaseFunction(productId, { data }) {
    const productRef = doc(db, "products", productId);
    try {
      await updateDoc(productRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });

      return {
        resp: true,
        message: "Product updated successfully",
      };
    } catch (error) {
      return {
        resp: false,
        message: error.message,
      };
    }
  }

  const handleSubmit = async (e) => {
    setSubmitting(true);
    e.preventDefault();

    const resp1 = await isProductAlreadyCreatedFunction(formState.name);
    if (resp1.resp && formState.name !== product.name) {
      toast({
        variant: "destructive",
        title: "Product already exists",
        description: resp1.message,
      });
      setSubmitting(false);
      return;
    }

    const newImageUrls = await Promise.all(
      formState.images.map((image) => getImageUrl(image))
    );

    const imageUrls = [
      ...imagePreviews.filter((preview) => !preview.startsWith("blob:")),
      ...newImageUrls,
    ];

    const formStateWithImageUrls = {
      ...formState,
      images: imageUrls,
      sections: sections,
    };

    const resp = await updateProductInFirebaseFunction(product.id, {
      data: formStateWithImageUrls,
    });

    if (resp.resp) {
      toast({
        title: "Product updated successfully",
        description: resp.message,
      });
      router.refresh();
    } else {
      toast({
        variant: "destructive",
        title: "Failed to update Product",
        description: resp.message,
      });
    }
    setSubmitting(false);
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

  const handleAddColor = (color) => {
    setFormState({
      ...formState,
      colors: [...formState.colors, color],
    });
    setColorInput("");
  };

  const handleRemoveColor = (index) => {
    const updatedColors = formState.colors.filter((_, idx) => idx !== index);
    setFormState({ ...formState, colors: updatedColors });
  };

  const handleAddSize = (size) => {
    setFormState({
      ...formState,
      sizes: [...formState.sizes, size],
    });
    setSizeInput("");
  };

  const handleRemoveSize = (index) => {
    const updatedSizes = formState.sizes.filter((_, idx) => idx !== index);
    setFormState({ ...formState, sizes: updatedSizes });
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8 pb-8 px-4 overflow-y-auto">
      <Toaster />
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Edit {product?.name}</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Fill in the details to edit this product.
        </p>
      </div>
      <form className="grid gap-6" onSubmit={handleSubmit}>
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
            <Label htmlFor="mrp">MRP</Label>
            <Input
              id="mrp"
              name="mrp"
              placeholder="Enter MRP"
              type="number"
              required
              value={formState.mrp}
              onChange={handleInputChange}
            />
          </div>
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
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="maxQuantity">Max Quantity per person</Label>
            <Input
              id="maxQuantity"
              name="maxQuantity"
              placeholder="Maximum quantity one person can buy"
              type="number"
              required
              value={formState.maxQuantity}
              onChange={handleInputChange}
            />
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
                required={imagePreviews.length === 0}
              />
            </div>
            <div className="flex flex-wrap gap-4">
              {imagePreviews.map((src, index) => (
                <div key={index} className="relative">
                  <img
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
                  <Button
                    className="absolute top-0 right-0"
                    variant="outline"
                    onClick={() => handleRemoveImage(index)}
                    size="xs"
                  >
                    ❌
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
        {formState.sections.map((section, index) => (
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
            If checked, this product will be displayed on the home page.
          </Label>
        </div>
        <div className="space-y-2">
          <Label htmlFor="brand">Brand</Label>
          <Input
            id="brand"
            name="brand"
            placeholder="Enter brand name"
            value={formState.brand}
            onChange={handleInputChange}
          />
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
        <div className="space-y-2">
          <Label htmlFor="colors">Colors</Label>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Enter color"
              value={colorInput}
              onChange={(e) => setColorInput(e.target.value)}
            />
            <Button type="button" onClick={() => handleAddColor(colorInput)}>
              Add Color
            </Button>
          </div>
          <div className="flex flex-wrap space-x-2">
            {formState.colors.map((color, index) => (
              <div
                key={index}
                className="flex items-center space-x-1 border px-2 py-1 rounded gap-2"
              >
                <span>{color}</span>
                <Button
                  type="button"
                  variant="destructive"
                  size="xs"
                  className="p-[0.1rem]"
                  onClick={() => handleRemoveColor(index)}
                >
                  <Cross2Icon />
                </Button>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="sizes">Sizes</Label>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Enter size"
              value={sizeInput}
              onChange={(e) => setSizeInput(e.target.value)}
            />
            <Button type="button" onClick={() => handleAddSize(sizeInput)}>
              Add Size
            </Button>
          </div>
          <div className="flex flex-wrap space-x-2">
            {formState.sizes.map((size, index) => (
              <div
                key={index}
                className="flex items-center space-x-1 border px-2 py-1 rounded gap-2"
              >
                <span>{size}</span>
                <Button
                  type="button"
                  variant="destructive"
                  size="xs"
                  className="p-[0.1rem]"
                  onClick={() => handleRemoveSize(index)}
                >
                  <Cross2Icon />
                </Button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between space-x-4">
          <Button type="submit" loading={submitting}>
            Update Product
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={submitting}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
