import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from '../../../components/information/ModalWindow/Modal';
import Button from '../../../components/ui/Button/Button';
import InputTag from '../../../components/ui/InputTags/InputTag';
import useModal from '../../../hooks/useModal';
import { Category, categoryState, updateCategory } from '../../../store/counters/categorySlice';
import Styles from './UpdateCategory.module.css';

// types for the functions
type submitFc = (event: React.FormEvent) => void;
interface Props {
  setDisabled: any;
  category: Category['category'];
}
const UpdateCategory = ({ setDisabled, category }: Props) => {
  const dispatch = useDispatch();
  // state to toogle the model
  const { isShowing, toggle } = useModal();
  // logged user details
  const [loggedUser, setLoggedUser] = useState({ token: '' });
  // submit handler event
  const adminUser = localStorage.getItem('userInfo');
  useEffect(() => {
    if (adminUser) {
      setLoggedUser(JSON.parse(adminUser));
    }
  }, []);
  //   states to store values in form
  const [name, setName] = useState(category?.category_name);
  //   submit function
  const submitHandler: submitFc = async (event) => {
    event.preventDefault();
    if (!name) {
      console.log('enter the field');
      return null;
    }
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${loggedUser.token}`
        }
      };
      const categoryData = {
        category_name: name
      };
      const requiredId = category?._id;
      const { data } = await axios.put(`/api/v1/categories/${requiredId}`, categoryData, config);
      //   console.log(data.data);
      if (data.success) {
        const category: Category['category'] = data.data;
        dispatch(updateCategory(category));
        toggle();
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <>
      <Button setDisabled={setDisabled} clickEvent={toggle} inputStyles={Styles.updateButton}>
        Update category
      </Button>
      <Modal isShowing={isShowing} hide={toggle}>
        <form className={Styles.formContainer}>
          <div className={Styles.inputContainer}>
            <label htmlFor="category name">Category name</label>
            <InputTag
              value={name}
              type={'text'}
              handleEvent={(e) => {
                setName(e.target.value);
              }}
              placeholder={'Enter the category name'}
            />
          </div>
          <br />
          <div className={Styles.inputContainer}>
            <Button clickEvent={submitHandler} type={'submit'} inputStyles={Styles.loginBtn}>
              Update Category
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

export default UpdateCategory;
