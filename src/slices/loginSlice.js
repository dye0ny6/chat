import { createSlice } from "@reduxjs/toolkit";

const initState = {
  email: "",
};

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
    },
  },
});

export const { login, logout } = loginSlice.actions; // 리듀서 내보내기 -> configureStore에 등록

export default loginSlice.reducer;
