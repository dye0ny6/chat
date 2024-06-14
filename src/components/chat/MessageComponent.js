import { getRoom } from "../../api/chatApi";
import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

const initState = {
  messages: [],
};

const MessageComponent = ({ roomId }) => {
  const [messages, setMessages] = useState(initState);
  const [messageInput, setMessageInput] = useState("");
  const stompClient = useRef(null);

  useEffect(() => {
    getRoom(roomId)
      .then((data) => {
        console.log("Received messages from server:", data);
        setMessages({ messages: data });
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  }, [roomId]);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/chat");
    stompClient.current = Stomp.over(socket);

    stompClient.current.connect({}, onConnected, onError);

    return () => {
      if (stompClient.current) {
        stompClient.current.disconnect();
      }
    };
  }, []);

  const onConnected = () => {
    console.log("Connected!");
    stompClient.current.subscribe("/sub/chat", onMessageReceived);
    stompClient.current.send(
      "/pub/chat/enter",
      {},
      JSON.stringify({ sender: "User0" })
    );
  };

  const onError = (error) => {
    console.error(
      "Could not connect to WebSocket server. Please refresh this page to try again!",
      error
    );
  };

  const onMessageReceived = (payload) => {
    const message = JSON.parse(payload.body);
    setMessages((prevMessages) => ({ messages: [...prevMessages.messages, message] }));
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    if (messageInput.trim() && stompClient.current) {
      const chatMessage = {
        sender: { id: 1, nickname: "User0" }, // sender 정보를 적절히 수정 필요
        content: messageInput,
        type: "MESSAGE",
      };
      stompClient.current.send("/pub/chat/message", {}, JSON.stringify(chatMessage));
      setMessageInput("");
    }
  };

  return (
    <>
      <div className="flex w-full flex-col gap-4">
        {messages.messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-end gap-2 ${
              message.sender.id === 2 ? "ml-auto flex-row-reverse" : ""
            }`}
          >
            {message.sender.id !== 1 && (
              <img
                className="size-8 rounded-full object-cover"
                src={
                  message.sender.profileImage.length > 0
                    ? message.sender.profileImage[0]
                    : "default_image_url"
                }
                alt="avatar"
              />
            )}
            <div
              className={`flex max-w-[70%] flex-col gap-2 p-4 text-sm ${
                message.sender.id === 1
                  ? "bg-blue-700 text-slate-100 rounded-l-xl rounded-tr-xl"
                  : "bg-slate-100 text-slate-700 rounded-r-xl rounded-tl-xl"
              }`}
            >
              <span className="font-semibold">{message.sender.nickname}</span>
              <div>{message.content}</div>
              <span className="ml-auto text-xs">
                {new Date(Date.UTC(...message.timestamp)).toLocaleString()}
              </span>
            </div>
            {message.sender.id === 1 && (
              <span className="flex size-8 items-center justify-center overflow-hidden rounded-full border border-slate-300 bg-slate-100 text-sm font-bold tracking-wider text-slate-700">
                JS
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <div className="w-full pl-3 pr-1 py-1 rounded-3xl border border-gray-200 items-center gap-2 inline-flex justify-between">
          <form onSubmit={handleSendMessage}>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
              >
                <g id="User Circle">
                  <path
                    id="icon"
                    d="M6.05 17.6C6.05 15.3218 8.26619 13.475 11 13.475C13.7338 13.475 15.95 15.3218 15.95 17.6M13.475 8.525C13.475 9.89191 12.3669 11 11 11C9.6331 11 8.525 9.89191 8.525 8.525C8.525 7.1581 9.6331 6.05 11 6.05C12.3669 6.05 13.475 7.1581 13.475 8.525ZM19.25 11C19.25 15.5563 15.5563 19.25 11 19.25C6.44365 19.25 2.75 15.5563 2.75 11C2.75 6.44365 6.44365 2.75 11 2.75C15.5563 2.75 19.25 6.44365 19.25 11Z"
                    stroke="#4F46E5"
                    stroke-width="1.6"
                  />
                </g>
              </svg>
              <input
                className="w-full grow shrink basis-0 text-black text-xs font-medium leading-4 focus:outline-none"
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type here..."
              />
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
              >
                <g id="Attach 01">
                  <g id="Vector">
                    <path
                      d="M14.9332 7.79175L8.77551 14.323C8.23854 14.8925 7.36794 14.8926 6.83097 14.323C6.294 13.7535 6.294 12.83 6.83097 12.2605L12.9887 5.72925M12.3423 6.41676L13.6387 5.04176C14.7126 3.90267 16.4538 3.90267 17.5277 5.04176C18.6017 6.18085 18.6017 8.02767 17.5277 9.16676L16.2314 10.5418M16.8778 9.85425L10.72 16.3855C9.10912 18.0941 6.49732 18.0941 4.88641 16.3855C3.27549 14.6769 3.27549 11.9066 4.88641 10.198L11.0441 3.66675"
                      stroke="#9CA3AF"
                      stroke-width="1.6"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M14.9332 7.79175L8.77551 14.323C8.23854 14.8925 7.36794 14.8926 6.83097 14.323C6.294 13.7535 6.294 12.83 6.83097 12.2605L12.9887 5.72925M12.3423 6.41676L13.6387 5.04176C14.7126 3.90267 16.4538 3.90267 17.5277 5.04176C18.6017 6.18085 18.6017 8.02767 17.5277 9.16676L16.2314 10.5418M16.8778 9.85425L10.72 16.3855C9.10912 18.0941 6.49732 18.0941 4.88641 16.3855C3.27549 14.6769 3.27549 11.9066 4.88641 10.198L11.0441 3.66675"
                      stroke="black"
                      stroke-opacity="0.2"
                      stroke-width="1.6"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                </g>
              </svg>
              <button className="items-center flex px-3 py-2 bg-indigo-600 rounded-full shadow">
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
                      stroke-width="1.6"
                      stroke-linecap="round"
                    />
                  </g>
                </svg>
                <h3 className="text-white text-xs font-semibold leading-4 px-2">
                  Send
                </h3>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default MessageComponent;