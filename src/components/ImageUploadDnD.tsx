"use client";

import { toast } from "@/hooks/useToast";
import { UploadDropzone, UploadButton } from "@/utils/uploadthing";
import { useImagePreviewState } from "@/lib/global-state-store/imagePreviewState";

import React from "react";

const ImageUploadDnD: React.FC = ({}) => {
  const { setImagePreview } = useImagePreviewState();

  return (
    <div>
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          const imageUrl = res[0].url;
          setImagePreview(imageUrl);
        }}
        onUploadError={(error: Error) => {
          toast({
            title: "Error",
            description: error.message,
            duration: 5000,
            variant: "destructive",
          });
        }}
      />
    </div>
  );
};

export default ImageUploadDnD;
