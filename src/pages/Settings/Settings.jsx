import { useState, useRef } from 'react';

import { useQuery } from '@tanstack/react-query';
import cx from 'classnames';
import Select from 'react-select';

import { reportDownload } from '@/constant';
import { regenerateReport } from '@/services/GreenScore/greenscore.api';
import { getUserData } from '@/services/Users/users.api';
import {
  getIndustryCategory,
  getWebsiteIndustry,
  getWebsiteMarketCap,
} from '@/services/WebServices/Core';
import { useEffect } from 'react';
import secureLocalStorage from 'react-secure-storage';
import { toast } from 'react-toastify';
import styles from './Settings.module.scss';
import './Settings.scss';
import { AiOutlineCopy } from 'react-icons/ai';

function Settings() {
  const [currentIndex, setCurrentIndex] = useState('small');
  const [currentImage, setCurrentImage] = useState(null);
  const websiteId = secureLocalStorage.getItem('websiteId');
  const [badgeRegenerating, setBadgeRegenerating] = useState(false);
  const [userData, setUserData] = useState({});
  const preRef = useRef(null);

  const copyToClipboard = () => {
    const preElement = preRef.current;
    const textToCopy = preElement.textContent;

    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = textToCopy;
    document.body.appendChild(tempTextArea);

    tempTextArea.select();
    document.execCommand('copy');

    document.body.removeChild(tempTextArea);

    toast.success('Copied to clipboard!');
  };

  const handleChange = (selectedOption, field) => {
    setUserData({
      ...userData,
      [field]: selectedOption,
    });
  };

  const { data } = useQuery(['getUserData'], getUserData, {
    onSuccess: setUserData,
  });

  const { data: marketCapOptions } = useQuery(
    ['getWebsiteMarketCap'],
    getWebsiteMarketCap,
  );
  const { data: categoryOptions } = useQuery(
    ['getIndustryCategory'],
    getIndustryCategory,
  );

  const { data: websiteOptions } = useQuery(
    ['getWebsiteIndustry'],
    getWebsiteIndustry,
  );

  const regenerateBadge = async () => {
    setBadgeRegenerating(true);
    const response = await toast.promise(regenerateReport(websiteId), {
      pending: 'Badge Regeneration in Progress',
      success: 'Badge Regeneration Completed 👌',
      error: 'Badge Regeneration Error. Please Try Later 🤯',
    });
    setBadgeRegenerating(false);
  };

  useEffect(() => {
    const image = reportDownload?.find((image) => image.id === currentIndex);
    setCurrentImage(image);
  }, [currentIndex]);

  return (
    <div>
      <div className={styles.accountContainer}>
        <h2>Account Details</h2>
        <div className={styles.formContainer}>
          <div className="d-flex flex-column  gap-2">
            <label className={styles.textColor}>
              Your fullname&nbsp;
              <sup className={styles.sup}>*</sup>
            </label>
            <div className={cx('inputContainer mt-1', styles.inputContainer)}>
              <input
                type="text"
                className="custom-input"
                name="fullname"
                placeholder="Enter fullname"
                value={userData?.fullName}
                onChange={(e) => handleChange(e.target.value, 'fullName')}
                disabled
              />
            </div>
          </div>

          <div className="d-flex flex-column  gap-2">
            <label className={styles.textColor}>Email address</label>
            <div className={cx('mt-1 inputContainer', styles.inputContainer)}>
              <input
                type="email"
                className={cx('custom-input', styles.input)}
                name="email"
                placeholder="Enter email address"
                value={userData?.email}
                disabled
              />
            </div>
          </div>

          <div className="d-flex flex-column  gap-2">
            <label className={styles.textColor}>Website Url</label>
            <div className={cx('mt-1 inputContainer', styles.inputContainer)}>
              <input
                type="text"
                className="custom-input"
                name="fullname"
                placeholder="Enter Website Url"
                value={userData?.website?.url}
                disabled
              />
            </div>
          </div>

          <div className="d-flex flex-column  gap-2">
            <label className={styles.textColor}>Market Cap:</label>
            <div className="mt-1">
              <Select
                menuPlacement="auto"
                placeholder="Select your Cap"
                classNamePrefix="selectWrapper"
                options={marketCapOptions?.map((item) => ({
                  label: item?.name,
                  value: item?.id,
                }))}
                value={
                  userData?.website?.marketCap
                    ? {
                        value: userData?.website?.marketCap,
                        label: marketCapOptions?.find(
                          (option) =>
                            option.id === userData?.website?.marketCap,
                        )?.name,
                      }
                    : null
                }
                onChange={(selectedOption) =>
                  handleChange(selectedOption, 'website.marketCap')
                }
                isDisabled
              />
            </div>
          </div>

          <div className="d-flex flex-column  gap-2">
            <label className={styles.textColor}>
              Category of business industry:
            </label>
            <div className="mt-1">
              <Select
                menuPlacement="auto"
                placeholder="Select industry you work in"
                classNamePrefix="selectWrapper"
                options={websiteOptions?.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
                value={
                  userData?.website?.industry
                    ? {
                        value: userData?.website?.industry,
                        label: websiteOptions?.find(
                          (option) => option.id === userData?.website?.industry,
                        )?.name,
                      }
                    : null
                }
                onChange={(selectedOption) =>
                  handleChange(selectedOption, 'website.industry')
                }
                isDisabled
              />
            </div>
          </div>

          <div className="d-flex flex-column  gap-2">
            <label className={styles.textColor}>
              Subcategory of business industry:
            </label>
            <div className="mt-1">
              <Select
                menuPlacement="auto"
                placeholder="Select the industry category you are in"
                classNamePrefix="selectWrapper"
                options={categoryOptions?.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
                value={
                  userData?.website?.category
                    ? {
                        value: userData?.website?.category,
                        label: categoryOptions.find(
                          (option) => option.id === userData?.website?.category,
                        )?.name,
                      }
                    : null
                }
                onChange={(selectedOption) =>
                  handleChange(selectedOption, 'website.category')
                }
                isDisabled
              />
            </div>
          </div>
        </div>

        <button className={cx('mt-4', styles.formButtons)}>
          Change Password
        </button>
      </div>

      <div className={styles.badgeContainer}>
        <h2>Badge</h2>
        <div className={styles.reportDownload}>
          <div>
            {!badgeRegenerating && currentImage && (
              <a
                href={`${
                  import.meta.env.VITE_APP_ROOT_URL
                }green-score/${websiteId}`}
                target="_blank"
              >
                <img
                  src={`${
                    import.meta.env.VITE_API_BASE_URL
                  }website-badge/${websiteId}/badge.png?badgeSize=${
                    currentImage.id
                  }`}
                />
              </a>
            )}
          </div>

          <div className={styles.description}>
            {currentImage &&
              reportDownload.map((report) => {
                return (
                  <div
                    onClick={() => setCurrentIndex(report.id)}
                    key={report.id}
                    className={cx(
                      styles.imageDetail,
                      report.id === currentImage.id ? styles.selected : '',
                    )}
                  >
                    <p className={styles.label}>{report.label}</p>
                    <p className={styles.size}>{report.size}</p>
                  </div>
                );
              })}
          </div>

          {currentImage && (
            <>
              <div className={styles['snippets']} onClick={copyToClipboard}>
                <pre ref={preRef} style={{ cursor: 'pointer' }}>
                  {`<a href="${
                    import.meta.env.VITE_APP_ROOT_URL
                  }green-score/${websiteId}" target="_blank"><img src="${
                    import.meta.env.VITE_API_BASE_URL
                  }website-badge/${websiteId}/badge.png?badgeSize=${
                    currentImage.id
                  }" width="${currentImage.width}px" /></a>
      `}
                </pre>
              </div>
              <button
                className={cx('mt-2', styles.formButtonssmall)}
                onClick={copyToClipboard}
              >
                <AiOutlineCopy /> Copy to Clipboard
              </button>
            </>
          )}
        </div>

        <button
          className={cx('mt-4', styles.formButtons)}
          onClick={regenerateBadge}
        >
          Regenerate Badge
        </button>
      </div>
    </div>
  );
}

export default Settings;
