import styles from './Technologies.module.scss';

import { getTechnologyReport } from '@/services/WebServices/Report';
import { useQuery } from '@tanstack/react-query';

const Technologies = () => {
  const websiteId = localStorage.getItem('websiteId');
  const { data, isLoading } = useQuery(
    ['getTechnologyReport', websiteId],
    () => getTechnologyReport(websiteId),
    {
      enabled: !!websiteId,
    },
  );

  return (
    <div className={styles.container}>
      {data &&
        data?.stack.map((item, itemIndex) => (
          <div key={`item-card-${itemIndex}`}>
            <div className={styles.heading}>{item.category}</div>
            <div className={styles.cardContainer}>
              {item.technology.map((techData, techIndex) => (
                <div
                  key={`framework-card-${techIndex}`}
                  className={styles.frameworkCard}
                >
                  <div className={styles.frameworkCardContent}>
                    <img src={techData.image} alt="technology-image" />
                    <label>{techData.name}</label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Technologies;
