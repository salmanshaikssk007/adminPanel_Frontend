import React from 'react';
import Styles from './Card.module.css';

interface props {
  children: React.ReactNode;
}

const Card = (props: props) => {
  return (
    <div data-testid="card_ui" className={Styles.card}>
      <div data-testid="card_content_ui" className={Styles.container}>
        {props.children}
      </div>
    </div>
  );
};

export default Card;
