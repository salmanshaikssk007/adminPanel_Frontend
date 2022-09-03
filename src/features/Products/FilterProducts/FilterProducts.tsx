import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../../components/information/ModalWindow/Modal';
import Button from '../../../components/ui/Button/Button';
import Dropdown from '../../../components/ui/Dropdown/Dropdown';
import InputTag from '../../../components/ui/InputTags/InputTag';
import useModal from '../../../hooks/useModal';
import { RootState } from '../../../store';
import { Product, sortOrFilterOrGetProducts } from '../../../store/counters/productSlice';
import Styles from './FilterProducts.module.css';

type submitFc = (event: React.FormEvent) => void;
const FilterProducts = () => {
  const categories = useSelector((state: RootState) => state.categories.categories);
  const loginUser = useSelector((state: RootState) => state.login.user);
  const dispatch = useDispatch();
  // state to toogle the model
  const { isShowing, toggle } = useModal();
  // dropdown states
  const [value, setValue] = React.useState('');
  const [categoryName, setCategoryName] = React.useState('');
  const changeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
  };
  // input state values
  const [lowPrice, setLowPrice] = useState('');
  const [highPrice, setHighPrice] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  // test
  // submit handler function
  const submitHandler: submitFc = async (event) => {
    event.preventDefault();
    const categoryId = value.split(',')[0];
    if (!lowPrice && !highPrice && !startDate && !endDate && !categoryId) {
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
      // to convert date to string
      const date = new Date();
      const year = date.getFullYear();

      let month: number | string = date.getMonth() + 1;
      let day: number | string = date.getDate();

      if (month < 10) month = '0' + month;
      if (day < 10) day = '0' + day;

      const today = `${year}-${month}-${day}`;
      const setDate = new Date(endDate ? endDate : today);
      const filterData = {
        lowPrice: lowPrice,
        highPrice: highPrice,
        startDate: new Date(startDate ? startDate : '2020, 1, 1'),
        endDate: +setDate > +date ? date : setDate
      };
      const { data } = await axios.post(
        `/api/v1/products/filter/${categoryId}`,
        filterData,
        config
      );
      if (data.success) {
        const products: Product['product'][] = data.data;
        console.log(products);
        dispatch(sortOrFilterOrGetProducts(products));
        setLowPrice('');
        setHighPrice('');
        setStartDate('');
        setEndDate('');
        setValue('');
        toggle();
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <>
      <Button clickEvent={toggle}>Filter products</Button>
      <Modal isShowing={isShowing} hide={toggle}>
        <form className={Styles.formContainer}>
          <h4>Filter By price</h4>
          <br />
          <div className={Styles.inputContainer}>
            <label htmlFor="filter by price">Low Price</label>
            <InputTag
              value={lowPrice}
              type={'text'}
              handleEvent={(e) => {
                setLowPrice(e.target.value);
              }}
              placeholder={'Enter min price'}
            />
          </div>
          <div className={Styles.inputContainer}>
            <label htmlFor="filter by price">High Price</label>
            <InputTag
              value={highPrice}
              type={'text'}
              handleEvent={(e) => {
                setHighPrice(e.target.value);
              }}
              placeholder={'Enter max price'}
            />
          </div>
          <br />
          <h4>Filter By date</h4>
          <div className={Styles.inputContainer}>
            <label htmlFor="start date">Start Date</label>
            <InputTag
              value={startDate}
              type={'date'}
              handleEvent={(e) => {
                setStartDate(e.target.value);
              }}
              placeholder={'Enter Start Date'}
            />
          </div>
          <div className={Styles.inputContainer}>
            <label htmlFor="start date">End Date</label>
            <InputTag
              value={endDate}
              type={'date'}
              handleEvent={(e) => {
                setEndDate(e.target.value);
              }}
              placeholder={'Enter End Date'}
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

export default FilterProducts;
