import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import DropDownComponent from "../components/common/DropDownComponent";
import useCustomLogin from "../hooks/useCustomLogin";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);
  const loginState = useSelector((state) => state.loginSlice);
  const { execLogout, moveToPath } = useCustomLogin();

  const handleClickMy = () => {
    setIsOpen(!isOpen);
  };
  const handleCloseMy = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleClickLogout = () => {
    execLogout();
    // alert("로그아웃 되었습니다.");
    moveToPath("/");
  };

  // 메뉴 (사실 이렇게 안 해도 됨)
  const navigation = [{ name: "Chat", href: "/chat" }];
  // 마이프로필 드롭다운 메뉴 - 비로그인
  const menuItemsProfile = [
    { name: "로그인", to: "/login" },
    { name: "회원가입", to: "/signup" },
  ];
  // 마이프로필 드롭다운 메뉴 - 로그인
  const menuItemsJWT = [
    { name: "프로필", to: "/profile" },
    { name: "설정", to: "/setting" },
    {
      name: "로그아웃",
      // to: "/logout",
      onClick: handleClickLogout,
    },
  ];
  // 알림 드롭다운 메뉴
  const menuItemsNotification = [
    { name: "알림1", to: "/" },
    /*{
    name: (
      <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"></div>
    ),
    to: "/",
  },*/
    { name: "알림2", to: "/" },
  ];

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50 flex h-16 border-b border-gray-900/10">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex flex-1 items-center gap-x-6">
            <button
              type="button"
              className="-m-3 p-3 md:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-5 w-5 text-gray-900" aria-hidden="true" />
            </button>
            <Link to="/" className="-m-1.5 p-1.5">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Logo"
              />
            </Link>
          </div>
          <nav className="hidden md:flex md:gap-x-11 md:text-sm md:font-semibold md:leading-6 md:text-gray-700">
            {navigation.map((item, itemIdx) => (
              <Link key={itemIdx} to={item.href}>
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="flex flex-1 items-center justify-end gap-x-8">
            <div className="h-6 w-6">
              <button type="button" className="-m-2.5 p-2.5">
                <span className="sr-only">View notifications</span>
                <DropDownComponent
                  onClick={handleClickMy}
                  menuItems={menuItemsNotification}
                  menuButtonImage="https://img.icons8.com/?size=100&id=eMfeVHKyTnkc&format=png&color=000000"
                />
                {isOpen && (
                  <div ref={dropdownRef} onClick={handleCloseMy}></div>
                )}
              </button>
            </div>
            <div className="-m-1.5 p-1.5">
              <span className="sr-only">Your profile</span>
              <div className="h-8 w-8">
                {loginState.email ? (
                  <DropDownComponent
                    onClick={handleClickMy}
                    menuItems={menuItemsJWT}
                    menuButtonImage={
                      // TODO 로그인 사용자 프로필
                      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    }
                  />
                ) : (
                  <DropDownComponent
                    onClick={handleClickMy}
                    menuItems={menuItemsProfile}
                  />
                )}
                {isOpen && (
                  <div ref={dropdownRef} onClick={handleCloseMy}></div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Dialog
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 left-0 z-50 w-full overflow-y-auto bg-white px-4 pb-6 sm:max-w-sm sm:px-6 sm:ring-1 sm:ring-gray-900/10">
            <div className="-ml-0.5 flex h-16 items-center gap-x-6">
              <button
                type="button"
                className="-m-2.5 p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
              <div className="-ml-0.5">
                <Link to="/" className="-m-1.5 block p-1.5">
                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Logo"
                  />
                </Link>
              </div>
            </div>
            <div className="mt-2 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </DialogPanel>
        </Dialog>
      </header>
      <div className="mx-auto max-w-7xl pt-16 lg:flex lg:gap-x-16 lg:px-8"></div>
    </>
  );
}
