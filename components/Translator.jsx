"use client";
import React from "react";
import GoogleTranslator from "react-multilingual-content";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { HiTranslate } from "react-icons/hi";

function Translator() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <HiTranslate className="h-6 w-6" />
      </DialogTrigger>
      <DialogContent className="bg-black text-white">
        <p>Select your prefered language from the dropdown below</p>
        <GoogleTranslator selectClassName="border p-2" />
        <p className="text-slate-300 text-sm">
          *Their might be instances that certain translations might not mean
          exactly what's intended.
        </p>
      </DialogContent>
    </Dialog>
  );
}

export default Translator;
