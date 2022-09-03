import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../../components/information/ModalWindow/Modal';
import Button from '../../../components/ui/Button/Button';
import useModal from '../../../hooks/useModal';
import { RootState } from '../../../store';
import { deleteProduct } from '../../../store/counters/productSlice';
import Styles from './DeleteProduct.module.css';

// types for the functions
type submitFc = (event: React.FormEvent) => void;
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
const DeleteProduct = ({ product }: Props) => {
  const dispatch = useDispatch();
  // state to toogle the model
  const { isShowing, toggle } = useModal();
  //   login user details
  const loginUser = useSelector((state: RootState) => state.login.user);
  const submitHandler: submitFc = async (event) => {
    event.preventDefault();
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${loginUser.token}`
        }
      };
      const requiredId = product?._id;
      const { data } = await axios.delete(`/api/v1/products/${requiredId}`, config);
      if (data.success) {
        console.log(data.message);
        dispatch(deleteProduct(product));
        toggle();
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <>
      <Button
        setDisabled={!loginUser.isAdmin}
        clickEvent={toggle}
        inputStyles={Styles.updateUserButton}>
        Delete product
      </Button>
      <Modal isShowing={isShowing} hide={toggle}>
        <form className={Styles.formContainer}>
          <div className={Styles.inputContainer}>
            <p>Are you sure ? you want to delete ?</p>
          </div>
          <br />
          <br />
          <div className={Styles.inputContainer}>
            <Button clickEvent={submitHandler} type={'submit'} inputStyles={Styles.loginBtn}>
              Delete User
            </Button>
            <Button clickEvent={toggle} inputStyles={Styles.deleteBtn}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default DeleteProduct;
