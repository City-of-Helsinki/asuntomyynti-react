import { useEffect, useState } from 'react';

type Props = {
  defaultValue: any;
  key: string;
};

const useSessionStorageState = ({ defaultValue, key }: Props) => {
  const [value, setValue] = useState(() => {
    const storageValue = sessionStorage.getItem(key);
    return storageValue !== null && storageValue !== undefined ? JSON.parse(storageValue) : defaultValue;
  });

  useEffect(() => {
    if (value === undefined) {
      sessionStorage.removeItem(key);
    } else {
      sessionStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue];
};

export default useSessionStorageState;
