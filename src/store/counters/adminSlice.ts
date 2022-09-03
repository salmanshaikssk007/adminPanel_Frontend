import { createSlice } from '@reduxjs/toolkit';
interface userType {
  _id: string | any;
  name: string;
  username: string;
  email: string;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  createdAt?: any;
  updatedAt?: any;
}
interface loginUserType {
  user: userType | any;
  token: string;
}
const initialState: loginUserType = {
  user: {},
  token: ''
};
export const loginUserSlice = createSlice({
  name: 'loginuser',
  initialState,
  reducers: {
    setUserInfo(state, action) {
      // console.log(action.payload);
      state.user = { ...action.payload };
      return state;
    },
    editUser(state, action) {
      state.user = action.payload;
      return state;
    },
    setToken(state, action) {
      console.log(action.payload);
      state.token = action.payload;
      return state;
    }
  }
});

// action creators are generated for each case reducer funtion
export const { setUserInfo, editUser, setToken } = loginUserSlice.actions;
export default loginUserSlice.reducer;
