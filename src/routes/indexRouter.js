import { useRoutes } from "react-router-dom";
import { Suspense, lazy } from "react";
import LoadingPage from "../components/common/LoadingPage";
import chatRouter from "./chatRouter";

const Main = lazy(() => import("../pages/main/MainPage"));
const ChatIndex = lazy(() => import("../pages/chat/ChatIndex"));
const Signup = lazy(() => import("../pages/member/SignupPage"));
const Login = lazy(() => import("../pages/member/LoginPage"));

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
          <ChatIndex />
        </Suspense>
      ),
      children: chatRouter(),
    },
    {
      path: "signup",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <Signup />
        </Suspense>
      ),
    },
    {
      path: "login",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <Login />
        </Suspense>
      ),
    },
  ]);
};

export default Router;
