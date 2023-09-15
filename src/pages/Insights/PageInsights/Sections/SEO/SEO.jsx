import { Progress } from 'antd';
import { useState, useEffect } from 'react';
import cx from 'classnames';
import { useQuery } from '@tanstack/react-query';
import secureLocalStorage from 'react-secure-storage';
import getProgressColor from '@/utils/getProgressColor.utils';
import styles from './SEO.module.css';
import TrafficChart from './TrafficChart';
import { trafficDetail } from '@/constant/traffic';

const SEO = () => {
  const websiteId = secureLocalStorage.getItem('websiteId');

  const [option, setOptions] = useState('Monthly');
  const [series, setSeries] = useState(null);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    const data = trafficDetail.find(
      (item) => item.label.toLowerCase() === option.toLowerCase(),
    );

    if (!data) {
      setSeries(null);
      setCategories(null);
      return;
    }

    const seriesData = [
      {
        name: 'Visits',
        data: data.traffic.map((item) => item.user),
      },
    ];

    let category = data.traffic.map((item) => item.date);

    if (option === 'Monthly') {
      category = category.map((item) => {
        return new Date(item).toLocaleString('en-US', {
          month: 'short',
        });
      });
    }

    if (option === 'Today' || option === 'Yesterday') {
      category = category.map((item) => {
        const [hours, min] = item.split(':');
        const AmOrPm = hours >= 12 ? 'pm' : 'am';
        const convertHour = hours % 12 || 12;
        return `${convertHour}:${min} ${AmOrPm}`;
      });
    }

    setSeries(seriesData);
    setCategories(category);
  }, [option]);

  const { data: insightData, isLoading } = useQuery(
    ['getPageInsightReport', websiteId],
    () => getPageInsightReport(websiteId),
    {
      enabled: !!websiteId,
    },
  );

  const handleSelectChange = (e) => {
    setOptions(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.secondSection}>
        <div className={styles.seoAnalysis}>
          <div className={styles.seoLeft}>
            <div className={styles.heading}>Eco-Link Score</div>
            <Progress
              className="mt-2"
              size={150}
              strokeColor={getProgressColor(65)}
              type="circle"
              format={(perc) => (
                <span className={styles.percLabel}>{perc}</span>
              )}
              strokeWidth={13}
              percent={75}
            />
            <div style={{ marginTop: 10 }}>Visit per week</div>
            <div className={styles.textYellow}>58% of visits</div>
          </div>

          <div className={styles.seoRight}>
            <div className={cx(styles.seoRightBox)}>
              <div
                className={styles.percent}
                style={{ color: getProgressColor(65) }}
              >
                65
              </div>
              <div> Trust Flow </div>
            </div>
            <div className={cx(styles.seoRightBox)}>
              <div
                className={styles.percent}
                style={{ color: getProgressColor(7) }}
              >
                7
              </div>
              <div>Citation Flo</div>
            </div>
            <div className={cx(styles.seoRightBox)}>
              <div
                className={styles.percent}
                style={{ color: getProgressColor(8) }}
              >
                8
              </div>
              <div>Broken Links</div>
            </div>
          </div>
        </div>
        <div className={styles.trafficAnalysis}>
          <div className={styles.tfHeading}>
            <div className={styles.trafficHeading}>Traffic Analysis</div>
            <select
              onChange={handleSelectChange}
              defaultValue={option}
              className={cx(styles.select)}
            >
              {trafficDetail.map((item, index) => (
                <option key={index} value={item.label}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
          <div style={{ height: 'max(100%, 350)' }}>
            <TrafficChart series={series} categories={categories} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SEO;
