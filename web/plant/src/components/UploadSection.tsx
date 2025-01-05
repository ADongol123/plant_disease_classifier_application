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
                    src="https://storage.googleapis.com/kagglesdsdata/datasets/78313/182633/New%20Plant%20Diseases%20Dataset%28Augmented%29/New%20Plant%20Diseases%20Dataset%28Augmented%29/train/Potato___Early_blight/001187a0-57ab-4329-baff-e7246a9edeb0___RS_Early.B%208178.JPG?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20241204%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20241204T190845Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=ad481e99a9b6563c784382e57dec27a8700859113ea880fc984fe83c0db098dd1f9948f7dd834c1d868932fa5e952ecd7cc98b0bc7c1c5caffde8546bc7700d8c363377d92b1f0d8b5176aa321372c5f89e48827b73c13f47d7b76480da2908710e61aac2487524e01fa46d4b27a64890d18ce06c4eea1af7527cce3fb92c70afbda7160c93286cf06feb036c43cc3f6c07cbf908ecfffac0e40a4bca41ee78d2b47eab9b64f3140429bb6778e3cdf1305f6078f54ee60cfa94832c1c8d0717fa08939a8075d7472e966bdd19ff785c627bdd0b24bca2fa9fa6a2efe13171a7b07badaebc45d797a99dc66045c9ede6abefcdb2ebba7c85612620f14edfd7984"
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
        <div className="mt-6 space-y-6">
              <div
                // key={index}
                className="p-4 bg-green-50 border border-green-400 rounded"
              >
                <h3 className="text-green-700 font-bold">
                  Analysis Result #1
                </h3>
                <div className="mt-4">
                  <h3 className="text-gray-700 font-bold">Image Preview</h3>
                  <img
                    src="https://storage.googleapis.com/kagglesdsdata/datasets/78313/182633/New%20Plant%20Diseases%20Dataset%28Augmented%29/New%20Plant%20Diseases%20Dataset%28Augmented%29/train/Apple___Apple_scab/01f3deaa-6143-4b6c-9c22-620a46d8be04___FREC_Scab%203112.JPG?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20241204%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20241204T193618Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=5b1b47180d4067fc5cc2181d813d2c075d2e90e4311ce07aebbeae2e62b35e0ec9d896229cdd932038779100ad03dcd118697092c3a970d19a25ec7c77eb1b4090eefa9b6ff5b6ecc3960350a5ddb1ccde96d6c07886135258e358a42a416693bbec7550e361714fb5206f407847596092eed7e1aef9cffebaeb4320555eed8d3b382c0137af05684a4fae94e4ef244e9f722cfc4da088be3dafd2721fb0ff182e1e02d349301ad3f9847666fefe8596fba558e96afd1827bae52f7bf154214f0be5b0fdd5c52b7e32e63391e28246f7378d9633766b4a304fc097e73c12e4e45d8233e1988aff38a1f99dc286971603d09189271ad18021afd6562afb75bc14"
                    // alt={`Selected ${index + 1}`}
                    className="mt-2 border rounded-md max-w-full"
                  />
                </div>
                <p>
                  <strong>Disease:</strong> Apple_Apple_scab
                </p>
                <p>
                  <strong>Confidence:</strong> 98% 
                </p>
                <p>
                  <strong>Care Info: </strong>  Regularly prune apple trees to improve air circulation and reduce moisture retention on leaves and branches, which creates a less favorable environment for the fungus.
                </p>
                <p>
                  <strong>Scientific Info:</strong>{" "}
                   No Information available
                </p>
              </div>
       
        </div>
      
      <div className="mt-6 space-y-6">
              <div
                // key={index}
                className="p-4 bg-green-50 border border-green-400 rounded"
              >
                <h3 className="text-green-700 font-bold">
                  Analysis Result #2
                </h3>
                <div className="mt-4">
                  <h3 className="text-gray-700 font-bold">Image Preview</h3>
                  <img
                    src="https://storage.googleapis.com/kagglesdsdata/datasets/78313/182633/New%20Plant%20Diseases%20Dataset%28Augmented%29/New%20Plant%20Diseases%20Dataset%28Augmented%29/train/Potato___Early_blight/001187a0-57ab-4329-baff-e7246a9edeb0___RS_Early.B%208178.JPG?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20241204%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20241204T190845Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=ad481e99a9b6563c784382e57dec27a8700859113ea880fc984fe83c0db098dd1f9948f7dd834c1d868932fa5e952ecd7cc98b0bc7c1c5caffde8546bc7700d8c363377d92b1f0d8b5176aa321372c5f89e48827b73c13f47d7b76480da2908710e61aac2487524e01fa46d4b27a64890d18ce06c4eea1af7527cce3fb92c70afbda7160c93286cf06feb036c43cc3f6c07cbf908ecfffac0e40a4bca41ee78d2b47eab9b64f3140429bb6778e3cdf1305f6078f54ee60cfa94832c1c8d0717fa08939a8075d7472e966bdd19ff785c627bdd0b24bca2fa9fa6a2efe13171a7b07badaebc45d797a99dc66045c9ede6abefcdb2ebba7c85612620f14edfd7984"
                    // alt={`Selected ${index + 1}`}
                    className="mt-2 border rounded-md max-w-full"
                  />
                </div>
                <p>
                  <strong>Disease:</strong> Potato___Early_blight
                </p>
                <p>
                  <strong>Confidence:</strong> 100% 
                </p>
                <p>
                  <strong>Care Info: </strong>  Do not dig tubers until they are fully mature in order to prevent damage.
                </p>
                <p>
                  <strong>Scientific Info:</strong>{" "}
                   No Information available
                </p>
              </div>
       
        </div>
    </div>
  );
};

export default UploadSection;
