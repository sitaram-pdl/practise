import { useState, useRef } from 'react';

import cx from 'classnames';
import { LoadingOutlined } from '@ant-design/icons';

import { reportDownload } from '@/constant';
import { regenerateReport } from '@/services/GreenScore/greenscore.api';

import { useEffect } from 'react';
import { toast } from 'react-toastify';
import styles from './BadgeComponent.module.scss';
import './BadgeComponent.scss';
import { AiOutlineCopy } from 'react-icons/ai';
import { Button, Spin } from 'antd';
import SpinningAnimation from '../SpinningAnimation/spinning';

function BadgeComponent({ show, setShow }) {
  const [currentIndex, setCurrentIndex] = useState('small');
  const [currentImage, setCurrentImage] = useState(null);
  const websiteId = show?.item?.id;
  const [badgeRegenerating, setBadgeRegenerating] = useState(false);

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
      <div className={styles.badgeContainer}>
        <h2>Badge</h2>
        <div className={styles.reportDownload}>
          <div className={badgeRegenerating && styles.loading}>
            {!badgeRegenerating && currentImage && (
              <a
                href={`${
                  import.meta.env.VITE_APP_ROOT_URL
                }green-score/${websiteId}`}
                target="_blank"
              >
                <img
                  className={styles.badge}
                  src={`${
                    import.meta.env.VITE_API_BASE_URL
                  }website-badge/${websiteId}/badge.png?badgeSize=${
                    currentImage.id
                  }`}
                />
              </a>
            )}
            {badgeRegenerating && <SpinningAnimation icon={<>Loading ...</>} />}
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
        <div className={styles.buttomWrap}>
          <button
            type="primary"
            className={cx(styles.formButtonssmall, styles.bsmall)}
            onClick={regenerateBadge}
          >
            {badgeRegenerating && (
              <Spin
                indicator={
                  <LoadingOutlined
                    style={{
                      fontSize: 24,
                    }}
                    spin
                  />
                }
              />
            )}{' '}
            Regenerate Badge
          </button>
          <Button
            type="primary"
            className={styles.button}
            onClick={() =>
              setShow({
                open: false,
                item: null,
              })
            }
          >
            Dismiss
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BadgeComponent;
