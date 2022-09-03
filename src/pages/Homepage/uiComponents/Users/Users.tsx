import React, { useEffect, useState } from 'react';
import Styles from './Users.module.css';
import Search from '../../../../features/Search/Search';
import Dropdown from '../../../../components/ui/Dropdown/Dropdown';
import Usercard from './Usercard';
import Createuser from '../../../../features/Users/Createuser/Createuser';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../store';
import axios from 'axios';
import { sortOrGetUsers } from '../../../../store/counters/userSlice';

const dummyData = [
  {
    _id: '1',
    category_name: 'recent'
  },
  {
    _id: '2',
    category_name: 'old'
  }
];
const Users = () => {
  const loginUser = useSelector((state: RootState) => state.login.user);
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.users);
  // dropdown states
  const [value, setValue] = React.useState('2,old');
  console.log(value);
  const changeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
    fetchSortUsers();
  };
  // featch sort users
  const fetchSortUsers = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${loginUser.token}`
        }
      };
      const keyword = value.split(',')[1];
      const { data } = await axios.get(`/api/v1/user/sort?search=${keyword}`, config);
      if (data.success) {
        console.log('sort data success');
        const users: any = data.data;
        dispatch(sortOrGetUsers(users));
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
  // fetch all the users
  const fetchAllUsers = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${loginUser.token}`
        }
      };
      const { data } = await axios.get('/api/v1/user/getAllUsers', config);

      if (data.success) {
        console.log('fetch users success');
        const users: any = data.data;
        dispatch(sortOrGetUsers(users));
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
  // useEffect to call the users
  useEffect(() => {
    fetchAllUsers();
  }, []);
  return (
    <>
      <div className={Styles.userOptions}>
        <Search component={'users'} placeholder={'search for users'} />
        <Createuser setDisabled={!loginUser.isSuperAdmin} />
      </div>
      <div className={Styles.container}>
        <section>
          <div className={Styles.optionsHeader}>
            <h5>User name</h5>
            <h5>Status</h5>
            <Dropdown
              dropdownTitle={value ? value.split(',')[1] : 'sort by'}
              data={dummyData}
              value={value}
              onChange={changeHandler}
            />
          </div>
          <div className={Styles.resultsData}>
            {users && (
              <>
                {users!.map((user) => (
                  <Usercard key={user!._id} user={user} />
                ))}
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Users;
