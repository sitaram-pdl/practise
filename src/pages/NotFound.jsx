import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="container" style={{ marginTop: 120 }}>
      <h1
        style={{ fontWeight: 700, fontFamily: 'lato, sans-serif' }}
        className="row justify-content-center mb-4"
      >
        404
      </h1>
      <h3 className="row justify-content-center mb-4">Page Not Found</h3>
      <div className="d-flex justify-content-center">
        <button className="btn btn-success" onClick={() => navigate('/')}>
          Home
        </button>
      </div>
    </div>
  );
}

export default NotFound;
