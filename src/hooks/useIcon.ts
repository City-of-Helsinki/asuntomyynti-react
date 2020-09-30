import { IconHome, IconLocation } from 'hds-react';

const useIcon = (name: string) => {
  switch (name) {
    case 'param1':
      return IconLocation;
    case 'param2':
      return IconHome;
    default:
      return null;
  }
};

export default useIcon;
