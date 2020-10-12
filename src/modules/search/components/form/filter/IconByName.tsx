import React from 'react';
import { IconHome, IconLocation, IconProps } from 'hds-react';

type Props = {
  name: string;
} & IconProps;

const IconByName = ({ name, ...rest }: Props) => {
  switch (name) {
    case 'location':
      return <IconLocation {...rest} />;
    case 'home':
      return <IconHome {...rest} />;
    default:
      return null;
  }
};

export default IconByName;
