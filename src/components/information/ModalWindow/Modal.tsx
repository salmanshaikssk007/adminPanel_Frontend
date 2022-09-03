import React from 'react';
import ReactDOM from 'react-dom';
import Styles from './Modal.module.css';

interface Props {
  isShowing: boolean;
  hide: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}
const Modal = (props: Props) =>
  props.isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className={Styles.modalOverlay} />
          <div className={Styles.modalWrapper} aria-modal aria-hidden tabIndex={-1} role="dialog">
            <div className={Styles.modal}>
              <div className={Styles.modalHeader}>
                <button
                  type="button"
                  className={Styles.modalCloseButton}
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={props.hide}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              {props.children}
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;

export default Modal;
