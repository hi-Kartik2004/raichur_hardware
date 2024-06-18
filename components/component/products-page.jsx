"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import FilterSheet from "../FilterSheet";
import FilterForm from "../FilterForm";
import Link from "next/link";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/config";

export async function fetchInBatches(
  categoryName,
  lastDoc = null,
  pageSize = 12,
  sortBy = "timestamp",
  sortDirection = "desc",
  minPrice = 0,
  maxPrice = 1000000
) {
  let q;

  if (categoryName === "all") {
    q = query(
      collection(db, "products"),
      where("hide", "==", false),
      where("price", ">=", minPrice),
      where("price", "<=", maxPrice),
      orderBy(sortBy, sortDirection),
      limit(pageSize)
    );
  } else {
    q = query(
      collection(db, "products"),
      where("category", "==", categoryName),
      where("hide", "==", false),
      where("price", ">=", minPrice),
      where("price", "<=", maxPrice),
      orderBy(sortBy, sortDirection),
      limit(pageSize)
    );
  }

  if (lastDoc) {
    q = query(q, startAfter(lastDoc));
  }

  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const lastVisible = snapshot.docs[snapshot.docs.length - 1] || null;

  return { data, lastVisible };
}

export function ProductsPage({
  initialProducts,
  categoryName,
  categoryDetails,
  categories,
}) {
  const loadProducts = 12;
  const [products, setProducts] = useState(initialProducts);
  const [lastDoc, setLastDoc] = useState(null);
  const [sortBy, setSortBy] = useState("timestamp");
  const [sortDirection, setSortDirection] = useState("desc");
  const [hasMore, setHasMore] = useState(true);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);

  const handleSortByChange = (value) => {
    const [criteria, direction] = value.split("-");
    setSortBy(criteria);
    setSortDirection(direction || "desc");
    sortProducts(criteria, direction || "desc");
  };

  const sortProducts = (sortCriteria, sortDir) => {
    const sortedProducts = [...products].sort((a, b) => {
      const isAsc = sortDir === "asc";
      if (sortCriteria === "price") {
        return isAsc ? a.price - b.price : b.price - a.price;
      }
      if (sortCriteria === "timestamp") {
        return isAsc ? a.timestamp - b.timestamp : b.timestamp - a.timestamp;
      }
      return 0;
    });
    setProducts(sortedProducts);
  };

  const loadMoreProducts = async () => {
    const { data, lastVisible } = await fetchInBatches(
      categoryName,
      lastDoc,
      loadProducts,
      sortBy,
      sortDirection,
      minPrice,
      maxPrice
    );
    setProducts((prev) => [...prev, ...data]);
    setLastDoc(lastVisible);
    if (data.length < loadProducts) {
      setHasMore(false);
    }
  };

  const fetchInitialData = async () => {
    const { data, lastVisible } = await fetchInBatches(
      categoryName,
      null,
      loadProducts,
      sortBy,
      sortDirection,
      minPrice,
      maxPrice
    );
    setProducts(data);
    setLastDoc(lastVisible);
    setHasMore(data.length === loadProducts);
  };

  useEffect(() => {
    fetchInitialData();
  }, [categoryName, sortBy, sortDirection, minPrice, maxPrice]);

  const handlePriceRangeChange = (min, max) => {
    setMinPrice(min);
    setMaxPrice(max);
    fetchInitialData();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_200px] gap-8 p-4 md:pt-10">
      {/* Product List */}
      <div>
        {/* Category Image and Title */}
        {/* <div className="w-full object-cover max-h-[120px] overflow-hidden rounded-lg relative">
          <img
            src={categoryDetails?.categoryImageUrl}
            alt="category image"
            className="w-full opacity-70"
          />
          <h2 className="text-xl md:text-3xl text-center font-bold absolute bottom-[50%] -translate-x-[50%] left-[50%] translate-y-[50%] p-4 normal-case">
            {categoryDetails?.categoryTitle}
          </h2>
        </div> */}

        {/* Product Summary */}
        <div className="flex items-center justify-between w-full mb-4 mt-4 flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold capitalize">
              {categoryDetails?.categoryName} Products
            </h2>
            <p className="text-gray-500 dark:text-gray-400 normal-case">
              {products?.length} Products Found,{" "}
              {categoryDetails?.categoryDescription}
            </p>
          </div>
          <div className="flex gap-2">
            {/* Filter Sheet */}
            <FilterSheet
              showOnMobile={true}
              categories={categories}
              onPriceRangeChange={handlePriceRangeChange}
            />

            {/* Dropdown Menu for Sorting */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="shrink-0" variant="outline">
                  <ArrowUpDownIcon className="w-4 h-4 mr-2" />
                  Sort by
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup
                  value={`${sortBy}-${sortDirection}`}
                  onValueChange={handleSortByChange}
                >
                  <DropdownMenuRadioItem value="timestamp-desc">
                    Newest
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="timestamp-asc">
                    Oldest
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="price-asc">
                    Price: Low to High
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="price-desc">
                    Price: High to Low
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="featured">
                    Featured
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden dark:bg-gray-950 dark:border dark:border-gray-800 border hover:scale-105 duration-100 hover:shadow-lg"
            >
              <Link
                href={`/product/${product.id}`}
                className="text-lg font-semibold"
              >
                <img
                  alt="Product Image"
                  className="w-full h-48 object-cover"
                  height={300}
                  src={product.images[0]}
                  style={{
                    aspectRatio: "400/300",
                    objectFit: "cover",
                  }}
                  width={400}
                />
              </Link>
              {/* Product Details */}
              <div className="p-4 space-y-2">
                <Link
                  href={`/product/${product.id}`}
                  className="text-lg font-semibold capitalize"
                >
                  {product.name}
                </Link>

                <p className="text-muted-foreground text-ellipsis line-clamp-2 text-sm normal-case">
                  {product?.description}
                </p>

                <div className="flex justify-between flex-wrap text-sm text-muted-foreground gap-4">
                  {product?.colors.length == 1 ? (
                    <div
                      className={`w-5 h-5 rounded-full`}
                      style={{ background: product?.colors[0] }}
                    ></div>
                  ) : (
                    "Multiple colors"
                  )}
                  <p className="text-sm text-muted-foreground capitalize">
                    Size:{" "}
                    {product?.sizes.length > 1
                      ? "Multiple"
                      : product?.sizes[0]
                      ? product?.sizes[0]
                      : "Regular"}
                  </p>
                </div>

                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  Rs {" " + Math.trunc(product.price)}/- {"  "}
                  {product?.discount > 0 && (
                    <span className="text-green-500 text-sm">
                      ({Math.trunc(product?.discount)} % off)
                    </span>
                  )}
                </p>

                <Button className="w-full" size="sm" asChild>
                  <Link href={`/product/${product.id}`}>View Product</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="flex justify-center mt-4 w-full">
            <Button
              onClick={loadMoreProducts}
              className="w-full border"
              variant="secondary"
            >
              Load More Products
            </Button>
          </div>
        )}
      </div>

      {/* Filter Form */}
      <div className="hidden lg:block relative">
        <div className="sticky top-2">
          <FilterForm
            showOnMobile={false}
            categories={categories}
            onPriceRangeChange={handlePriceRangeChange}
          />
        </div>
      </div>
    </div>
  );
}

function ArrowUpDownIcon(props) {
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
      <path d="m21 16-4 4-4-4" />
      <path d="M17 20V4" />
      <path d="m3 8 4-4 4 4" />
      <path d="M7 4v16" />
    </svg>
  );
}
