import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from '../../../components/information/ModalWindow/Modal';
import Button from '../../../components/ui/Button/Button';
import InputTag from '../../../components/ui/InputTags/InputTag';
import useModal from '../../../hooks/useModal';
import { Category, createCategory } from '../../../store/counters/categorySlice';
import Styles from './CreateCategory.module.css';

type submitFc = (event: React.FormEvent) => void;
interface Props {
  setDisabled: any;
}
const CreateCategory = ({ setDisabled }: Props) => {
  const dispatch = useDispatch();
  // state to toogle the model
  const { isShowing, toggle } = useModal();
  // states to store values in form
  const [name, setName] = useState('');
  // logged user details
  const [loggedUser, setLoggedUser] = useState({ token: '' });
  const adminUser = localStorage.getItem('userInfo');
  useEffect(() => {
    if (adminUser) {
      setLoggedUser(JSON.parse(adminUser));
    }
  }, []);
  const submitHandler: submitFc = async (event) => {
    event.preventDefault();
    if (!name) {
      console.log('enter all the fields');
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
      const { data } = await axios.post('/api/v1/categories', categoryData, config);
      if (data.success) {
        const category: Category['category'] = data.data;
        console.log(category);
        dispatch(createCategory(category));
        setName('');
        toggle();
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <>
      <Button clickEvent={toggle} setDisabled={setDisabled}>
        Create category
      </Button>
      <Modal isShowing={isShowing} hide={toggle}>
        <form className={Styles.formContainer}>
          <div className={Styles.inputContainer}>
            <label htmlFor="user name">Category name</label>
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
            <Button clickEvent={submitHandler} type={'submit'} inputStyles={Styles.createBtn}>
              Create category
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

export default CreateCategory;
