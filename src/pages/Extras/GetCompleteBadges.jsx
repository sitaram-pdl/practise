import GreenWebLogo from '@/assets/images/greenWeb-badge.svg';
import LoadingModel from '@/components/LoadingModel';
import AppShared from '@/components/landing/AppShared';
import classes from '@/scss/GenerateBadge.module.scss';
import {
  getImageBadge,
  postBadgeRequests,
} from '@/services/BadgeRequest/badgeRequest.api';
import { postGreenScore } from '@/services/GreenScore/greenscore.api';
import { capitalize } from '@/utils/captitalize.utils';
import { ValidateEmail } from '@/utils/validate.utils';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function GetCompleteBadges() {
  const [formData, setFormData] = useState(
    Object.freeze({
      website: '',
      company: '',
      email: '',
      name: '',
      score: 0,
    }),
  );

  const location = useLocation();
  const navigate = useNavigate();

  const isError = location?.state?.isError;
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (isError) {
      toast.error('Please enter valid url.');
    }
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();

    try {
      const formArrayData = Object.entries(formData);
      let domain = formData.website;

      /* Checking Required Elements */
      const emptyField = formArrayData
        .filter((el) => el[1] === '')
        .map(([key]) => {
          return capitalize(key);
        });

      const requiredString = emptyField.join(', ');

      if (requiredString) {
        return toast.error(
          `${requiredString} ${
            emptyField.length === 1 ? 'field is' : 'fields are'
          } required.`,
        );
      }

      const validEmail = ValidateEmail(formData.email);

      if (!validEmail) {
        return toast.error('Invalid Email. Please provide valid email');
      }

      const hasProtocol =
        domain.startsWith('http://') || domain.startsWith('https://');

      if (!hasProtocol) {
        domain = `https://${domain}`;
      }

      const hostname = new URL(domain).hostname;
      domain = `https://${hostname}`;

      setIsFetching(true);

      const websiteScore = await postGreenScore(domain);
      if (!websiteScore) {
        setIsFetching(false);
        return toast.error('Invalid URL. Please provide valid url');
      }

      const postData = { ...formData, urlString: domain };

      const badgeRequest = await postBadgeRequests(postData);
      if (!badgeRequest.status === 'success') {
        setIsFetching(false);
        return;
      }

      const badge = await getImageBadge(domain);

      setIsFetching(false);
      navigate('/get-badge', { state: badge.data });
    } catch (error) {
      setIsFetching(false);
      toast.error(error.message);
      console.log('object');
    }
  };
  return (
    <>
      {isFetching && <LoadingModel />}
      <div className={classes['download-title']}>
        Get your <br /> certificate
      </div>
      <div className="d-flex justify-content-center">
        <div
          className={`card ${classes['form-card']} ${classes['card']}`}
          style={{ marginTop: 147 }}
        >
          <img src={GreenWebLogo} height="199" style={{ marginTop: -100 }} />
          <form onSubmit={handleSubmit}>
            <div className="d-flex flex-column justify-content-center">
              <div>
                <input
                  type="text"
                  name="website"
                  className={`form-control ${classes['form-div']} mx-auto`}
                  placeholder="your website url"
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  type="text"
                  className={`form-control ${classes['form-div']} mx-auto`}
                  placeholder="your email address"
                  name="email"
                  onChange={handleChange}
                />
              </div>

              <div>
                <input
                  type="text"
                  className={`form-control ${classes['form-div']} mx-auto`}
                  placeholder="your company name"
                  name="company"
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  type="text"
                  className={`form-control ${classes['form-div']} mx-auto`}
                  placeholder="your name"
                  name="name"
                  onChange={handleChange}
                />
              </div>

              <div
                className="d-flex justify-content-center"
                style={{ margin: 33 }}
              >
                <button
                  className={`btn btn-sm btn-outline-secondary button-content button__signup ${classes['button__signup']}`}
                  type="submit"
                >
                  send me my certificate
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="body">
        <div className=" first-content mt-42">
          We will email you your certificate which you can display on <br />
          your website, after checking your details.
        </div>
      </div>

      <AppShared />
    </>
  );
}

export default GetCompleteBadges;
