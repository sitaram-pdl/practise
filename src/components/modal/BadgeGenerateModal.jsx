import { BsShield } from 'react-icons/bs';
import Modal from '../Modal';
import styles from './Modal.module.scss';
import BadgeComponent from './BadgeCointainer';

function BadgeGenerateModel({ show, setShow, showIcon = false }) {
  return (
    <Modal
      show={show}
      setShow={setShow}
      showHeader={false}
      style={{ width: '90%', maxWidth: '32rem' }}
    >
      <BadgeComponent show={show} setShow={setShow} />
    </Modal>
  );
}

export default BadgeGenerateModel;
