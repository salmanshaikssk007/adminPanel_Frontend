import React, { useState } from 'react';
import Styles from './App.module.css';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage/Homepage';
import Loginpage from './pages/Loginpage/Loginpage';
import Card from './components/ui/Card/Card';
import Users from './pages/Homepage/uiComponents/Users/Users';
import Catageroies from './pages/Homepage/uiComponents/Categories/Catageroies';
import Products from './pages/Homepage/uiComponents/Products/Products';

function App() {
  return (
    <div className={Styles.App}>
      <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route path="/adminPage" element={<Homepage />}>
          <Route index element={<Users />}></Route>
          <Route path="users" element={<Users />} />
          <Route path="categories" element={<Catageroies />} />
          <Route path="products" element={<Products />} />
        </Route>
        <Route path="*" element={<Card>not found</Card>} />
      </Routes>
    </div>
  );
}

export default App;
