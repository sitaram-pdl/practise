import { useState, useEffect, useRef } from 'react';
import contentArray from '@/assets/content.json';
import classes from '@/scss/LoadingModel.module.scss';
import Modal from './Modal';

function LoadingModel() {
  const [progressContent, setProgressContent] = useState(
    contentArray[Math.floor(Math.random() * contentArray.length)],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const content =
        contentArray[Math.floor(Math.random() * contentArray.length)];
      setProgressContent(content);
    }, [5000]);
    return () => clearInterval(interval);
  }, []);

  const openSourceLink = (progressContent) => {
    window.open(progressContent.reference, '_blank');
  };

  return (
    <Modal
      showHeader={false}
      show={true}
      closeAllow={false}
      contentStyle={{ padding: 0 }}
      style={{ width: '100%', maxWidth: '800px' }}
    >
      <div className="p-0" style={{ margin: 20, border: '2px solid #1B9876' }}>
        <div className={`row ${classes['comma-css']}`}>“</div>
        <div className={`row success-color ${classes['content-container']}`}>
          <p className={classes['progress-content']}>
            {progressContent?.title}
          </p>

          <p
            className={`${classes['source-css']} p-cursor`}
            onClick={() => openSourceLink(progressContent)}
          >
            source: {progressContent?.source}
          </p>
        </div>
        <div
          className="d-flex flex-row justify-content-center align-items-center"
          style={{
            height: 113,
            background: '#1B9876',
            margin: '39px 0 0',
          }}
        >
          <div className={classes['loading-css']}>loading</div>
          <div
            className={`${classes['la-ball-pulse']} ${classes['la-2x']}success-color"`}
          >
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default LoadingModel;
