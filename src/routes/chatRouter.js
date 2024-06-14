import { Suspense, lazy } from "react";
import LoadingPage from "../components/common/LoadingPage";
import { Navigate } from "react-router-dom";

const ChatList = lazy(() => import("../pages/chat/ChatListPage"));
const ChatRoom = lazy(() => import("../pages/chat/ChatRoomPage"));

const chatRouter = () => {
  return [
    {
      path: "list",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <ChatList />
        </Suspense>
      ),
    },
    {
      path: "",
      element: <Navigate replace to="list" />,
    },
    {
      path: "room/:roomId",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <ChatRoom />
        </Suspense>
      ),
    },
  ];
};

export default chatRouter;
