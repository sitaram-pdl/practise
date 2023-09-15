import React, { useState } from 'react';
import { Progress, Select } from 'antd';
import { useQuery } from '@tanstack/react-query';

import StackChart from './StackedChart';
import styles from './NetworkReport.module.scss';
import './NetworkRequest.scss';
import { getNetworkReport } from '@/services/WebServices/Report';
import { BsClock } from 'react-icons/bs';
import LineChartWithCustomLabels from './LineCharts';
import cx from 'classnames';
import { countryCode } from "@/constant/country-code/index.js";

const NetworkReport = () => {
  const [selected, setSelected] = useState({});
  const [selectedMonthlyPing, setSelectedMonthlyPing] = useState({});
  const [selectLocation, setSelectLocation] = useState('');
  const websiteId = localStorage.getItem('websiteId');
  const { data, isLoading } = useQuery(
    ['getNetworkReport', websiteId],
    () => getNetworkReport(websiteId),
    {
      enabled: !!websiteId,
      onSuccess: (data) => {
        if (data) {
          setSelected(data?.pingResponse[0]);
          setSelectLocation(data?.pingResponse[0]?.country);
          setSelectedMonthlyPing(data.monthlyPing[0]);
        }
      },
    },
  );
  const pingResponse = data?.pingResponse || [];
  const monthlyPingResponse = data?.monthlyPing || [];

  function roundToTwoDecimalPlaces(number) {
    return Math.round(number * 100) / 100;
  }

  const onChange = (value) => {
    setSelectLocation(value);
    const selectedPingGroup = pingResponse.filter(
      (dat) => dat.country === value,
    );
    const selectedMonthlyPingGroup = monthlyPingResponse.filter(
      (dat) => dat.country === value,
    );
    setSelected(selectedPingGroup[0]);
    console.log('selectedMonthlyPingGroup', selectedMonthlyPingGroup)
    setSelectedMonthlyPing(selectedMonthlyPingGroup[0]);
  };

  const getCountryFromCode = (code) => {
    const foundCountry = countryCode.find(
      (country) => country.code?.toLowerCase() === code?.toLowerCase(),
    );

    return foundCountry ? foundCountry?.name.toLowerCase() : null;
  };
  const countryNameList = countryCode.map(data => data.name);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.sectionOne}>
          <h1> Hosted IP Address: {data?.ipInfo?.ipAddress}</h1>
          <div>
            <div className={styles.sectionOneContain}>
              <div className={styles.label}>Hosted By:</div>
              <div>{data?.ipInfo?.hostedBy}</div>
            </div>

            <div className={styles.sectionOneContain}>
              <div className={styles.label}>LLC ISP AS NO:</div>
              <div>{data?.ipInfo?.organization}</div>
            </div>

            <div className={styles.sectionOneContain}>
              <div className={styles.label}>Google LLC Hosted Country:</div>
              <div style={{ textTransform: 'capitalize' }}>{ countryNameList?.includes(data?.ipInfo?.country) ? data?.ipInfo?.country : getCountryFromCode(data?.ipInfo?.country) }</div>
            </div>

            <div className={styles.sectionOneContain}>
              <div className={styles.label}>Data Center City:</div>
              <div>{data?.ipInfo?.city}</div>
            </div>

            <div className={styles.sectionOneContain}>
              <div className={styles.label}>Max Hop Count:</div>
              <div>{data?.ipInfo?.hopCount}</div>
            </div>
          </div>
        </div>

        <div className={styles.sectionTwo}>
          <div className={styles.heading}>In Traffic signals</div>
          <StackChart />
        </div>
      </div>

      <div>
        <div className={styles.latencyHeading}>
          <span className={styles.heading}>Latency</span>
          <Select
            value={
              selectLocation
                ? {
                    value: selectLocation,
                    label: selectLocation,
                  }
                : null
            }
            placeholder="Select a country"
            optionFilterProp="children"
            onChange={onChange}
            options={pingResponse.map((item) => ({
              value: item.country,
              label: item.label,
            }))}
          />
        </div>

        <div className={cx(styles.container, styles.latencyContainer)}>
          <div className="mt-5">
            <LineChartWithCustomLabels
              monthlyPingResponse={monthlyPingResponse}
              selectedLocation={selectLocation}
            />
          </div>

          <div>
            <span className={styles.subheading}>Avg.Latency</span>
            <div className={styles.progressContainer}>
              <div className={styles.progressbarContain}>
                <Progress
                  size={200}
                  strokeColor={'#1b9876'}
                  format={() => (
                    <span className={styles.ping}>{`${roundToTwoDecimalPlaces(
                      selected?.avg,
                    )}ms`}</span>
                  )}
                  type="circle"
                  strokeWidth={13}
                  percent={roundToTwoDecimalPlaces(selected?.avg)}
                />
                <div className={styles.ipAddress}>
                  {data?.ipInfo?.ipAddress}
                </div>
              </div>

              <div className={styles.pingFooter}>
                <div>
                  <div className={styles.pingBotTop}>
                    <div className={`${styles.dot} ${styles.bgMin}`} />
                    <div>{roundToTwoDecimalPlaces(selected?.min)} ms</div>
                  </div>
                  <div className={styles.pingTopBot}>
                    <BsClock fill="#E3696A" />
                    Minimum
                  </div>
                </div>

                <div>
                  <div className={styles.pingBotTop}>
                    <div className={`${styles.dot} ${styles.bgMax}`} />
                    <div>{roundToTwoDecimalPlaces(selected?.min)} ms</div>
                  </div>
                  <div className={styles.pingTopBot}>
                    <BsClock fill="#E3696A" />
                    Maximum
                  </div>
                </div>

                <div>
                  <div className={styles.pingBotTop}>
                    <div className={`${styles.dot} ${styles.bgAvg}`} />
                    <div>{roundToTwoDecimalPlaces(selected?.min)} ms</div>
                  </div>
                  <div className={styles.pingTopBot}>
                    <BsClock fill="#E3696A" />
                    Average
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkReport;
