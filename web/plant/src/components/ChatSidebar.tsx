import React, { useState } from "react";
import User from "../assets/img.jpg";
const data = [
  {
    id: 1,
    title: "This is the title",
    description: "This is the description",
    img: User,
  },
  {
    id: 2,
    title: "This is the title",
    description: "This is the description",
    img: User,
  },
  {
    id: 3,
    title: "This is the title",
    description: "This is the description",
    img: User,
  },
  {
    id: 4,
    title: "This is the title",
    description: "This is the description",
    img: User,
  },
];

const ChatSidebar = () => {
const currentDate  = new Date()
const [active,setActive] = useState(data[0])
  return (
    <div className="flex flex-col gap-3">
      {data?.map((details: any, index: any) => (
        <div key={index} 
        className={`flex items-end justify-between p-2 cursor-pointer ${details?.id === active?.id ? 'bg-gray-300' : ''}`}
        onClick={() => setActive(details)}

        >
          <div>
            <p className="font-mono text-[16px] font-semibold text-[#484b53]">{details?.title}</p>
            <p className="font-mono text-[14px] font-light text-[#908c8d]">{details?.description}</p>
          </div>
          <p>{new Date().toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatSidebar;
