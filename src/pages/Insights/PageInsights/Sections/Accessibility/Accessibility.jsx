import { Collapse, Progress } from 'antd';
import React from 'react';
import styles from './Accessibility.module.css';
import LineChart from './LineChart';
import { ResponsiveContainer } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import secureLocalStorage from 'react-secure-storage';
import CustomerLineChart from './LineChart';
import cx from "classnames";
import PerformanceDiagnostic from "@/components/panel/PerformanceDiagnostic.jsx";

const Accessibility = () => {
  const websiteId = secureLocalStorage.getItem('websiteId');

  const { data: insightData, isLoading } = useQuery(
    ['getPageInsightReport', websiteId],
    () => getPageInsightReport(websiteId),
    {
      enabled: !!websiteId,
    },
  );

  const getColor = (num) => {
    if (num < 4) return 'var(--primary-green)';
    if (num < 7) return 'red';
    return 'red';
  };

  return (
    <div className={styles.container}>
      {/**1st section */}

      {/**2nst section */}

      <div className={styles.secondSection}>
        <div className={styles.heading}>Accessibility Summary</div>
        {/*<div className={styles.secondSectionContain}>
          <div className="d-flex align-items-center gap-3">
            <svg
              width="85"
              height="85"
              viewBox="0 0 85 85"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="3.35347"
                y="3.35347"
                width="78.0727"
                height="78.0727"
                rx="39.0364"
                fill="#1B9876"
              />
              <path
                d="M33.268 60.2455L25.4861 53.304L27.3138 51.2552L35.06 58.1638L45.62 47.9403C46.1118 47.464 46.7691 47.1968 47.4537 47.1948C48.1384 47.1927 48.7972 47.456 49.2919 47.9293L54.2684 52.6861L61.9309 44.4839L63.9357 46.3584L56.2719 54.5632C56.0243 54.8282 55.7267 55.0414 55.3961 55.1906C55.0656 55.3397 54.7087 55.4217 54.3463 55.4319C53.9838 55.4422 53.6229 55.3803 53.2845 55.2501C52.946 55.1198 52.6368 54.9237 52.3747 54.6731L47.4628 49.9781L36.9358 60.1673C36.4471 60.6407 35.7973 60.9117 35.117 60.9259C34.4367 60.9402 33.7762 60.698 33.268 60.2455ZM63.9357 37.5836H58.4429L61.1893 33.464L63.9357 37.5836ZM52.9501 27.9712H47.4573V30.7176H52.9501V33.464H48.8305V36.2104H52.9501V38.9568H47.4573V41.7032H52.9501C53.6782 41.7021 54.3761 41.4124 54.8909 40.8976C55.4057 40.3828 55.6954 39.6849 55.6965 38.9568V30.7176C55.6958 29.9894 55.4062 29.2913 54.8913 28.7764C54.3764 28.2615 53.6783 27.9719 52.9501 27.9712ZM44.7109 41.7032H36.4717V36.2104C36.4724 35.4822 36.762 34.7841 37.2769 34.2692C37.7918 33.7543 38.4899 33.4647 39.2181 33.464H41.9645V30.7176H36.4717V27.9712H41.9645C42.6927 27.9719 43.3908 28.2615 43.9057 28.7764C44.4206 29.2913 44.7102 29.9894 44.7109 30.7176V33.464C44.7102 34.1922 44.4206 34.8903 43.9057 35.4052C43.3908 35.9201 42.6927 36.2097 41.9645 36.2104H39.2181V38.9568H44.7109V41.7032ZM30.9789 38.9568V27.9712H28.2325V29.3444H25.4861V32.0908H28.2325V38.9568H25.4861V41.7032H33.7253V38.9568H30.9789Z"
                fill="white"
              />
              <rect
                x="3.35347"
                y="3.35347"
                width="78.0727"
                height="78.0727"
                rx="39.0364"
                stroke="white"
                stroke-width="5.29307"
              />
            </svg>
            <div>
              <div className={styles.subheading}>5/10</div>
              <div className={styles.sublabel}>Summary score</div>
            </div>
          </div>

          <div className={styles.chartContainer}>
            <CustomerLineChart />
          </div>
        </div>*/}

        <div className={cx(styles.table, 'performanceTable')}>
          <PerformanceDiagnostic performanceData={insightData?.accessibilityAudit} />
        </div>

        {/*<div className={styles.table}>
          <div className={styles.tableHeading}>
            <div>Occurance</div>
            <div>Checked</div>
          </div>
          {[1, 2, 3, 4, 5].map((dat, i) => (
            <div key={i} className={styles.tableBody}>
              <div style={{ color: getColor(dat) }}>{dat}</div>
              <div>Checked</div>
            </div>
          ))}
        </div>*/}
      </div>
    </div>
  );
};

export default Accessibility;
