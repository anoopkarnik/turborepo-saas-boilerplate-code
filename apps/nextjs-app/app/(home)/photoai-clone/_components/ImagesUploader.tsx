"use client";

import { useCallback,  useState } from "react";
import { useDropzone } from "react-dropzone";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import JSZip from "jszip";
import { uploadZipAction } from "../_actions/server";
import { useToast } from "@repo/ui/hooks/use-toast";

type ImagesUploadProps = {
  onChange: (url: string) => void;
  placeholder?: string;
};

export const ImagesUploader = ({  onChange, placeholder }: ImagesUploadProps) => {
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {toast } = useToast();

  // useEffect(() => {
  //   if (value && value.length > 0) {
  //     setPreviews(value);
  //   }
  // }, [value]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setError(null);
      setUploading(true);

      try {
        const newPreviews = acceptedFiles.map(file => URL.createObjectURL(file));
        setPreviews(newPreviews);

        const zip = new JSZip();

        for (const file of acceptedFiles) {
          const content = await file.arrayBuffer();
          zip.file(file.name, content);
        }

        const zippedContent = await zip.generateAsync({ type: "blob" });

        const formData = new FormData();
        formData.append("file", zippedContent);

        const {success,url} = await uploadZipAction(formData);
        if (success){
          toast({
            title: "Upload successful",
            description: "Your images have been zipped & uploaded successfully.",
            variant: "default",
          });
        }{
          toast({
            title: "Upload failed",
            description: "There was an error uploading your images.",
            variant: "destructive",
          });
        }
        onChange(url ?? "");
        

      } catch (err) {
        console.error(err);
        setError("Upload failed. Try again.");
      } finally {
        setUploading(false);
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": []
    },
    multiple: true
  });

  return (
    <div className="w-full mx-auto">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
          isDragActive ? "border-primary bg-muted" : "border-border bg-background"
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-sm text-muted-foreground">
          {placeholder || "Drag and drop images here, or click to select"}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
        {previews?.map((src, i) => (
          <div key={i} className="relative w-full h-32 rounded overflow-hidden border">
            <Image
              src={src}
              alt={`preview-${i}`}
              fill
              className="object-cover"
            />
            {uploading && (
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <Loader2 className="w-5 h-5 text-white animate-spin" />
              </div>
            )}
          </div>
        ))}
      </div>

      {error && <p className="text-sm text-red-500 mt-2 text-center">{error}</p>}
    </div>
  );
};
