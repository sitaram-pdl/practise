import classes from '@/scss/landing/LandingPage.module.scss';
import { postGreenScore } from '@/services/GreenScore/greenscore.api';
import { useState } from 'react';
import ErrorModel from '../ErrorModel';
import LoadingModel from '../LoadingModel';
import { useNavigate } from 'react-router-dom';

function CheckGreen() {
  const [url, setURL] = useState('');
  const [showError, setShowError] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const navigate = useNavigate();

  const dismissErrorModel = () => setShowError(false);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    try {
      setShowError(false);
      setShowLoading(true);
      let domain = url;
      if (!url.startsWith('http') || !url.startsWith('https')) {
        domain = `https://${url}`;
      }
      const validURL = new URL(domain);
      if (validURL) {
        const response = await postGreenScore(domain);
        if (!response) throw new Error('No response found!');
        setShowLoading(false);
        navigate(`/green-score/${response?.websiteId}`, {
          state: { response, url: domain },
        });
      }
    } catch (error) {
      console.log(error);
      setShowLoading(false);
      setShowError(true);
    }
  };

  return (
    <header>
      {showError && <ErrorModel dismissModal={dismissErrorModel} />}
      {showLoading && <LoadingModel />}
      <div className={classes['header']}>
        <div className={`container my-container ${classes['my-container']}`}>
          <div className={classes['header-title']}>
            is <br /> your website <br /> green enough ?
          </div>

          <div>
            <div className="row">
              <div className={`col-12 d-flex  ${classes['search-sm']}`}>
                <div>
                  <div className={classes['search-section']}>
                    enter your website URL
                  </div>
                  <input
                    className={`form-control ${classes['form-control']} search-div ${classes['search-div']}`}
                    type="search"
                    id="jobSearchText"
                    placeholder="https://"
                    onChange={(e) => setURL(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                </div>
                <div>
                  <button
                    onClick={handleSubmit}
                    className={`btn btn-sm btn-outline-secondary button-content button__signup ${classes['button__signup']}`}
                    type="button"
                  >
                    find out now
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={classes['header-desc']}>
            Sustainable websites are created and maintained to ensure that the
            CO2
            <br />
            emissions are minimal without impacting the performance of the site,
            or the experience of the end user. <br />
          </div>
        </div>
      </div>
    </header>
  );
}

export default CheckGreen;
