import React from 'react';
import { useState } from 'react';
import styles from './AddNewClient.module.scss';

import { FaPlus } from 'react-icons/fa';

import AddClientModal from '../modal/AddClientModal';

export const AddNewClient = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <button
        className={styles.addClientBtn}
        onClick={() => setOpenModal(true)}
      >
        <FaPlus />
        <span> Add a New Client</span>
      </button>

      {openModal && <AddClientModal show={openModal} setShow={setOpenModal} />}
    </div>
  );
};
