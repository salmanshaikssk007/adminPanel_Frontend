import React, { useState } from 'react';
import Styles from './LoginAuth.module.css';
import InputTag from '../../../components/ui/InputTags/InputTag';
import Button from '../../../components/ui/Button/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../../store/counters/adminSlice';

// types for the functions
type submitFc = (event: React.FormEvent) => void;
interface props {
  // eslint-disable-next-line @typescript-eslint/ban-types
  messageHandler: React.Dispatch<React.SetStateAction<string>>;
  errorHandler: React.Dispatch<React.SetStateAction<boolean>>;
}
const LoginAuth = (props: props) => {
  // dispatch
  const dispatch = useDispatch();
  // states for the component
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  // use navigate
  const navigate = useNavigate();
  // submit handler event
  const submitHandler: submitFc = async (event) => {
    event.preventDefault();
    // check wether all fields are fields are not
    if (!email || !password) {
      props.messageHandler('enter all the fields');
      props.errorHandler(true);
      return null;
    }
    // checking wether email is valid or not
    if (!email.includes('@')) {
      props.messageHandler('Enter a valid email');
      props.errorHandler(true);
      return null;
    }
    try {
      const config = {
        headers: {
          'Content-type': 'application/json'
        }
      };
      const { data } = await axios.post('/api/v1/user/login', { email, password }, config);
      localStorage.setItem('userInfo', JSON.stringify(data.data));
      dispatch(setUserInfo(data.data));
      props.errorHandler(false);
      props.messageHandler(data.message);
      if (data.success) {
        navigate(`/adminPage`);
      }
    } catch (error: any) {
      props.errorHandler(true);
      props.messageHandler(error.message);
    }
  };
  return (
    <div className={Styles.formContainer}>
      <form>
        <div className={Styles.inputContainer}>
          <label htmlFor="email">Email</label>
          <InputTag
            value={email}
            type={'text'}
            handleEvent={(e) => {
              setEmail(e.target.value);
            }}
            placeholder={'Enter the Email'}
          />
        </div>
        <div className={Styles.inputContainer}>
          <label htmlFor="password">Password</label>
          <InputTag
            value={password}
            handleEvent={(e) => {
              setPassword(e.target.value);
            }}
            type={show ? 'text' : 'password'}
            placeholder={'Enter the Password'}
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
        <div className={Styles.inputContainer}>
          <Button clickEvent={submitHandler} type={'submit'} inputStyles={Styles.loginBtn}>
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginAuth;
