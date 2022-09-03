import React, { useEffect, useState } from 'react';
import Styles from './Navbar.module.css';

const Navbar = () => {
  // logged user details
  const [loggedUser, setLoggedUser] = useState({ isAdmin: '', isSuperAdmin: '' });
  const adminUser = localStorage.getItem('userInfo');
  useEffect(() => {
    if (adminUser) {
      setLoggedUser(JSON.parse(adminUser));
    }
  }, []);
  return (
    <div className={Styles.navbar}>
      <h3>Admin Panel</h3>
      <div className={Styles.iconContainer}>
        <div className={Styles.imgContainer}>
          {' '}
          <img src="https://cdn2.iconfinder.com/data/icons/flatfaces-everyday-people-square/128/beard_male_man_face_avatar-512.png" />
        </div>
        <div className={Styles.status}>
          <div className={Styles.statusMsg}>{loggedUser.isAdmin ? 'Admin' : 'Super Admin'}</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
