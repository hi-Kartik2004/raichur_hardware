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
import { useState, useRef } from "react";
import html2pdf from "html2pdf.js";
import Image from "next/image";
import { useReactToPrint } from "react-to-print";
import React from "react";

const BillPrint = React.forwardRef(
  (
    {
      companyName,
      companyAddress,
      companyPhone,
      companyEmail,
      invoiceId,
      buyerAddress,
      buyerName,
      buyerPhone,
      items,
      dateIssued,
      companyLogo,
      gstNumber,
    },
    ref
  ) => {
    const calculateMRP = (price, discount) => {
      return price / (1 - discount / 100);
    };

    return (
      <div id="bill-content" ref={ref}>
        <div className="flex flex-col w-full max-w-3xl mx-auto bg-white dark:bg-gray-950 rounded-lg shadow-lg overflow-auto">
          <header className="bg-gray-100 dark:bg-gray-800 px-6 py-4 flex items-center justify-between gap-6 flex-wrap">
            <div className="flex items-center gap-4">
              <Image
                alt="Company Logo"
                className="rounded-full"
                height="40"
                src={companyLogo}
                style={{
                  aspectRatio: "55/40",
                  objectFit: "cover",
                }}
                width="70"
              />
              <div className="grid gap-0.5">
                <h1 className="text-lg font-semibold">{companyName}</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[16rem]">
                  {companyAddress}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {companyEmail} | <br /> {companyPhone}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="text-sm font-medium">
                Quotation{" "}
                <span className="underline-offset-4">{invoiceId}</span>
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
                <h2 className="text-lg font-semibold">Quotation To:</h2>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <span className=" text-black font-medium text-lg">
                    {buyerName}
                  </span>{" "}
                  <br />
                  {buyerAddress} <br />
                  +91 {buyerPhone} <br />
                </div>
              </div>
            </div>
            <div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Item</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead>Colour</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>MRP</TableHead>
                    <TableHead>Discount</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items &&
                    items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Image
                            src={item?.imageUrl}
                            alt={item?.product}
                            width={58}
                            height={58}
                          />
                        </TableCell>
                        <TableCell>{item?.product}</TableCell>
                        <TableCell>{item?.quantity}</TableCell>
                        <TableCell>{item?.color}</TableCell>
                        <TableCell>{item?.size}</TableCell>
                        <TableCell>
                          Rs&nbsp;
                          {calculateMRP(
                            item?.price,
                            Math.trunc(item?.discount)
                          ).toFixed(0)}
                          /-
                        </TableCell>
                        <TableCell>{Math.trunc(item?.discount)} % </TableCell>
                        <TableCell>
                          Rs&nbsp;{item?.quantity * item?.price}/-
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
                    Rs&nbsp;
                    {items &&
                      items
                        .reduce(
                          (acc, item) =>
                            acc +
                            item.quantity *
                              calculateMRP(
                                item?.price,
                                Math.trunc(item?.discount)
                              ),
                          0
                        )
                        .toFixed(0)}
                    /-
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-gray-500 dark:text-gray-400">
                    Discount:
                  </div>
                  <div>
                    Rs&nbsp;
                    {items &&
                      items
                        .reduce(
                          (acc, item) =>
                            acc +
                            (item.quantity *
                              calculateMRP(
                                item?.price,
                                Math.trunc(item?.discount)
                              ) -
                              item?.quantity * item?.price),
                          0
                        )
                        .toFixed(0)}
                    /-
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <div>Total:</div>
                  <div className="text-xl">
                    Rs&nbsp;
                    {items &&
                      items
                        .reduce(
                          (acc, item) => acc + item.quantity * item.price,
                          0
                        )
                        .toFixed(0)}
                    /- <br />
                  </div>
                </div>
                <span className="text-xs text-muted-foreground font-medium -mt-2">
                  (incl. of 9% SGST & 9% CGST)
                </span>
              </div>
            </div>
          </div>
          <footer className="bg-gray-100 dark:bg-gray-800 px-6 py-4 text-sm text-gray-500 dark:text-gray-400 flex justify-between items-center">
            <p>Thank you for shopping with us!</p>
          </footer>
        </div>
      </div>
    );
  }
);

export default function BillV0({
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
  const componentRef = useRef(null);

  const handleDownload = (filename) => {
    const element = document.getElementById("bill-content");
    if (!element) {
      console.error("Element with id 'bill-content' not found.");
      return;
    }

    const opt = {
      margin: [0.5, 0],
      filename: `${filename}.pdf`,
      image: { type: "png", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .catch((err) => console.error("Error generating PDF:", err));
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Bill",
    onAfterPrint: () => alert("Print success!"),
  });

  return (
    <div>
      <div className="flex justify-end mb-4">
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
          className="mr-2"
        >
          {loading ? "Generating PDF..." : "Download PDF"}
        </Button>
        <Button size="sm" variant="outline" onClick={handlePrint}>
          Print
        </Button>
      </div>

      <div style={{ display: "none" }}>
        <BillPrint
          ref={componentRef}
          companyName={companyName}
          companyAddress={companyAddress}
          companyPhone={companyPhone}
          companyEmail={companyEmail}
          invoiceId={invoiceId}
          buyerAddress={buyerAddress}
          buyerName={buyerName}
          buyerPhone={buyerPhone}
          items={items}
          dateIssued={dateIssued}
          companyLogo={companyLogo}
          gstNumber={gstNumber}
        />
      </div>

      <BillPrint
        companyName={companyName}
        companyAddress={companyAddress}
        companyPhone={companyPhone}
        companyEmail={companyEmail}
        invoiceId={invoiceId}
        buyerAddress={buyerAddress}
        buyerName={buyerName}
        buyerPhone={buyerPhone}
        items={items}
        dateIssued={dateIssued}
        companyLogo={companyLogo}
        gstNumber={gstNumber}
      />
    </div>
  );
}
