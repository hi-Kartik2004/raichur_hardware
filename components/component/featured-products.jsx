import { Button } from "@/components/ui/button";
import Link from "next/link";
import AddToCartButton from "../AddToCartButton";
import { previousDay } from "date-fns";

export function FeaturedProducts({ className, category, products }) {
  return (
    <section
      className={`${className} py-12 px-2 md:py-16 lg:py-20 dark:bg-gray-800`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
            Featured Products in {category.categoryName}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg line-clamp-3">
            {category?.categoryDescription}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg dark:bg-gray-950"
            >
              <Link href={`/product/${product?.id}`}>
                <img
                  alt={product.name}
                  className="w-full h-48 object-cover"
                  height={400}
                  src={product.images[0]}
                  style={{ aspectRatio: "600/400", objectFit: "cover" }}
                  width={600}
                />
              </Link>
              <div className="p-4">
                <Link href={`/product/${product?.id}`}>
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4 line-clamp-3">
                    {product.description}
                  </p>
                  <p className="dark:text-gray-400 mb-4">
                    Rs {product.price}/-{" "}
                    <span className="text-sm line-through	">
                      Rs{" "}
                      {+product?.price +
                        (product?.discount / 100) * product?.price}
                    </span>{" "}
                    {product?.discount > 0 && (
                      <span className="text-sm text-green-500">
                        ({product.discount}% off)
                      </span>
                    )}
                  </p>
                </Link>
                <AddToCartButton
                  productName={product?.name}
                  price={product?.price}
                  quantity={1}
                  imageUrl={product?.images[0]}
                  productId={product?.id}
                  maxQuantity={product?.maxQuantity}
                  inventory={product?.inventory}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 md:mt-12 lg:mt-16 text-center">
          <Button size="lg" variant="outline" asChild>
            <Link href={`/category/${category.categoryName}`}>View All</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function ShoppingCartIcon(props) {
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
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}
