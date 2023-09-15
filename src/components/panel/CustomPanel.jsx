import GreenReport from '@/assets/svg/component/GreenReport';
import RedReport from '@/assets/svg/component/RedReport';
import YellowReport from '@/assets/svg/component/YellowReport';
import styles from '@/pages/Insights/PageInsights/PageInsights.module.scss';
import cx from 'classnames';

function CustomPanel({ item }) {
  return (
    <div className={styles.panel}>
      <div className={styles.errorContainer}>
        <div className={styles.errorIcons}>
          {/*{item.type === 'warning' ? (*/}
          {/*  <RedReport />*/}
          {/*) : item.type === 'error' ? (*/}
          {/*  <YellowReport />*/}
          {/*) : (*/}
          {/*  <GreenReport />*/}
          {/*)}*/}
          <YellowReport />
        </div>
        <span className={styles.logText}>{item.title}</span>
      </div>
      {/*<span className={cx(styles.logtext, styles.error)}>*/}
      {/*  <span className={styles.dash}>-</span> {item.error || item.duration}*/}
      {/*</span>*/}
    </div>
  );
}

export default CustomPanel;
