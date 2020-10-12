export const getParamsByName = (searchParams: URLSearchParams, name: string, defaultValue?: any) => {
  const currentValue = searchParams.get(name);
  if (currentValue) {
    return currentValue.split(',');
  }
  return defaultValue;
};
