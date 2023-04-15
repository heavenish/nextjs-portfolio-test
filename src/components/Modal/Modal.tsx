// components/Modal/Modal.tsx
import React from 'react';
import styles from './Modal.module.scss';

interface ModalProps {
  showModal: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ showModal, closeModal, children }) => {
  if (!showModal) {
    return null;
  }

  return (
    <div className={styles.modalBackdrop} onClick={closeModal}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={closeModal}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;