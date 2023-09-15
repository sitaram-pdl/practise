import { getToken } from '@/utils/storage.utils';
import React, { useEffect, useState } from 'react';
import { Routes, useLocation, useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import { ScaleLoader, BarLoader } from 'react-spinners';

const LoaderWrapper = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {loading && (
        <div className="ui-loader">
          <div className="loader-progress">
            <BarLoader height={'100%'} width="100%" color="#10d4e9" />
            {/* <div className="loader-progress-bar" /> */}
          </div>

          <ScaleLoader color="#10d4e9" width={7} height={50} margin={4} />
        </div>
      )}
      <Routes>{children}</Routes>
    </>
  );
};

export default LoaderWrapper;
