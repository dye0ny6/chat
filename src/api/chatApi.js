// import jwtAxios from "../util/jwtUtil";
import axios from "axios";
// import { getCookie } from "../util/cookieUtil";
import { API_SERVER_HOST } from "./MemberApi";
import jwtAxios from "../util/jwtUtil";
// export const API_SERVER_HOST = "http://localhost:8080";
const prefix = `${API_SERVER_HOST}/api/chat`;

// const jwtAxios = axios.create({
//   baseURL: API_SERVER_HOST,
//   headers: {
//     'Content-Type': 'application/json',
//     Authorization: `Bearer ${getCookie('accessToken')}`,
//   },
// });

// 채팅방 목록 조회
export const getList = async () => {
  const response = await jwtAxios.get(`${prefix}/list`);
  return response.data;
};

// 메시지 목록 조회
export const getRoom = async (roomId) => {
  const response = await jwtAxios.get(`${prefix}/room/${roomId}`);
  console.log(response.data);
  return response.data;
};

// 채팅방 생성
export const createChatRoom = async (memberId) => {
  const response = await axios.post(`${prefix}/room`, {
    memberId,
  });
  return response.data;
};
