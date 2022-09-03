import { configureStore } from '@reduxjs/toolkit';
import userReducer from './counters/userSlice';
import categoryReducer from './counters/categorySlice';
import productReducer from './counters/productSlice';
import loginUserReducer from './counters/adminSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    categories: categoryReducer,
    products: productReducer,
    login: loginUserReducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
