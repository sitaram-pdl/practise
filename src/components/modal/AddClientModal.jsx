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

function AddClientModal({ show, setShow }) {
  const navigate = useNavigate();
  const [name, setClientName] = useState('');
  const [email, setClientEmail] = useState('');
  const [errors, setErrors] = useState({});

  const mutation = useMutation(postAddNewClient);

  function validateForm() {
    const newErrors = {};
    if (!name) {
      newErrors.email = 'Full Name is required!';
    }
    if (!email) {
      newErrors.email = 'Email is required!';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function addNewClient(event) {
    event.preventDefault();

    if (validateForm()) {
      //  add submit service for client
      const payload = {
        email: email,
        fullName: name,
      };
      mutation.mutate(payload, {
        onSuccess: (result) => {
          console.log(result.data);
          if (result.status === 201) {
            secureLocalStorage.setItem('clientId', result.data.id);
            navigate('/server');
          } else {
            toast.error(result?.error?.statusText);
          }
        },
      });
      // if success store user id locally and route to server page
    } else {
      //  toast
      toast.error('Please fill required form');
    }
  }

  return (
    <Modal showHeader={false} show={show} closeAllow={true} setShow={setShow}>
      <form style={{ padding: '1rem' }} onSubmit={addNewClient}>
        <div className={styles.header}>
          <p>Add a New Client</p>
          <span>Fill in the following details to add a new client</span>
        </div>

        <div className={styles['content']}>
          <div className="d-flex flex-column  gap-2">
            <label htmlFor="clientName">Enter the name of the client</label>
            <div className={cx('mt-1 inputContainer', styles.inputContainer)}>
              <input
                id="clientName"
                type="text"
                className={cx('custom-input', styles.input)}
                name="clientName"
                placeholder="Client’s Name"
                onChange={(e) => setClientName(e.target.value)}
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
                onChange={(e) => setClientEmail(e.target.value)}
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
            loading={mutation.isLoading}
          >
            Continue
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default AddClientModal;
