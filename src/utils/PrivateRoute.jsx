import AppLogo from '@/assets/images/logo/appLogo.svg';
import { DashboardFooter } from '@/components/Footer/DashboardFooter';
import { AddNewClient } from '@/components/Navbar/AddNewClient';
import BadgeGenerateModel from '@/components/modal/BadgeGenerateModal';
import ReportDownloadModal from '@/components/modal/ReportDownloadModal';
import SidebarComponent from '@/components/sidebar/SidebarComponent';
import { getPageTitle } from '@/lib/getPageTitle';
import { regenerateReport } from '@/services/GreenScore/greenscore.api';
import { Button, Layout } from 'antd';
import cx from 'classnames';
import { Suspense, lazy, useEffect, useState } from 'react';
import { AiOutlineFileText, AiOutlineSearch } from 'react-icons/ai';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { useLocation, useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import { toast } from 'react-toastify';
import styles from './PrivateRoute.module.scss';

const Outlet = lazy(() =>
  import('react-router-dom').then((module) => ({ default: module.Outlet })),
);

const { Sider, Content } = Layout;

export const PrivateRoutes = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = !!secureLocalStorage.getItem('access_token');
  const isAgency = secureLocalStorage.getItem('isAgency') === 'true';
  const isAgencyDashboardPage =
    secureLocalStorage.getItem('isAgency') === 'true' &&
    location.pathname === '/agency';
  const websiteId = secureLocalStorage.getItem('websiteId');
  const websiteUrl = secureLocalStorage.getItem('websiteUrl');

  let isFooterAvailable = !['/settings', '/agency', '/fullreport'].includes(
    location.pathname,
  );
  let isHeaderAvailable = !['/fullreport'].includes(location.pathname);

  /* Temporary Comment -> use this in useEffect  */
  setTimeout(() => {
    if (location.pathname !== '/signup') {
      if (!token) {
        navigate('/login');
      } else {
        if (isAgency) {
        } else {
          if (!websiteId) {
            navigate('/server');
          }
        }
      }
    }
  });

  const [collapsed, setCollapsed] = useState(false);
  const [isSmallWindow, setIsSmallWindow] = useState(false);
  const [generateReport, setGenerateReport] = useState(false);
  const [reportDownload, setReportDownload] = useState(false);
  const [badgeRegenerating, setBadgeRegenerating] = useState(false);

  const collapsedWidth = isSmallWindow ? '0px' : '80px';
  const marginLeft = isSmallWindow ? '0' : collapsed ? '80px' : '16rem';

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 1000);
      setIsSmallWindow(window.innerWidth <= 700);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [window]);

  const rescanReport = async () => {
    setBadgeRegenerating(true);
    const response = await toast.promise(regenerateReport(websiteId), {
      pending: 'Rescanning in Progress',
      success: 'Rescanning Completed 👌',
      error: 'Rescan Report Error. Please Try Later 🤯',
    });
    setBadgeRegenerating(false);
  };

  const showReportDownload = () => {
    navigate('/fullreport');
  };

  function getWebsiteUrlText(websiteUrl) {
    if (websiteUrl.includes('https://www')) {
      return websiteUrl.replace('https://www.', '').replace('/', '');
    } else {
      return websiteUrl.replace('https://', '').replace('/', '');
    }
  }

  const AppLogoo = () => (
    <svg
      width="172"
      height="37"
      viewBox="0 0 172 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M133.429 0.91687L126.38 28.8859H119.967L115.357 10.3833L110.931 28.8859H104.538L97.3458 0.91687H104.026L107.878 17.9852C107.891 18.0671 107.966 18.3676 108.103 18.8867C108.158 19.078 108.233 19.3648 108.328 19.7473L112.898 0.91687H118.942L123.655 19.7473C123.751 19.3922 123.887 18.8048 124.065 17.9852L128.04 0.91687H133.429Z"
        fill="#199876"
      />
      <path
        d="M151.217 19.5629H137.898C137.885 19.9317 137.878 20.2527 137.878 20.5259C137.878 22.0012 138.267 23.1145 139.046 23.8658C139.838 24.6171 140.781 24.9928 141.873 24.9928C143.909 24.9928 145.131 23.9068 145.541 21.7349L151.073 22.1447C149.53 26.9257 146.395 29.3162 141.668 29.3162C139.606 29.3162 137.85 28.9064 136.402 28.0868C134.968 27.2535 133.78 26.0446 132.837 24.46C131.908 22.8755 131.444 20.9767 131.444 18.7638C131.444 15.4717 132.38 12.8148 134.251 10.7931C136.136 8.77143 138.554 7.76058 141.504 7.76058C144.168 7.76058 146.449 8.70313 148.348 10.5882C150.261 12.4597 151.217 15.4512 151.217 19.5629ZM137.878 16.0181H145.234C145.042 13.1768 143.875 11.7562 141.73 11.7562C139.435 11.7562 138.151 13.1768 137.878 16.0181Z"
        fill="#199876"
      />
      <path
        d="M158.678 0.91687V10.7931C159.771 8.77143 161.478 7.76058 163.8 7.76058C166.177 7.76058 168.055 8.72362 169.435 10.6497C170.815 12.5621 171.505 15.1917 171.505 18.5384C171.505 21.7622 170.794 24.3644 169.374 26.3451C167.953 28.3259 165.904 29.3162 163.227 29.3162C161.833 29.3162 160.699 29.0772 159.825 28.5991C158.951 28.121 158.07 27.1579 157.182 25.7099C156.799 26.1061 156.349 27.1647 155.83 28.8859H152.572V0.91687H158.678ZM158.678 20.6899C158.678 22.1378 158.978 23.2306 159.579 23.9683C160.194 24.7059 160.925 25.0748 161.772 25.0748C162.783 25.0748 163.616 24.6308 164.272 23.7429C164.927 22.8413 165.255 21.0997 165.255 18.5179C165.255 15.581 164.914 13.7369 164.231 12.9856C163.561 12.2343 162.796 11.8586 161.936 11.8586C160.938 11.8586 160.146 12.2821 159.559 13.129C158.971 13.9759 158.678 15.178 158.678 16.7353V20.6899Z"
        fill="#199876"
      />
      <path
        d="M23.6002 8.66214C22.9582 8.52554 22.4186 8.45724 21.9815 8.45724C20.6292 8.45724 19.8369 9.05828 19.6047 10.2604C20.7111 11.4215 21.2644 12.7328 21.2644 14.1945C21.2644 16.1479 20.4448 17.7051 18.8056 18.8662C17.18 20.0273 14.8305 20.6079 11.7569 20.6079C10.6641 20.6079 9.59865 20.5054 8.56048 20.3005C7.86381 20.7103 7.51548 21.2363 7.51548 21.8783C7.51548 22.5886 7.80917 23.0599 8.39656 23.2921C8.98394 23.5243 10.3978 23.6951 12.638 23.8044C15.8208 23.9683 18.0133 24.1664 19.2154 24.3986C20.4174 24.6308 21.4283 25.1909 22.2479 26.0788C23.0675 26.9667 23.4773 28.0731 23.4773 29.3982C23.4773 31.2969 22.5962 32.902 20.8341 34.2134C19.0856 35.5247 15.9779 36.1804 11.5111 36.1804C7.31741 36.1804 4.48977 35.7228 3.02814 34.8076C1.56651 33.906 0.835693 32.7586 0.835693 31.3652C0.835693 29.5211 2.01729 28.278 4.38049 27.636C2.632 26.7618 1.75775 25.5324 1.75775 23.9478C1.75775 21.9671 3.13742 20.4235 5.89676 19.317C3.4516 18.3062 2.22902 16.6191 2.22902 14.2559C2.22902 12.3299 3.06912 10.7658 4.74931 9.56371C6.44316 8.36162 8.77904 7.76057 11.7569 7.76057C13.642 7.76057 15.4657 8.06109 17.2278 8.66214C17.3507 7.48737 17.6923 6.52433 18.2523 5.77303C18.826 5.00806 20.035 4.62558 21.8791 4.62558C22.4801 4.62558 23.0538 4.68022 23.6002 4.7895V8.66214ZM11.716 11.0595C10.6641 11.0595 9.8377 11.3463 9.23665 11.9201C8.64927 12.4801 8.35558 13.2246 8.35558 14.1535C8.35558 16.2572 9.48253 17.309 11.7365 17.309C12.8293 17.309 13.683 17.0016 14.2977 16.3869C14.9261 15.7722 15.2403 15.0277 15.2403 14.1535C15.2403 13.3339 14.9466 12.6167 14.3592 12.002C13.7718 11.3737 12.8907 11.0595 11.716 11.0595ZM7.63842 28.7425C7.39254 28.7425 7.07836 28.9064 6.69587 29.2342C6.32705 29.5621 6.14264 29.9582 6.14264 30.4227C6.14264 31.3516 6.73686 31.9321 7.92528 32.1643C9.11371 32.3966 10.507 32.5127 12.1053 32.5127C14.1953 32.5127 15.6569 32.3556 16.4902 32.0414C17.3371 31.7272 17.7606 31.2218 17.7606 30.5251C17.7606 29.9924 17.4054 29.5826 16.6951 29.2957C15.9984 29.0089 14.127 28.8654 11.0808 28.8654L9.85136 28.8859C9.10005 28.8859 8.59463 28.8654 8.33509 28.8244C8.04822 28.7698 7.816 28.7425 7.63842 28.7425Z"
        fill="white"
      />
      <path
        d="M30.8243 28.8859H24.9026V8.19087H30.4964V12.043C31.357 9.17439 32.8459 7.74008 34.9633 7.74008C35.2638 7.74008 35.6326 7.76057 36.0697 7.80155V13.8257C34.8267 13.8257 33.8568 14.0169 33.1601 14.3994C32.4771 14.7819 31.9171 15.4717 31.4799 16.4689C31.0428 17.4524 30.8243 18.7843 30.8243 20.4645V28.8859Z"
        fill="white"
      />
      <path
        d="M56.8172 19.5629H43.4986C43.485 19.9317 43.4781 20.2527 43.4781 20.5259C43.4781 22.0012 43.8675 23.1145 44.6461 23.8658C45.4384 24.6171 46.3809 24.9928 47.4737 24.9928C49.5091 24.9928 50.7317 23.9068 51.1415 21.7349L56.6738 22.1447C55.1302 26.9257 51.9952 29.3162 47.2688 29.3162C45.2061 29.3162 43.4508 28.9064 42.0029 28.0868C40.5685 27.2535 39.3801 26.0446 38.4376 24.46C37.5087 22.8755 37.0442 20.9767 37.0442 18.7638C37.0442 15.4717 37.98 12.8148 39.8514 10.7931C41.7365 8.77142 44.1543 7.76057 47.1049 7.76057C49.7686 7.76057 52.0499 8.70312 53.9486 10.5882C55.861 12.4596 56.8172 15.4512 56.8172 19.5629ZM43.4781 16.0181H50.8341C50.6429 13.1768 49.4749 11.7562 47.3303 11.7562C45.0354 11.7562 43.7513 13.1768 43.4781 16.0181Z"
        fill="white"
      />
      <path
        d="M78.0155 19.5629H64.6969C64.6833 19.9317 64.6764 20.2527 64.6764 20.5259C64.6764 22.0012 65.0657 23.1145 65.8444 23.8658C66.6367 24.6171 67.5792 24.9928 68.672 24.9928C70.7074 24.9928 71.9299 23.9068 72.3397 21.7349L77.8721 22.1447C76.3285 26.9257 73.1935 29.3162 68.4671 29.3162C66.4044 29.3162 64.6491 28.9064 63.2011 28.0868C61.7668 27.2535 60.5784 26.0446 59.6359 24.46C58.707 22.8755 58.2425 20.9767 58.2425 18.7638C58.2425 15.4717 59.1782 12.8148 61.0497 10.7931C62.9348 8.77142 65.3526 7.76057 68.3032 7.76057C70.9669 7.76057 73.2481 8.70312 75.1469 10.5882C77.0593 12.4596 78.0155 15.4512 78.0155 19.5629ZM64.6764 16.0181H72.0324C71.8411 13.1768 70.6732 11.7562 68.5286 11.7562C66.2337 11.7562 64.9496 13.1768 64.6764 16.0181Z"
        fill="white"
      />
      <path
        d="M98.6196 28.8859H92.5135V17.268C92.5135 15.861 92.4589 14.898 92.3496 14.3789C92.2403 13.8598 91.9739 13.4227 91.5505 13.0675C91.127 12.6987 90.5943 12.5143 89.9523 12.5143C87.8076 12.5143 86.7353 14.0989 86.7353 17.268V28.8859H80.6292V8.19087H86.305V11.6947C87.2476 10.0281 88.1764 8.95583 89.0917 8.47773C90.0069 7.99962 90.9973 7.76057 92.0627 7.76057C94.0298 7.76057 95.6144 8.29332 96.8165 9.3588C98.0185 10.4106 98.6196 12.487 98.6196 15.5878V28.8859Z"
        fill="white"
      />
    </svg>
  );

  return (
    <Layout className={styles.layoutWrapper}>
      <Sider
        width={'16rem'}
        // collapsible
        collapsedWidth={collapsedWidth}
        // onCollapse={() => setCollapsed(!collapsed)}
        collapsed={collapsed}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 100,
        }}
      >
        <div className={styles.sidebarWrapper}>
          <div>
            <div
              onClick={() => setCollapsed(!collapsed)}
              className={cx(styles.collapse, collapsed && styles.jc)}
            >
              {!collapsed ? <BiChevronLeft /> : <BiChevronRight />}
            </div>
            <div className={styles.logoWrapper}>
              {collapsed ? (
                <div className={styles.collapseLogo}>GW</div>
              ) : (
                <AppLogoo />
              )}
            </div>
            <SidebarComponent collapsed={collapsed} isAgency={isAgency} />
          </div>
          <div className={styles.logoWrapper}>
            {collapsed ? (
              <div className={styles.collapseLogo}>EG</div>
            ) : (
              <img src={AppLogo} />
            )}
          </div>
        </div>
      </Sider>
      <Layout className={styles.landingBg} style={{ marginLeft }}>
        {isHeaderAvailable && (
          <div className={styles.header}>
            {!isAgencyDashboardPage ? (
              <div className={styles.pageTitle}>
                <h2>{getPageTitle(location.pathname)}</h2>
                <div className={styles.urlSection}>
                  {websiteUrl ? getWebsiteUrlText(websiteUrl) : '-'}
                </div>
              </div>
            ) : (
              <div></div>
            )}
            {!isAgencyDashboardPage ? (
              <div className="d-flex gap-2 flex-wrap">
                <Button
                  onClick={rescanReport}
                  className={styles.appPrimaryButton}
                  style={{ background: 'white' }}
                >
                  <div className={styles.customButtonWrapper}>
                    <AiOutlineSearch />
                    <label>Rescan</label>
                  </div>
                </Button>
                <Button
                  onClick={showReportDownload}
                  className={styles.appPrimaryButton}
                  style={{
                    background: 'var(--primary-green)',
                    color: 'white',
                  }}
                >
                  <div className={styles.secondaryWrapper}>
                    <AiOutlineFileText />
                    <label>View Report</label>
                  </div>
                </Button>
              </div>
            ) : (
              <AddNewClient />
            )}
          </div>
        )}
        <Content>
          {generateReport && (
            <BadgeGenerateModel
              show={generateReport}
              setShow={setGenerateReport}
            />
          )}
          {reportDownload && (
            <ReportDownloadModal
              show={reportDownload}
              setShow={setReportDownload}
            />
          )}
          <div id="content" className={styles.content}>
            <Suspense fallback={<>...loading</>}>
              <Outlet />
            </Suspense>
          </div>
          {isFooterAvailable && <DashboardFooter name={getPageTitle()} />}
        </Content>
      </Layout>
    </Layout>
  );
};
