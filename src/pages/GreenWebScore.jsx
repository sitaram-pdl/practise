import { useLocation, useParams } from 'react-router-dom';
import Plane from '@/assets/icons/plane.svg';
import Tree from '@/assets/icons/tree.svg';
import AppShared from '@/components/landing/AppShared';
import LoadingData from '@/components/LoadingData';
import GetBadges from '@/components/badge/GetBadge';
import classes from '@/scss/GreenWebScore.module.scss';
import checkGreenHolder from '@/utils/checkGreen.utils';
import { fetchGreenScorefromID } from '@/services/GreenScore/greenscore.api';
import { useEffect, useState } from 'react';

function GreenWebScore() {
  const location = useLocation();
  const [scoreState, setScoreState] = useState(location?.state?.response);
  const { id } = useParams();
  let websiteUrl = scoreState?.websiteUrl;

  useEffect(() => {
    if (location?.state) {
      websiteUrl = location?.state?.url;
    } else {
      async function fetchData() {
        const response = await fetchGreenScorefromID(id);
        if (!response) throw new Error('No response found!');
        setScoreState(response);
      }
      fetchData();
      websiteUrl = scoreState?.websiteUrl;
    }
  }, []);

  return scoreState ? (
    <>
      <header className="container-fluid p-0">
        <div
          className={`${classes['header']} ${
            classes[checkGreenHolder(scoreState?.greenScore)]
          }`}
          style={{ paddingTop: 98 }}
        >
          <div
            className={`row item-center ${classes['score-content']}`}
            style={{ marginRight: 0 }}
          >
            <p className={classes['result-url']}>results for {websiteUrl}</p>
            <p className={`f-p mt-1 ${classes['green-score-title']}`}>
              your green score
            </p>
            <div className="row" style={{ marginRight: 0 }}>
              <span className={`f-p ${classes['green-score']}`}>
                {scoreState?.greenScore}
              </span>
              <span className="f-p" style={{ marginTop: -3 }}>
                out of 100
              </span>
            </div>

            <p className={`f-p ${classes['green-score-result']}`}>
              You are greener than <br /> {scoreState?.greenScoreRate}% of
              websites on our database
            </p>
            <p className={classes['url-detail']}>{websiteUrl} produces</p>
            <p className={`f-p mt-2 ${classes['co2-score']}`}>
              {scoreState?.emissionPerThousand} kilograms
            </p>
            <p className={`mt-1 ${classes['co2-res']}`}>
              of CO2 per 1000 visitors, this represents:
            </p>
            <div className={`row`} style={{ marginTop: 45, marginRight: 0 }}>
              <div
                className="col-12 d-flex justify-content-center"
                style={{ marginRight: '5rem' }}
              >
                <div className="float-end">
                  <img height="111px" width="111px" src={Plane} />
                  <div className={`mt-1 ${classes['cmn-score']}`}>
                    <p className="f-p" style={{ lineHeight: 1.5 }}>
                      {scoreState?.energyConsumptionPerThousand} kWh of energy
                    </p>
                    <p className={classes['cmn-content']}>
                      That’s enough electricity to <br />
                      drive an electric car{' '}
                      {scoreState?.energyEquivalentDistance} km.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="row"
              style={{
                marginTop: 64,
                marginBottom: 73,
                marginRight: 0,
              }}
            >
              <div className="col-12">
                <img height="69.2px" width="93.85px" src={Tree} />
                <div className={classes['cmn-content']}>
                  <p style={{ lineHeight: 1.5 }}>enough CO2 to keep</p>
                  <p
                    className={`f-p ${classes['cmn-score']}`}
                    style={{ lineHeight: 1.15 }}
                  >
                    {scoreState?.treeEquivalent?.numberOfTrees} trees
                  </p>
                  <p
                    className={classes['cmn-content']}
                    style={{ lineHeight: 1.15 }}
                  >
                    busy for
                  </p>
                  <p
                    className={`f-p ${classes['cmn-score']}`}
                    style={{ lineHeight: 1.15 }}
                  >
                    {scoreState?.treeEquivalent?.duration}{' '}
                    {scoreState?.treeEquivalent?.durationUnit}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="container my-container body ">
        <div className="second-content">
          <p>how to get greener?</p>
          <p style={{ marginTop: 25, fontSize: 24 }}>contact us</p>
          <div className="row">
            <input
              className={`col-6 form-control ${classes['form-control']} search-div mx-auto`}
              style={{ marginTop: 20, width: 406 }}
              type="search"
              id="jobSearchText"
              placeholder="your name"
            />
          </div>
          <div className="row">
            <input
              className={`col-6 form-control ${classes['form-control']} search-div mx-auto`}
              style={{ marginTop: 20, width: 406 }}
              type="search"
              id="jobSearchText"
              placeholder="your email address"
            />
          </div>
          <div className="row">
            <button
              className="col-6 btn btn-sm btn-outline-secondary button-content button__signup mx-auto"
              type="button"
              style={{ height: 40, marginTop: 33 }}
            >
              I’m interested
            </button>
          </div>
        </div>
      </section>

      <AppShared />
      <GetBadges />
    </>
  ) : (
    <LoadingData />
  );
}

export default GreenWebScore;
