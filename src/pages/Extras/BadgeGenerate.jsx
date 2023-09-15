import logo from '@/assets/images/greenWeb-badge.svg';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function BadgeGenerate() {
  const location = useLocation();
  const navigate = useNavigate();

  const [imageScale, setImageScale] = useState('large');
  const data = location.state;

  useEffect(() => {
    if (!data) {
      const timer = setTimeout(() => {
        toast.error('Something went wrong. Try again!');
        navigate('/greenweb-badge');
      }, 500);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleImageScale = (e) => {
    setImageScale(e.target.value);
  };

  return (
    <div
      className="container d-flex justify-content-center"
      style={{ marginTop: 120 }}
    >
      <div className="content">
        <div className="logo d-flex justify-content-center">
          <img src={logo} alt="badge" />
        </div>
        <div className="badge-container d-flex flex-column align-items-center">
          <select
            name="badge"
            id="badge"
            onChange={handleImageScale}
            defaultValue="large"
          >
            <option value="large">Large (368 * 267 px)</option>
            <option value="small"> Small (544 * 184 px)</option>
          </select>

          <div className="description">
            <p className="header">Here is your Badge </p>
            {/*  <p className="content">
              We will also email you your certificate which you can display on
              your website, after checking your details.
            </p> */}
            <p className="info mt-3 mb-3">
              <span> To add badge to your website, copy the given </span>
              <span className="bold">snippets </span>
              <span>for large or small badges as per your need.</span>
            </p>
            {data && (
              <>
                <div className="image-badge d-flex justify-content-center">
                  <img
                    src={
                      imageScale === 'large'
                        ? data.image.large
                        : data.image.small
                    }
                    width="350px"
                    alt={imageScale}
                  />
                </div>

                <div className="snippets mt-2">
                  <pre>
                    {`
<a href="${import.meta.env.VITE_API_BASE_URL}" target="_blank">
<img src="${
                      imageScale === 'large'
                        ? data.image.large
                        : data.image.small
                    }" width="${imageScale === 'large' ? 300 : 400}px" />
</a>
                `}
                  </pre>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BadgeGenerate;
