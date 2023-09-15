import cx from 'classnames';
import styles from './BasicInsights.module.scss';
import { reportArrayOne, reportArrayTwo } from '@/constant/insights';
import { useQuery } from '@tanstack/react-query';
import { getPageInsightReport } from '@/services/WebServices/Report.js';
import secureLocalStorage from 'react-secure-storage';

function BasicInsights() {
  const pageSpeedScore = 81;
  const mblPageSpeed = 31;
  const websiteId = secureLocalStorage.getItem('websiteId');

  const { data: insightData, isLoading } = useQuery(
    ['getPageInsightReport', websiteId],
    () => getPageInsightReport(websiteId),
    {
      enabled: !!websiteId,
    },
  );

  return (
    <div className={styles.container}>
      <div className={styles.topSection}>
        <div className={styles.topContent}>
          <h1>
            <span className={styles.highlight}>Web</span> Loading score is&nbsp;
            {insightData?.performanceScore * 100}% for Desktop
          </h1>
          <p>
            Page Speed helps you understand the performance of your site and to
            reduce bounce rates and increase conversion rates. The higher the
            score the more efficient and eco-friendly your site is.
          </p>
        </div>
        <div className={cx(styles.frameSection, styles.desktopframe)}>
          <div className={styles.bgDesktop}>
            <span className={cx(styles.score, styles.desktopScore)}>
              {insightData?.performanceScore * 100}%
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Section  */}
      <div className={styles.topSection}>
        <div className={styles.frameSection}>
          <div className={styles.bgPhone}>
            <span className={cx(styles.score, styles.mobileScore)}>
              {insightData?.mobilePerformanceScore * 100}%
            </span>
          </div>
        </div>
        <div className={styles.topContent}>
          <h1>
            <span className={styles.highlight}>Mobile</span> Loading score
            is&nbsp;
            {insightData?.mobilePerformanceScore * 100}% for Mobile
          </h1>
          <p>
            Page Speed helps you understand the performance of your site and to
            reduce bounce rates and increase conversion rates. The higher the
            score the more efficient and eco-friendly your site is.
          </p>
        </div>
      </div>

      {/* Recommendations  */}
      <div className={styles.recommendations}>
        <h1>Recommendations for improving your Score</h1>

        <div className={styles.cardGrid}>
          {reportArrayOne.map((report, index) => {
            return (
              <div key={`report-${index}`} className={styles.cardContainer}>
                <div className={styles.icon}>{report.icon}</div>
                <div className={styles.title}>{report.title}</div>
                <div className={styles.description}>{report.description}</div>
              </div>
            );
          })}
        </div>

        <div className={styles.cardSecondaryGrid}>
          {reportArrayTwo.map((report, index) => {
            return (
              <div key={`report-${index}`} className={styles.cardContainer}>
                <div className={styles.icon}>{report.icon}</div>
                <div className={styles.title}>{report.title}</div>
                <div className={styles.description}>{report.description}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default BasicInsights;
