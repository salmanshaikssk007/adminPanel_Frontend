import React, { useEffect, useState } from 'react';
import Card from '../../components/ui/Card/Card';
import LoginAuth from '../../features/Users/LoginAuth/LoginAuth';
import Styles from './Loginpage.module.css';

const Loginpage = () => {
  // states used with in the component
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [timer, setTimer] = useState(false);
  // use effect hook to set actions
  useEffect(() => {
    setTimer(true);
    setTimeout(() => {
      setTimer(false);
      setMessage('');
    }, 1000);
  }, [message]);
  return (
    <div className={Styles.login}>
      <Card>
        <h1>Admin login</h1>
        <LoginAuth errorHandler={setError} messageHandler={setMessage} />
      </Card>
      {timer && <div className={error ? Styles.error : Styles.success}>{message}</div>}
    </div>
  );
};

export default Loginpage;
