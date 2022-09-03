import React, { useEffect, useState } from 'react';
import Styles from './CreateProduct.module.css';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../../../components/information/ModalWindow/Modal';
import Button from '../../../components/ui/Button/Button';
import useModal from '../../../hooks/useModal';
import InputTag from '../../../components/ui/InputTags/InputTag';
import Dropdown from '../../../components/ui/Dropdown/Dropdown';
import axios from 'axios';
import { Category, sortOrGetCategories } from '../../../store/counters/categorySlice';
import { RootState } from '../../../store';
import { createProduct, Product } from '../../../store/counters/productSlice';

type submitFc = (event: React.FormEvent) => void;
interface Props {
  setDisabled: any;
}
const Createproduct = ({ setDisabled }: Props) => {
  const categories = useSelector((state: RootState) => state.categories.categories);
  const loginUser = useSelector((state: RootState) => state.login.user);
  const dispatch = useDispatch();
  // state to toogle the model
  const { isShowing, toggle } = useModal();
  // states to store values in form
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  // dropdown states
  const [value, setValue] = React.useState('');
  const [categoryName, setCategoryName] = React.useState('');

  // submitHandler
  const submitHandler: submitFc = async (event) => {
    event.preventDefault();

    if (!name || !desc || !price || !quantity) {
      console.log('enter all the fields');
      return null;
    }
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${loginUser.token}`
        }
      };
      const productData = {
        product_name: name,
        product_desc: desc,
        product_price: price,
        product_quantity: quantity
      };
      const categoryId = value.split(',')[0];
      const { data } = await axios.post(`/api/v1/products/${categoryId}`, productData, config);
      if (data.success) {
        const product: Product['product'] = data.data;
        dispatch(createProduct(product));
        setName('');
        setDesc('');
        setPrice('');
        setQuantity('');
        setValue('');
        toggle();
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const changeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
  };

  return (
    <>
      <Button clickEvent={toggle} setDisabled={setDisabled}>
        Create Product
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
              dropdownTitle={value ? value.split(',')[1] : 'categories'}
              name={setCategoryName}
              data={categories}
              value={value}
              onChange={changeHandler}
            />
          </div>
          <br />
          <div className={Styles.inputContainer}>
            <Button clickEvent={submitHandler} type={'submit'} inputStyles={Styles.createBtn}>
              Create Product
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

export default Createproduct;
