import React, { useState } from "react";

const UploadSection = () => {
  const [results, setResults]: any = useState([]); // State to store multiple results
  const [error, setError]: any = useState(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null); // State to store image preview
  console.log(results, "result");
  const handleUpload = async (event: any) => {
    event.preventDefault();

    const fileInput = event.target.elements[0]; // Assuming the file input is the first element
    const file = fileInput.files[0];

    if (!file) {
      setError("Please upload a file.");
      return;
    }

    // Create a preview of the selected image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string); // Set the image preview
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("file", file);

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
        { imagePreview, result: data }, // Store the preview and result together
      ]);
    } catch (error: any) {
      setError(error.message);
      setResults([]);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <form onSubmit={handleUpload} className="space-y-4">
        <label className="block">
          <span className="text-gray-700">Upload Image</span>
          <input
            type="file"
            className="mt-1 block w-full text-gray-700"
            accept="image/*"
            required
          />
        </label>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-500"
        >
          Analyze
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-400 rounded">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {results?.length > 0 && (
        <div className="mt-6 space-y-6">
          {results?.map((resultObj : any, index: any) => {
            console.log(resultObj,"1234")
            return (
              <div
                key={index}
                className="p-4 bg-green-50 border border-green-400 rounded"
              >
                <h3 className="text-green-700 font-bold">
                  Analysis Result #{index + 1}
                </h3>
                <div className="mt-4">
                  <h3 className="text-gray-700 font-bold">Image Preview</h3>
                  <img
                    src={resultObj?.imagePreview}
                    alt={`Selected ${index + 1}`}
                    className="mt-2 border rounded-md max-w-full"
                  />
                </div>
                <p>
                  <strong>Disease:</strong> {resultObj?.result?.predicted_class}
                </p>
                <p>
                  <strong>Confidence:</strong> {resultObj?.result?.confidence}
                </p>
                <p>
                  <strong>Care Info:</strong> {resultObj?.result?.care_info}
                </p>
                <p>
                  <strong>Scientific Info:</strong>{" "}
                  {resultObj?.result?.scientific_info}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UploadSection;
