import { useRoutes } from "react-router-dom";
import { Suspense, lazy } from "react";
import LoadingPage from "../components/common/LoadingPage";

const Main = lazy(() => import("../pages/MainPage"));
const Chat = lazy(() => import("../pages/ChatPage"));

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
  ]);
};

export default Router;
