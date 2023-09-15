import classes from '@/scss/landing/LandingPage.module.scss';
import Modal from './Modal';

function ErrorModel({ dismissModal }) {
  return (
    <Modal
      showHeader={false}
      show={true}
      contentStyle={{ padding: 0 }}
      style={{ width: '100%', maxWidth: '800px' }}
    >
      <div
        className="modal-body f-p"
        style={{
          margin: 20,
          padding: '20px',
          border: '2px solid #C95339',
        }}
      >
        <div className="row">
          <i
            className={`far fa-times-circle ${classes['icons']} p-cursor`}
            onClick={dismissModal}
          ></i>
        </div>
        <div className="row error-color" style={{ margin: '44px 0 93px 0' }}>
          <p className={classes['error-title-css']}>Something went wrong.</p>
          <p className={classes['error-title-css']}>
            Please enter a valid URL.
          </p>
          <p className={classes['error-css']}>e.g. https://www.google.com</p>
        </div>
      </div>
    </Modal>
  );
}

export default ErrorModel;
