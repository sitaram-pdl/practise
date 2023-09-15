import React from 'react';
import styles from './TableData.module.scss';
import { Button } from 'antd';
import { DashboardFooter } from '@/components/Footer/DashboardFooter';
import cx from 'classnames';

const TableData = () => {
  const tableData = [
    {
      name: 'utility',
      sub: [
        { company: 'CLP Holdings Limited', score: 10 },
        {
          company: 'The Hong Kong and China Gas Company Limited',
          score: 17,
        },
        { company: 'Power Assets Holdings Limited', score: 50 },
        { company: 'CK Infrastructure Holdings Limited', score: 10 },
        { company: 'Towngas Smart Energy Company Limited', score: 8 },
        {
          company: 'HK Electric Investments and HK Electric Investments Ltd.',
          score: 8,
        },
      ],
    },
    {
      name: 'Properties and Construction',
      sub: [
        { company: 'Hang Lung Group Limited', score: 15 },
        { company: 'Henderson Land Development Co. Ltd.', score: 25 },
        { company: 'Link Real Estate Investment Trust', score: 17 },
        { company: 'The Wharf (Holdings) Limited', score: 13 },
        { company: 'New World Development Co. Ltd.', score: 33 },
        { company: 'Great Eagle Holdings Limited', score: 20 },
        { company: 'The Bank of East Asia, Limited', score: 20 },
      ],
    },
    {
      name: 'Financials',
      sub: [
        { company: 'CLP Holdings Limited', score: 10 },
        {
          company: 'The Hong Kong and China Gas Company Limited',
          score: 17,
        },
        { company: 'Power Assets Holdings Limited', score: 50 },
        { company: 'CK Infrastructure Holdings Limited', score: 10 },
        { company: 'Towngas Smart Energy Company Limited', score: 8 },
        {
          company: 'HK Electric Investments and HK Electric Investments Ltd.',
          score: 8,
        },
      ],
    },
    {
      name: 'Consumer Discreationary',
      sub: [
        { company: 'Hang Lung Group Limited', score: 15 },
        { company: 'Henderson Land Development Co. Ltd.', score: 25 },
        { company: 'Link Real Estate Investment Trust', score: 17 },
        { company: 'The Wharf (Holdings) Limited', score: 13 },
        { company: 'New World Development Co. Ltd.', score: 33 },
        { company: 'Great Eagle Holdings Limited', score: 20 },
        { company: 'The Bank of East Asia, Limited', score: 20 },
      ],
    },
  ];

  return (
    <div className={styles.container}>
      {/**heading */}
      <div className={styles.topHeading}>
        <div className={styles.heading}>TableData</div>

        <Button
          className={styles.appPrimaryButton}
          icon={
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 12.5L3 7.5L4.4 6.05L7 8.65V0.5H9V8.65L11.6 6.05L13 7.5L8 12.5ZM2 16.5C1.45 16.5 0.979002 16.304 0.587002 15.912C0.195002 15.52 -0.000664969 15.0493 1.69779e-06 14.5V11.5H2V14.5H14V11.5H16V14.5C16 15.05 15.804 15.521 15.412 15.913C15.02 16.305 14.5493 16.5007 14 16.5H2Z"
                fill="#1B9876"
              />
            </svg>
          }
          style={{ background: 'white' }}
        >
          Download
        </Button>
      </div>
      {/**table */}
      <div className={styles.tableContainer}>
        <div className={styles.tableHeading}>
          <div>Classification</div>
          <div>Company</div>
          <div>Score</div>
        </div>
        {tableData.map((dat, i) => (
          <div key={i}>
            {dat.sub.map((item, index) => (
              <div
                key={index + 'sub'}
                className={cx(
                  styles.tableBody,
                  index % 2 === 0 ? styles.bgGrey : null,
                )}
              >
                <div>{index === 0 ? dat.name : ''}</div>
                <div className={styles.companyName}>{item.company}</div>
                <div>{item.score}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableData;
