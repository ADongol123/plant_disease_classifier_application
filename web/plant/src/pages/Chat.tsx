import ChatDesription from "../components/ChatDesription";
import ChatSidebar from "../components/ChatSidebar";

const Chat = () => {
  return (
    <div className="bg-green-50 h-[100vh] flex flex-col items-center ">
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
      <div className="flex-1 flex items-start w-[90%] my-3 gap-2">
        <div className="w-[25%] border-[#4eb550] h-full p-2 rounded-md border-[2px]">
          <ChatSidebar />
        </div>
        <div className="w-[75%] border-[#4eb550] h-full p-2 rounded-md border-[2px]">
          <ChatDesription />
        </div>
      </div>
      <footer className="w-full bg-[#85b580] text-white py-2 text-center">
        <p>© 2024 Plant Disease Recognition System</p>
      </footer>
    </div>
  );
};

export default Chat;
