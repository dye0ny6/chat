import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { getRoom } from "../../api/chatApi";
import { useEffect, useState } from "react";

const initState = {
  list: [],
};

const ChatRoomHeader = ({ roomId }) => {
  const [serverData, setServerData] = useState(initState);

  // axio로 API 서버에 데이터 요청
  // useEffect를 이용해서 roomId 값이 변경될 때만 axios 호출되도록 처리
  useEffect(() => {
    getRoom(roomId)
      .then((data) => {
        console.log("Received data from server:", data);
        setServerData({ list: data });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [roomId]);

  // list가 비어있지 않으면 첫 번째 항목을 가져옵니다.
  const chat = serverData.list.length > 0 ? serverData.list[0] : null;

  if (!chat) {
    return (
      <>
        <div className="flex flex-col gap-4 w-52">
          <div className="flex gap-4 items-center">
            <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
            <div className="flex flex-col gap-4">
              <div className="skeleton h-4 w-20"></div>
              <div className="skeleton h-4 w-28"></div>
            </div>
          </div>
          <div className="skeleton h-32 w-full"></div>
        </div>
      </> // 데이터를 가져올 수 없는 경우
    );
  }

  const profileImage =
    chat.sender.profileImage.length > 0
      ? chat.sender.profileImage[0]
      : "https://penguinui.s3.amazonaws.com/component-assets/avatar-8.webp";

  return (
    <ul role="list" className="divide-y divide-gray-100">
      <li key={chat.id} className="relative flex justify-between py-5">
        <div className="flex gap-x-4 pr-6 sm:w-1/2 sm:flex-none">
          <img
            className="h-12 w-12 flex-none rounded-full bg-gray-50"
            src={profileImage}
            alt={chat.sender.nickname}
          />
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">
              <a href="#">
                <span className="absolute inset-x-0-top-px bottom-0" />
                {chat.sender.nickname}
              </a>
            </p>
            <p className="mt-1 flex text-xs leading-5 text-gray-500">
              <a
                href={`mailto:${chat.sender.email}`}
                className="relative truncate hover:underline"
              >
                {chat.sender.email}
              </a>
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-x-4 sm:w-1/2 sm:flex-none">
          <div className="flex gap-x-4">
            <p className="text-sm text-gray-500">{chat.chatRoom.name}</p>
          </div>
          <div className="flex gap-x-4">
            <ChevronRightIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
        </div>
      </li>
    </ul>
  );
};

export default ChatRoomHeader;
