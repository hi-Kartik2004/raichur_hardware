import Link from "next/link";
import React from "react";

function AdminNavbar() {
  return (
    <section className="bg-muted fixed w-full z-10">
      <div className="container flex justify-between items-center p-3 bg-muted flex-wrap gap-2">
        <div className="flex gap-6 items-center justify-center">
          <Link href="/admin/add-category" className="text-xs">
            Add Category
          </Link>
          <Link href="/admin/add-product" className="text-xs">
            Add Product
          </Link>
          <Link href="/admin/all-products" className="text-xs">
            Products
          </Link>
          <Link href="/admin/checkouts" className="text-xs">
            Checkouts
          </Link>
          <Link href="/admin/queries" className="text-xs">
            Queries
          </Link>
        </div>

        <div className="flex items-center">
          <Link href="/" className="text-xs">
            Home
          </Link>
        </div>
      </div>
    </section>
  );
}

export default AdminNavbar;
