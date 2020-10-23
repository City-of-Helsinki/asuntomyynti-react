import { useLocation } from 'react-router-dom';

const useSearchParams = () => {
  return new URLSearchParams(useLocation().search);
};

export default useSearchParams;
