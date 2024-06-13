import { Suspense, lazy } from "react";
import LoadingPage from "../components/common/LoadingPage";

const Login = lazy(() => import("../pages/member/LoginPage"));
const Signup = lazy(() => import("../pages/member/SignupPage"));

const memberRouter = () => {
  return [
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
  ];
};

export default memberRouter;