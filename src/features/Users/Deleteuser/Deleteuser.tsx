import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from '../../../components/information/ModalWindow/Modal';
import Button from '../../../components/ui/Button/Button';
import useModal from '../../../hooks/useModal';
import Styles from './Deleteuser.module.css';
import { deleteUser } from '../../../store/counters/userSlice';
// types for the functions
type submitFc = (event: React.FormEvent) => void;
interface Props {
  setDisabled: any;
  user:
    | {
        _id: string;
        username: string;
        email: string;
        isAdmin: boolean;
        isSuperAdmin: boolean;
        phone: number;
        token: string;
      }
    | undefined;
}
const Deleteuser = ({ setDisabled, user }: Props) => {
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
  const submitHandler: submitFc = async (event) => {
    event.preventDefault();
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${loggedUser.token}`
        }
      };
      const requiredId = user?._id;
      const { data } = await axios.delete(`/api/v1/user/${requiredId}`, config);
      if (data.success) {
        console.log(data.message);
        dispatch(deleteUser(user));
        toggle();
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <>
      <Button setDisabled={setDisabled} clickEvent={toggle} inputStyles={Styles.updateUserButton}>
        Delete user
      </Button>
      <Modal isShowing={isShowing} hide={toggle}>
        <form className={Styles.formContainer}>
          <div className={Styles.inputContainer}>
            <p>Are you sure ? you want to delete ?</p>
          </div>
          <br />
          <br />
          <div className={Styles.inputContainer}>
            <Button clickEvent={submitHandler} type={'submit'} inputStyles={Styles.loginBtn}>
              Delete User
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

export default Deleteuser;
