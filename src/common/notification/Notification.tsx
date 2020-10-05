import css from './Notification.module.scss';
import React from 'react';
import { IconEnvelope, IconCross } from 'hds-react';

const Notification = ({ message }: { message: string }) => {
  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <div className={css.content}>
          <IconEnvelope style={{ marginRight: 26 }} size={'xl'} role="presentation" />
          <div>{message}</div>
        </div>
        <IconCross className={css.closeIcon} size={'s'} role="presentation" />
      </div>
    </div>
  );
};

export default Notification;
