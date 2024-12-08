import React, { useState, useRef } from "react";

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef();

  const sendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, type: "text" }]);
      setMessage("");
    }
  };

  const sendFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      setMessages([...messages, { file, type: "file" }]);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-2 bg-blue-600 text-white">
        <h1 className="text-lg font-semibold">Chat</h1>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-700">
            📹 Video Call
          </button>
          <button className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-700">
            📞 Audio Call
          </button>
        </div>
      </header>

      {/* Chat Body */}
      <div className="flex-grow overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded ${
              msg.type === "text"
                ? "bg-blue-100 text-gray-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {msg.type === "text" ? (
              <p>{msg.text}</p>
            ) : (
              <a
                href={URL.createObjectURL(msg.file)}
                download
                className="underline text-blue-600"
              >
                {msg.file.name}
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="flex items-center gap-2 p-4 bg-white border-t">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-grow px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Send
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={sendFile}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current.click()}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
        >
          📁 Attach
        </button>
      </div>
    </div>
  );
};

export default ChatApp;
