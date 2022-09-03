import React, { useEffect, useState } from 'react';
import Styles from './Users.module.css';
import Card from '../../../../components/ui/Card/Card';
import Updateuser from '../../../../features/Users/Updateuser/Updateuser';
import Deleteuser from '../../../../features/Users/Deleteuser/Deleteuser';

interface Props {
  user:
    | {
        username: string;
        email: string;
        isAdmin: boolean;
        isSuperAdmin: boolean;
        phone: number;
        _id: string;
        token: string;
      }
    | undefined;
}
const Usercard = ({ user }: Props) => {
  // login user state
  const [loggedUser, setLoggedUser] = useState({ isSuperAdmin: '', isAdmin: '' });
  const adminUser = localStorage.getItem('userInfo');
  useEffect(() => {
    if (adminUser) {
      setLoggedUser(JSON.parse(adminUser));
    }
  }, []);
  return (
    <Card>
      <div className={Styles.userInfo}>
        <div className={Styles.name}>{user?.username}</div>
        <div className={Styles.status}>
          {user?.isAdmin ? 'Admin' : ''}
          {user?.isSuperAdmin ? 'Super Admin' : ''}
        </div>
        <div className={Styles.actions}>
          <Updateuser user={user} setDisabled={!loggedUser.isSuperAdmin} />
          <Deleteuser user={user} setDisabled={!loggedUser.isSuperAdmin} />
        </div>
      </div>
    </Card>
  );
};

export default Usercard;
