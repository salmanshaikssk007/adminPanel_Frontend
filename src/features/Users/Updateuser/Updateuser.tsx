import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from '../../../components/information/ModalWindow/Modal';
import Button from '../../../components/ui/Button/Button';
import InputTag from '../../../components/ui/InputTags/InputTag';
import RadioButtons from '../../../components/ui/RadioButtons/RadioButtons';
import useModal from '../../../hooks/useModal';
import Styles from './Updateuser.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, User } from '../../../store/counters/userSlice';
import { RootState } from '../../../store';

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
const Updateuser = ({ setDisabled, user }: Props) => {
  const loginUser = useSelector((state: RootState) => state.login.user);
  const dispatch = useDispatch();
  // state to toogle the model
  const { isShowing, toggle } = useModal();
  // states to store the values in form
  const [name, setName] = useState(user?.username);
  const [email, setEmail] = useState(user?.email);
  const [status, setStatus] = useState({
    isAdmin: user!.isAdmin,
    isSuperAdmin: user!.isSuperAdmin
  });
  const [phone, setPhone] = useState(`${user?.phone}`);
  // logged user details
  const [loggedUser, setLoggedUser] = useState({ token: '' });
  // submit handler event
  const adminUser = localStorage.getItem('userInfo');
  useEffect(() => {
    if (adminUser) {
      setLoggedUser(JSON.parse(adminUser));
    }
  }, []);
  //   submit fucntion
  const submitHandler: submitFc = async (event) => {
    event.preventDefault();
    if (!name && !email && !phone) {
      console.log('enter any of the field');
      return null;
    }
    // checking wether email is valid or not
    if (!email!.includes('@')) {
      // props.messageHandler('Enter a valid email');
      // props.errorHandler(true);
      console.log('enter a valid email');
      return null;
    }
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${loggedUser.token}`
        }
      };
      const userData = {
        username: name,
        email: email,
        isAdmin: status.isAdmin,
        isSuperAdmin: status.isSuperAdmin,
        phone: phone
      };
      const requiredId = user?._id;
      const { data } = await axios.put(`/api/v1/user/${requiredId}`, userData, config);
      // console.log(data.data);
      if (data.success) {
        const user: User['user'] = data.data;
        dispatch(updateUser(user));
        toggle();
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <>
      <Button
        setDisabled={!loginUser.isSuperAdmin}
        clickEvent={toggle}
        inputStyles={Styles.updateUserButton}>
        Update user
      </Button>
      <Modal isShowing={isShowing} hide={toggle}>
        <form className={Styles.formContainer}>
          <div className={Styles.inputContainer}>
            <label htmlFor="user name">User name</label>
            <InputTag
              value={name}
              type={'text'}
              handleEvent={(e) => {
                setName(e.target.value);
              }}
              placeholder={'Enter the user name'}
            />
          </div>
          <div className={Styles.inputContainer}>
            <label htmlFor="status">Status</label>
            <RadioButtons setStatus={setStatus} item1={'Admin'} item2={'Super Admin'} />
          </div>
          <div className={Styles.inputContainer}>
            <label htmlFor="user name">Email</label>
            <InputTag
              disabled={true}
              value={email}
              type={'text'}
              handleEvent={(e) => {
                setEmail(e.target.value);
              }}
              placeholder={'Enter the email'}
            />
          </div>
          <div className={Styles.inputContainer}>
            <label htmlFor="user name">Phone</label>
            <InputTag
              value={phone}
              type={'phone'}
              handleEvent={(e) => {
                setPhone(e.target.value);
              }}
              placeholder={'Enter the phone number'}
            />
          </div>
          <br />
          <br />
          <div className={Styles.inputContainer}>
            <Button clickEvent={submitHandler} type={'submit'} inputStyles={Styles.loginBtn}>
              Update User
            </Button>
            <Button clickEvent={toggle} inputStyles={Styles.loginBtn}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Updateuser;
