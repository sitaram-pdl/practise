import classes from '@/scss/common/AppShared.module.scss';
import { ValidateEmail } from './../../utils/validate.utils';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { postSubscription } from '@/services/Category/categoryScore.api';

function AppShared() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const validEmail = ValidateEmail(email);
      if (!validEmail) {
        return toast.error('Provided Email is wrong!');
      }
      const res = await postSubscription(email);
      if (res.status === 'success') event.target.reset();
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div className={`second-content ${classes['second-content']}`}>
        learn more about <br /> web sustainability?
      </div>
      <div className={`card m-auto mt-4" ${classes['card-detail']}`}>
        <div className={`card-body ${classes['card-body']}`}>
          <div className={`card-title ${classes['card-title']}`}>
            join the greenWeb newsletter
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className={`col-12 d-flex  ${classes['sm-screen']}`}>
                <input
                  className={`form-control search-div ${classes['search-div']} ${classes['form-control']}`}
                  type="search"
                  id="jobSearchText"
                  placeholder="your email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  className={`btn btn-sm btn-outline-secondary button__signup ${classes['button__signup']} ${classes['signup-btn']}`}
                  type="submit"
                >
                  <div
                    className={`button-content ${classes['button-content']}`}
                  >
                    sign up
                  </div>
                </button>
              </div>
            </div>
          </form>
          <div
            className={`row ${classes['news-footer-content']} ${classes['sm-center']}`}
            style={{ marginTop: 14 }}
          >
            The greenWeb team will send you occasional updates on web
            accessibility and sustainability. There will be no spam, only
            high-quality information.
          </div>
        </div>
      </div>
    </>
  );
}

export default AppShared;
