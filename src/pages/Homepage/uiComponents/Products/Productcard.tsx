import React from 'react';
import Button from '../../../../components/ui/Button/Button';
import Card from '../../../../components/ui/Card/Card';
import DeleteProduct from '../../../../features/Products/DeleteProduct/DeleteProduct';
import UpdateProduct from '../../../../features/Products/UpdateProduct/UpdateProduct';
import Styles from './Products.module.css';
interface Props {
  product:
    | {
        _id: string;
        product_name: string;
        product_desc: string;
        product_price: number;
        product_quantity: number;
        category_id?: string;
      }
    | undefined;
}
const Productcard = ({ product }: Props) => {
  return (
    <Card>
      <div className={Styles.productInfo}>
        <div className={Styles.productName}>{product!.product_name}</div>
        <div className={Styles.productDescription}>{product!.product_desc}</div>
        <div className={Styles.productQuantity}>{product!.product_quantity}</div>
        <div className={Styles.productprice}>{product!.product_price}</div>

        <div className={Styles.actions}>
          <UpdateProduct product={product} />
          <DeleteProduct product={product} />
        </div>
      </div>
    </Card>
  );
};

export default Productcard;
