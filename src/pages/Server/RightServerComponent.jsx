import React from 'react';
import styles from './RightServerComponent.module.css';
import cx from 'classnames';

export const RightServerComponent = ({ active }) => {
  return (
    <div className={styles.container}>
      <div className={styles.stepContainer}>
        <div className={styles.stepHeader}>
          <div
            className={cx(
              styles.step,
              active === 1 || active === 2 || active === 3
                ? styles.greenbg
                : null,
            )}
          >
            1
          </div>
          <div className={styles.text}>
            <div className={styles.title}>Select Server</div>
            <div className={styles.subTitle}>
              What is server of your website
            </div>
          </div>
        </div>

        <div
          className={cx(
            styles.line,
            active === 2 || active === 3 ? styles.greenborder : null,
          )}
        />

        <div className={styles.stepHeader}>
          <div
            className={cx(
              styles.step,
              active === 2 || active === 3 ? styles.greenbg : null,
            )}
          >
            2
          </div>
          <div className={styles.text}>
            <div className={styles.title}>Website Assessment</div>
            <div className={styles.subTitle}>Help it make it suitable</div>
          </div>
        </div>
        <div
          className={cx(styles.line, active === 3 ? styles.greenborder : null)}
        />
        <div className={styles.stepHeader}>
          <div
            className={cx(styles.step, active === 3 ? styles.greenbg : null)}
          >
            3
          </div>
          <div className={styles.text}>
            <div className={styles.title}>View Report</div>
            <div className={styles.subTitle}>
              Generate and view your detailed report.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
