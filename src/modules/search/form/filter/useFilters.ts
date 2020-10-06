import { useEffect, useState } from 'react';
import { FilterConfig } from '../../../../types/common';
import { fetchFilterConfig } from '../../../../utils/helpers';

const useFilters = () => {
  const [config, setConfig] = useState<FilterConfig>({});

  useEffect(() => {
    const updateFilterConfig = async () => {
      const config = await fetchFilterConfig();
      setConfig(config);
    };
    updateFilterConfig();
  }, []);

  return config;
};

export default useFilters;
