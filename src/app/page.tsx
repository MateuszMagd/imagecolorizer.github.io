"use client"

import UploadButton from "@/components/uploadbutton";
import React, { useState } from 'react';


export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  return (
    <div className="bg-backimage min-h-screen flex items-center justify-center w-full overflow-hidden" >
      <title>Image Upload and Predict</title>
      <main className="bg-white text-black p-8 rounded shadow-md">
        <h1 className="text-2xl mb-4">Upload an Image for Prediction</h1>
        <UploadButton onFileSelect={handleFileSelect} />
        {selectedFile && (
          <div className="mt-4">
            {imageUrl && <img src={imageUrl} alt="Selected" className="mt-4 max-w-full h-auto" />}
          </div>
        )}
      </main>
    </div>

  );
}