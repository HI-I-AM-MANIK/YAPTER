"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";
import { X } from "lucide-react";
import Image from "next/image";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value?: string;
  endpoint: "messageFile" | "serverImage";
}

const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  const filetype = value?.split(".").pop();

  if (value && filetype !== "pdf") {
    return (
      <div className="relative w-20 h-20">
        <Image
          fill
          src={value}
          alt="upload"
          className="rounded-full"
        />
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute top-0 right-0 bg-rose-500 text-white rounded-full p-1 hover:bg-rose-600 transition"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0]?.url);
      }}
      onUploadError={(err) => {
        console.error("Upload error:", err);
      }}
    />
  );
};

export default FileUpload;
