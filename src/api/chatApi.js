import axios from "axios";
import { API_SERVER_HOST } from "./MemberApi";
// export const API_SERVER_HOST = "http://localhost:8080";
const prefix = `${API_SERVER_HOST}/api/chat`;

// 채팅방 목록 조회
export const getList = async () => {
  const response = await axios.get(`${prefix}/list`);
  return response.data;
};

// 채팅방 조회
export const getRoom = async (roomId) => {
  console.log("roomId:", roomId);
  const response = await axios.get(`${prefix}/room/${roomId}`);
  return response.data;
};

