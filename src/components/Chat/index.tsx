import React from "react";

const messages = [
  { id: 1, sender: "contact", content: "omg, this is amazing" },
  { id: 2, sender: "contact", content: "perfect! ✅" },
  { id: 3, sender: "contact", content: "Wow, this is really epic" },
  { id: 4, sender: "user", content: "How are you?" },
  { id: 5, sender: "user", content: "woohooo" },
  { id: 6, sender: "user", content: "Haha oh man" },
  { id: 7, sender: "user", content: "Haha that's terrifying 😂" },
];

const ChatWindow: React.FC = () => {
  return (
    <div className="flex flex-col flex-1 h-screen bg-white p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
          <div>
            <h2 className="text-xl font-semibold">Florencio Dorrance</h2>
            <span className="text-sm text-green-500">Online</span>
          </div>
        </div>
        <button className="bg-purple-500 text-white py-2 px-4 rounded-lg">
          Call
        </button>
      </div>
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex mb-4 ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 rounded-lg ${
                message.sender === "user"
                  ? "bg-purple-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Type a message"
          className="flex-1 p-2 border rounded-lg mr-2"
        />
        <button className="bg-purple-500 text-white py-2 px-4 rounded-lg">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
