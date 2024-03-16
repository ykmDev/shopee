import { createSlice } from "@reduxjs/toolkit";

const userInLocalhost = localStorage.getItem("user");
const initialState = userInLocalhost
  ? { user: JSON.parse(userInLocalhost) }
  : { user: null };

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
