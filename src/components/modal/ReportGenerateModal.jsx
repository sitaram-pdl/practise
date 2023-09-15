import Modal from '../Modal';
import styles from './Modal.module.scss';
import { AiOutlineFileText } from 'react-icons/ai';

function ReportGenerateModal({ show, setShow, showIcon = false }) {
  return (
    <Modal
      show={show}
      setShow={setShow}
      showHeader={false}
      style={{ width: '90%', maxWidth: '27rem' }}
    >
      <div className={styles.badge}>
        <p className={styles.heading}>Regenerating Report..</p>
        <span className={styles.subheading}>
          This may take a <strong>while!</strong>
        </span>

        <div className={styles.loaderParent}>
          <div className={styles.loader}></div>

          {showIcon && (
            <div className={styles.icons}>
              <AiOutlineFileText size={40} />
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default ReportGenerateModal;
