import React, { useEffect, useState } from 'react';
import Button from '../../../../components/ui/Button/Button';
import Card from '../../../../components/ui/Card/Card';
import UpdateCategory from '../../../../features/Categories/UpdateCategory/UpdateCategory';
import Styles from './Categories.module.css';

interface Props {
  category:
    | {
        _id: string;
        category_name: string;
        products?: (
          | {
              _id: string;
              product_name: string;
              product_desc: string;
              product_price: number;
              product_quantity: number;
            }
          | undefined
        )[];
      }
    | undefined;
}
const Categorycard = ({ category }: Props) => {
  // logged user details
  const [loggedUser, setLoggedUser] = useState({ isSuperAdmin: '', isAdmin: '' });
  // submit handler event
  const adminUser = localStorage.getItem('userInfo');
  useEffect(() => {
    if (adminUser) {
      setLoggedUser(JSON.parse(adminUser));
    }
  }, []);
  return (
    <Card>
      <div className={Styles.categoryInfo}>
        <div className={Styles.name}>{category!.category_name}</div>
        <div className={Styles.actions}>
          <UpdateCategory setDisabled={!loggedUser.isAdmin} category={category} />
        </div>
      </div>
    </Card>
  );
};

export default Categorycard;
