import { Cookies } from "react-cookie";

const cookies = new Cookies();

// 쿠키 생성
export const setCookie = (name, value, days) => {
  const exp = new Date();
  console.log(exp);
  exp.setUTCDate(exp.getUTCDate() + days);
  console.log(exp);
  return cookies.set(name, value, { path: "/", expires: exp });
};

// 쿠키 조회
export const getCookie = (name) => {
  const cookieValue = cookies.get(name);
  try {
    return JSON.parse(cookieValue);
  } catch (e) {
    return cookieValue;
  }
};

// 쿠키 삭제
export const removeCookie = (name, path = "/") => {
  cookies.remove(name, { path });
};
