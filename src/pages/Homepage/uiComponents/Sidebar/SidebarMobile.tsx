import React from 'react';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { FaUsersCog } from 'react-icons/fa';
import { GrUserAdmin } from 'react-icons/gr';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { MdLogout, MdOutlineProductionQuantityLimits } from 'react-icons/md';
import Styles from './SidebarMobile.module.css';
import { Link } from 'react-router-dom';

interface props {
  showSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}
const SidebarMobile = (props: props) => {
  const closeNav = () => {
    props.showSidebar(false);
  };
  const logout = () => {
    console.log('logged out');
    return null;
  };
  return (
    <div id="mySidenav" className={Styles.sidebar}>
      <div className={Styles.sidebar_actions}>
        <Link onClick={closeNav} className={Styles.active} to={'/adminPage'}>
          <GrUserAdmin size={'1.5rem'} />
        </Link>
        <Link onClick={closeNav} to={'/adminPage/users'}>
          <FaUsersCog size={'1.5rem'} />
        </Link>
        <Link onClick={closeNav} to={'/adminPage/categories'}>
          <BsFillBagCheckFill size={'1.5rem'} />
        </Link>
        <Link onClick={closeNav} to={'/adminPage/products'}>
          <MdOutlineProductionQuantityLimits size={'1.5rem'} />
        </Link>
      </div>
      <div className={Styles.sidebar_navigation}>
        <a onClick={logout}>
          <MdLogout size={'1.5rem'} />
        </a>
        <br />
        <a className={Styles.closebtn} onClick={closeNav}>
          <AiOutlineArrowLeft size={'1.5rem'} />
        </a>
      </div>
    </div>
  );
};

export default SidebarMobile;
