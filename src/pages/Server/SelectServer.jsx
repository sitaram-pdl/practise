import React, { useState } from 'react';
import styles from './SelectServer.module.scss';
import cx from 'classnames';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import {
  getWebsiteServices,
  getWebsiteServers,
} from '@/services/WebServices/Core';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import secureLocalStorage from 'react-secure-storage';
import webServicesDemo from '@/assets/webServices';

export const SelectServer = ({
  setActive,
  generateReportData,
  setGenerateReportData,
}) => {
  const { data: webServicesOptions } = useQuery(
    ['getWebsiteServices'],
    getWebsiteServices,
  );
  const { data: webServerOptions } = useQuery(
    ['getWebsiteServers'],
    getWebsiteServers,
  );
  // console.log("secureLocalStorage.getItem isAgency", secureLocalStorage.getItem('isAgency'));
  const isAgency = secureLocalStorage.getItem('isAgency') === 'true';

  const navigate = useNavigate();

  const [isSubmitted, setSubmitted] = useState(false);
  const [value, setValue] = useState(1);

  /**
   * uncomment later for server type
   */
  /*
  const onServerTypeChange = (e) => {
    setValue(e.target.value);
    setGenerateReportData((item) => ({
      ...item,
      serverType: e.target.value,
      server: null,
      inHouseServer: null,
    }));
  };
  */

  const onContinue = () => {
    setSubmitted(true);
    const isInValid = validate();
    if (isInValid) {
      return;
    }
    setActive(2);
  };

  /**
   * uncomment later for server type
   */
  /*
  const serverValue = webServerOptions?.find(
    (option) => option.id === generateReportData.server,
  );
  */

  const handleSelectServer = (id) => {
    const webServices = [...generateReportData.webServices];
    if (!webServices.includes(id)) {
      setGenerateReportData((item) => ({
        ...item,
        webServices: [...webServices, id],
      }));
      return;
    }
    const newArray = webServices.filter((item) => item !== id);
    setGenerateReportData((item) => ({
      ...item,
      webServices: newArray,
    }));
  };

  const validate = () => {
    const company = generateReportData.company;
    const url = generateReportData.url;
    const webServices = generateReportData.webServices;

    /**
     * uncomment later for server type
     */
    /*
    const server = generateReportData.server;
    const serverType = generateReportData.serverType;
    const inHouseServer = generateReportData.inHouseServer;
    */

    if (!company) {
      toast.error('Please enter company name.');
      return true; // Return true if URL is not valid
    }
    if (!url.includes('https://')) {
      toast.error('Please enter valid url.');
      return true; // Return true if URL is not valid
    }

    /**
     * uncomment later for server type
     */
    /*
    if (!serverType) {
      toast.error('Please select server type.');
      return true; // Return true if webServices are not selected
    }

    if (serverType == 'in_house') {
      if (!inHouseServer) {
        toast.error('Please enter in house server.');
        return true; // Return true if webServices are not selected
      }
    } else {
      if (!server) {
        toast.error('Please select server.');
        return true; // Return true if webServices are not selected
      }
    }
    */
    if (!webServices) {
      toast.error('Please select web services.');
      return true; // Return true if webServices are not selected
    }

    // return false; // All validations passed, form can be submitted
  };

  const onBack = () => {
    if (isAgency) {
      console.log('navigate to agency');
      navigate('/agency');
    } else {
      console.log('navigate to login');
      secureLocalStorage.clear();
      localStorage.clear();
      navigate('/login');
    }
  };

  /**
   * uncomment later for server type
   */
  /*
  const handleThirdPartyServerChange = (e) => {
    setGenerateReportData((item) => ({
      ...item,
      server: e.target.value,
      // set in house server null if setActive is third party
      inHouseServer: null,
    }));
  };
  */

  // console.log(isDisable());

  return (
    <div className={styles.container}>
      <div className={styles.title}>Tell us about your Website</div>
      <div className={styles.emailWrapper}>
        <div>Company</div>
        <div className="mt-1 inputContainer w-50">
          <input
            value={generateReportData?.company}
            onChange={(e) =>
              setGenerateReportData((item) => ({
                ...item,
                company: e.target.value,
              }))
            }
            type="text"
            className="custom-input"
            name="company"
            placeholder="Enter Company Name"
          />
        </div>
      </div>
      <div className={styles.emailWrapper}>
        <div>Enter URL of your website</div>
        <div className="inputContainer w-50 mt-1">
          <input
            value={generateReportData?.url}
            onChange={(e) =>
              setGenerateReportData((item) => ({
                ...item,
                url: e.target.value,
              }))
            }
            type="text"
            className="custom-input"
            name="url"
            placeholder="https://www"
          />
        </div>
      </div>

      {/**
       * uncomment later for server type
      */}

      {/*<div id="input" className={styles.emailWrapper}>
        <div>Select the server you are using</div>

        <div className="d-flex flex-column gap-3">
          <div className={styles.radioGroup}>
            <input
              type="radio"
              id="server-2"
              name="server"
              value="in_house"
              onChange={onServerTypeChange}
            />
            <label htmlFor="server-2">In-House Server</label>
          </div>
          <div className={styles.radioGroup}>
            <input
              type="radio"
              id="server-1"
              name="server"
              onChange={onServerTypeChange}
              value="third_party"
            />
            <label htmlFor="server-1">ThirdParty Server</label>
          </div>
        </div>

        <div className="inputContainer w-50 mt-2" style={{ height: '3rem' }}>
          {value === 'in_house' ? (
            <input
              value={generateReportData?.server}
              onChange={(e) =>
                setGenerateReportData((item) => ({
                  ...item,
                  inHouseServer: e.target.value,
                }))
              }
              className={'custom-input'}
              placeholder="Write your Server Name"
            />
          ) : (
            <select
              className="custom-select"
              placeholder="Select server"
              defaultValue={
                generateReportData.server ? generateReportData.server : null
              }
              onChange={(e) => handleThirdPartyServerChange(e)}
            >
              <option value="">Select Server</option>
              {(webServerOptions || []).map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          )}
        </div>
      </div>*/}

      <div className={[styles.emailWrapper, "mb-4"].join(' ')}>
        <div>Select the server you are using</div>
        <div className={styles.cardContainer}>
          {/* // demo web services, replace with response data  */}
          {(webServicesDemo || []).map((item, i) => (
            <div
              onClick={() => handleSelectServer(item?._id)}
              key={i}
              className={cx(
                styles.card,
                generateReportData.webServices.includes(item._id)
                  ? styles.cardSelected
                  : null,
              )}
            >
              <img src={item?.image} alt="service" className={styles.image} />
              <div className={styles.cardText}>{item?.name}</div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <Button
          style={{
            background: 'white',
            border: 'none',
            color: '#828282',
          }}
          onClick={onBack}
        >
          Back
        </Button>
        <Button
          type="primary"
          onClick={onContinue}
          style={{
            background: '#1B9876',
            color: 'white',
            padding: '0.5rem 1rem',
          }}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
