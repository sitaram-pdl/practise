import { BarLoader } from 'react-spinners';

const LoadingData = () => {
  return (
    <div className="ui-loader ui-loader-full">
      <div className="loader-progress">
        <BarLoader height={'100%'} width="100%" color="#10d4e9" />
      </div>
    </div>
  );
};

export default LoadingData;
