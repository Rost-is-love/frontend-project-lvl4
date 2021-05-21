import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';

import Add from './AddModal.jsx';
import Remove from './RemoveModal.jsx';
import Rename from './RenameModal.jsx';
import { hideModal } from '../slices/modalsSlice.js';

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
