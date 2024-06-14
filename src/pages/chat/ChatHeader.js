import React from "react";
import { useNavigate } from "react-router-dom";

const ChatHeader = () => {
  // 페이지 이동하는 훅 생성
  const navigate = useNavigate();

  const handleClickList = () => {
    navigate({ pathname: "list" });
  };
  const handleClickAdd = () => {
    console.log("채팅 요청 버튼 클릭");
  };
  
  return (
    <div className="my-6 md:flex md:items-center md:justify-center">
      <div className="max-w-64 flex-1">
        <button
        type="button"
        onClick={handleClickList}
        className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          채팅 목록
        </button>
      </div>
      <div className="mt-4 flex md:ml-4 md:mt-0">
        <button
        type="button"
        onClick={handleClickAdd}
        className="ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          채팅 요청
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
