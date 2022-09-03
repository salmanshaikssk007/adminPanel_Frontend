import React from 'react';
import Styles from './Button.module.css';

interface props {
  children: React.ReactNode;
  inputStyles?: any;
  clickEvent?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  type?: 'button' | 'reset' | 'submit';
  setDisabled?: boolean;
}
const Button = (props: props) => {
  const combinedStyles = `${Styles.button} ${props.inputStyles}`;
  return (
    <button
      disabled={props.setDisabled}
      type={props.type}
      onClick={props.clickEvent}
      data-testid="button_ui"
      className={combinedStyles}>
      {props.children}
    </button>
  );
};

export default Button;
