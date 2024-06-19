import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getList, createChatRoom } from "../../api/chatApi";
import { getMembers } from "../../api/MemberApi";
import { getCookie } from "../../util/cookieUtil";

const initState = {
  list: [],
  members: [],
};

const ChatListPage = () => {
  const navigate = useNavigate();
  const [serverData, setServerData] = useState(initState);

  useEffect(() => {
    const memberInfo = getCookie("member");
    if (!memberInfo || !memberInfo.accessToken) {
      console.error("User is not authenticated");
      navigate("/login");
      return;
    }
    fetchChatList();
  }, []);

  const fetchChatList = () => {
    getList()
      .then((data) => {
        setServerData((prevState) => ({ ...prevState, list: data }));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    if (serverData.list.length === 0) {
      getMembers()
        .then((data) => {
          setServerData((prevState) => ({ ...prevState, members: data }));
        })
        .catch((error) => {
          console.error("Error fetching members:", error);
        });
    }
  }, [serverData.list]);

  const moveToRead = (roomId) => {
    navigate(`/chat/room/${roomId}`);
  };

  const handleCreateChatRoom = (member) => {
    createChatRoom(member.id)
      .then((data) => {
        fetchChatList();
      })
      .catch((error) => {
        console.error("Error creating chat room:", error);
      });
  };

  return (
    <>
      {serverData.list.length > 0 ? (
        <ul role="list" className="divide-y divide-gray-100">
          {serverData.list.map((room) => (
            <li
              key={room.id}
              onClick={() => moveToRead(room.id)}
              className="flex gap-x-4 py-5 cursor-pointer"
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
      ) : (
        <div>
          <h2 className="text-lg font-semibold">현재 채팅방이 없습니다!</h2>
          <h3 className="text-md font-semibold">
            지금 바로 채팅을 시작하세요!
          </h3>
          <ul role="list" className="divide-y divide-gray-100">
            {serverData.members.map((member) => (
              <li
                key={member.id}
                onClick={() => handleCreateChatRoom(member)}
                className="flex gap-x-4 py-5 cursor-pointer"
              >
                <div className="flex-auto">
                  <div className="flex items-baseline justify-between gap-x-4">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {member.nickname}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default ChatListPage;
