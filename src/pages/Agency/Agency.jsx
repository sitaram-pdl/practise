import React, { useEffect } from 'react';
import { useState } from 'react';
import { QueryCache, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getRegeneratedReport,
  getWebsiteReport,
} from '@/services/WebServices/Report';
import { BiDownload } from 'react-icons/bi';
import { AiOutlineFileText } from 'react-icons/ai';
import { BsEyeFill, BsShield } from 'react-icons/bs';
import cx from 'classnames';

import styles from './Agency.module.scss';
import BadgeGenerateModel from '@/components/modal/BadgeGenerateModal';
import ReportGenerateModal from '@/components/modal/ReportGenerateModal';
import ReportDownloadModal from '@/components/modal/ReportDownloadModal';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import { regenerateReport } from '@/services/GreenScore/greenscore.api.js';
import { FiSettings } from 'react-icons/fi';
import { Modal } from 'antd';
import SettingModal from '@/components/modal/SettingModal';

export const Agency = () => {
  const navigate = useNavigate();
  const { data: websiteid } = useQuery(['getWebsiteReport1'], getWebsiteReport);

  const [showReportModal, setShowReportModal] = useState({
    open: false,
    item: {},
  });
  const [showBadgeDownloadModal, setShowBadgeDownloadModal] = useState(false);
  const [showBadgeGenerateModal, setShowBadgeGenerateModal] = useState({
    open: false,
    item: null,
  });
  const [showSettingModal, sethowSettingModal] = useState({
    open: false,
    item: null,
  });

  const queryClient = useQueryClient();
  const query = useQuery(
    ['getRegeneratedReport', showReportModal.item?.id],
    () => getRegeneratedReport(showReportModal.item?.id),
    {
      enabled: showReportModal.open,
      onSuccess: (response) => {
        if (response?.status >= 200 && response?.status < 400) {
          setShowReportModal({ open: false, item: {} });
          // toast.success('Successfully Regenerated Report');
          /*secureLocalStorage.setItem('websiteId', showReportModal.item?.id);
          secureLocalStorage.setItem('websiteUrl', showReportModal.item?.url);
          navigate('/carbontest');*/
          // queryClient.clear();
        } else {
          // toast.error(response?.error?.statusText);
          setShowReportModal({ open: false, item: {} });
        }
      },
    },
  );

  useEffect(() => {
    secureLocalStorage.removeItem('clientId');
  }, []);

  const openClientWebsite = (data) => {
    secureLocalStorage.setItem('websiteId', data.id);
    secureLocalStorage.setItem('websiteUrl', data.url);
    navigate('/carbontest');
  };
  const regenerateBadge = async (item) => {
    setShowBadgeGenerateModal({
      item: item,
      open: true,
    });
  };

  return (
    <div className={styles.tableContainer}>
      {showBadgeGenerateModal.open && (
        <BadgeGenerateModel
          showIcon={true}
          show={showBadgeGenerateModal}
          setShow={setShowBadgeGenerateModal}
        />
      )}

      {showReportModal.open && (
        <ReportGenerateModal
          showIcon={true}
          show={true}
          setShow={setShowReportModal}
        />
      )}

      {showBadgeDownloadModal && (
        <ReportDownloadModal
          show={showBadgeDownloadModal}
          setShow={setShowBadgeDownloadModal}
        />
      )}
      {showSettingModal.open && (
        <SettingModal show={showSettingModal} setShow={sethowSettingModal} />
      )}
      <table className="rounded-corners">
        <thead>
          <tr className={styles.tableHeading}>
            <th>Client</th>
            <th>Website</th>
            <th>Report</th>
            <th>Badge</th>
          </tr>
        </thead>
        <tbody>
          {websiteid?.map((item, i) => (
            <tr className={styles.tableBody} key={i}>
              <td className={styles.client}>
                <BsEyeFill color=" #1b9876" className={styles.eyeIcon} />
                {item?.company ? item.company : '-'}
              </td>
              <td className={styles.website}>
                <a onClick={() => openClientWebsite(item)}>{item.url}</a>
              </td>
              <td className={styles.report}>
                <div
                  className={cx(styles.commonBtn, styles.greenText)}
                  onClick={() => setShowBadgeDownloadModal(true)}
                >
                  <BiDownload size={18} />
                  <p>
                    Download <span>Report</span>
                  </p>
                </div>
                <div
                  className={cx(styles.commonBtn)}
                  onClick={() =>
                    setShowReportModal({
                      open: true,
                      item: item,
                    })
                  }
                >
                  <AiOutlineFileText size={18} />
                  <p>
                    Regenerate <span>Report</span>
                  </p>
                </div>
              </td>

              <td className={styles.badge}>
                <div className={cx(styles.commonBtn, styles.greenText)}>
                  <div
                    onClick={() => regenerateBadge(item)}
                    className="d-flex gap-2"
                  >
                    <BsShield size={18} />
                    <p>
                      Generate <span>Badge</span>
                    </p>
                  </div>

                  <FiSettings
                    onClick={() =>
                      sethowSettingModal({
                        item: item,
                        open: true,
                      })
                    }
                    size={16}
                    className={styles.settingIcon}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
