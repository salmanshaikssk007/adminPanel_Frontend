import axios from 'axios';
import React, { useState } from 'react';
import Styles from './SortProducts.module.css';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../components/ui/Button/Button';
import useModal from '../../../hooks/useModal';
import { RootState } from '../../../store';
import { Product, sortOrFilterOrGetProducts } from '../../../store/counters/productSlice';
import Modal from '../../../components/information/ModalWindow/Modal';
import Dropdown from '../../../components/ui/Dropdown/Dropdown';

type submitFc = (event: React.FormEvent) => void;
const dateOptions = [
  {
    _id: '1',
    category_name: 'recent'
  },
  {
    _id: '2',
    category_name: 'old'
  }
];
const priceOptions = [
  {
    _id: '1',
    category_name: 'low_to_high'
  },
  {
    _id: '2',
    category_name: 'high_to_low'
  }
];
const SortProducts = () => {
  const categories = useSelector((state: RootState) => state.categories.categories);
  const loginUser = useSelector((state: RootState) => state.login.user);
  const dispatch = useDispatch();
  // state to toogle the model
  const { isShowing, toggle } = useModal();
  //   input state values
  const [priceAction, setPriceAction] = useState('1,low_to_high');
  const [dateAction, setDateAction] = useState('1,recent');
  console.log(priceAction, dateAction);
  // dropdown states
  const [value, setValue] = React.useState('');
  const [categoryName, setCategoryName] = React.useState('');
  const changeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
  };
  const dateChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDateAction(event.target.value);
  };
  const priceChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPriceAction(event.target.value);
  };
  //   submit handler function
  const submitHandler: submitFc = async (event) => {
    event.preventDefault();
    const categoryId = value.split(',')[0];
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${loginUser.token}`
        }
      };
      const { data } = await axios.get(
        `/api/v1/products/${categoryId}?price=${priceAction.split(',')[1]}&date=${
          dateAction.split(',')[1]
        }`,
        config
      );
      if (data.success) {
        const products: Product['product'][] = data.data;
        console.log(products);
        dispatch(sortOrFilterOrGetProducts(products));
        setValue('');
        setPriceAction('1,low_to_high');
        setDateAction('1,recent');
        toggle();
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <>
      <Button clickEvent={toggle}>Sort products</Button>
      <Modal isShowing={isShowing} hide={toggle}>
        <form className={Styles.formContainer}>
          <div className={Styles.inputContainer}>
            <label htmlFor="Cateogies">Product Category</label>
            <Dropdown
              dropdownTitle={value ? value.split(',')[1] : 'categories'}
              name={setCategoryName}
              data={categories}
              value={value}
              onChange={changeHandler}
            />
          </div>
          <br />
          <br />
          <div className={Styles.inputContainer}>
            <label htmlFor="based on date">Sort by Date</label>
            <Dropdown
              dropdownTitle={dateAction ? dateAction.split(',')[1] : 'sort by date'}
              data={dateOptions}
              value={dateAction}
              onChange={dateChangeHandler}
            />
          </div>
          <br />
          <br />
          <div className={Styles.inputContainer}>
            <label htmlFor="based on price">Sort by Price</label>
            <Dropdown
              dropdownTitle={priceAction ? priceAction.split(',')[1] : 'categories'}
              name={setCategoryName}
              data={priceOptions}
              value={priceAction}
              onChange={priceChangeHandler}
            />
          </div>
          <br />
          <br />
          <div className={Styles.inputContainer}>
            <Button clickEvent={submitHandler} type={'submit'} inputStyles={Styles.createBtn}>
              Filter Products
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

export default SortProducts;
