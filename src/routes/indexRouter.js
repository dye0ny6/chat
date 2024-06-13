import { useRoutes } from "react-router-dom";
import { Suspense, lazy } from "react";
import LoadingPage from "../components/common/LoadingPage";
import memberRouter from "./memberRouter";

const Main = lazy(() => import("../pages/main/MainPage"));
const Chat = lazy(() => import("../pages/ChatPage"));
const MemberIndex = lazy(() => import("../pages/member/MemberIndex"));

const Router = () => {
  return useRoutes([
    {
      path: "",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <Main />
        </Suspense>
      ),
    },
    {
      path: "chat",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <Chat />
        </Suspense>
      ),
    },
    {
      path: "member",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <MemberIndex />
        </Suspense>
      ),
      children: memberRouter(),
    },
  ]);
};

export default Router;
