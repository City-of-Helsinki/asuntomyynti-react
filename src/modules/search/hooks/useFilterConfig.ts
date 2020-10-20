import { fetchFilterConfig } from '../../../utils/fetchFilterConfig';
import { useQuery } from 'react-query';
import { enhanceConfig } from '../../../utils/enhanceConfig';

const DAY_IN_SECONDS = 86400;

const useFilterConfig = () => {
  const { data } = useQuery('filterConfig', fetchFilterConfig, {
    staleTime: DAY_IN_SECONDS,
    initialStale: true,
    initialData: {},
  });
  return enhanceConfig(data || {});
};

export default useFilterConfig;
