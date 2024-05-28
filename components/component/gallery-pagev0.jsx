"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogContent,
  Dialog,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { db, storage } from "@/firebase/config";
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import globalData from "@/app/data";
import { toast } from "../ui/use-toast";
import { Toaster } from "../ui/toaster";

export function GalleryPagev0() {
  const [images, setImages] = useState([]);
  const [titleFilter, setTitleFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const modalRef = useRef(null);

  async function uploadImage(file) {
    const storageRef = ref(storage, `gallery/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  }

  async function addImageToGallery(title, date, imageUrl) {
    const galleryRef = collection(db, "gallery");
    try {
      await addDoc(galleryRef, {
        title,
        date,
        imageUrl,
      });
      toast({
        title: "Image Uploaded",
        description: "Your image has been successfully uploaded.",
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Failed to Upload Image",
        description:
          err.message ||
          "An error occurred while uploading the image. Please try again.",
      });
    }
    setOpen(false);
  }

  async function fetchGalleryImages() {
    const galleryRef = collection(db, "gallery");
    const snapshot = await getDocs(galleryRef);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  async function deleteImage(imageId, imageUrl) {
    const imageRef = ref(storage, imageUrl);
    const imageDocRef = doc(db, "gallery", imageId);

    try {
      await deleteObject(imageRef);
      await deleteDoc(imageDocRef);
      toast({
        title: "Image Deleted",
        description: "The image has been successfully deleted.",
      });
      const galleryImages = await fetchGalleryImages();
      setImages(galleryImages);
      setSelectedImage(null);
    } catch (err) {
      console.error(err);
      toast({
        title: "Failed to Delete Image",
        description:
          err.message ||
          "An error occurred while deleting the image. Please try again.",
      });
    }
  }

  useEffect(() => {
    async function loadImages() {
      const galleryImages = await fetchGalleryImages();
      setImages(galleryImages);
    }
    loadImages();
  }, []);

  const { data: session } = useSession();

  const handleUpload = async () => {
    if (!title || !date || !imageFile) return;

    const imageUrl = await uploadImage(imageFile);
    await addImageToGallery(title, date, imageUrl);
    const galleryImages = await fetchGalleryImages();
    setImages(galleryImages);
    setTitle("");
    setDate("");
    setImageFile(null);
  };

  const filteredImages = images.filter((image) => {
    // handle tolower
    const titleMatch = titleFilter
      ? image.title.toLowerCase().includes(titleFilter.toLowerCase())
      : true;
    const dateMatch = dateFilter ? image.date.includes(dateFilter) : true;
    return titleMatch && dateMatch;
  });

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      modalRef.current.requestFullscreen().catch((err) => {
        console.error(
          `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
        );
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && selectedImage) {
        setSelectedImage(null);
      }
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [selectedImage]);

  return (
    <>
      <Toaster />
      <div
        className={`fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 md:p-8 lg:p-12 ${
          selectedImage ? "block" : "hidden"
        }`}
        id="image-modal"
      >
        <div
          ref={modalRef}
          className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto p-4 rounded"
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
            onClick={() => {
              toggleFullscreen();
              setSelectedImage(null);
            }}
          >
            <XIcon className="h-6 w-6 bg-red-500" />
          </button>
          {selectedImage && (
            <div className="">
              <img
                alt={selectedImage.title}
                className="w-full h-auto object-contain aspect-video"
                height="800"
                id="modal-image"
                src={selectedImage.imageUrl}
                style={{
                  objectFit: "contain",
                }}
                width="800"
              />

              {globalData?.adminEmails.includes(session?.user?.email) && (
                <Button
                  className="absolute top-4 left-4"
                  variant={"destructive"}
                  onClick={() => {
                    if (
                      confirm("Are you sure you want to delete this image?")
                    ) {
                      deleteImage(selectedImage.id, selectedImage.imageUrl);
                    }
                  }}
                >
                  Delete
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      <main>
        <section className="bg-gray-100 dark:bg-gray-800 py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center space-y-4">
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-50">
                  Image Gallery
                </h1>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mt-4">
                  Explore our collection of beautiful images.
                </p>
                {globalData?.adminEmails.includes(session?.user?.email) && (
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild className="mt-4">
                      <Button variant="outline">Upload Image</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Upload Image</DialogTitle>
                        <DialogDescription>
                          Add a new image to your gallery.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-1 gap-4 py-4">
                        <div className="grid grid-cols-10 items-center gap-4">
                          <Label className="text-right" htmlFor="title">
                            Title
                          </Label>
                          <Input
                            className="col-span-9"
                            id="title"
                            placeholder="Image Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                          />
                        </div>
                        <div className="grid grid-cols-10 items-center gap-4">
                          <Label className="text-right" htmlFor="date">
                            Date
                          </Label>
                          <Input
                            className="col-span-9"
                            id="date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                          />
                        </div>
                        <div className="grid grid-cols-10 items-center gap-4">
                          <Label className="text-right" htmlFor="image">
                            Image
                          </Label>
                          <Input
                            className="col-span-9"
                            id="image"
                            type="file"
                            onChange={(e) => setImageFile(e.target.files[0])}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="button" onClick={handleUpload}>
                          Upload
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          </div>
        </section>
        <section className="px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6 mt-4 mr-4 ml-4">
            <div className="flex items-center gap-4">
              <Input
                className="max-w-xs"
                id="title-filter"
                placeholder="Filter by title"
                value={titleFilter}
                onChange={(e) => setTitleFilter(e.target.value)}
              />
              <Input
                className="max-w-xs"
                id="date-filter"
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mb-10">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
              >
                <button
                  className="absolute inset-0 z-10 w-full h-full"
                  onClick={() => {
                    setSelectedImage(image);
                    toggleFullscreen();
                  }}
                >
                  <span className="sr-only">View</span>
                </button>
                <img
                  alt={image.title}
                  className="aspect-square object-cover w-full group-hover:scale-105 transition-transform duration-300 ease-in-out"
                  height="300"
                  src={image.imageUrl}
                  width="300"
                />

                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                  <h3 className="text-lg font-semibold text-white">
                    {image.title}
                  </h3>
                  <p className="text-sm text-gray-300">{image.date}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

function XIcon(props) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
