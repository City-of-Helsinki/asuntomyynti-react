import React from 'react';
import { Notification } from 'hds-react';
import { useTranslation } from 'react-i18next';

const ErrorToast = () => {
  const { t } = useTranslation();

  return (
    <Notification label={t('SEARCH:error')} position="top-right" autoClose type="error">
      {t('SEARCH:something-wrong')}
    </Notification>
  );
};

export default ErrorToast;
