import { Link } from "react-router-dom";
import { useState } from "react";
import BasicLayout from "./../../layouts/BasicLayout";
import FindIdFWModal from "../../components/common/FindIdFWModal";
import useCustomLogin from "../../hooks/useCustomLogin";

const initState = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const [loginParam, setLoginParam] = useState({ ...initState });
  const [isFindModalOpen, setIsFindModalOpen] = useState(false);
  const { execLogin, moveToPath } = useCustomLogin();

  const openFindModal = () => {
    setIsFindModalOpen(true);
  };

  const closeFindModal = () => {
    setIsFindModalOpen(false);
  };

  const handleClickLogin = () => {
    console.log("***** LoginPage - handleClickLogin");
    console.log("***** LoginPage handleClickLogin - loginParam : ", loginParam);
    execLogin(loginParam).then((data) => {
      console.log("로그인 정보 : ", loginParam);
      console.log("data", data);
      if (data.error) {
        alert("이메일 또는 비밀번호가 올바르지 않습니다.");
      } else {
        alert("로그인 성공!"); // TODO data 정보 보고 백틱 사용
        moveToPath("/");
      }
    });
  };

  /*  const handleChange = (e) => {
    loginParam[e.target.name] = e.target.value;
    setLoginParam({ ...loginParam });
  };*/
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginParam((prevLoginParam) => ({
      ...prevLoginParam,
      [name]: value,
    }));
  };

  return (
    <BasicLayout>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                이메일
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={loginParam.email}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  비밀번호
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={loginParam.password}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={handleClickLogin}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                로그인
              </button>
            </div>
          </form>

          <div className="mt-10 text-center text-sm">
            <Link
              to="/signup"
              className="block font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              회원가입
            </Link>
            <div
              onClick={openFindModal}
              className="cursor-pointer font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              이메일/비밀번호 찾기
            </div>
            {isFindModalOpen && (
              <FindIdFWModal
                isOpen={isFindModalOpen}
                onClose={closeFindModal}
              />
            )}
          </div>
        </div>
      </div>
    </BasicLayout>
  );
};

export default LoginPage;
