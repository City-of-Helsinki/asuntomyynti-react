import { useQuery } from 'react-query';
import axios from 'axios';
import { enhanceConfig } from '../../../utils/enhanceConfig';
import useSearchParams from '../../../hooks/useSearchParams';

const DAY_IN_SECONDS = 86400;

const filterPath = process.env.REACT_APP_FILTERS_PATH || 'filters';

const useFilterConfig = () => {
  const searchParams = useSearchParams();
  const language = searchParams.get('lang') || 'fi';

  const fetchFilterConfig = async () => {
    const { data } = await axios.get(`/${language}/${filterPath}`);
    return enhanceConfig(data);
  };

  return useQuery('filterConfig', fetchFilterConfig, {
    staleTime: DAY_IN_SECONDS,
    initialStale: true,
  });
};

export default useFilterConfig;
