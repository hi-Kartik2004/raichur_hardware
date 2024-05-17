/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/XPqGZszkG9T
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

/** Add fonts into your Next.js project:

import { Arimo } from 'next/font/google'
import { Cormorant_Garamond } from 'next/font/google'

arimo({
  subsets: ['latin'],
  display: 'swap',
})

cormorant_garamond({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { redirect } from "next/navigation";

export function ProductPageV0({ productId }) {
  function handleCardDirect(id) {
    redirect("/product/" + id);
  }
  return (
    <div
      key="1"
      className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6"
    >
      <div className="grid gap-4 md:gap-10 items-start">
        <div className="grid gap-4">
          <img
            alt="Product Image"
            className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
            height={600}
            src="/placeholder.svg"
            width={600}
          />
          <div className="hidden md:flex gap-4 items-start">
            <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
              <img
                alt="Preview thumbnail"
                className="aspect-square object-cover"
                height={100}
                src="/placeholder.svg"
                width={100}
              />
              <span className="sr-only">View Image 1</span>
            </button>
            <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
              <img
                alt="Preview thumbnail"
                className="aspect-square object-cover"
                height={100}
                src="/placeholder.svg"
                width={100}
              />
              <span className="sr-only">View Image 2</span>
            </button>
            <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
              <img
                alt="Preview thumbnail"
                className="aspect-square object-cover"
                height={100}
                src="/placeholder.svg"
                width={100}
              />
              <span className="sr-only">View Image 3</span>
            </button>
            <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
              <img
                alt="Preview thumbnail"
                className="aspect-square object-cover"
                height={100}
                src="/placeholder.svg"
                width={100}
              />
              <span className="sr-only">View Image 4</span>
            </button>
          </div>
        </div>
      </div>
      <div className="grid gap-4 md:gap-10 items-start">
        <div className="grid gap-4">
          <h1 className="font-bold text-3xl">Acme Prism T-Shirt </h1>
          <div>
            <p>60% combed ringspun cotton/40% polyester jersey tee.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-0.5">
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
              <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
            </div>
          </div>
          <div className="text-4xl font-bold">$99</div>
          <div className="grid gap-2">
            <Label className="text-base" htmlFor="quantity">
              Quantity
            </Label>
            <Input defaultValue={1} id="quantity" min={1} type="number" />
          </div>
          <Button size="lg">Add to Cart</Button>
        </div>
        <Separator />
        <div className="grid gap-4 text-sm leading-loose">
          <h2 className="font-bold text-lg">Product Details</h2>
          <p>
            Introducing the Acme Prism T-Shirt, a perfect blend of style and
            comfort for the modern individual. This tee is crafted with a
            meticulous composition of 60% combed ringspun cotton and 40%
            polyester jersey, ensuring a soft and breathable fabric that feels
            gentle against the skin.
          </p>
          <p>
            The design of the Acme Prism T-Shirt is as striking as it is
            comfortable. The shirt features a unique prism-inspired pattern that
            adds a modern and eye-catching touch to your ensemble.
          </p>
        </div>
      </div>

      <div className="grid md:grid-col-2 gap-4">
        <Separator />

        <h2 className="font-bold text-lg">Related Products</h2>
        <div className="w-full flex gap-4 flex-wrap justify-around">
          <Card className="max-w-[350px] md:max-w-[250px]">
            <CardHeader>
              <CardTitle>
                <Link href="/product/2">Acme Circles T-Shirt</Link>
              </CardTitle>
              <CardDescription>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
                quibusdam sunt possimus.
              </CardDescription>
            </CardHeader>
            <CardContent className="w-full -mt-2">
              <Link href="/product/id">
                <img
                  src="/placeholder.svg"
                  alt="Product Image"
                  className="w-full rounded"
                />
              </Link>
              <div className="flex w-full mt-4">
                <Button size="sm" className="w-full">
                  <Link href="/product/id">View Product</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="max-w-[350px] md:max-w-[250px]">
            <CardHeader>
              <CardTitle>
                <Link href="/product/2">Acme Circles T-Shirt</Link>
              </CardTitle>
              <CardDescription>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
                quibusdam sunt possimus.
              </CardDescription>
            </CardHeader>
            <CardContent className="w-full -mt-2">
              <Link href="/product/id">
                <img
                  src="/placeholder.svg"
                  alt="Product Image"
                  className="w-full rounded"
                />
              </Link>
              <div className="flex w-full mt-4">
                <Button size="sm" className="w-full">
                  <Link href="/product/id">View Product</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <Button size={"sm"} variant={"outline"}>
          Load more
        </Button>
      </div>

      <div className="grid md:grid-col-2 gap-4">
        <Separator />
        <h2 className="font-bold text-lg">Reviews</h2>
        <div className="flex gap-4">
          <Avatar className="w-10 h-10 border">
            <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="grid gap-4">
            <div className="flex gap-4 items-start">
              <div className="grid gap-0.5 text-sm">
                <h3 className="font-semibold">Sarah Johnson</h3>
                <time className="text-sm text-gray-500 dark:text-gray-400">
                  2 days ago
                </time>
              </div>
              <div className="flex items-center gap-0.5 ml-auto">
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
              </div>
            </div>
            <div className="text-sm leading-loose text-gray-500 dark:text-gray-400">
              <p>
                I've been experimenting with my Acme Prism T-Shirt for a few
                weeks now, and it's been a versatile addition to my wardrobe.
                The fabric is soft and comfortable, and the unique prism design
                really makes it stand out.
              </p>
            </div>
          </div>
        </div>
        <Separator />
        <div className="flex gap-4">
          <Avatar className="w-10 h-10 border">
            <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="grid gap-4">
            <div className="flex gap-4 items-start">
              <div className="grid gap-0.5 text-sm">
                <h3 className="font-semibold">Alex Smith</h3>
                <time className="text-sm text-gray-500 dark:text-gray-400">
                  3 weeks ago
                </time>
              </div>
              <div className="flex items-center gap-0.5 ml-auto">
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
              </div>
            </div>
            <div className="text-sm leading-loose text-gray-500 dark:text-gray-400">
              <p>
                The Acme Prism T-Shirt is a great addition to my wardrobe. The
                fabric is high-quality and the design is unique and eye-
                catching. I've received a lot of compliments on it.
              </p>
            </div>
          </div>
        </div>

        <Separator />
        <div className="flex gap-4">
          <Avatar className="w-10 h-10 border">
            <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="grid gap-4">
            <div className="flex gap-4 items-start">
              <div className="grid gap-0.5 text-sm">
                <h3 className="font-semibold">Alex Smith</h3>
                <time className="text-sm text-gray-500 dark:text-gray-400">
                  3 weeks ago
                </time>
              </div>
              <div className="flex items-center gap-0.5 ml-auto">
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
              </div>
            </div>
            <div className="text-sm leading-loose text-gray-500 dark:text-gray-400">
              <p>
                The Acme Prism T-Shirt is a great addition to my wardrobe. The
                fabric is high-quality and the design is unique and eye-
                catching. I've received a lot of compliments on it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StarIcon(props) {
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}