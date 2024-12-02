import React from 'react';
import UploadSection from './components/UploadSection';

const App = () => {
  return (
    <div className="bg-green-50 min-h-screen flex flex-col items-center">
      <header className="w-full bg-green-600 text-white py-4 shadow-md">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Plant Disease Recognition</h1>
          {/* <nav className="space-x-4">
            <a href="#home" className="hover:text-green-300">Home</a>
            <a href="#about" className="hover:text-green-300">About</a>
            <a href="#contact" className="hover:text-green-300">Contact</a>
          </nav> */}
        </div>
      </header>
      <main className="flex-grow w-full max-w-4xl p-4">
        <h2 className="text-2xl font-semibold text-center text-green-700 mb-6">
          Upload an Image of Your Plant
        </h2>
        <UploadSection />
      </main>
      <footer className="w-full bg-green-600 text-white py-2 text-center">
        <p>© 2024 Plant Disease Recognition System</p>
      </footer>
    </div>
  );
};

export default App;
