import Modal from './Modal';
import Alphabet from '@/assets/images/websites/alphabet-score.png';

export function ImagePopUp({ popUpImage, show, setShow }) {
  return (
    <Modal show={show} setShow={setShow} style={{ width: '300px' }}>
      <img src={popUpImage} alt="score" style={{ width: '100%' }} />
    </Modal>
  );
}

export default ImagePopUp;
