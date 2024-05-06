import { ProductsPage } from "@/components/component/products-page";
import React from "react";

function Category({ params }) {
  return (
    <div className="pt-20 lg:pt-28 xl:pt-32">
      <ProductsPage />
    </div>
  );
}

export default Category;
