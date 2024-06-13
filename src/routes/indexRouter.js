import { useRoutes } from "react-router-dom";
import { Suspense, lazy } from "react";
import LoadingPage from "../components/common/LoadingPage";

const Main = lazy(() => import("../pages/main/MainPage"));
const Chat = lazy(() => import("../pages/ChatPage"));
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
          <Chat />
        </Suspense>
      ),
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
