import React from 'react';
import styles from './WebsiteTraffic.module.css';
import cx from 'classnames';
import Select from 'react-select';
import { Button } from 'antd';

export const WebsiteTraffic = ({ setActive }) => {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.emailWrapper}>
        <div className={styles.title}>Website Traffic and Usage</div>
        <div>
          Tell us about your website so we can help you make it more sustainable
        </div>
      </div>

      <div className={styles.emailWrapper}>
        <div>Traffic *</div>
        <Select className={styles.input} options={options} />
      </div>

      <div className={styles.emailWrapper}>
        <div>Website views *</div>
        <Select className={styles.input} options={options} />
      </div>
      <div className={styles.emailWrapper}>
        <div>Energy Consumption *</div>
        <Select className={styles.input} options={options} />
      </div>

      <div className={styles.emailWrapper}>
        <div>Goals *</div>
        <Select className={styles.input} options={options} />
      </div>

      <div className={styles.buttonWrapper}>
        <Button style={{ background: 'white' }} onClick={() => setActive(2)}>
          Back
        </Button>
        <Button
          type="primary"
          onClick={() => setActive(2)}
          style={{ background: '#1B9876' }}
        >
          {' '}
          Generate Report
        </Button>
      </div>
    </div>
  );
};
