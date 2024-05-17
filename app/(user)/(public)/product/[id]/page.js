import { ProductPageV0 } from "@/components/component/product-page-v0";
import React from "react";

function ProductPage({ params }) {
  return (
    <div className="pt-20 md:pt-36">
      <ProductPageV0 productId={params.id} />
    </div>
  );
}

export default ProductPage;
