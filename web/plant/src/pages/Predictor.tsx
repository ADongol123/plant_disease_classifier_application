import React, { useRef, useState } from "react";
import UploadSection from "../components/UploadSection";
import Banner from "../assets/banner.png";
import TopImg from "../assets/top.webp"
const Predictor = () => {
  const [results, setResults]: any = useState([]);
  const fileInputRef: any = useRef(null); // File input reference
  const [error, setError]: any = useState(null);
  const [files, setFiles] = useState<File | null>(null); // Updated to store a single selected file

  const handleUpload = async (event: any) => {
    event.preventDefault();

    if (!files) {
      setError("Please upload a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", files); // Use the selected file

    try {
      const response = await fetch("http://localhost:8000/predict/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to analyze the image. Please try again.");
      }

      const data = await response.json();
      setError(null);

      // Add the new result to the results array
      setResults((prevResults: any) => [
        ...prevResults,
        { imagePreview: URL.createObjectURL(files), result: data }, // Store preview and result together
      ]);
    } catch (error: any) {
      setError(error.message);
      setResults([]);
    }
  };

  return (
    <div className="bg-green-50 min-h-screen flex flex-col items-center ">
      <header className="w-full bg-[#85b580] text-white py-4 shadow-md">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Plant Disease Recognition</h1>
          <nav className="flex items-center gap-4">
            <a href="/" className="hover:text-green-300 text-[20px]">
              Home
            </a>
            <a href="/predictor" className="hover:text-green-300 text-[20px]">
              Predictor
            </a>
            <a href="/chat" className="hover:text-green-300 text-[20px]">
              Chat
            </a>
          </nav>
        </div>
      </header>
      <main className="w-full max-w-4xl p-4 flex flex-col gap-3 flex-1">
        <div className="w-full flex">
          <div className="w-[50%]">
            <img
              src={TopImg}
              className="h-[400px] w-[400px] rounded-lg shadow-md"
            />
          </div>
          <div className="w-[50%] h-full">
            <UploadSection
              setFiles={setFiles} // Pass the setFiles function
              files={files} // Pass the selected file
            />
          </div>
        </div>
        <button
          onClick={handleUpload}
          className="w-full bg-[#85b580] text-white py-2 rounded-md font-mono text-[15px] cursor-pointer"
        >
          Submit
        </button>
        {results.map((result: any, index: number) => (
          <div key={index} className="p-4 bg-green-50 border border-green-400 rounded">
            <h3 className="text-green-700 font-bold">Analysis Result #{index + 1}</h3>
            <div className="mt-4">
              <h3 className="text-gray-700 font-bold">Image Preview</h3>
              <img
                src={result.imagePreview}
                alt={`Selected ${index + 1}`}
                className="mt-2 border rounded-md max-w-full"
              />
            </div>
            <p>
              <strong>Disease:</strong> {result.result.predicted_class}
            </p>
            <p>
              <strong>Confidence:</strong> {result.result.confidence}%
            </p>
            <p>
              <strong>Care Info: </strong> {result.result.care_info}
            </p>
            <p>
              <strong>Scientific Info:</strong> {result.result.scientificInfo || "No Information available"}
            </p>
          </div>
        ))}
      </main>
      <footer className="w-full bg-[#85b580] text-white py-2 text-center">
        <p>© 2024 Plant Disease Recognition System</p>
      </footer>
    </div>
  );
};

export default Predictor;
