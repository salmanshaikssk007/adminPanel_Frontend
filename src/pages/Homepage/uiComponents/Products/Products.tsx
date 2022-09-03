import React, { useEffect, useState } from 'react';
import Dropdown from '../../../../components/ui/Dropdown/Dropdown';
import Search from '../../../../features/Search/Search';
import Createproduct from '../../../../features/Products/CreateProduct/Createproduct';
import Productcard from './Productcard';
import Styles from './Products.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import axios from 'axios';
import { sortOrFilterOrGetProducts } from '../../../../store/counters/productSlice';
import { sortOrGetCategories } from '../../../../store/counters/categorySlice';
import FilterProducts from '../../../../features/Products/FilterProducts/FilterProducts';
import SortProducts from '../../../../features/Products/SortProducts/SortProducts';
const dummyData = [
  {
    _id: '1',
    category_name: 'winterware'
  },
  {
    _id: '2',
    category_name: 'summerware'
  }
];
const Products = () => {
  // redux states
  const dispatch = useDispatch();
  const loginUser = useSelector((state: RootState) => state.login.user);
  const products = useSelector((state: RootState) => state.products.products);
  const categories = useSelector((state: RootState) => state.categories.categories);
  // dropdown states
  const [value, setValue] = React.useState('');
  const changeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
  };
  // fetch category data
  const fetchCategories = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${loginUser.token}`
        }
      };
      const { data } = await axios.get('/api/v1/categories', config);
      if (data.success) {
        const categories: any = data.data;
        dispatch(sortOrGetCategories(categories));
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
  // fetch all the products
  const fetchAllProducts = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${loginUser.token}`
        }
      };
      console.log(1);
      const { data } = await axios.get('/api/v1/products/getProducts', config);
      console.log(2);
      if (data.success) {
        console.log('fetch products success');
        const products: any = data.data;
        dispatch(sortOrFilterOrGetProducts(products));
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
  // useEffect to call the users
  useEffect(() => {
    fetchAllProducts();
    fetchCategories();
  }, []);
  return (
    <>
      <div className={Styles.productOptions}>
        <Search component={'products'} />
        <Createproduct setDisabled={!loginUser.isAdmin} />
      </div>
      <div className={Styles.container}>
        <section>
          <div className={Styles.optionsHeader}>
            <div className={Styles.optionsHeaderDesc}>
              <h5>product name</h5>
              <h5>product description</h5>
              <h5>quantity</h5>
              <h5>price</h5>
            </div>
            {/* <div className={Styles.optionsHeaderDropdown}>
              <Dropdown
                dropdownTitle={'Category'}
                data={categories ? categories : dummyData}
                value={value}
                onChange={changeHandler}
              />
            </div> */}
            <div className={Styles.filterOptions}>
              <FilterProducts />
              <SortProducts />
              {/* <h5>sort options</h5> */}
            </div>
          </div>
          <br />
          <div className={Styles.resultsData}>
            {products && (
              <>
                {products!.map((product) => (
                  <Productcard key={product!._id} product={product} />
                ))}
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Products;
