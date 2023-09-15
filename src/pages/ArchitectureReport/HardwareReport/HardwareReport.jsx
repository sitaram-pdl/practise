import React from 'react';
import styles from './HardwareReport.module.scss';
import './HardwareRepor.scss';
import { Progress } from 'antd';
import cx from 'classnames';

const HardwareReport = () => {
  function getProgressColor(value) {
    if (value < 30) return '#E3696A';
    if (value < 60) return '#5DB39B';
    return '#1b9876';
  }

  return (
    <div className={styles.rootContainer}>
      <div className={styles.container}>
        <div className="progressContainer">
          <div className={styles.report}>
            <div className={styles.heading}>Hardware Report</div>
            <Progress
              className={styles.responsiveProgress}
              strokeColor={getProgressColor(75)}
              type="circle"
              strokeWidth={13}
              percent={75}
              format={(percent) => (
                <span className={styles.percentLabel}>{percent}</span>
              )}
            />
            <p>Your Score</p>
          </div>

          <div className={cx(styles.report, 'softwareReportCopy')}>
            <div className={styles.heading}>Software Report</div>
            <Progress
              className={styles.responsiveProgress}
              strokeColor={getProgressColor(15)}
              type="circle"
              strokeWidth={13}
              percent={15}
              format={(percent) => (
                <span className={styles.percentLabel}>{percent}</span>
              )}
            />
            <p>Your Score</p>
          </div>
        </div>

        <div className={styles.contentContainer}>
          <div className={styles.heading}>Hardware Components</div>
          <div className={styles.gridContainer}>
            <div className={styles.grid}>
              <div className={styles.label}>Bandwidth</div>
              <div className={cx(styles.progressWrapper, 'progressWrapper')}>
                <Progress
                  className={styles.progress}
                  percent={85}
                  showInfo={false}
                  strokeColor={getProgressColor(85)}
                  strokeWidth={13}
                />
                <span className={styles.progressLabel}>85</span>
              </div>
            </div>

            <div className={styles.grid}>
              <div>Trafic</div>
              <div className={cx(styles.progressWrapper, 'progressWrapper')}>
                <Progress
                  className={styles.progress}
                  percent={15}
                  showInfo={false}
                  strokeColor={getProgressColor(15)}
                  strokeWidth={13}
                />
                <span className={styles.progressLabel}>15</span>
              </div>
            </div>

            <div className={styles.grid}>
              <div>Response</div>
              <div className={cx(styles.progressWrapper, 'progressWrapper')}>
                <Progress
                  className={styles.progress}
                  percent={45}
                  strokeColor={getProgressColor(45)}
                  showInfo={false}
                  strokeWidth={13}
                />
                <span className={styles.progressLabel}>45</span>
              </div>
            </div>

            <div className={styles.grid}>
              <div>Time</div>
              <div className={cx(styles.progressWrapper, 'progressWrapper')}>
                <Progress
                  className={styles.progress}
                  percent={40}
                  showInfo={false}
                  strokeColor={getProgressColor(40)}
                  strokeWidth={13}
                />
                <span className={styles.progressLabel}>40</span>
              </div>
            </div>

            <div className={styles.grid}>
              <div>Via CDN</div>
              <div>Yes</div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={cx(styles.report, 'softwareReport')}>
          <div className={styles.heading}>Software Report</div>
          <Progress
            className={styles.responsiveProgress}
            strokeColor={getProgressColor(15)}
            type="circle"
            strokeWidth={13}
            percent={15}
            format={(percent) => (
              <span className={styles.percentLabel}>{percent}</span>
            )}
          />
          <p>Your Score</p>
        </div>

        <div className={styles.contentContainer}>
          <div className={styles.heading}>Software Components</div>
          <div className={styles.gridContainer}>
            <div className={styles.grid}>
              <div className={styles.label}>Loading Time</div>
              <div className={cx(styles.progressWrapper, 'progressWrapper')}>
                <Progress
                  className={styles.progress}
                  percent={85}
                  showInfo={false}
                  strokeColor={getProgressColor(85)}
                  strokeWidth={13}
                />
                <span className={styles.progressLabel}>85</span>
              </div>
            </div>

            <div className={styles.grid}>
              <div>Mobile Responsive</div>
              <div className={cx(styles.progressWrapper, 'progressWrapper')}>
                <Progress
                  className={styles.progress}
                  percent={15}
                  showInfo={false}
                  strokeColor={getProgressColor(15)}
                  strokeWidth={13}
                />
                <span className={styles.progressLabel}>15</span>
              </div>
            </div>

            <div className={styles.grid}>
              <div>Code Quality</div>
              <div className={cx(styles.progressWrapper, 'progressWrapper')}>
                <Progress
                  className={styles.progress}
                  percent={45}
                  strokeColor={getProgressColor(45)}
                  showInfo={false}
                  strokeWidth={13}
                />
                <span className={styles.progressLabel}>45</span>
              </div>
            </div>

            <div className={styles.grid}>
              <div>Image Optimisation</div>
              <div className={cx(styles.progressWrapper, 'progressWrapper')}>
                <Progress
                  className={styles.progress}
                  percent={40}
                  showInfo={false}
                  strokeColor={getProgressColor(40)}
                  strokeWidth={13}
                />
                <span className={styles.progressLabel}>40</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HardwareReport;
