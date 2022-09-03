import React, { useEffect, useState } from 'react';
import Button from '../../../components/ui/Button/Button';
import useModal from '../../../hooks/useModal';
import Styles from './CreateUser.module.css';
import Modal from '../../../components/information/ModalWindow/Modal';
import InputTag from '../../../components/ui/InputTags/InputTag';
import RadioButtons from '../../../components/ui/RadioButtons/RadioButtons';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { createUser, User } from '../../../store/counters/userSlice';

// types for the functions
type submitFc = (event: React.FormEvent) => void;
interface Props {
  setDisabled: any;
}
const Createuser = ({ setDisabled }: Props) => {
  const dispatch = useDispatch();
  // state to toogle the model
  const { isShowing, toggle } = useModal();
  // states to store the values in form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confrimPassword, setConfrimPassword] = useState('');
  const [status, setStatus] = useState({
    isAdmin: false,
    isSuperAdmin: false
  });
  const [phone, setPhone] = useState('');
  const [show, setShow] = useState(false);
  // logged user details
  const [loggedUser, setLoggedUser] = useState({ token: '' });
  const adminUser = localStorage.getItem('userInfo');
  useEffect(() => {
    if (adminUser) {
      setLoggedUser(JSON.parse(adminUser));
    }
  }, []);
  // submit handler event
  const submitHandler: submitFc = async (event) => {
    event.preventDefault();
    // to check important fields are there are not
    if (
      !name ||
      !email ||
      !password ||
      !confrimPassword ||
      !(status.isAdmin || status.isSuperAdmin)
    ) {
      console.log('enter all the fields');
      return null;
    }
    // checking wether email is valid or not
    if (!email.includes('@')) {
      // props.messageHandler('Enter a valid email');
      // props.errorHandler(true);
      console.log('enter a valid email');
      return null;
    }
    // check wether passwords match are not
    if (password !== confrimPassword) {
      console.log('passwords do not match');
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
        phone: phone,
        password: password
      };
      const { data } = await axios.post('/api/v1/user', userData, config);
      if (data.success) {
        const user: User['user'] = data.data;
        dispatch(createUser(user));
        setName('');
        setEmail('');
        setPassword('');
        setConfrimPassword('');
        setStatus({
          isAdmin: false,
          isSuperAdmin: false
        });
        setPhone('');
        toggle();
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <>
      <Button clickEvent={toggle} setDisabled={setDisabled} inputStyles={Styles.createUserButton}>
        {' '}
        Create User
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
          <div className={Styles.inputContainer}>
            <label htmlFor="user name">Password</label>
            <InputTag
              value={password}
              type={show ? 'text' : 'password'}
              handleEvent={(e) => {
                setPassword(e.target.value);
              }}
              placeholder={'Enter the Password'}
            />
          </div>
          <div className={Styles.inputContainer}>
            <label htmlFor="user name">Confrim Password</label>
            <InputTag
              value={confrimPassword}
              type={show ? 'text' : 'password'}
              handleEvent={(e) => {
                setConfrimPassword(e.target.value);
              }}
              placeholder={'Re-enter the Password'}
            />
          </div>
          <div className={Styles.inputContainer}>
            <label htmlFor=""></label>
            <Button
              clickEvent={(event) => {
                setShow(!show);
                event.preventDefault();
              }}
              inputStyles={Styles.showBtn}>
              Show
            </Button>
          </div>
          <br />
          <br />
          <div className={Styles.inputContainer}>
            <Button clickEvent={submitHandler} type={'submit'} inputStyles={Styles.loginBtn}>
              Create User
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

export default Createuser;
