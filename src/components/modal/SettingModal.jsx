import { useMutation, useQuery } from '@tanstack/react-query';
import cx from 'classnames';
import { useNavigate } from 'react-router-dom';

import Modal from '../Modal';
import styles from './../Navbar/AddNewClient.module.scss';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { postAddNewClient } from '@/services/Users/users.api';
import secureLocalStorage from 'react-secure-storage';
import { Button } from 'antd';
import { useEffect } from 'react';

function SettingModal({ show, setShow }) {
  const [details, setDetials] = useState(show?.item);

  useEffect(() => {
    setDetials(show?.item);
  }, [show.open]);

  const [errors, setErrors] = useState({});

  function submit(event) {
    event.preventDefault();
  }

  return (
    <Modal
      showHeader={false}
      style={{ maxWidth: '32rem', width: '95%' }}
      show={show.open}
      showCloseBtn={true}
      setShow={() => setShow({ open: false, item: null })}
    >
      <form style={{ padding: '1rem' }} onSubmit={submit}>
        <div className={styles.header}>
          <p>{details?.company}</p>
          <span>Edit dettail of your client</span>
        </div>

        <div className={styles['content']}>
          <div className="d-flex flex-column  gap-2">
            <label htmlFor="clientName">Enter the date of expiration</label>
            <div className={cx('mt-1 inputContainer', styles.inputContainer)}>
              <input
                id="clientName"
                type="text"
                className={cx('custom-input', styles.input)}
                name="clientName"
                placeholder="Date of expiration"
              />
              {errors.email && <div className="error">{errors.email}</div>}
            </div>
          </div>

          <div className="d-flex flex-column  gap-2">
            <label htmlFor="clientName">Enter the name of the client</label>
            <div className={cx('mt-1 inputContainer', styles.inputContainer)}>
              <input
                id="clientName"
                type="text"
                className={cx('custom-input', styles.input)}
                name="clientName"
                placeholder="Client’s Name"
              />
              {errors.email && <div className="error">{errors.email}</div>}
            </div>
          </div>

          <div className="d-flex flex-column  gap-2">
            <label htmlFor="clientName">Client's Email</label>
            <div className={cx('mt-1 inputContainer', styles.inputContainer)}>
              <input
                id="clientName"
                type="text"
                className={cx('custom-input', styles.input)}
                name="clientName"
                placeholder="Clients Email"
              />
            </div>
          </div>

          <Button
            htmlType="submit"
            onClick={($event) => addNewClient($event)}
            className={styles.agencyBtn}
            style={{
              color: 'white',
            }}
          >
            Continue
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default SettingModal;
