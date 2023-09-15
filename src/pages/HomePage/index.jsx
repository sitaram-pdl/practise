import CheckGreen from '@/components/landing/checkGreen';

import { WebsiteScore } from '@/assets/score';
import ImagePopUp from '@/components/ImagePopup';
import GetBadges from '@/components/badge/GetBadge';
import AppShared from '@/components/landing/AppShared';
import classes from '@/scss/landing/LandingPage.module.scss';
import { useState } from 'react';

function HomePage() {
  const [show, setShow] = useState();
  const [popUpImage, setPopUpImage] = useState();
  const handleModelClick = (score) => {
    setShow(true);
    setPopUpImage(score);
  };
  return (
    <>
      <CheckGreen />
      {show && (
        <ImagePopUp popUpImage={popUpImage} show={show} setShow={setShow} />
      )}
      <section className="container-fluid">
        <div className="body">
          <div className="row justify-content-center">
            <div className={`col-7 first-content ${classes['first-content']}`}>
              The CO2 footprint of the Internet's data centers alone may already
              be comparable to that of global air travel. The good news is that
              a growing number of major Internet corporations are becoming more
              environmentally conscientious, opting for more renewable energy
              sources for their data centers and operations.
            </div>
          </div>
          <div className={`second-content`}>
            sustainable <br /> example websites
          </div>
          <div className="third-content">
            {WebsiteScore.map((website, index) => {
              return (
                <div
                  className={`d-flex justify-content-center search-sm ${classes['search-sm']} flex-md-row`}
                  key={`parent-${index}`}
                >
                  {website.map((el, indexChild) => {
                    return (
                      <div
                        className={`d-flex flex-column card-section ${classes['card-section']} justify-content-sm-center card-hover ${classes['card-hover']}`}
                        onClick={() => handleModelClick(el.score)}
                        key={`child-${indexChild}`}
                      >
                        <div
                          className={`card card-extend ${classes['card-extend']}`}
                        >
                          <img
                            src={el.coverImage}
                            className={classes['card-img']}
                            alt={el.title}
                          />
                        </div>
                        <div
                          className={`card-content ${classes['card-content']} mt-4`}
                        >
                          <p className="c-title m-0">{el.title}</p>
                          <p className="c-content m-0">
                            {el.content}/per visit
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          <div className="row justify-content-center">
            <div className={`col-7 first-content ${classes['first-content']}`}>
              These websites avoid bloated frameworks by using compressed
              graphics, efficient file formats, and lightweight fonts. Check out
              our information on developing sustainable websites and
              establishing a page weight budget if you want to learn more.
            </div>
          </div>
          <div className=" item-center test-btn-section">
            <button
              className={`btn btn-sm btn-outline-secondary ml-3 button__signup button-content mt-4 ${classes['test-btn']}`}
              type="button"
              onClick={() => scroll(0, 0)}
            >
              <i className="fa fa-chevron-up"></i>
              <span style={{ marginLeft: 7 }}>test now</span>
            </button>
          </div>
        </div>
      </section>

      <AppShared />
      <GetBadges />
    </>
  );
}

export default HomePage;
