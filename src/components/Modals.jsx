import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';

import Add from './AddModal.jsx';
import Remove from './RemoveModal.jsx';
import Rename from './RenameModal.jsx';
import { selectIsVisible, selectModalType, actions } from '../slices';

const modals = {
  adding: <Add />,
  removing: <Remove />,
  renaming: <Rename />,
};

const Modals = () => {
  const isVisible = useSelector(selectIsVisible);
  const modalType = useSelector(selectModalType);
  const dispatch = useDispatch();

  if (!isVisible) {
    return null;
  }

  const onHide = () => {
    dispatch(actions.hideModal());
  };

  return (
    <Modal show={isVisible} onHide={onHide}>
      {modals[modalType]}
    </Modal>
  );
};

export default Modals;
