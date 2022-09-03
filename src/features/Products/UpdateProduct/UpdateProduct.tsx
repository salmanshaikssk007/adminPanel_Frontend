import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Styles from './UpdateProduct.module.css';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../../components/information/ModalWindow/Modal';
import Button from '../../../components/ui/Button/Button';
import Dropdown from '../../../components/ui/Dropdown/Dropdown';
import InputTag from '../../../components/ui/InputTags/InputTag';
import useModal from '../../../hooks/useModal';
import { RootState } from '../../../store';
import { sortOrGetCategories } from '../../../store/counters/categorySlice';
import { Product, updateProduct } from '../../../store/counters/productSlice';

type submitFc = (event: React.FormEvent) => void;
interface Props {
  product:
    | {
        _id: string;
        product_name: string;
        product_desc: string;
        product_price: number;
        product_quantity: number;
        category_id?: string;
      }
    | undefined;
}
const UpdateProduct = ({ product }: Props) => {
  const categories = useSelector((state: RootState) => state.categories.categories);
  const loginUser = useSelector((state: RootState) => state.login.user);
  const dispatch = useDispatch();
  // state to toogle the model
  const { isShowing, toggle } = useModal();
  // states to store values in form
  const [name, setName] = useState(product?.product_name);
  const [desc, setDesc] = useState(product?.product_desc);
  const [price, setPrice] = useState(`${product?.product_price}`);
  const [quantity, setQuantity] = useState(`${product?.product_quantity}`);
  // dropdown states
  const [value, setValue] = React.useState(product?.category_id);
  const [categoryName, setCategoryName] = React.useState('');
  const changeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
  };
  //   submit handler
  const submitHandler: submitFc = async (event) => {
    event.preventDefault();
    if (!name && !desc && !price && !quantity && !value) {
      console.log('enter any of the field');
      return null;
    }
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${loginUser.token}`
        }
      };
      const categoryId = value !== product?.category_id ? value!.split(',')[0] : value;
      const productId = product?._id;
      const productData = {
        product_name: name,
        product_desc: desc,
        product_price: price,
        product_quantity: quantity,
        category_id: categoryId
      };
      const { data } = await axios.put(`/api/v1/products/${productId}`, productData, config);
      // console.log(data.data);
      if (data.success) {
        const product: Product['product'] = data.data;
        dispatch(updateProduct(product));
        toggle();
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
  // fetch category data
  const fetchCategories = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${loginUser.token}`
        }
      };
      const { data } = await axios.get('/api/v1/categories', config);
      if (data.success) {
        const categories: any = data.data;
        dispatch(sortOrGetCategories(categories));
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <>
      <Button
        clickEvent={toggle}
        setDisabled={!loginUser.isAdmin}
        inputStyles={Styles.updateButton}>
        Update Product
      </Button>
      <Modal isShowing={isShowing} hide={toggle}>
        <form className={Styles.formContainer}>
          <div className={Styles.inputContainer}>
            <label htmlFor="product name">Product name</label>
            <InputTag
              value={name}
              type={'text'}
              handleEvent={(e) => {
                setName(e.target.value);
              }}
              placeholder={'Enter the category name'}
            />
          </div>

          <div className={Styles.inputContainer}>
            <label htmlFor="product desc">Product Description</label>
            <InputTag
              value={desc}
              type={'text'}
              handleEvent={(e) => {
                setDesc(e.target.value);
              }}
              placeholder={'Enter the category description'}
            />
          </div>

          <div className={Styles.inputContainer}>
            <label htmlFor="product price">Product price</label>
            <InputTag
              value={price}
              type={'number'}
              handleEvent={(e) => {
                setPrice(e.target.value);
              }}
              placeholder={'Enter the category price'}
            />
          </div>

          <div className={Styles.inputContainer}>
            <label htmlFor="product name">Product quantity</label>
            <InputTag
              value={quantity}
              type={'text'}
              handleEvent={(e) => {
                setQuantity(e.target.value);
              }}
              placeholder={'Enter the category quantity'}
            />
          </div>
          <br />
          <div className={Styles.inputContainer}>
            <label htmlFor="product Cateogry">Product Category</label>
            <Dropdown
              dropdownTitle={
                value !== product?.category_id && value ? value.split(',')[1] : 'categories'
              }
              name={setCategoryName}
              data={categories}
              value={value ? value : ''}
              onChange={changeHandler}
            />
          </div>
          <br />
          <div className={Styles.inputContainer}>
            <Button clickEvent={submitHandler} type={'submit'} inputStyles={Styles.createBtn}>
              update Product
            </Button>
            <Button clickEvent={toggle} inputStyles={Styles.deleteBtn}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default UpdateProduct;
