import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCookie, setCookie, removeCookie } from "../util/cookieUtil";
import { loginPost } from "../api/MemberApi";

const initState = {
  email: "",
  accessToken: null,
  refreshToken: null,
};

/*const getMemberCookie = () => {
  const memberInfo = getCookie("member");
  if (memberInfo && memberInfo.nickname) {
    // 한글깨짐 대비
    memberInfo.nickname = decodeURIComponent(memberInfo.nickname);
  }
  return memberInfo;
};*/
const getMemberCookie = () => {
  const memberInfo = getCookie("member");
  if (memberInfo && memberInfo.nickname) {
    memberInfo.nickname = decodeURIComponent(memberInfo.nickname);
  }
  return memberInfo || {}; // null 대신 빈 객체를 반환
};

/*export const loginPostAsync = createAsyncThunk("loginPostAsync", (param) => {
  return loginPost(param);
});*/
export const loginPostAsync = createAsyncThunk(
  "loginPostAsync",
  async (param) => {
    console.log("***** loginSlice - loginPostAsync 실행");
    try {
      const response = await loginPost(param);
      console.log(
        "***** loginSlice loginPostAsync - (response)data: ",
        response
      );
      return response;
    } catch (error) {
      console.log("***** loginSlice loginPostAsync - Error: ", error);
      return { error: error.message }; // 에러 발생 시 에러 객체를 반환
    }
  }
);

const loginSlice = createSlice({
  name: "LoginSlice",
  initialState: initState,
  reducers: {
    login: (state, action) => {
      console.log("login.......");
      const data = action.payload;
      console.log(data);
      return { email: data.email };
    },
    logout: (state, action) => {
      console.log("logout......");
      removeCookie("member");
      return { ...initState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginPostAsync.fulfilled, (state, action) => {
        // 성공
        console.log("***** loginSlice(createSlice) loginPostAsync.fulfilled");
        const payload = action.payload; // 정상 처리시에만 쿠키 생성
        console.log(
          "***** loginSlice(createSlice) loginPostAsync.fulfilled - payload: ",
          payload
        );
        if (!payload.error) {
          console.log("***** loginSlice(createSlice) - setCookie 실행");
          const { email, accessToken, refreshToken } = payload;
          // 쿠키 설정
          setCookie(
            "member",
            JSON.stringify({ email, accessToken, refreshToken }),
            1
          );
          // 상태 업데이트
          return {
            ...state,
            email: email,
            accessToken: accessToken,
            refreshToken: refreshToken,
          }; // 1일 동안 쿠키 저장
        } else {
          console.log("***** loginSlice(createSlice) payload 에러", payload.error);
        }
      })
      .addCase(loginPostAsync.pending, (state, action) => {
        console.log("***** loginSlice(createSlice) loginPostAsync.pending");
      })
      .addCase(loginPostAsync.rejected, (state, action) => {
        console.log("***** loginSlice(createSlice) loginPostAsync.rejected");
      });
  },
});

export const { login, logout } = loginSlice.actions; // 리듀서 내보내기 -> configureStore에 등록

export default loginSlice.reducer;
