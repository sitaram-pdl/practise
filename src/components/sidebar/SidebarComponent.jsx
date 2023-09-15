import AppLogo from '@/assets/images/logo/appLogo.svg';
import { logout, sidebarItems, sidebarItems2, dashboardItem } from '@/constant';
import { Tooltip } from 'antd';
import cx from 'classnames';
import { useEffect, useState } from 'react';
import { FiChevronUp } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import styles from './SidebarComponent.module.css';

const SidebarComponent = ({ collapsed, isAgency }) => {
  const [active, setActive] = useState('');

  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  const onMenuCLick = (data) => {
    if (data.key.includes('/')) navigate(data.key);
    if (data.key === 'logout') {
      navigate('/login');
      secureLocalStorage.clear();
    }
  };

  const onSubMenuCLick = (data) => {
    if (data.key.includes('/')) navigate(data.key);
    if (data.key === 'logout') {
      navigate('/login');
      secureLocalStorage.clear();
    }
  };

  const isSubmenuActive = (data) => {
    if (location.pathname === data.key) {
      return true;
    }
    return false;
  };

  const isMenuActive = (data) => {
    if (active === data.key) return true;
    if (data?.children?.map((dat) => dat.key).includes(active)) return true;
    return false;
  };

  const getDropDownIcon = (data) => {
    return (
      <span
        className={cx(
          styles.dropdownIcon,
          isMenuActive(data) ? styles.rotate : '',
        )}
      >
        <FiChevronUp size={20} />
      </span>
    );
  };

  const isAgencyLogin = secureLocalStorage.getItem('isAgency') === 'true';
  const isAgencyDashboardPage =
    isAgencyLogin && location.pathname === '/agency';

  return (
    <div className={styles.container}>
      <div className={styles.menuContainer}>
        <div className="mt-5">
          {isAgencyLogin &&
            dashboardItem.map((data, index) => (
              <div
                onClick={() => {
                  setActive((dat) => (dat === data.key ? '' : data.key));
                  logout();
                }}
                className={styles.singleMenu}
                key={index}
              >
                <div
                  className={cx(
                    styles.menuWrapper,
                    collapsed && styles.collapsedMenu,
                    isMenuActive(data) && styles.menuActive,
                  )}
                  key={index}
                  onClick={() => onMenuCLick(data)}
                >
                  <div className={styles.menu}>
                    <div className={styles.icon}>{data.icon}</div>
                    {!collapsed && <div>{data.label}</div>}
                  </div>
                </div>
              </div>
            ))}
        </div>
        {(!isAgencyDashboardPage || !isAgencyLogin
          ? sidebarItems
          : sidebarItems2
        ).map((data, index) => (
          <div
            onClick={() =>
              setActive((dat) => (dat === data.key ? '' : data.key))
            }
            className={cx(
              styles.singleMenu,
              isMenuActive(data) ? styles.activeSingleMenu : '',
            )}
            key={`Sidebar-Parent-${index}`}
          >
            <div
              className={cx(
                styles.menuWrapper,
                collapsed && styles.collapsedMenu,
                isMenuActive(data) && styles.menuActive,
              )}
              key={index}
              onClick={() => onMenuCLick(data)}
            >
              <div className={styles.menu}>
                <div className={styles.icon}>
                  <Tooltip
                    overlayClassName={!collapsed && styles.dn}
                    title={data.label}
                  >
                    {data.icon}
                  </Tooltip>
                </div>
                {!collapsed && (
                  <div className={styles['menu-label']}>{data.label}</div>
                )}
              </div>
              {!collapsed &&
                data?.children?.length > 0 &&
                getDropDownIcon(data)}
            </div>
            {/**menu for uncollapsed */}
            {data?.children &&
              data?.children.length > 0 &&
              !collapsed &&
              isMenuActive(data) && (
                <div className={cx(styles.subMenuContainer)}>
                  {data?.children?.map((dat, indexChild) => (
                    <div
                      className={styles.wrapperSubmenu}
                      key={`Sidebar-Child-${indexChild}`}
                    >
                      <div
                        onClick={() => onSubMenuCLick(dat)}
                        key={indexChild}
                        className={cx(
                          styles.submenu,
                          isMenuActive(dat) && styles.subMenuActive,
                          dat.icon && styles.alCenter,
                        )}
                      >
                        {dat.icon && (
                          <div className={styles.icon}>{dat.icon}</div>
                        )}
                        {!dat.icon && (
                          <div
                            className={cx(
                              styles.sideBorderSubmenu,
                              indexChild === data.children.length - 1 &&
                                styles.curveBorder,
                              isSubmenuActive(dat) && styles.borderActive,
                            )}
                          />
                        )}

                        <div className={styles.label}>
                          <div className={styles.main}>{dat.label}</div>
                          <div className={styles.sublabel}>{dat.subLabel}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            {data?.children && collapsed && (
              <div className={styles.collapsedMenuWrapper}>
                {data?.children?.map((dat, indexChild) => (
                  <div
                    onClick={() => onSubMenuCLick(dat)}
                    className={cx(
                      styles.label,
                      styles.dpMenu,
                      location.pathname === dat.key && styles.menuActive,
                    )}
                    key={indexChild}
                  >
                    {dat.icon && (
                      <div className={styles.icon}>
                        <Tooltip
                          overlayClassName={!collapsed && styles.dn}
                          title={data.label}
                        >
                          {dat.icon}
                        </Tooltip>
                      </div>
                    )}
                    <div>{dat.label}</div>
                    <div>{dat.subLabel}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <div className="mt-5">
          {logout.map((data, index) => (
            <div
              onClick={() => {
                setActive((dat) => (dat === data.key ? '' : data.key));
                logout();
              }}
              className={styles.singleMenu}
              key={index}
            >
              <div
                className={cx(
                  styles.menuWrapper,
                  collapsed && styles.collapsedMenu,
                  isMenuActive(data) && styles.menuActive,
                )}
                key={index}
                onClick={() => onMenuCLick(data)}
              >
                <div className={styles.menu}>
                  <div className={styles.icon}>{data.icon}</div>
                  {!collapsed && <div>{data.label}</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default SidebarComponent;
