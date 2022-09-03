import React, { useEffect, useState } from 'react';
import Search from '../../../../features/Search/Search';
import CreateCategory from '../../../../features/Categories/CreateCatageory/CreateCategory';
import Styles from './Categories.module.css';
import Categorycard from './Categorycard';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../store';
import axios from 'axios';
import { sortOrGetCategories } from '../../../../store/counters/categorySlice';

const Catageroies = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.categories.categories);
  const loginUser = useSelector((state: RootState) => state.login.user);
  // fetch all the categories
  const fetchAllCategories = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${loginUser.token}`
        }
      };
      const { data } = await axios.get('/api/v1/categories', config);

      if (data.success) {
        console.log('fetch categories success');
        const categories: any = data.data;
        dispatch(sortOrGetCategories(categories));
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
  // useEffect to call the users
  useEffect(() => {
    fetchAllCategories();
  }, []);
  return (
    <>
      <div className={Styles.categoryOptions}>
        {' '}
        <Search component={'categories'} placeholder={'search for categories'} />
        <CreateCategory setDisabled={!loginUser.isAdmin} />
      </div>
      <div className={Styles.container}>
        <section>
          <div className={Styles.optionsHeader}>
            <h5>Category name</h5>
          </div>
          <div className={Styles.resultsData}>
            {categories && (
              <>
                {categories.map((category) => (
                  <Categorycard key={category!._id} category={category} />
                ))}
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Catageroies;
