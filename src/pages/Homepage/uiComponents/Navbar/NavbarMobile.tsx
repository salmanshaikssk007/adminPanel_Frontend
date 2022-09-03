import React from 'react';
import Styles from './NavbarMobile.module.css';
import { FaBars } from 'react-icons/fa';

interface props {
  showSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}
const NavbarMobile = (props: props) => {
  const openSidebar = () => {
    props.showSidebar(true);
  };
  return (
    <div className={Styles.navbar}>
      <div onClick={openSidebar}>
        <FaBars />
      </div>
      <h3>Admin panel</h3>
      <div className={Styles.iconContainer}>
        <div className={Styles.imgContainer}>
          {' '}
          <img src="https://cdn2.iconfinder.com/data/icons/flatfaces-everyday-people-square/128/beard_male_man_face_avatar-512.png" />
        </div>
        <div className={Styles.status}>
          <div className={Styles.statusMsg}>super admin</div>
        </div>
      </div>
    </div>
  );
};

export default NavbarMobile;
