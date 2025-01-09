import User from "../assets/img.jpg";
import { IoSend } from "react-icons/io5";
import { FaRobot } from "react-icons/fa";
import { FcOnlineSupport } from "react-icons/fc";
import { FcBusinessman } from "react-icons/fc";
const ChatDesription = () => {
  const currentDate = new Date();
  const data = [
    {
      id: 1,
      title: "This is the title",
      description: "This is the description",
      img: <FcBusinessman className="h-[50px] w-[50px]"/>,
      user_type: "User",
    },
    {
      id: 2,
      title: "This is the title",
      description: "This is the description",
      img: <FcOnlineSupport className="h-[50px] w-[50px]"/>,
      user_type: "Bot",
    },
    {
      id: 3,
      title: "This is the title",
      description: "This is the description",
      img: <FcBusinessman className="h-[50px] w-[50px]"/>,
      user_type: "User",
    },
    {
      id: 4,
      title: "This is the title",
      description: "This is the description",
      img: <FcOnlineSupport className="h-[50px] w-[50px]"/>,
      user_type: "Bot",
    },
  ];
  return (
    <div className="flex flex-col h-full">
      <div className="h-[80px] bg-[#85b580] flex items-center px-3 justify-between">
        <p className="font-mono text-[20px] text-white font-semibold">
          Disease Classification
        </p>
        <p className="font-mono text-[15px] text-white font-semibold">
          {currentDate.toLocaleDateString()}
        </p>
      </div>
      <div className="flex-1 my-2 flex flex-col gap-2">
        <div className="flex items-end gap-4">
          <FcOnlineSupport className="h-[50px] w-[50px] " />
          <p className="w-[400px] rounded-md bg-[#85b580] text-white p-3 font-mono text-[15px] font-medium">
            Hello! I am a bot here to assist you with any questions or concerns
            related to plant diseases. How can I help you today?
          </p>
        </div>
        {data?.map((details, index) => (
          <div key={index}>
            <div className={`flex items-end gap-4 ${details?.user_type === 'Bot' ? 'flex items-end':'flex flex-row-reverse'}`}>
              {details?.img}
              <p className="w-[400px] rounded-md bg-[#85b580] text-white p-3 font-mono text-[15px] font-medium">
                Hello! I am a bot here to assist you with any questions or
                concerns related to plant diseases. How can I help you today?
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center w-full gap-3">
        <input
          className="border-[#85b580] border-[1px] flex-1 p-2 rounded-md"
          placeholder="Hello, Any Questions?"
        />
        <IoSend className="h-[20px] w-[20px]" />
      </div>
    </div>
  );
};

export default ChatDesription;
