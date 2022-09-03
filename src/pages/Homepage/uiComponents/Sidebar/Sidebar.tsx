import React from 'react';
import Styles from './Sidebar.module.css';
import { FaUsersCog } from 'react-icons/fa';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { MdOutlineProductionQuantityLimits, MdLogout } from 'react-icons/md';
import { GrUserAdmin } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const logoutUser = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
    return null;
  };
  return (
    <nav className={Styles.sidebar}>
      <div className={Styles.userOptions}>
        <Link className={Styles.active} to={'/adminPage'}>
          <GrUserAdmin size={'2rem'} color={'red'} />
        </Link>
        <Link to={'/adminPage/users'}>
          <FaUsersCog size={'1.5rem'} />
        </Link>
        <Link to={'/adminPage/categories'}>
          <BsFillBagCheckFill size={'1.5rem'} />
        </Link>
        <Link to={'/adminPage/products'}>
          <MdOutlineProductionQuantityLimits size={'1.5rem'} />
        </Link>
      </div>
      <div className={Styles.logout}>
        <a onClick={logoutUser}>
          <MdLogout size={'2rem'} />
        </a>
      </div>
    </nav>
  );
};

export default Sidebar;
