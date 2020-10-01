import React from 'react';
import { IconHome, IconLocation, IconProps } from 'hds-react';
import useConfig from '../../hooks/useConfig';

type Props = {
  name: string;
} & IconProps;

const IconByName = ({ name, ...rest }: Props) => {
  const { icon } = useConfig(name);

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
