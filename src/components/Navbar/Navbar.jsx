import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import greenWhiteLogo from '@/assets/images/greenWeb_logo_white.png';
import greenBlackLogo from '@/assets/images/greenWeb_logo_black.png';
import classes from '@/scss/common/Navbar.module.scss';
import secureLocalStorage from 'react-secure-storage';

const navItems = [
  { to: '/sustainable-website-hong-kong', label: 'Sustainable Websites' },
  { to: 'https://blog.everythinggreen.org/', label: 'Blog', external: true },
  { to: '/contact-us', label: 'Contact Us' },
];

function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [darkColor, setDarkColor] = useState(false);
  const [bgColor, setBgColor] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const navbarRef = useRef();
  const user = secureLocalStorage.getItem('user');

  useEffect(() => {
    checkUrl();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [pathname, screenWidth]);

  function handleResize() {
    setScreenWidth(window.innerWidth);
  }

  function checkUrl() {
    setBgColor(false);
    if (pathname === '/' || pathname.includes('/green-score')) {
      setDarkColor(false);
    } else {
      setDarkColor(true);
    }

    navbarRef.current &&
      navbarRef.current.classList.toggle(
        'border-custom',
        window.innerWidth < 992,
      );
    if (window.innerWidth < 992) {
      setDarkColor(true);
      setBgColor(false);
    }
  }

  function logout() {
    secureLocalStorage.clear();
    localStorage.clear();
    navigate('/');
  }

  function handleToggle() {
    setIsShowMenu(!isShowMenu);
  }

  function openDashboard() {
    const isAgency = secureLocalStorage.getItem('isAgency') === 'true';
    if (isAgency) {
      navigate('/agency');
    } else {
      navigate('/carbontest');
    }
  }

  const showNavbar = !['/server', '/login', '/signup'].includes(pathname);

  return (
    showNavbar && (
      <nav
        ref={navbarRef}
        className={`navbar  navbar-expand-lg ${classes['top']} ${
          isShowMenu ? 'collapsed' : ''
        } ${bgColor ? 'bg-color' : ''}`}
        style={{
          background: 'none',
          width: '100%',
          minHeight: 100,
        }}
      >
        <div className="container-fluid">
          <div
            className={`navbar-brand mx-3 ${classes['logo']}`}
            onClick={() => navigate('/')}
          >
            <img
              height="56px"
              alt="greenWeb"
              src={darkColor ? greenBlackLogo : greenWhiteLogo}
            />
          </div>
          <button
            className={`navbar-toggler top-right ${classes['top-right']}`}
            onClick={handleToggle}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar"
          >
            <i
              className={`fa fa-bars icons ${classes['icons']}`}
              aria-hidden="true"
            ></i>
          </button>

          <div
            className={`collapse navbar-collapse ${isShowMenu ? 'show' : ''}`}
            id="navbar"
          >
            <div className="line-section">
              <hr
                className={`${
                  darkColor ? 'header-line__dark' : 'header-line'
                } ${
                  darkColor
                    ? classes['header-line__dark']
                    : classes['header-line']
                }`}
              />
            </div>
            <div className={`nav-content ${classes['nav-content']}`}>
              <ul className="navbar-nav ">
                {navItems.map((item, index) => (
                  <li key={index} className={`nav-item ${classes['nav-item']}`}>
                    {item.external ? (
                      <a
                        href={item.to}
                        target="_blank"
                        className={`nav-link ${classes['nav-link']} p-cursor ${
                          darkColor
                            ? 'link-content__dark ' +
                              classes['link-content__dark']
                            : 'link-content ' + classes['link-content']
                        }`}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        to={item.to}
                        className={`nav-link ${classes['nav-link']} p-cursor ${
                          darkColor
                            ? 'link-content__dark ' +
                              classes['link-content__dark']
                            : 'link-content ' + classes['link-content']
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
                {!user && (
                  <li className={`nav-item ${classes['nav-item']}`}>
                    <Link
                      to="/login"
                      className={`nav-link ${classes['nav-link']} p-cursor ${
                        darkColor
                          ? 'link-content__dark ' +
                            classes['link-content__dark']
                          : 'link-content ' + classes['link-content']
                      }`}
                    >
                      Login
                    </Link>
                  </li>
                )}
                {user && (
                  <>
                    <li className={`nav-item ${classes['nav-item']}`}>
                      <a
                        onClick={() => openDashboard()}
                        className={`nav-link ${classes['nav-link']} p-cursor ${
                          darkColor
                            ? 'link-content__dark ' +
                              classes['link-content__dark']
                            : 'link-content ' + classes['link-content']
                        }`}
                      >
                        Dashboard
                      </a>
                    </li>
                    <li className={`nav-item ${classes['nav-item']}`}>
                      <a
                        onClick={() => logout()}
                        target="_blank"
                        className={`nav-link ${classes['nav-link']} p-cursor ${
                          darkColor
                            ? 'link-content__dark ' +
                              classes['link-content__dark']
                            : 'link-content ' + classes['link-content']
                        }`}
                      >
                        <svg
                          width="23"
                          height="23"
                          viewBox="0 0 23 23"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{
                            height: '14px',
                            marginRight: '2px',
                          }}
                        >
                          <path
                            d="M2.61661 12.2112H15.07C15.4675 12.2112 15.7888 11.8892 15.7888 11.4925C15.7888 11.0957 15.4675 10.7737 15.07 10.7737H2.66153L5.26161 8.17362C5.54228 7.89295 5.54228 7.43798 5.26161 7.15731C4.98094 6.87664 4.52597 6.87664 4.2453 7.15731L0 11.5147L4.2453 15.8722C4.38581 16.0127 4.56945 16.0828 4.75345 16.0828C4.93745 16.0828 5.12109 16.0127 5.26161 15.8722C5.54228 15.5915 5.54228 15.1365 5.26161 14.8558L2.61661 12.2112ZM21.5474 0H9.32863C8.53441 0 7.89113 0.643641 7.89113 1.4375V7.90625H9.33798V2.31402C9.33798 1.83389 9.72754 1.44433 10.2077 1.44433H20.6457C21.1262 1.44433 21.5154 1.83389 21.5154 2.31402L21.538 20.6935C21.538 21.1737 21.1488 21.5632 20.6683 21.5632H10.208C9.72792 21.5632 9.33836 21.1737 9.33836 20.6935V15.07L7.89151 15.0718V21.5625C7.89151 22.3564 8.5348 23 9.32901 23H21.5474C22.3416 23 22.9853 22.3564 22.9853 21.5625V1.4375C22.9849 0.643641 22.3413 0 21.5474 0Z"
                            fill="currentColor"
                          />
                        </svg>
                        Logout
                      </a>
                    </li>
                  </>
                )}
              </ul>
            </div>
            <div className="pl-3">
              <hr
                style={{ width: 66 }}
                className={`${
                  darkColor ? 'header-line__dark' : 'header-line'
                } ${
                  darkColor
                    ? classes['header-line__dark']
                    : classes['header-line']
                }`}
              />
            </div>
          </div>
        </div>
      </nav>
    )
  );
}

export default Navbar;
