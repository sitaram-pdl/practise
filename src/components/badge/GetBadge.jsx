import Logo from '@/assets/images/logo.svg';
import classes from '@/scss/common/GetBadge.module.scss';
import { useNavigate } from 'react-router-dom';

function GetBadges() {
  const navigate = useNavigate();

  return (
    <div className="item-center" style={{ marginTop: 79 }}>
      <div
        className={`card ${classes['claim-certification-card']}  p-cursor`}
        onClick={() => navigate('/greenweb-badge')}
      >
        <div
          className={`${classes['card-header']} p-content"`}
          style={{
            fontSize: 26,
            color: '#fff',
            fontWeight: 600,
            lineHeight: '150%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          claim and download your greenWeb certificate here
        </div>
        <div className={classes['card-body']}>
          <div className={classes['card-title']}>
            <img src={Logo} alt="greenWeb" />
          </div>
          <p className="p-content" style={{ textAlign: 'center' }}>
            The green<span style={{ color: '#1B9876' }}>Web</span> team designed
            this website's carbon calculator to inspire and enlighten people
            about the importance of creating websites with low carbon emissions.
          </p>
        </div>
      </div>
    </div>
  );
}

export default GetBadges;
