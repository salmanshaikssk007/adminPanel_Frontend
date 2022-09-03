import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Sidebar from './uiComponents/Sidebar/Sidebar';
import SidebarMobile from './uiComponents/Sidebar/SidebarMobile';
import NavbarMobile from './uiComponents/Navbar/NavbarMobile';
import Styles from './Homepage.module.css';
import Navbar from './uiComponents/Navbar/Navbar';
import { Outlet } from 'react-router-dom';

interface props {
  children?: React.ReactNode;
}
const Homepage = (props: props) => {
  const isMobileOrTablet = useMediaQuery({
    query: '(max-width:768px)'
  });
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      {props.children}
      {!isMobileOrTablet && <Sidebar />}
      {!isMobileOrTablet && <Navbar />}
      {/* mobile components */}
      {isMobileOrTablet && showSidebar && <div className={Styles.overlay}></div>}
      {/* navbar mobile only */}
      {isMobileOrTablet && !showSidebar && <NavbarMobile showSidebar={setShowSidebar} />}
      {/* sidebar mobile only */}
      {isMobileOrTablet && showSidebar && <SidebarMobile showSidebar={setShowSidebar} />}
      <Outlet />
    </>
  );
};

export default Homepage;
