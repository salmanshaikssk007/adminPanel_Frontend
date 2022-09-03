import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  product?: {
    _id: string;
    product_name: string;
    product_desc: string;
    product_price: number;
    product_quantity: number;
    category_id?: string;
    createdAt?: string;
    updatedAt?: string;
  };
}

export interface productState extends Product {
  products: Product['product'][];
}

const initialState: productState = {
  products: []
};
export const productSlice = createSlice({
  name: 'Products',
  initialState,
  reducers: {
    // when product is created
    createProduct: (state, action: PayloadAction<Product['product']>) => {
      console.log(action.payload);
      console.log(state.products);
      state.products = [action.payload, ...state.products];
      return state;
    },
    // when product is updated
    updateProduct: (state, action: PayloadAction<Product['product']>) => {
      const index = state.products.findIndex((product) => product?._id === action.payload?._id);
      state.products[index] = action.payload;
      return state;
    },
    // when product is deleted
    deleteProduct: (state, action: PayloadAction<Product['product']>) => {
      state.products = state.products.filter((product) => product?._id !== action.payload?._id);
      return state;
    },
    sortOrFilterOrGetProducts: (state, action: PayloadAction<Product['product'][]>) => {
      state.products = action.payload;
      return state;
    }
  }
});

export const { createProduct, updateProduct, deleteProduct, sortOrFilterOrGetProducts } =
  productSlice.actions;
export default productSlice.reducer;
