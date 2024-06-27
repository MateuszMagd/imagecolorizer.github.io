"use client";

import React, { useRef, useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';

interface UploadButtonProps {
  onFileSelect: (file: File) => void;
}

const UploadButton: React.FC<UploadButtonProps> = ({ onFileSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [model, setModel] = useState<tf.LayersModel | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<tf.Tensor | null>(null);

  // Load the TensorFlow.js model when the component mounts
  useEffect(() => {
    const loadModel = async () => {
      const model = await tf.loadLayersModel('/api/model/gan');
      setModel(model);
    };
    loadModel();
  }, []);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      onFileSelect(file);

      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
        processImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async (imageSrc: string) => {
    if (!model) {
      console.error('Model not loaded');
      return;
    }

    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const tensor = tf.browser.fromPixels(img).resizeBilinear([256, 256]).toFloat().expandDims(0);
      const prediction = model.predict(tensor) as tf.Tensor;
      setPrediction(prediction);
    };
  };

  return (
    <div>
      <button
        onClick={handleButtonClick}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Upload Image
      </button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      {imageSrc && <img src={imageSrc} alt="Uploaded" />}
      {prediction && (
        <div>
          <h3>Prediction:</h3>
          <pre>{JSON.stringify(prediction.arraySync(), null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default UploadButton;
