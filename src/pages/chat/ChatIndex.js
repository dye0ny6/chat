import React from "react";
import BasicLayout from "../../layouts/BasicLayout";
import ChatHeader from "./ChatHeader";
import { Outlet } from "react-router-dom";

const ChatIndex = () => {
  return (
    <BasicLayout>
      {/* Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ChatHeader />
        <main>
          <div className="overflow-hidden bg-white sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </BasicLayout>
  );
};

export default ChatIndex;
