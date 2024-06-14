import { useEffect, useState } from "react";
import { getList } from "../../api/chatApi";
import { useNavigate } from "react-router-dom";

const initState = {
  list: [],
};

const ChatListPage = () => {
  const navigate = useNavigate();
  const [serverData, setServerData] = useState(initState);

  useEffect(() => {
    getList()
      .then((data) => {
        console.log("Received data from server:", data);
        setServerData({ list: data });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const moveToRead = (roomId) => {
    console.log("roomId:", roomId);
    navigate(`/chat/room/${roomId}`);
  };

  return (
    <>
      <ul role="list" className="divide-y divide-gray-100">
        {serverData.list.map((room) => (
          <li
            key={room.id}
            onClick={() => moveToRead(room.id)}
            className="flex gap-x-4 py-5"
          >
            <div className="flex-auto">
              <div className="flex items-baseline justify-between gap-x-4">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {room.name}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ChatListPage;
