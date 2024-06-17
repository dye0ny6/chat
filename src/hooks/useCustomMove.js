import { useState } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const getQuery = (queryStr, defaultValue) => {
  if (!queryStr) {
    return defaultValue;
  }
  return parseInt(queryStr);
};

const useCustomMove = () => {
  const navigate = useNavigate();

  // 현재 페이지를 다시 클릭해도 서버 호출이 되도록 도와주는 state값
  const [refresh, setRefresh] = useState(false);

  // 쿼리스트링에 page,size 꺼내기위해 객체 생성
  const [queryStr] = useSearchParams();
  const page = getQuery(queryStr.get("page"), 1);
  const size = getQuery(queryStr.get("size"), 4);
  const queryDeafult = createSearchParams({
    page: page,
    size: size,
  }).toString();

  // 각 이동 함수를 리턴
  return { refresh, page, size };
};

export default useCustomMove;