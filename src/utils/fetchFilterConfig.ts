// TODO: look into react-query for caching and such
import { BaseFilterConfigs } from '../types/common';
import axios from 'axios';

export const fetchFilterConfig = async (): Promise<BaseFilterConfigs> => {
  const { data } = await axios.get('/fi/filters');
  return data;
};
