import GreenReport from '@/assets/svg/component/GreenReport';
import RedReport from '@/assets/svg/component/RedReport';
import PerformanceDiagnostic from '@/components/panel/PerformanceDiagnostic';
import { getPageInsightReport } from '@/services/WebServices/Report';
import { useQuery } from '@tanstack/react-query';
import { Progress } from 'antd';
import cx from 'classnames';
import { useState } from 'react';
import secureLocalStorage from 'react-secure-storage';
import Accessibility from './Sections/Accessibility/Accessibility';
import BestPractices from './Sections/BestPractices/BestPractices';
import SEO from './Sections/SEO/SEO';
import styles from './PageInsights.module.scss';
import './PageInsights.scss';
// import GaugeChart from "./GaugeChart";

const PageInsights = ({ showTab = true }) => {
  const websiteId = secureLocalStorage.getItem('websiteId');

  const [selectedTab, setSelectedTab] = useState('Performance');

  const { data: insightData, isLoading } = useQuery(
    ['getPageInsightReport', websiteId],
    () => getPageInsightReport(websiteId),
    {
      enabled: !!websiteId,
    },
  );

  const data = [
    {
      name: 'Performance',
      value: insightData?.performanceScore * 100,
    },
    {
      name: 'Accessibility',
      value: insightData?.accessibilityScore * 100,
    },
    {
      name: 'Best Practices',
      value: insightData?.bestPracticeScore * 100,
    },
    {
      name: 'SEO',
      value: insightData?.seoScore * 100,
    },
  ];

  const performance = [
    {
      time: insightData?.performanceMetrics?.firstContentfulPaint,
      name: 'First Contentful page',
      dot: 'green',
    },
    {
      time: insightData?.performanceMetrics?.totalBlockingTime,
      name: 'Time Blocking time',
    },

    {
      time: insightData?.performanceMetrics?.speedIndex,
      name: 'Speed Index',
      dot: 'green',
    },
    {
      time: insightData?.performanceMetrics?.largestContentfulPaint,
      name: 'Largest Contentful page',
    },
  ];

  const getSelectedTab = () => {
    switch (selectedTab) {
      case 'Accessibility':
        return <Accessibility />;
        break;
      case 'Best Practices':
        return <BestPractices />;
        break;
      case 'SEO':
        return <SEO />;
        break;

      default:
        break;
    }
  };

  return (
    <div className={styles.container}>
      {/**1st section */}
      <div className={styles.cardContainer}>
        {data.map((dat, i) => (
          <div
            onClick={() => showTab && setSelectedTab(dat.name)}
            className={cx(
              styles.card,
              showTab && selectedTab === dat.name && styles.selectedTab,
            )}
            key={i}
          >
            <div className={styles.cardHeading}>{dat.name}</div>
            <Progress
              size={120}
              strokeColor={dat.value < 50 ? '#EBE2A2' : '#1b9876'}
              type="circle"
              format={(percent) => (
                <span className={styles.percentLabel}>{percent}%</span>
              )}
              strokeWidth={13}
              percent={dat.value}
            />
            {/* <GaugeChart value={70} /> */}
            {dat.name === selectedTab ? (
              <p className={cx(styles.viewStat, styles.open)}>Opened</p>
            ) : (
              <p className={styles.viewStat}>Tap to view status</p>
            )}
          </div>
        ))}
      </div>
      {/**2nst section */}

      {selectedTab === 'Performance' && (
        <div className={styles.secondSection}>
          <div className={styles.heading}>Performance Metrics</div>
          <div className={styles.performanceCardContainer}>
            {performance.map((dat, i) => (
              <div className={styles.performanceCard} key={i}>
                {dat.dot === 'green' ? <GreenReport /> : <RedReport />}

                <div className="d-flex  flex-column ">
                  <div className={styles.heading}>
                    {dat.time ? `${dat.time}s` : 'n/a'}
                  </div>
                  <div className={styles.performanceCardBotText}>
                    {dat.name}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/**last section table */}
          <div className={cx(styles.table, 'performanceTable')}>
            <PerformanceDiagnostic
              performanceData={insightData?.performanceAudit}
            />
          </div>
        </div>
      )}
      {showTab && getSelectedTab()}
    </div>
  );
};

export default PageInsights;
