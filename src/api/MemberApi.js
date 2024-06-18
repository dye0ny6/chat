import axios from "axios";
// import jwtAxios from "./../util/jwtUtil";

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

// 로그인 요청
export const loginPost = async (loginParam) => {
  console.log("***** MemberApi - loginPost 실행");
  const header = {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  };

  const form = new FormData();
  form.append("username", loginParam.email);
  form.append("password", loginParam.password);
  console.log("***** MemberApi loginPost - form : ", form);
  console.log(
    "***** MemberApi loginPost - username(email) : ",
    loginParam.email
  );
  console.log("***** MemberApi loginPost - password : ", loginParam.password);
  try {
    console.log("***** MemberApi loginPost /login 요청");
    const response = await axios.post(`${API_SERVER_HOST}/login`, form, header);
    return response.data;
  } catch (error) {
    console.error("***** MemberApi loginPost - Error: ", error);
    throw error; // 예외 처리를 위해 다시 던짐
  }
};

// 이메일 중복확인
// JSON 형식으로 데이터 전송
export const checkEmail = async (email) => {
  try {
    const response = await axios.post(`${prefix}/checkEmail`, { email });
    return response.data;
  } catch (error) {
    console.error("***** MemberApi checkEmail - Error: ", error.message);
    throw error;
  }
};

// 닉네임 중복확인
export const checkNickname = async (nickname) => {
  try {
    const response = await axios.post(`${prefix}/checkNickname`, {
      nickname,
    });
    return response.data;
  } catch (error) {
    console.error("***** MemberApi checkNickname - Error: ", error);
    throw error;
  }
};

// 사용자 목록 조회
export const getMembers = async () => {
  const response = await axios.get(`${prefix}/members`);
  return response.data;
};

// 메인 사용자 목록 조회
export const getList = async (pageParam) => {
  try {
    const { page, size } = pageParam;
    const response = await axios.get(`${prefix}/list`, {
      params: { page, size },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // localStorage에서 토큰을 가져오거나 다른 방법으로 획득해야 합니다.
      },
    });
    return response.data;
  } catch (error) {
    console.error("***** MemberApi getList - Error: ", error);
    throw error;
  }
};

