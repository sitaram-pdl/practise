import { Collapse, Progress } from 'antd';

import GreenReport from '@/assets/svg/component/GreenReport';
import RedReport from '@/assets/svg/component/RedReport';
import YellowReport from '@/assets/svg/component/YellowReport';
import styles from '@/pages/Insights/PageInsights/PageInsights.module.scss';
import CustomPanel from './CustomPanel';
import getProgressColor from '@/utils/getProgressColor.utils';

function PerformanceDiagnostic({ performanceData }) {
  const { Panel } = Collapse;

  /*
  const unUsedError = performanceData.find((item) => item.unUsedPerc >= 0);
  const remainPerformanceError = performanceData.filter(
    (item) => item.text,
  );
  */

  const active = performanceData?.map((_, i) => {
    return String(i);
  });

  return (
    <>
      <div className={styles.tableHeading}>Diagnostics</div>

      {/*{unUsedError && (*/}
      {/*  <div className={styles.unUsedError}>*/}
      {/*    <div className={styles.errorDesc}>*/}
      {/*      <div className={styles.errorIcons}>*/}
      {/*        {unUsedError.type === 'warning' ? (*/}
      {/*          <RedReport />*/}
      {/*        ) : unUsedError.type === 'error' ? (*/}
      {/*          <YellowReport />*/}
      {/*        ) : (*/}
      {/*          <GreenReport />*/}
      {/*        )}*/}
      {/*      </div>*/}

      {/*      <span>{unUsedError.title}</span>*/}
      {/*    </div>*/}

      {/*    <div className={styles.unUsedProgress}>*/}
      {/*      <Progress*/}
      {/*        percent={unUsedError.unUsedPerc}*/}
      {/*        status="active"*/}
      {/*        strokeColor={getProgressColor(unUsedError.unUsedPerc)}*/}
      {/*        showInfo={false}*/}
      {/*      />*/}
      {/*      <span>{unUsedError.duration}</span>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*)}*/}

      <Collapse
        activeKey={active}
        expandIconPosition={'end'}
        style={{ borderRadius: 0 }}
      >
        {performanceData &&
          performanceData.map((dat, i) => {
            return (
              <Panel header={<CustomPanel item={dat} />} key={i}>
                {dat.description}
              </Panel>
            );
          })}
      </Collapse>
    </>
  );
}

export default PerformanceDiagnostic;
