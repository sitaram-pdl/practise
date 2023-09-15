import classes from '@/scss/common/Footer.module.scss';
import { useLocation } from 'react-router-dom';

function FooterEmission() {
  const { pathname } = useLocation();
  const date = new Date();

  const showNavbar = !['/login', '/signup', '/server', '/report'].includes(
    pathname,
  );

  return (
    showNavbar && (
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
                <li className="nav-item">
                  <a
                    className={`nav-link link-content ${classes['nav-link']} p-cursor  ${classes['link-content']}`}
                    href="contact-us"
                  >
                    Contact Us
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link link-content ${classes['nav-link']} p-cursor  ${classes['link-content']}`}
                    href="https://blog.everythinggreen.org/"
                    target={'_blank'}
                  >
                    Blog
                  </a>
                </li>
                {/* <li className="nav-item">
                  <a href="/emission-record" className={`nav-link link-content ${classes["nav-link"]} p-cursor  ${classes["link-content"]}`}>
                    Emission Data
                  </a>
                </li> */}
                <li className="nav-item">
                  <a
                    href="/sustainable-website-hong-kong"
                    className={`nav-link link-content ${classes['nav-link']} p-cursor  ${classes['link-content']}`}
                  >
                    Sustainable Websites
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="/greenweb-badge"
                    className={`nav-link link-content ${classes['nav-link']} p-cursor  ${classes['link-content']}`}
                    aria-current="page"
                  >
                    Get greenWeb badge
                  </a>
                </li>
              </ul>
            </div>
            <div style={{ flex: 1 }}>
              <hr className={`header-line ${classes['header-line']}`} />
            </div>
          </div>
        </nav>

        <div className="footer-main">
          <div className="custom-container text-center text-md-start mt-1">
            <div className="footer-section">
              <div className="footer-tab">
                <h6 className="fw-bold">Introduction</h6>
                <ul className="f-links">
                  <li>
                    <a href="#">Background</a>
                  </li>
                </ul>
              </div>

              <div className="footer-tab">
                <h6 className="fw-bold">GHG Emissions</h6>
                <ul className="f-links">
                  <li>
                    <a href="#">List by Stock Code</a>
                  </li>
                  <li>
                    <a href="#">List by Alphabetical Order</a>
                  </li>
                  <li>
                    <a href="#">List of Top 100 by market capitalisation</a>
                  </li>
                  <li>
                    <a href="#">List by HSI classification</a>
                  </li>
                </ul>
              </div>

              <div className="footer-tab">
                <h6 className="fw-bold">GHG Reporting</h6>
                <ul className="f-links">
                  <li>
                    <a href="#">Forms Download</a>
                  </li>
                  <li>
                    <a href="#">
                      Online Submission (to be used by listed companies only)
                    </a>
                  </li>
                  <li>
                    <a href="#">Reporting Flow Chart</a>
                  </li>
                  <li>
                    <a href="#">How to Report</a>
                  </li>
                </ul>
              </div>

              <div className="footer-tab">
                <h6 className="fw-bold">Resources</h6>
                <ul className="f-links"></ul>
              </div>

              <div className="footer-tab">
                <h6 className="fw-bold">News & Events</h6>
                <ul className="f-links"></ul>
              </div>

              <div className="footer-tab">
                <h6 className="fw-bold">Helpdesk</h6>
                <ul className="f-links">
                  <li>
                    <a href="#">FAQ</a>
                  </li>
                  <li>
                    <a href="#">Enquiry Form</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="attributions">
              <p>
                Copyright &copy; {date.getFullYear()} Everythinggreen. All
                rights reserved.
              </p>
              <div className="d-flex gap-2">
                <a href="#">Important Notices</a>
                <span>|</span>
                <a href="#">Privacy Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  );
}

export default FooterEmission;
