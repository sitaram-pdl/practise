import React from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import styles from './DashboardFooter.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import cx from 'classnames';
import { getPageTitle } from '@/lib/getPageTitle';

export const DashboardFooter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const stepsArray = [
    '/carbontest',
    // '/hardwarereport',
    '/networkreport',
    '/basic-insights',
    '/page-insights',
    '/trafficanalysis',
    '/technologies',
  ];

  const pageName = getPageTitle(location.pathname);

  const total = stepsArray.length;
  const current = stepsArray.indexOf(location.pathname) + 1;
  const next = getPageTitle(stepsArray[current + 1]);
  return (
    <div className={styles.footer}>
      <div className={styles.pagination}>
        <div
          className={cx(
            styles.paginationIcon,
            current > 1 ? styles.cursor : styles.disable,
          )}
          onClick={() =>
            current > 1 ? navigate(stepsArray[current - 2]) : null
          }
        >
          <AiOutlineLeft size={20} className={styles.paginationIcon} />
        </div>
        <div className={styles.paginationMidSection}>
          <div className={styles.paginationHeading}>{pageName}</div>
          <div className={styles.paginationSubText}>
            {current}/{total} Next : {next}...
          </div>
        </div>
        <div
          className={cx(
            styles.paginationIcon,
            current != total ? styles.cursor : styles.disable,
          )}
          onClick={() =>
            navigate(current != total ? stepsArray[current] : null)
          }
        >
          <AiOutlineRight size={20} className={styles.paginationIcon} />
        </div>
      </div>
    </div>
  );
};
