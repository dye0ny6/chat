import axios from "axios";

export const API_SERVER_HOST = "http://localhost:8080";
const prefix = `${API_SERVER_HOST}/api/member`;

// 회원가입 요청
export const memberSubmit = async (member) => {
  try {
    const header = { headers: { "Content-Type": "multipart/form-data" } };
    const response = await axios.post(
      `${API_SERVER_HOST}/signup`,
      member,
      header
    );
    console.log(
      "***** MemberApi memberSubmit - Response(member_id): ",
      response.data
    ); // 서버로부터의 응답을 콘솔에 출력
    return response.data;
  } catch (error) {
    console.error("***** MemberApi memberSubmit - Error: ", error); // 오류 발생 시 콘솔에 오류 메시지 출력
    throw error; // 필요 시 오류를 다시 던져서 호출한 곳에서 처리
  }
};

// 이메일 중복확인
export const checkEmail = async (email) => {
  try {
    const response = await axios.post(`${prefix}/checkEmail`, {
      email,
    });
    return response.data;
  } catch (error) {
    console.error("***** MemberApi checkEmail - Error: ", error);
    throw error;
  }
};
