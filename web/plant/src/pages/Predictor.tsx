import React from "react";
import UploadSection from "../components/UploadSection";
import Banner from "../assets/banner.png";
const Predictor = () => {
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
              src={Banner}
              className="h-[400px] w-[400px] rounded-lg shadow-md"
            />
          </div>
          <div className="w-[50%] h-full">
            <UploadSection />
          </div>
        </div>
        <button className="w-full bg-[#85b580] text-white py-2 rounded-md font-mono text-[15px] cursor-pointer">
            Submit
        </button>
        <div>
          <div className="mt-6 space-y-6">
            <div
              // key={index}
              className="p-4 bg-green-50 border border-green-400 rounded"
            >
              <h3 className="text-green-700 font-bold">Analysis Result #1</h3>
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
                <strong>Care Info: </strong> Regularly prune apple trees to
                improve air circulation and reduce moisture retention on leaves
                and branches, which creates a less favorable environment for the
                fungus.
              </p>
              <p>
                <strong>Scientific Info:</strong> No Information available
              </p>
            </div>
          </div>
        </div>
      </main>
      <footer className="w-full bg-[#85b580] text-white py-2 text-center">
        <p>© 2024 Plant Disease Recognition System</p>
      </footer>
    </div>
  );
};

export default Predictor;
