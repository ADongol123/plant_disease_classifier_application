import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import Banner from "../assets/banner.png";

const UploadSection = ({ setFiles, files }: any) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null); // State to store image preview
  const [isDragging, setIsDragging] = useState<boolean>(false); // State to track drag-over status
  const fileInputRef = React.useRef<HTMLInputElement>(null); // File input reference

  // Handle file selection from browse button
  const handleBrowseClick = () => {
    fileInputRef.current?.click(); // Trigger the file input click
  };

  // Handle file change (when file is selected)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      previewFile(selectedFile);
    }
  };

  // Create a preview and set files
  const previewFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string); // Set the image preview
      setFiles(file); // Pass the file to the parent
    };
    reader.readAsDataURL(file); // Read the file as a data URL
  };

  // Handle drag events
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true); // Indicate drag is active
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false); // Indicate drag is inactive
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false); // Reset drag status
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      previewFile(droppedFile); // Preview and set file
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg h-[400px] flex flex-col gap-2">
      {/* Drag-and-drop area */}
      <div
        className={`space-y-4 border-dashed border-2 py-2 flex flex-col items-center justify-center ${
          isDragging ? "border-[#85b580]" : "border-gray-300"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <FaCloudUploadAlt className="h-[50px] w-[50px] text-[#85b580]" />
        <h1 className="text-[20px] font-semibold flex gap-2">
          Drag files here or{" "}
          <div>
            <span
              className="text-[#85b580] cursor-pointer"
              onClick={handleBrowseClick}
            >
              Browse
            </span>
            <input
              ref={fileInputRef}
              type="file"
              style={{ display: "none" }} // Hide the file input
              onChange={handleFileChange}
            />
          </div>
        </h1>
      </div>

      {/* Preview section */}
      <div className="mt-4 overflow-hidden bg-contain">
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Selected"
            className="h-200 w-full rounded-md"
          />
        ) : (
          <img
            src={Banner}
            alt="Default banner"
            className="h-full w-full overflow-hidden rounded-md"
          />
        )}
      </div>
    </div>
  );
};

export default UploadSection;
