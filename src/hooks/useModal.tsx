import React, { useState } from 'react';
import Modal from '../common/modal/Modal';

type Props = {
  children: JSX.Element;
};

const useModal = () => {
  const [isVisible, setVisible] = useState(false);
  return {
    isVisible,
    setVisible,
    Modal: ({ children }: Props) => (
      <Modal isVisible={isVisible} setVisible={setVisible}>
        {children}
      </Modal>
    ),
  };
};

export default useModal;
