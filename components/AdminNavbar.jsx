import Link from "next/link";
import React from "react";

function AdminNavbar() {
  return (
    <section className="bg-muted fixed w-full z-10">
      <div className="container flex justify-between p-3 bg-muted">
        <div className="flex gap-6">
          <Link href="/admin/add-category" className="text-sm">
            Add Category
          </Link>
          <Link href="/admin/add-product" className="text-sm">
            Add Product
          </Link>
          <Link href="/admin/all-products" className="text-sm">
            Products
          </Link>
          <Link href="/admin/checkouts" className="text-sm">
            Checkouts
          </Link>
        </div>

        <div>
          <Link href="/" className="text-sm">
            Home
          </Link>
        </div>
      </div>
    </section>
  );
}

export default AdminNavbar;
