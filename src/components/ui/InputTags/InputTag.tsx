import React from 'react';
import Styles from './InputTag.module.css';

interface props {
  type: React.HTMLInputTypeAttribute;
  placeholder?: string;
  inputStylesName?: string;
  handleEvent?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number | readonly string[] | undefined;
  disabled?: boolean;
}

const InputTag = (props: props) => {
  //check if react ref requried
  const variousName = props.inputStylesName;
  return (
    <div className={Styles.inputTag}>
      <input
        disabled={props.disabled}
        value={props.value}
        onChange={props.handleEvent}
        data-testid="input_ui"
        className={`${Styles.variousName}`}
        type={props.type}
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default InputTag;
