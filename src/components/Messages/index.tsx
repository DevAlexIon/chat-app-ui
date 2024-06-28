import React from "react";

const messages = [
  {
    id: 1,
    name: "Elmer Laverty",
    message: "Haha oh man",
    time: "12m",
    status: "Question",
    statusColor: "bg-yellow-200",
  },
  {
    id: 2,
    name: "Florencio Dorrance",
    message: "woohooo",
    time: "24m",
    status: "Some content",
    statusColor: "bg-blue-200",
  },
  {
    id: 3,
    name: "Lavern Laboy",
    message: "Haha that's terrifying 😂",
    time: "1h",
    status: "Bug",
    statusColor: "bg-red-200",
  },
];

const MessagesSidebar: React.FC = () => {
  return (
    <div className="flex flex-col w-369 h-screen bg-white p-4 ml-6">
      <div className="flex justify-between items-center my-3">
        <h2 className="text-xl font-semibold">Messages</h2>
        <span className="bg-purple-500 text-white text-sm py-1 px-3 rounded-full">
          12
        </span>
      </div>
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search messages"
          className="w-full p-2 rounded-lg bg-gray-200"
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className="flex items-center mb-4 p-2 rounded-lg hover:bg-gray-200 cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold">{message.name}</span>
                <span className="text-xs text-gray-500">{message.time}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">{message.message}</span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${message.statusColor}`}
                >
                  {message.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessagesSidebar;
