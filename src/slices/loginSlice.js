const { createSlice } = require("@reduxjs/toolkit");
// email에 해당하는 값이 있으면 -> 로그인상태, 없으면 -> 비로그인상태 간주
const initState = {
  email: "",
};

const loginSlice = createSlice({
  name: "LoginSlice",
  initialState: initState,
  reducers: {
    // 동기작업 처리
    login: (state, action) => {
      console.log("login.......");
    },
    logout: (state, action) => {
      console.log("logout......");
    },
  },
  //extraReducers: (builder) => { // 비동기작업 처리
  //...
  //}
});

// 액션크리에이터 외부로 내보내기
export const { login, logout } = loginSlice.actions;
// 리듀서 내보내기 -> configureStore에 등록
export default loginSlice.reducer;
