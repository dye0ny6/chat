import { useParams } from "react-router-dom";
import MessageComponent from "../../components/chat/MessageComponent";
import ChatRoomHeader from "./ChatRoomHeader";

const ChatRoomPage = () => {
  const { roomId } = useParams();
  console.log("roomId:", roomId);

  return (
    <>
      <ChatRoomHeader roomId={roomId}></ChatRoomHeader>
      <MessageComponent roomId={roomId}></MessageComponent>
    </>
  );
};

export default ChatRoomPage;
