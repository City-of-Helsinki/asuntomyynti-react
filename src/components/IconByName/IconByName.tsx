import React from 'react';
import { IconHome, IconLocation, IconProps } from 'hds-react';
import useFilter from '../../hooks/useFilter';

type Props = {
  name: string;
} & IconProps;

const IconByName = ({ name, ...rest }: Props) => {
  const { icon } = useFilter(name);

  switch (icon) {
    case 'location':
      return <IconLocation {...rest} />;
    case 'home':
      return <IconHome {...rest} />;
    default:
      return null;
  }
};

export default IconByName;
