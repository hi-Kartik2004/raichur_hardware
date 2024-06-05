"use client";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import html2pdf from "html2pdf.js";
import { useState, useRef } from "react";
import { Preview, print } from "react-html2pdf";

export function BillV0({
  companyName = "",
  companyAddress = "",
  companyPhone = "",
  companyEmail = "",
  invoiceId = "",
  buyerAddress = "",
  buyerName = "",
  buyerPhone = "",
  items = [],
  dateIssued = "",
  companyLogo = "",
  gstNumber = "",
}) {
  const [loading, setLoading] = useState(false);
  const billRef = useRef(null);

  const handleDownload = (filename) => {
    print(filename, "bill-content");
  };

  return (
    <Preview id="bill-content">
      <div className="flex flex-col w-full max-w-2xl mx-auto bg-white dark:bg-gray-950 rounded-lg shadow-lg overflow-auto">
        <header className="bg-gray-100 dark:bg-gray-800 px-6 py-4 flex items-center justify-between gap-6 flex-wrap">
          <div className="flex items-center gap-4">
            <img
              alt="Company Logo"
              className="rounded-full"
              height="40"
              src={companyLogo}
              style={{
                aspectRatio: "40/40",
                objectFit: "cover",
              }}
              width="40"
            />
            <div className="grid gap-0.5">
              <h1 className="text-lg font-semibold">{companyName}</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {companyAddress}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {companyEmail} | <br /> {companyPhone}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="text-sm font-medium">
              Invoice <span className="underline-offset-4">{invoiceId}</span>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Issued on - {dateIssued}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              GSTIN/UIN - {gstNumber} <br />
              State Name - Karnataka, Code - 29
            </div>
          </div>
        </header>
        <div className="p-6 flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h2 className="text-lg font-semibold">Bill To:</h2>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <span className=" text-black font-medium text-lg">
                  {buyerName}
                </span>{" "}
                <br />
                {buyerAddress} <br />
                +91 {buyerPhone} <br />
                {/* Sophia Anderson
              <br />
              123 Main St
              <br />
              Anytown, CA 12345 */}
              </div>
            </div>
            {/* <div className="text-right">
            <h2 className="text-lg font-semibold">Ship To:</h2>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Sophia Anderson
              <br />
              123 Main St
              <br />
              Anytown, CA 12345
            </div>
          </div> */}
          </div>
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Colour</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>
                    Discount <br /> <span className="text-xs">per unit</span>
                  </TableHead>
                  <TableHead>
                    Total <br /> <span className="text-xs">inc. discount</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items &&
                  items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item?.product}</TableCell>
                      <TableCell>{item?.quantity}</TableCell>
                      <TableCell>{item?.color}</TableCell>
                      <TableCell>{item?.size}</TableCell>
                      <TableCell>
                        Rs {item?.price + (item?.price * item?.discount) / 100}
                      </TableCell>
                      <TableCell>{item?.discount} % </TableCell>
                      <TableCell className="">
                        Rs {item?.quantity * item?.price} /-
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
          <Separator />
          <div className="dark:border-gray-700 pt-4 flex justify-end">
            <div className="grid gap-2 w-full max-w-xs">
              <div className="flex justify-between">
                <div className="text-gray-500 dark:text-gray-400">
                  Subtotal:
                </div>
                <div>
                  Rs{" "}
                  {items &&
                    items.reduce(
                      (acc, item) =>
                        acc +
                        item.quantity *
                          (item?.price + (item.price * item?.discount) / 100),
                      0
                    )}{" "}
                  /-
                </div>
              </div>
              <div className="flex justify-between">
                <div className="text-gray-500 dark:text-gray-400">
                  Discount:
                </div>
                <div>
                  Rs{" "}
                  {items &&
                    items.reduce(
                      (acc, item) => acc + (+item.discount * item?.price) / 100,
                      0
                    )}{" "}
                  /-
                </div>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <div>Total:</div>
                <div>
                  Rs{" "}
                  {items &&
                    items.reduce(
                      (acc, item) => acc + item.quantity * item.price,
                      0
                    )}{" "}
                  /-
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="bg-gray-100 dark:bg-gray-800 px-6 py-4 text-sm text-gray-500 dark:text-gray-400 flex justify-between items-center">
          <p>Thank you for shopping with us!</p>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              handleDownload(
                buyerName +
                  "_" +
                  "raichur_hardware" +
                  "_" +
                  invoiceId +
                  "_bill" +
                  "_issued_on_" +
                  dateIssued
              );
            }}
            disabled={loading}
          >
            {loading ? "Generating PDF..." : "Download PDF"}
          </Button>
        </footer>
      </div>
    </Preview>
  );
}
