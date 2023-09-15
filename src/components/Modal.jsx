import { useEffect } from 'react';
import { createPortal } from 'react-dom';
function Modal({
  children,
  show,
  setShow,
  style,
  title = '',
  showHeader = true,
  contentStyle,
  closeAllow = true,
  backgroundCloseAllow = true,
  showCloseBtn = true,
}) {
  const handleClose = () => {
    if (closeAllow) {
      setShow(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return createPortal(
    <>
      {backgroundCloseAllow ? (
        <div
          className={`backdrop ${show ? 'show' : ''}`}
          onClick={handleClose}
        ></div>
      ) : (
        <div className={`backdrop ${show ? 'show' : ''}`}></div>
      )}
      <div className={`custom-modal ${show ? 'show' : ''}`} style={style}>
        {showHeader && (
          <div className="header">
            <div className={`title ${showCloseBtn ? '' : 'w-100'}`}>
              {title}
            </div>
            {showCloseBtn && (
              <a
                className="close"
                aria-label="Close"
                onClick={handleClose}
                style={{
                  cursor: 'pointer',
                  textDecoration: 'none',
                  fontSize: '1.75rem',
                  color: '#223333',
                }}
              >
                <span aria-hidden="true">&times;</span>
              </a>
            )}
          </div>
        )}
        <div className="modal-content" style={contentStyle}>
          {children}
        </div>
      </div>
    </>,
    document.getElementById('modal'),
  );
}

export default Modal;
