import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Product } from './productSlice';

export interface Category extends Product {
  category?: {
    _id: string;
    category_name: string;
    products?: Product['product'][];
  };
}
export interface categoryState extends Category {
  categories: Category['category'][];
}
const initialState: categoryState = {
  categories: []
};

export const categorySlice = createSlice({
  name: 'Product',
  initialState,
  reducers: {
    createCategory: (state, action: PayloadAction<Category['category']>) => {
      state.categories = [action.payload, ...state.categories];
      return state;
    },
    updateCategory: (state, action: PayloadAction<Category['category']>) => {
      const index = state.categories.findIndex((category) => category?._id === action.payload?._id);
      state.categories[index] = action.payload;
      return state;
    },
    deleteCategory: (state, action: PayloadAction<Category['category']>) => {
      state.categories = state.categories.filter(
        (category) => category?._id === action.payload?._id
      );
      return state;
    },
    // when users has to be sorted
    sortOrGetCategories: (state, action: PayloadAction<Category['category'][]>) => {
      state.categories = action.payload;
      return state;
    }
  }
});

export const { createCategory, updateCategory, deleteCategory, sortOrGetCategories } =
  categorySlice.actions;
export default categorySlice.reducer;
