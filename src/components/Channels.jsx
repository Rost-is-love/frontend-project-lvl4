import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { changeCurrentChannel } from '../slices/channelsSlice.js';
import { showModal } from '../slices/modalsSlice.js';
import { selectChannels, selectCurChannelId } from '../slices';

const Channel = ({
  // prettier-ignore
  name,
  btnVariant,
  switchChannel,
  removeChannel,
  renameChannel,
  removable,
}) => {
  const { t } = useTranslation();
  return (
    <li className="nav-item">
      {removable ? (
        <Dropdown as={ButtonGroup} className="d-flex mb-2">
          <Button
            variant={btnVariant}
            className="nav-link flex-grow-1 text-left"
            onClick={switchChannel}
          >
            {name}
          </Button>
          <Dropdown.Toggle split variant={btnVariant} className="flex-grow-0" />
          <Dropdown.Menu>
            <Dropdown.Item onClick={removeChannel}>{t('remove')}</Dropdown.Item>
            <Dropdown.Item onClick={renameChannel}>{t('rename')}</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Button
          variant={btnVariant}
          className="nav-link btn-block mb-2 text-left"
          onClick={switchChannel}
        >
          {name}
        </Button>
      )}
    </li>
  );
};

const Channels = () => {
  const { t } = useTranslation();
  const channels = useSelector(selectChannels);
  const currentChannelId = useSelector(selectCurChannelId);
  const dispatch = useDispatch();
  // prettier-ignore
  const openModal = (type, channelId = null) => () => {
    dispatch(showModal({ type, channelId }));
  };

  const switchChannel = (id) => () => {
    dispatch(changeCurrentChannel({ id }));
  };

  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>{t('channels')}</span>
        <Button variant="link" className="ml-auto p-0" onClick={openModal('adding')}>
          +
        </Button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill">
        {channels.map(({ id, name, removable }) => {
          const btnVariant = id === currentChannelId ? 'primary' : 'light';

          return (
            <Channel
              key={id}
              name={name}
              removable={removable}
              btnVariant={btnVariant}
              switchChannel={switchChannel(id)}
              removeChannel={openModal('removing', id)}
              renameChannel={openModal('renaming', id)}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Channels;
