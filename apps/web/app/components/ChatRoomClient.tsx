"use client";

import { useEffect, useRef, useState } from "react";
import { useSocket } from "../hooks/useSocket";
import { Message } from "../types/IMessage";

const ChatRoomClient = ({
  initialMessages,
  roomId,
}: {
  initialMessages: Message[];
  roomId: string;
}) => {
  const [messages, setMessages] = useState(initialMessages);
  const { socket, loading } = useSocket();
  const inputRef = useRef<HTMLInputElement>(null);

  const messageSendHandler = () => {
    console.log("Ready to send", inputRef.current?.value);
    socket?.send(
      JSON.stringify({
        type: "chat",
        message: inputRef.current?.value,
        roomId,
      })
    );
  };

  useEffect(() => {
    if (socket && !loading) {
      socket.send(
        JSON.stringify({
          type: "join_room",
          roomId,
        })
      );

      socket.onmessage = (event) => {
        const parsedMessage = JSON.parse(event.data);

        if (parsedMessage.type === "chat") {
          setMessages((prevMessages) => [...prevMessages, parsedMessage]);
        }
      };
    }
  }, [socket, loading, roomId]);

  return (
    <div>
      {messages.map((msg, inx) => (
        <div key={inx}>{msg.message}</div>
      ))}
      <input type="text" ref={inputRef} placeholder="Type your message" />
      <button onClick={messageSendHandler}>Send</button>
    </div>
  );
};

export default ChatRoomClient;
