import React from 'react';
import { useQuery } from '@tanstack/react-query';
import secureLocalStorage from 'react-secure-storage';
import { TbWorld, TbWorldCheck } from 'react-icons/tb';
import { MdLeaderboard } from 'react-icons/md';
import styles from './CarbonReport.module.scss';
import { getCarbonReport } from '@/services/WebServices/Report';
import FlashSVG from '@/assets/svg/report/FlashSVG';
import TreeSVG from '@/assets/svg/report/TreeSVG';
import WeightSVG from '@/assets/svg/report/WeightSVG';
import { reportArrayOne, reportArrayTwo } from '@/constant';

function CarbonReport() {
  const websiteId = secureLocalStorage.getItem('websiteId');
  // const websiteId = localStorage.getItem("websiteId");

  const { data, isLoading } = useQuery(
    ['getCarbonReport', websiteId],
    () => getCarbonReport(websiteId),
    {
      enabled: !!websiteId,
    },
  );

  const reportArray = reportArrayOne(data);
  const reportArray2 = reportArrayTwo(data);

  // If report array one and two are needed, import from constant folder

  return (
    <div className={styles.container}>
      {/**section top */}
      <div className={styles.greenCardContainer}>
        <div className={styles.infoCard}>
          <div className={styles.textContain}>
            <div className={styles.infoCardTitle}>Your Green Score</div>
            <div className={styles.infoCardDescription}>
              Greener than {data?.greenScoreRate}% of websites on our database
            </div>
            <div className={styles.greenScore}>{data?.greenScore}/100</div>
          </div>
        </div>
      </div>
      <div className={styles.infoCardContainer}>
        <div className={styles.infoCard}>
          <div className={styles.infoCardIcon}>
            <FlashSVG />
          </div>
          <div className={styles.textContain}>
            <div className={styles.infoCardTitle}>
              {data?.energyConsumption} kWh of Energy
            </div>
            <div className={styles.infoCardDescription}>
              That’s enough electricity to drive an electric car{' '}
              {data?.energyEquivalentDistance} km
            </div>
          </div>
        </div>
        <div className={styles.infoCard}>
          <div className={styles.infoCardIcon}>
            <TreeSVG />
          </div>
          <div className={styles.textContain}>
            <div className={styles.infoCardTitle}>Enough C02 to keep</div>
            <div className={styles.infoCardDescription}>
              {data?.treeEquivalent?.numberOfTrees} Trees busy for{' '}
              {data?.treeEquivalent?.duration}{' '}
              {data?.treeEquivalent?.durationUnit}
            </div>
          </div>
        </div>
        <div className={styles.infoCard}>
          <div className={styles.infoCardIcon}>
            <WeightSVG />
          </div>
          <div className={styles.textContain}>
            <div className={styles.infoCardTitle}>
              {data?.emissionPerThousand} Kilograms
            </div>
            <div className={styles.infoCardDescription}>
              of C02 per 1000 visiters
            </div>
          </div>
        </div>
        {/* {reportArray.map((item, index) => (
          <div className={styles.infoCard} key={index}>
            <div className={styles.infoCardIcon}>{item.icon}</div>
            <div className={styles.textContain}>
              <div className={styles.infoCardTitle}>{item.title} </div>
              <div className={styles.infoCardDescription}>
                {item.description}
              </div>
            </div>
          </div>
        ))} */}
      </div>
      {/**section mid */}
      <div className={styles.midSectionContainer}>
        <div className={styles.midSection}>
          <div className={styles.midTextOne}>Eco Link Score</div>
          <div className={styles.midTextTwo}>{data?.ecoLinkScore} ELS</div>
          <div className={styles.midTextOne}>
            this is a below average Eco Link Score.
          </div>
        </div>
        <div className={styles.midSection}>
          <div className={styles.midTextOne}>Total positive impact so far</div>
          <div className={styles.midTextTwo}>
            {data?.monthlyEmission} kg of CO2
          </div>
          <div className={styles.midTextOne}>
            that is same as manufacturing 10,000 bottles
          </div>
        </div>
      </div>

      {/**section rank */}
      <div className={styles.rankSection}>
        <div className={styles.rankTitle}>Ranks</div>
        <div className={styles.rankCardContainer}>
          <div className={styles.rankCard}>
            <div className={styles.infoCardIconUnfilled}>
              <TbWorld size={24} color="#1b9876" />
            </div>
            <div className={styles.textContain}>
              <div className={styles.rankCardTitle}>Domain Rank</div>
              <div className={styles.number}>{data?.domainRank}</div>
            </div>
          </div>
          <div className={styles.rankCard}>
            <div className={styles.infoCardIconUnfilled}>
              <TbWorldCheck size={24} color="#1b9876" />
            </div>
            <div className={styles.textContain}>
              <div className={styles.rankCardTitle}>Sub Domain Rank</div>
              <div className={styles.number}>{data?.subDomainRank}</div>
            </div>
          </div>
          <div className={styles.rankCard}>
            <div className={styles.infoCardIconUnfilled}>
              <MdLeaderboard size={28} color="#1b9876" />
            </div>
            <div className={styles.textContain}>
              <div className={styles.rankCardTitle}>
                Market Capitalization Rank
              </div>
              <div className={styles.number}>{data?.marketCapRank}</div>
            </div>
          </div>

          {/* {reportArray2.map((item, index) => (
            <div className={styles.rankCard} key={index}>
              <div className={styles.infoCardIconUnfilled}>{item.icon}</div>
              <div className={styles.textContain}>
                <div className={styles.rankCardTitle}>{item.title} </div>
                <div className={styles.number}>{item.number}</div>
              </div>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
}

export default CarbonReport;
