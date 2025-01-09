import React, { useRef, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import Banner from "../assets/banner.png"
const UploadSection = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null); // State to store image preview
  const [files, setFiles] = useState(null); // State to store selected files
  const fileInputRef:any = useRef(null); // File input reference

  // Handle file selection from browse button
  const handleBrowseClick = (e: any) => {
    fileInputRef.current.click(); // Trigger the file input click
  };

  // Handle file change (when file is selected)
  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Create a preview of the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); // Set the image preview
      };
      reader.readAsDataURL(selectedFile); // Read the file as a data URL
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg h-[400px] flex flex-col gap-2">
      <form
        className="space-y-4 border-dashed border-2 flex flex-col items-center justify-center py-2"
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
      </form>

      <div className="mt-4 overflow-hidden bg-contain">
        {/* Show the selected image preview */}
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
