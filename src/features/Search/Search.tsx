import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Button from '../../components/ui/Button/Button';
import InputTag from '../../components/ui/InputTags/InputTag';
import Styles from './Search.module.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { sortOrGetUsers } from '../../store/counters/userSlice';
import { sortOrFilterOrGetProducts } from '../../store/counters/productSlice';
import { sortOrGetCategories } from '../../store/counters/categorySlice';

interface Props {
  placeholder?: string;
  component: string;
}
const Search = ({ placeholder, component }: Props) => {
  const dispatch = useDispatch();
  // logged user state
  const [loggedUser, setLoggedUser] = useState({ token: '' });
  // to store changed input
  const [input, setInput] = useState('');
  // to fetch users
  const fetchUsers = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${loggedUser.token}`
        }
      };
      const { data } = await axios.get(`/api/v1/user?search=${input ? input : 'null'}`, config);
      dispatch(sortOrGetUsers(data.data));
    } catch (error: any) {
      console.log(error.message);
    }
  };
  // to fetch categories
  const fetchCategories = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${loggedUser.token}`
        }
      };
      const { data } = await axios.get(
        `/api/v1/categories/searchQuery?search=${input ? input : 'null'}`,
        config
      );
      dispatch(sortOrGetCategories(data.data));
    } catch (error: any) {
      console.log(error.message);
    }
  };
  // to fetch products
  const fetchProducts = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${loggedUser.token}`
        }
      };
      const { data } = await axios.get(`/api/v1/products?search=${input ? input : 'null'}`, config);
      dispatch(sortOrFilterOrGetProducts(data.data));
    } catch (error: any) {
      console.log(error.message);
    }
  };
  // useEffect for users
  useEffect(() => {
    const adminUser = localStorage.getItem('userInfo');
    if (adminUser) {
      setLoggedUser(JSON.parse(adminUser));
      fetchUsers();
    }
    if (input) {
      dispatch(sortOrGetUsers([]));
    }
  }, [component === 'users' && input]);
  // useEffect for categories
  useEffect(() => {
    const adminUser = localStorage.getItem('userInfo');
    if (adminUser) {
      setLoggedUser(JSON.parse(adminUser));
      fetchCategories();
    }
    if (input) {
      dispatch(sortOrGetCategories([]));
    }
  }, [component === 'categories' && input]);
  // useEffect for products
  useEffect(() => {
    const adminUser = localStorage.getItem('userInfo');
    if (adminUser) {
      setLoggedUser(JSON.parse(adminUser));
      fetchProducts();
    }
    if (input) {
      dispatch(sortOrFilterOrGetProducts([]));
    }
  }, [component === 'products' && input]);
  // debouncing
  function debounce<Params extends any[]>(
    func: (...args: Params) => any,
    timeout: number
  ): (...args: Params) => void {
    let timer: NodeJS.Timeout;
    return (...args: Params) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, timeout);
    };
  }
  // to handle the changed input
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  // debouncing to handle changed input
  const debounceInputChangeHandler = debounce(inputChangeHandler, 400);
  return (
    <div className={Styles.searchContainer}>
      <form className={Styles.search}>
        <InputTag
          type={'text'}
          handleEvent={debounceInputChangeHandler}
          placeholder={placeholder}
        />
        <Button type="submit">
          <i>
            <FaSearch />
          </i>
        </Button>
      </form>
    </div>
  );
};

export default Search;
