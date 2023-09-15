import { useState, useEffect } from 'react';
import cx from 'classnames';

import Modal from '../Modal';
import styles from './Modal.module.scss';
import { reportDownload } from '@/constant';

function ReportDownloadModal({ show, setShow }) {
  const [currentIndex, setCurrentIndex] = useState('small');
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    const image = reportDownload.find((image) => image.id === currentIndex);
    setCurrentImage(image);
  }, [currentIndex]);

  return (
    <Modal
      show={show}
      setShow={setShow}
      showHeader={false}
      style={{ maxWidth: '48rem', width: '95%' }}
    >
      <div className={styles.reportDownload}>
        <h1>Here is your badge</h1>
        <div className={styles.imageContainer}>
          {currentImage && <img src={currentImage.img} alt={currentImage.id} />}
        </div>
        <p className={styles.sublabel}>
          To add badge to your website, copy the given snippets for different
          sizes as per your need.
        </p>

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
          <div className={styles['snippets']}>
            <pre>
              {`
<a href="${import.meta.env.VITE_API_BASE_URL}" target="_blank"><img src="${
                currentImage.img
              }" width="${currentImage.width}px" /></a>
                `}
            </pre>
          </div>
        )}

        <div className={styles.dismiss} onClick={() => setShow(false)}>
          Dismiss
        </div>
      </div>
    </Modal>
  );
}

export default ReportDownloadModal;
