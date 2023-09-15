import React from 'react';
import { useLocation } from 'react-router-dom';
import classes from '@/scss/common/Footer.module.scss';

const footerItems = [
  // { label: 'Login', href: '/login' },
  { label: 'Contact Us', href: '/contact-us' },
  {
    label: 'Blog',
    href: 'https://blog.everythinggreen.org/',
    external: true,
  },
  // { label: "Emission Data", href: "/emission-record" },
  { label: 'Sustainable Websites', href: '/sustainable-website-hong-kong' },
  // { label: 'Get greenWeb badge', href: '/greenweb-badge' },
];

function FooterMain() {
  const { pathname } = useLocation();

  const showFooter = !['/login', '/signup', '/server', '/report'].includes(
    pathname,
  );

  return (
    showFooter && (
      <footer>
        <nav
          className="navbar"
          style={{
            backgroundColor: 'none',
            background: 'none',
            width: '100%',
          }}
        >
          <div
            className="container-fluid p-0"
            style={{ marginTop: 75, marginBottom: 25 }}
          >
            <div className="" style={{ flex: 1, paddingRight: '2rem' }}>
              <hr className={`header-line ${classes['header-line']}`} />
            </div>
            <div className="">
              <ul
                className={`navbar-nav me-auto mb-2 mb-lg-0 mr-0 ${classes['d-sm-content']}`}
              >
                {footerItems.map((item, index) => (
                  <li key={index} className="nav-item">
                    {item.external ? (
                      <a
                        className={`nav-link link-content ${classes['nav-link']} p-cursor ${classes['link-content']}`}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <a
                        className={`nav-link link-content ${classes['nav-link']} p-cursor ${classes['link-content']}`}
                        href={item.href}
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ flex: 1 }}>
              <hr className={`header-line ${classes['header-line']}`} />
            </div>
          </div>
        </nav>
        <div
          style={{ marginBottom: "3rem" }}
          className={`col-12 d-flex link-content ${classes["link-content"]} ${classes["footer-container"]} ${classes["footer-sm-content"]}`}>
          <div className="d-flex flex-column">
            <a className={classes["contact-link"]} href="tel:+852 9842-7047">
              <i className="fas fa-phone-alt"></i> +852 9842-7047
            </a>
            <a
              className={`${classes["contact-link"]} mt-2`}
              style={{ marginRight: 10 }}
              href="mailto:vishwas.thakkar@everythinggreen.org">
              <i className="far fa-envelope"></i>
              <span style={{ wordBreak: "break-all" }}>
                &nbsp;&nbsp;vishwas.thakkar@everythinggreen.org
              </span>
            </a>
          </div>

          <div className={`d-flex align-items-end ${classes["mt-sm"]}`}>
            <a
              className={classes["contact-link"]}
              href="https://concinnitylimited.com/privacy-policy/"
              target="_blank">
              Privacy Policy
            </a>
            <a href="https://www.linkedin.com/company/everything-green-ltd/">
              <i
                className="fab fa-linkedin mx-4"
                style={{ cursor: "pointer" }}></i>
            </a>
          </div>

          <div
            style={{ textAlign: "center" }}
            className={`d-flex flex-column ${classes["mt-sm"]}`}>
            <p>Address:</p>
            <p className={`${classes["color-223333"]} mt-2`}>
              China Hong Kong City Block 3, Room 1203,
            </p>
            <p className={`${classes["color-223333"]} mt-2`}>
              12th Floor, 33 Canton Rd, Tsim Sha Tsui, Hong Kong
            </p>
          </div>
        </div>
      </footer>
    )
  );
}

export default FooterMain;
