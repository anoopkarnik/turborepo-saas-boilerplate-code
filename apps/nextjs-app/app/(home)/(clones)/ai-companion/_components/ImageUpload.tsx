"use client";

import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Loader2 } from "lucide-react";
import Image from "next/image";import { uploadImageToStrapi } from "@repo/storage/strapi/image";
; // 👈 your upload logic

type ImageUploadProps = {
  onChange: any;
  value: string;
};

export const ImageUploader = ({ value, onChange }: ImageUploadProps) => {
    const [preview, setPreview] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    // ✅ Sync preview if value is passed (e.g., from initialData)
    useEffect(() => {
      if (value) {
        setPreview(value);
      }
    }, [value]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setUploading(true);
    setError(null);

    try {
        const formData = new FormData();
        formData.append("files", file);
        formData.append("folder", "AI Companions");
        const result = await uploadImageToStrapi(formData);
        if (result?.[0]) {
            onChange(process.env.NEXT_PUBLIC_STRAPI_URL + result[0].url);
        } else {
            setError("Upload failed");
        }
    } catch (e) {
      console.error(e);
      setError("Something went wrong.");
    } finally {
      setUploading(false);
    }
  }, [onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": []
    },
    multiple: false
  });

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all
          ${isDragActive ? "border-primary bg-muted" : "border-border bg-background"}
        `}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Loader2 className="animate-spin w-4 h-4" />
            Uploading...
          </div>
        ) : preview ? (
          <Image
            src={preview }
            alt="Preview"
            width={200}
            height={200}
            className="mx-auto rounded-md object-cover max-h-48"
          />
        ) : (
          <p className="text-sm text-muted-foreground">
            Drag and drop an image here, or click to select
          </p>
        )}
      </div>

      {error && <p className="text-sm text-red-500 mt-2 text-center">{error}</p>}
    </div>
  );
};
