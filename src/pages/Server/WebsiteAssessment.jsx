import React from 'react';
import styles from './WebsiteAssessment.module.css';
import Select from 'react-select';
import { Button, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getIndustryCategory,
  getWebsiteIndustry,
  getWebsiteIpInfo,
  getWebsiteMarketCap,
} from '@/services/WebServices/Core';
import {postGenerateReport, postGenerateReportByAgent} from '@/services/WebServices/Report';
import secureLocalStorage from 'react-secure-storage';
import { toast } from 'react-toastify';
import { countryCode } from "@/constant/country-code/index";

export const WebsiteAssessment = ({
  setActive,
  generateReportData,
  setGenerateReportData,
  active,
}) => {
  const isAgency = secureLocalStorage.getItem('isAgency') === 'true';
  const navigate = useNavigate();
  const generateReport = useMutation(isAgency ? postGenerateReportByAgent : postGenerateReport);

  const getCountryFromCode = (code) => {
    const foundCountry = countryCode.find(
      (country) => country.code?.toLowerCase() === code?.toLowerCase(),
    );

    return foundCountry ? foundCountry?.name.toLowerCase() : null;
  };

  const countryNameList = countryCode.map(data => data.name);

  const saveAssessment = () => {
    // console.log(generateReportData);
    const payload = {
      url: generateReportData.url,
      user: generateReportData.user,
      company: generateReportData.company,
      marketCap: generateReportData.marketCap,
      industry: generateReportData.industry,
      category: generateReportData.category
      // ...generateReportData,
      /**
       * uncomment later for server type
       */
      // serverType: active == 2 ? 'third_party' : 'in_house',
    };
    generateReport.mutate(payload, {
      onSuccess: (response) => {
        console.log('response', response);
        if (response.APIFailed) {
          const errorData = response.error.data;
          if (errorData.statusCode == 400) {
            // toast.error(errorData.message);
          } else {
            // toast.error('Failed to generate report!');
          }
        } else {
          // toast.success('Successfully generated report!');
          localStorage.setItem('websiteId', response.data.websiteId);
          secureLocalStorage.setItem('websiteId', response.data.websiteId);
          secureLocalStorage.setItem('websiteUrl', generateReportData.url);
          navigate('/carbontest');
        }
      },
    });
  };

  const { data: categoryOptions } = useQuery(
    ['getIndustryCategory'],
    getIndustryCategory,
  );

  const ipUrl = generateReportData?.url.replace('www.', '');
  const { data: ipInfo } = useQuery(['getWebsiteIpInfo', ipUrl], () =>
    getWebsiteIpInfo(ipUrl),
  );

  const { data: marketCapOptions } = useQuery(
    ['getWebsiteMarketCap'],
    getWebsiteMarketCap,
  );

  // const { data: bandwidthOptions } = useQuery(["getWebsiteBandwidth"], getWebsiteBandwidth);

  const { data: websiteOptions } = useQuery(
    ['getWebsiteIndustry'],
    getWebsiteIndustry,
  );

  // console.log(ipInfo);

  const handleChange = (e, key) => {
    setGenerateReportData((item) => ({ ...item, [key]: e.value }));
  };

  const isDisable = () => {
    const category = generateReportData?.category;
    // const bandwidth = generateReportData?.bandwidth;
    const marketCap = generateReportData?.marketCap;
    const industry = generateReportData?.industry;

    if (!category || !marketCap || !industry) {
      return true; //
    }

    return false;
  };

  const handleBackClick = () => {
    setGenerateReportData((item) => ({
      ...item,
      serverType: '',
      server: '',
    }));
    setActive(1);
  };

  const categoryValue = categoryOptions?.find(
    (option) => option.id === generateReportData.category,
  );
  // const bandWidthValue = bandwidthOptions?.find((option) => option.id === generateReportData.bandwidth);
  const industryValue = websiteOptions?.find(
    (option) => option.id === generateReportData.industry,
  );
  const marketCapValue = marketCapOptions?.find(
    (option) => option.id === generateReportData.marketCap,
  );

  return (
    <div className={styles.container}>
      <div className={styles.title}>Sustainable Website Assessment</div>

      <div className={styles.secondDivision}>
        <div className={styles.card}>
          <div> Your website is hosted at:</div>
          <div style={{ textTransform: 'capitalize' }}>
            City: {ipInfo?.city} Country: { countryNameList?.includes(ipInfo?.country) ? ipInfo?.country : getCountryFromCode(ipInfo?.country) } Coordinates:{' '}
            {ipInfo?.ipAddress || ''}
          </div>
        </div>

        <div>
          Tell us more about your website so we can help you make it more
          sustainable
        </div>
      </div>

      {/*<div className={styles.emailWrapper}>*/}
      {/*  <div>Bandwidth *</div>*/}
      {/*  <Select*/}
      {/*    placeholder="Bandwidth your website uses per month"*/}
      {/*    key={bandWidthValue?.id}*/}
      {/*    value={bandWidthValue ? { label: bandWidthValue?.name, value: bandWidthValue?.id } : null}*/}
      {/*    menuPlacement="auto"*/}
      {/*    className={styles.input}*/}
      {/*    options={bandwidthOptions?.map((item) => ({*/}
      {/*      label: item.name,*/}
      {/*      value: item.id,*/}
      {/*    }))}*/}
      {/*    onChange={(e) => handleChange(e, "bandwidth")}*/}
      {/*  />*/}
      {/*</div>*/}
      <div className={styles.emailWrapper}>
        <div>What is your Market Cap?</div>
        <Select
          menuPlacement="auto"
          placeholder="Select your Cap"
          value={
            marketCapValue
              ? {
                  label: marketCapValue?.name,
                  value: marketCapValue?.id,
                }
              : null
          }
          className={styles.input}
          options={marketCapOptions?.map((item) => ({
            label: item.name,
            value: item.id,
          }))}
          onChange={(e) => handleChange(e, 'marketCap')}
        />
      </div>
      <div className={styles.emailWrapper}>
        <div>What industry do you work in?</div>
        <Select
          placeholder="Select industry you work in"
          value={
            industryValue
              ? {
                  label: industryValue?.name,
                  value: industryValue?.id,
                }
              : null
          }
          menuPlacement="auto"
          className={styles.input}
          options={websiteOptions?.map((item) => ({
            label: item.name,
            value: item.id,
          }))}
          onChange={(e) => handleChange(e, 'industry')}
        />
      </div>

      <div className={styles.emailWrapper}>
        <div>What subcategory of industry is the business in?</div>
        <Select
          placeholder="Select the industry category you are in"
          menuPlacement="auto"
          value={
            categoryValue
              ? {
                  label: categoryValue?.name,
                  value: categoryValue?.id,
                }
              : null
          }
          className={styles.input}
          options={categoryOptions?.map((item) => ({
            label: item.name,
            value: item.id,
          }))}
          onChange={(e) => handleChange(e, 'category')}
        />
      </div>
      <div className={styles.buttonWrapper}>
        <Button
          className={styles.button}
          style={{ background: 'white' }}
          onClick={() => handleBackClick()}
        >
          Back
        </Button>
        <Button
          className={styles.button}
          loading={generateReport.isLoading}
          disabled={isDisable()}
          type="primary"
          onClick={() => saveAssessment()}
          style={{
            background: isDisable() ? 'grey' : '#1B9876',
            color: isDisable() ? 'white' : null,
          }}
        >
          Generate Report
        </Button>
      </div>
    </div>
  );
};
