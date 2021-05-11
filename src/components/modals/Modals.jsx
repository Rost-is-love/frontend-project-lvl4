import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';

import Add from './Add.jsx';
import Remove from './Remove.jsx';
import Rename from './Rename.jsx';
import { hideModal } from './modalsSlice.js';

const modals = {
  adding: <Add />,
  removing: <Remove />,
  renaming: <Rename />,
};

const Modals = () => {
  const isVisible = useSelector((state) => state.modalsData.isVisible);
  const modalType = useSelector((state) => state.modalsData.type);
  const dispatch = useDispatch();

  if (!isVisible) {
    return null;
  }

  const onHide = () => {
    dispatch(hideModal());
  };

  return (
    <Modal show={isVisible} onHide={onHide}>
      {modals[modalType]}
    </Modal>
  );
};

export default Modals;
