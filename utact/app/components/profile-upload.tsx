"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface ProfileUploadProps {
  onImageUpload: (imageUrl: string) => void;
}

export function ProfileUpload({ onImageUpload }: ProfileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);

      // Create a URL for the selected file
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onImageUpload(result);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="absolute -bottom-2 -right-2">
      <Button
        size="sm"
        onClick={handleUploadClick}
        disabled={isUploading}
        className="rounded-full w-10 h-10 p-0 shadow-lg"
      >
        <Upload className="w-4 h-4" />
        <span className="sr-only">Upload profile picture</span>
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}
