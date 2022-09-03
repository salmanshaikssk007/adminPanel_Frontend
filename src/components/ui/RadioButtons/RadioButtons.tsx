import React, { useEffect, useState } from 'react';
import Styles from './RadioButtons.module.css';

interface props {
  item1: string;
  item2: string;
  setStatus: React.Dispatch<
    React.SetStateAction<{
      isAdmin: boolean;
      isSuperAdmin: boolean;
    }>
  >;
}

const RadioButtons = (props: props) => {
  const [checked, isChecked] = useState<boolean>(false);
  const toggleCheck = (event: React.MouseEvent) => {
    event.preventDefault();
    isChecked(!checked);
    props.setStatus({
      isAdmin: !checked,
      isSuperAdmin: checked
    });
  };
  return (
    <div className={Styles.radioContainer} data-testid="checkbox_ui">
      <label className={Styles.container} onClick={toggleCheck}>
        {props.item1}
        <input type="checkbox" checked={checked}></input>
        <span className={Styles.checkmark}></span>
      </label>

      <label className={Styles.container} onClick={toggleCheck}>
        {props.item2}
        <input type="checkbox" checked={!checked}></input>
        <span className={Styles.checkmark}></span>
      </label>
    </div>
  );
};

export default RadioButtons;
