import Modal from '../Modal';

function EmissionInfoModal({ setShow, show }) {
  const handleClose = () => setShow(false);
  return (
    <Modal
      title={<p className="emission-title text-center">Note</p>}
      showCloseBtn={false}
      show={show}
      setShow={setShow}
      style={{ maxWidth: '35rem' }}
    >
      <div className="px-4 emission-body">
        <p className="mb-4 text-center font-500 ">
          All figures indicate Hong Kong data except those shown in italics
          which are global data provided by the listed companies.
        </p>
        <p className="mb-4 text-center font-500 ">
          The information in <strong>bold</strong> are of those listed companies
          which help pledged to submit their reporting forms for disclosure on
          this website.
        </p>

        <div className="d-flex justify-content-center outline-0">
          <button className="btn-dismiss rounded-pill" onClick={handleClose}>
            Dismiss
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default EmissionInfoModal;
