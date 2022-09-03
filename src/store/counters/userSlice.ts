import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface User {
  user?: {
    username: string;
    email: string;
    isAdmin: boolean;
    isSuperAdmin: boolean;
    phone: number;
    _id: string;
    token: string;
  };
}
export interface userState extends User {
  users: User['user'][];
}
const initialState: userState = {
  users: []
};

export const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    // when new user is created
    createUser: (state, action: PayloadAction<User['user']>) => {
      console.log(state.users);
      state.users = [action.payload, ...state.users];
      return state;
    },
    // when we update user
    updateUser: (state, action: PayloadAction<User['user']>) => {
      const index = state.users.findIndex((user) => user?._id === action.payload?._id);
      state.users[index] = action.payload;
      return state;
    },
    // when user has to be deleted
    deleteUser: (state, action: PayloadAction<User['user']>) => {
      state.users = state.users.filter((user) => user?._id !== action.payload?._id);
      return state;
    },
    // when users has to be sorted
    sortOrGetUsers: (state, action: PayloadAction<User['user'][]>) => {
      state.users = action.payload;
      return state;
    }
  }
});

// action creators are generated for each case reducer funtion
export const { createUser, updateUser, deleteUser, sortOrGetUsers } = userSlice.actions;
export default userSlice.reducer;
