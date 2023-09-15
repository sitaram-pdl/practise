import React, { lazy } from 'react';
import styles from './TrafficAnalysis.module.scss';
import cx from 'classnames';
import BarChartComponent from './Barchart';
import flagImage from '@/assets/images/websites/flag.png';
import { getTrafficReport } from '@/services/WebServices/Report';
import { useQuery } from '@tanstack/react-query';
import secureLocalStorage from 'react-secure-storage';
import TrafficChart from './TrafficChart';
import { countryCode } from '@/constant/country-code/index';

const TrafficAnalysis = () => {
  const websiteId = secureLocalStorage.getItem('websiteId');

  const { data: trafiicData, isLoading } = useQuery(
    ['getTrafficReport', websiteId],
    () => getTrafficReport(websiteId),
    {
      enabled: !!websiteId,
    },
  );

  const data = [
    {
      name: 'Daily visitors',
      number: trafiicData?.dailyVisitors,
      unit: 'k',
      icon: (
        <svg
          width="21"
          height="17"
          viewBox="0 0 21 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.94398 4.97529C2.94415 4.17691 3.1507 3.39213 3.54357 2.69711C3.93645 2.00209 4.50232 1.42042 5.18626 1.00857C5.87021 0.59671 6.64901 0.368647 7.44708 0.346508C8.24515 0.324369 9.0354 0.508907 9.74112 0.882213C10.4469 1.25552 11.0441 1.80492 11.4749 2.47709C11.9057 3.14926 12.1554 3.92139 12.1999 4.71853C12.2443 5.51567 12.0819 6.31076 11.7285 7.02664C11.375 7.74252 10.8425 8.35488 10.1826 8.8043C11.6037 9.3255 12.8362 10.26 13.7217 11.4876C14.6071 12.7152 15.1049 14.1797 15.151 15.6926C15.149 15.8558 15.0841 16.0118 14.9698 16.1282C14.8555 16.2446 14.7007 16.3123 14.5376 16.3172C14.3745 16.3221 14.2159 16.2638 14.0948 16.1544C13.9737 16.0451 13.8996 15.8932 13.8879 15.7305C13.8377 14.0897 13.1506 12.5328 11.9722 11.3899C10.7938 10.2469 9.21672 9.60774 7.57509 9.60774C5.93346 9.60774 4.35634 10.2469 3.17794 11.3899C1.99954 12.5328 1.31247 14.0897 1.26232 15.7305C1.25389 15.8954 1.18121 16.0505 1.05985 16.1625C0.938484 16.2744 0.778096 16.3344 0.613041 16.3296C0.447987 16.3247 0.291393 16.2554 0.176809 16.1365C0.0622242 16.0176 -0.0012378 15.8586 1.82969e-05 15.6935C0.0459558 14.1804 0.543681 12.7158 1.42913 11.488C2.31457 10.2602 3.54721 9.32555 4.96838 8.8043C4.34425 8.37957 3.83348 7.80862 3.48063 7.14122C3.12777 6.47382 2.94354 5.73023 2.94398 4.97529ZM7.57551 1.6069C6.68216 1.6069 5.8254 1.96179 5.19371 2.59348C4.56201 3.22518 4.20713 4.08194 4.20713 4.97529C4.20713 5.86864 4.56201 6.7254 5.19371 7.35709C5.8254 7.98879 6.68216 8.34367 7.57551 8.34367C8.46886 8.34367 9.32562 7.98879 9.95732 7.35709C10.589 6.7254 10.9439 5.86864 10.9439 4.97529C10.9439 4.08194 10.589 3.22518 9.95732 2.59348C9.32562 1.96179 8.46886 1.6069 7.57551 1.6069ZM14.5565 4.97529C14.4319 4.97529 14.3106 4.98371 14.191 5.00055C14.1075 5.0155 14.0219 5.01348 13.9392 4.99461C13.8565 4.97574 13.7785 4.94041 13.7097 4.89073C13.641 4.84105 13.583 4.77803 13.5391 4.70543C13.4953 4.63283 13.4665 4.55215 13.4545 4.46818C13.4425 4.38422 13.4475 4.2987 13.4693 4.21673C13.4911 4.13476 13.5291 4.05801 13.5812 3.99107C13.6333 3.92413 13.6983 3.86836 13.7724 3.82709C13.8465 3.78582 13.9282 3.75991 14.0125 3.75088C14.85 3.62979 15.704 3.79063 16.4401 4.20807C17.1762 4.62552 17.7526 5.27589 18.0786 6.05681C18.4046 6.83774 18.4617 7.70489 18.2409 8.52181C18.02 9.33872 17.5338 10.059 16.8588 10.5693C17.8511 11.0137 18.6936 11.7356 19.2847 12.6482C19.8759 13.5607 20.1903 14.6248 20.1901 15.712C20.1901 15.8795 20.1236 16.0402 20.0051 16.1586C19.8867 16.277 19.726 16.3436 19.5585 16.3436C19.391 16.3436 19.2304 16.277 19.1119 16.1586C18.9935 16.0402 18.927 15.8795 18.927 15.712C18.9269 14.7724 18.6241 13.8577 18.0635 13.1036C17.5029 12.3495 16.7143 11.796 15.8146 11.5251L15.3649 11.3904V9.97902L15.7102 9.80302C16.2219 9.54378 16.6314 9.11962 16.8725 8.59903C17.1136 8.07844 17.1722 7.49179 17.0388 6.9338C16.9055 6.37581 16.588 5.87903 16.1376 5.52368C15.6872 5.16833 15.1302 4.97513 14.5565 4.97529Z"
            fill="#1B9876"
          />
        </svg>
      ),
    },
    {
      name: 'Monthly visit',
      number: trafiicData?.monthlyVisitors,
      unit: 'M',
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 11C13.5933 11 14.1734 10.8241 14.6667 10.4944C15.1601 10.1648 15.5446 9.69623 15.7716 9.14805C15.9987 8.59987 16.0581 7.99667 15.9424 7.41473C15.8266 6.83279 15.5409 6.29824 15.1213 5.87868C14.7018 5.45912 14.1672 5.1734 13.5853 5.05765C13.0033 4.94189 12.4001 5.0013 11.8519 5.22836C11.3038 5.45543 10.8352 5.83994 10.5056 6.33329C10.1759 6.82664 10 7.40666 10 8C10 8.79565 10.3161 9.55871 10.8787 10.1213C11.4413 10.6839 12.2044 11 13 11ZM13 7C13.1978 7 13.3911 7.05865 13.5556 7.16853C13.72 7.27841 13.8482 7.43459 13.9239 7.61732C13.9996 7.80004 14.0194 8.00111 13.9808 8.19509C13.9422 8.38907 13.847 8.56726 13.7071 8.70711C13.5673 8.84696 13.3891 8.9422 13.1951 8.98079C13.0011 9.01937 12.8 8.99957 12.6173 8.92388C12.4346 8.84819 12.2784 8.72002 12.1685 8.55557C12.0586 8.39112 12 8.19778 12 8C12 7.73478 12.1054 7.48043 12.2929 7.29289C12.4804 7.10536 12.7348 7 13 7ZM17.11 10.86C17.6951 10.021 18.0087 9.02282 18.0087 8C18.0087 6.97718 17.6951 5.97897 17.11 5.14C17.3976 5.04741 17.6979 5.00018 18 5C18.7956 5 19.5587 5.31607 20.1213 5.87868C20.6839 6.44129 21 7.20435 21 8C21 8.79565 20.6839 9.55871 20.1213 10.1213C19.5587 10.6839 18.7956 11 18 11C17.6979 10.9998 17.3976 10.9526 17.11 10.86ZM13 13C7 13 7 17 7 17V19H19V17C19 17 19 13 13 13ZM9 17C9 16.71 9.32 15 13 15C16.5 15 16.94 16.56 17 17M24 17V19H21V17C20.9766 16.2566 20.8054 15.5254 20.4964 14.8489C20.1873 14.1724 19.7466 13.5643 19.2 13.06C24 13.55 24 17 24 17ZM8 12H5V15H3V12H0V10H3V7H5V10H8V12Z"
            fill="#1B9876"
          />
        </svg>
      ),
    },
    {
      name: 'Pages per visit ',
      number: trafiicData?.pagesPerVisit,
      unit: 'k',
      icon: (
        <svg
          width="19"
          height="20"
          viewBox="0 0 19 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.826172 16.4168H3.57617M3.57617 16.4168H6.32617M3.57617 16.4168V13.6668M3.57617 16.4168V19.1668M5.41684 0.833496H14.1252L18.2502 4.9585V16.4168"
            stroke="#1B9876"
            strokeWidth="1.375"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.08333 19.1668H14.125C14.4897 19.1668 14.8394 19.022 15.0973 18.7641C15.3551 18.5062 15.5 18.1565 15.5 17.7918V7.02008C15.5001 6.94772 15.4858 6.87607 15.4582 6.80921C15.4305 6.74236 15.3899 6.68163 15.3387 6.6305L12.453 3.74483C12.4018 3.69353 12.3409 3.65286 12.2739 3.62517C12.2068 3.59748 12.135 3.58332 12.0625 3.5835H3.125C2.76033 3.5835 2.41059 3.72836 2.15273 3.98623C1.89487 4.24409 1.75 4.59383 1.75 4.9585V10.9168"
            stroke="#1B9876"
            strokeWidth="1.375"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.833 3.5835V6.70016C11.833 6.84603 11.891 6.98593 11.9941 7.08907C12.0972 7.19222 12.2371 7.25016 12.383 7.25016H15.4997"
            stroke="#1B9876"
            strokeWidth="1.375"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      name: 'Visit Duration',
      number: trafiicData?.visitDuration,
      unit: 'k',
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0ZM10 1.395C7.71781 1.395 5.5291 2.3016 3.91535 3.91535C2.3016 5.5291 1.395 7.71781 1.395 10C1.395 12.2822 2.3016 14.4709 3.91535 16.0847C5.5291 17.6984 7.71781 18.605 10 18.605C12.2822 18.605 14.4709 17.6984 16.0847 16.0847C17.6984 14.4709 18.605 12.2822 18.605 10C18.605 7.71781 17.6984 5.5291 16.0847 3.91535C14.4709 2.3016 12.2822 1.395 10 1.395ZM9.07 5.581C9.455 5.581 9.767 5.894 9.767 6.279V11.163H14.651C14.8314 11.1698 15.0022 11.2463 15.1274 11.3764C15.2526 11.5064 15.3226 11.68 15.3226 11.8605C15.3226 12.041 15.2526 12.2146 15.1274 12.3446C15.0022 12.4747 14.8314 12.5512 14.651 12.558H9.07C8.88488 12.558 8.70734 12.4845 8.57644 12.3536C8.44554 12.2227 8.372 12.0451 8.372 11.86V6.28C8.372 5.894 8.684 5.581 9.07 5.581Z"
            fill="#1B9876"
          />
        </svg>
      ),
    },
  ];

  function formatCompactNumber(number) {
    if (number < 0) {
      return '-' + formatCompactNumber(-1 * number);
    }
    if (number < 1000) {
      return number;
    } else if (number >= 1000 && number < 1_000_000) {
      return (number / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    } else if (number >= 1_000_000 && number < 1_000_000_000) {
      return (number / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (number >= 1_000_000_000 && number < 1_000_000_000_000) {
      return (number / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
    } else if (number >= 1_000_000_000_000 && number < 1_000_000_000_000_000) {
      return (number / 1_000_000_000_000).toFixed(1).replace(/\.0$/, '') + 'T';
    }
  }

  const getCountryCode = (countryName) => {
    const foundCountry = countryCode.find(
      (country) => country.name.toLowerCase() === countryName.toLowerCase(),
    );

    return foundCountry ? foundCountry.code.toLowerCase() : null;
  };

  return (
    <div className={styles.container}>
      {/**Starting section */}
      <div className={styles.cardContainer}>
        {data.map((dat, i) => (
          <div className={styles.card} key={i}>
            <div className={styles.cardTop}>
              {dat.icon} {dat.name}
            </div>
            <div className={styles.cardNumber}>
              {dat.number ? formatCompactNumber(dat.number) : 'n/a'}
            </div>
          </div>
        ))}
      </div>
      {/**mid section */}
      {/* <div className={styles.chartSection}>
        <div className={styles.chartHeader}>
          <p className={styles.heading}>Engagement Graph</p>

          <div className={styles.details}>
            <p>Average engagement time</p>
            <span>0m 08s</span>
          </div>

          <div className={styles.details}>
            <p>Engagement sessions per user</p>
            <span>0.24</span>
          </div>

          <div className={styles.details}>
            <p>Average engagement time per session</p>
            <span>0m 07s</span>
          </div>
        </div>
        <div>{<TrafficChart />}</div>
      </div> */}
      {/**table section */}
      <div className={styles.tableContainer}>
        <table className="rounded-corners">
          <thead>
            <tr className={styles.tableHeading}>
              <th>Country</th>
              <th>Users %</th>
            </tr>
          </thead>
          <tbody>
            {trafiicData?.visitByCountryStats.map((item, index) => (
              <tr key={'country-traffic-' + index} className={styles.tableBody}>
                <td>
                  <div className="d-flex gap-2">
                    <span
                      className={`fi fi-${getCountryCode(item.countryName)}`}
                    ></span>
                    <span className={styles.countryName}>
                      {item?.countryName}
                    </span>
                  </div>
                </td>
                <td>{item.userPercentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrafficAnalysis;
