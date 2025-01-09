import React from "react";
import Banner from "../assets/banner.png";
const Startpage = () => {
  return (
    <div className="h-[100vh] bg-[#6d9b72]">
      <img src={Banner} alt="banner" className="h-[90vh] w-full" />
      <div className="flex justify-center items-center gap-5 mt-3">
        <a href="/predictor">
          <button className="p-4 bg-[#deb603] rounded-lg text-white font-mono text-[20px] hover:bg-[#e9c465]">
            Start Predictor
          </button>
        </a>
        <a href="/chat">
          <button className="p-4 bg-[#deb603] rounded-lg text-white font-mono text-[20px] hover:bg-[#e9c465]">
            Start Chat
          </button>
        </a>
      </div>
    </div>
  );
};

export default Startpage;
