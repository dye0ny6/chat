import React, { useEffect, useState } from "react";
import ProfileListComponent from "../member/ProfileListComponent";
import { API_SERVER_HOST, getList } from "../../api/MemberApi";
import useCustomMove from "./../../hooks/useCustomMove";

const initState = {
  list: [],
  pageNumList: [],
  prev: false,
  next: false,
  totalCount: 0,
  prevPage: 0,
  nextPage: 0,
  pageNumLength: 0,
  current: 0,
};

const host = API_SERVER_HOST;

const MainComponent = () => {
  const [serverData, setServerData] = useState(initState);
  const { page, size, refresh } = useCustomMove();

  useEffect(() => {
    console.log("***** MainComponent useEffect - getList 호출");
    getList({ page, size }).then((data) => {
      console.log(data);
      setServerData(data);
    });
  }, [page, size, refresh]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <ProfileListComponent member={serverData} />
    </div>
  );
};

export default MainComponent;
