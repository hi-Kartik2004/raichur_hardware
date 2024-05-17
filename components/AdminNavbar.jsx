import Link from "next/link";
import React from "react";

function AdminNavbar() {
  return (
    <section className="bg-muted">
      <div className="container flex justify-between p-4 bg-muted">
        <div className="flex gap-6">
          <Link href="/admin/add-category">Add Category</Link>
          <Link href="/admin/add-product">Add Product</Link>
        </div>

        <div>
          <Link href="/">Home</Link>
        </div>
      </div>
    </section>
  );
}

export default AdminNavbar;
