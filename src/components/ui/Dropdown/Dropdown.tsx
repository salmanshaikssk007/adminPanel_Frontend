import React from 'react';
import { Category } from '../../../store/counters/categorySlice';
import Styles from './Dropdown.module.css';

interface props {
  dropdownTitle: string;
  data:
    | {
        _id: string;
        category_name: string;
      }[]
    | Category['category'][];
  value?: string;
  name?: React.Dispatch<React.SetStateAction<string>>;
  onChange?: React.ChangeEventHandler<HTMLSelectElement> | undefined;
}
const Dropdown = (props: props) => {
  return (
    <div className={Styles.dropdown}>
      <label className={Styles.dropButton}>
        {props.dropdownTitle}
        <select className={Styles.dropdownContent} value={props.value} onChange={props.onChange}>
          {props.data.map((option) => (
            <option key={option!._id} value={[option!._id, option!.category_name]}>
              {option!.category_name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default Dropdown;
