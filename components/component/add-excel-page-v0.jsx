"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import readXlsxFile from "read-excel-file";
import { db } from "@/firebase/config";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { Separator } from "../ui/separator";

export function AddExcelPageV0() {
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [successCount, setSuccessCount] = useState(0);
  const [failedCount, setFailedCount] = useState(0);
  const [processedRows, setProcessedRows] = useState([]);
  const [totalRows, setTotalRows] = useState(0);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleProcessFile = async () => {
    if (!file) {
      alert("Please upload a file first.");
      return;
    }

    setProcessing(true);
    const rows = await readXlsxFile(file);
    if (rows.length <= 1) {
      alert("The file is empty or has only the header row.");
      setProcessing(false);
      return;
    }

    // Extract the header row
    const header = rows[0];
    const columnIndex = {
      product_id: header.indexOf("product_id"),
      discount: header.indexOf("discount"),
      selling_price: header.indexOf("selling_price"),
      mrp: header.indexOf("mrp"),
    };

    if (
      columnIndex.product_id === -1 ||
      columnIndex.discount === -1 ||
      columnIndex.selling_price === -1 ||
      columnIndex.mrp === -1
    ) {
      alert(
        "The file must contain product_id, discount, selling_price, and mrp columns."
      );
      setProcessing(false);
      return;
    }

    setTotalRows(rows.length - 1); // Exclude header row

    let success = 0;
    let failed = 0;
    let processed = [];

    for (let i = 1; i < rows.length; i++) {
      const product_id = rows[i][columnIndex.product_id];
      const discount = rows[i][columnIndex.discount];
      const selling_price = rows[i][columnIndex.selling_price];
      const mrp = rows[i][columnIndex.mrp];

      const result = await updateProduct(
        product_id,
        discount,
        selling_price,
        mrp
      );

      if (result.success) {
        success++;
      } else {
        failed++;
      }

      processed.push({ row: rows[i], ...result });
    }

    setSuccessCount(success);
    setFailedCount(failed);
    setProcessedRows(processed);
    setProcessing(false);
  };

  const updateProduct = async (product_id, discount, selling_price, mrp) => {
    try {
      const productsRef = collection(db, "products");
      const q = query(productsRef, where("excelId", "==", product_id));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        await updateDoc(docRef, {
          discount: discount.toString(),
          price: Number(selling_price),
          mrp: Number(mrp),
        });
        return { success: true };
      } else {
        return { success: false, error: "Product not found" };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="max-w-3xl mx-auto grid gap-8">
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold tracking-tight">
            Populate Ecommerce Products
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Upload an Excel file to automatically populate your ecommerce
            product catalog.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-950 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-8 grid gap-6">
          <div className="grid gap-2">
            <Label className="text-base font-medium" htmlFor="file">
              Upload Excel File
            </Label>
            <div className="flex items-center gap-4">
              <Input
                accept=".xlsx"
                className="flex-1"
                id="file"
                type="file"
                onChange={handleFileChange}
              />
              <Button onClick={handleProcessFile} disabled={processing}>
                {processing ? "Processing..." : "Process File"}
              </Button>
            </div>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p>
              The script will read the data from the Excel file and
              automatically update product's discount in your ecommerce catalog.
            </p>
            <Separator className="my-2" />
            <p className="mt-2">
              Make sure the file is formatted correctly with the following
              columns:
            </p>
            <ul>
              <li>product_id</li>
              <li>discount</li>
              <li>selling_price</li>
              <li>mrp</li>
              <li>*the discount must be in %</li>
            </ul>
          </div>
          <Separator />
          <div className="grid gap-2">
            <Label className="text-base font-medium">
              Total Rows: {totalRows}
            </Label>
            <Label className="text-base font-medium">
              Successfully Updated: {successCount}
            </Label>
            <Label className="text-base font-medium">
              Failed Updates: {failedCount}
            </Label>
            {processedRows.length > 0 && (
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <details>
                  <summary>View Processed Rows</summary>
                  <ul>
                    {processedRows.map((row, index) => (
                      <li key={index}>
                        Row {index + 1}: {row.row.join(", ")} -{" "}
                        {row.success ? "Success" : `Failed (${row.error})`}
                      </li>
                    ))}
                  </ul>
                </details>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
