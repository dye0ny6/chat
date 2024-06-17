import React, { useState, useEffect, useCallback, useRef } from "react";
import { getRoom } from "../../api/chatApi";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import useCustomLogin from "../../hooks/useCustomLogin";
import { useParams } from "react-router-dom";

const ChatRoomPage = () => {
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const { loginState } = useCustomLogin();
  const stompClientRef = useRef(null);

  const handleNewMessage = useCallback((newMessage) => {
    console.log("New message received:", newMessage);
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  }, []);

  const connect = useCallback(() => {
    if (!roomId) {
      console.error("roomId is not defined");
      return;
    }

    const socket = new SockJS("http://localhost:8080/chat");
    const stompClient = Stomp.over(socket);

    stompClient.connect(
      { Authorization: `Bearer ${loginState.accessToken}` },
      () => {
        stompClient.subscribe(`/sub/chat/room/${roomId}`, (message) => {
          handleNewMessage(JSON.parse(message.body));
        });
      },
      (error) => {
        console.error("STOMP connection error: ", error);
      }
    );

    stompClientRef.current = stompClient;
  }, [roomId, loginState.accessToken, handleNewMessage]);

  const disconnect = useCallback(() => {
    if (stompClientRef.current) {
      stompClientRef.current.disconnect();
      console.log("Disconnected");
    }
  }, []);

  const sendMessage = useCallback(
    (message) => {
      if (stompClientRef.current && stompClientRef.current.connected) {
        stompClientRef.current.send(
          `/pub/chat/room/${roomId}/message`,
          {
            Authorization: `Bearer ${loginState.accessToken}`,
          },
          JSON.stringify({
            roomId: roomId,
            content: message,
            type: "MESSAGE",
            sender: {
              email: loginState.email,
            },
          })
        );
      } else {
        console.error("STOMP client is not connected.");
      }
    },
    [roomId, loginState.accessToken, loginState.email]
  );

  useEffect(() => {
    if (!roomId) {
      console.error("roomId is not defined");
      return;
    }

    getRoom(roomId)
      .then((data) => {
        console.log("Received messages from server:", data);
        setMessages(data);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });

    connect();

    return () => {
      disconnect();
    };
  }, [roomId, connect, disconnect]);

  const handleSendMessage = (event) => {
    event.preventDefault();
    if (messageInput.trim()) {
      sendMessage(messageInput);
      setMessageInput("");
    }
  };

  return (
    <>
      <div className="flex w-full flex-col gap-4">
        {messages.map((message, index) => (
          <div
            key={message.id || index}
            className={`chat ${
              message.sender.email === loginState.email
                ? "chat-end"
                : "chat-start"
            }`}
          >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  src={
                    message.sender.profileImage?.length > 0
                      ? message.sender.profileImage[0]
                      : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  }
                  alt="avatar"
                />
              </div>
            </div>
            <div className="chat-header">
              {message.sender.nickname}
              <time className="text-xs opacity-50">
                {new Date(message.timestamp).toLocaleTimeString()}
              </time>
            </div>
            <div className="chat-bubble">{message.content}</div>
            <div className="chat-footer opacity-50">Delivered</div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <div className="w-full pl-3 pr-1 py-1 rounded-3xl border border-gray-200 items-center gap-2 inline-flex justify-between">
          <form onSubmit={handleSendMessage} className="flex w-full">
            <div className="flex-grow">
              <input
                className="w-full grow shrink basis-0 text-black text-xs font-medium leading-4 focus:outline-none"
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type here..."
              />
            </div>
            <button
              type="submit"
              className="items-center flex px-3 py-2 bg-indigo-600 rounded-full shadow "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <g id="Send 01">
                  <path
                    id="icon"
                    d="M9.04071 6.959L6.54227 9.45744M6.89902 10.0724L7.03391 10.3054C8.31034 12.5102 8.94855 13.6125 9.80584 13.5252C10.6631 13.4379 11.0659 12.2295 11.8715 9.81261L13.0272 6.34566C13.7631 4.13794 14.1311 3.03408 13.5484 2.45139C12.9657 1.8687 11.8618 2.23666 9.65409 2.97257L6.18714 4.12822C3.77029 4.93383 2.56187 5.33664 2.47454 6.19392C2.38721 7.0512 3.48957 7.68941 5.69431 8.96584L5.92731 9.10074C6.23326 9.27786 6.38623 9.36643 6.50978 9.48998C6.63333 9.61352 6.72189 9.7665 6.89902 10.0724Z"
                    stroke="white"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </g>
              </svg>
              <h3 className="text-white text-xs font-semibold leading-4 px-2">
                Send
              </h3>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatRoomPage;
