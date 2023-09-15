import React, { useEffect } from 'react';
import { useState } from 'react';
import { SelectServer } from './SelectServer';
import styles from './Server.module.css';
import { RightServerComponent } from './RightServerComponent';
import { WebsiteAssessment } from './WebsiteAssessment';
import { WebsiteTraffic } from './WebsiteTraffic';
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import { getUserDetail } from '@/utils/storage.utils';

const Server = () => {
  const websiteId = secureLocalStorage.getItem('websiteId');
  const userDetail = JSON.parse(getUserDetail());
  const [active, setActive] = useState(1);
  const navigate = useNavigate();
  const isAgency = secureLocalStorage.getItem('isAgency') === 'true';
  const [generateReportData, setGenerateReportData] = useState({
    url: '',
    webServices: [],
    user: isAgency ? secureLocalStorage.getItem('clientId') : userDetail?.id,
    // server: '',
  });

  useEffect(() => {
    if (!!websiteId) {
      navigate('/carbontest');
      location.reload();
    }
  }, []);

  const getActiveTab = () => {
    switch (active) {
      case 2:
        return (
          <WebsiteAssessment
            setGenerateReportData={setGenerateReportData}
            generateReportData={generateReportData}
            setActive={setActive}
            active={active}
          />
        );
      default:
        return (
          <SelectServer
            setGenerateReportData={setGenerateReportData}
            generateReportData={generateReportData}
            setActive={setActive}
          />
        );
    }
  };

  return (
    <div className={styles.container}>
      <img className={styles.logo} src="./images/logo.svg"></img>
      <div className={styles.leftContainer}>{getActiveTab()}</div>
      <div className={styles.rightContainer}>
        <RightServerComponent active={active} />
      </div>
    </div>
  );
};

export default Server;
