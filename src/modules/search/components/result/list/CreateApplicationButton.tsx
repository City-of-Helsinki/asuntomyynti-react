import { useTranslation } from 'react-i18next';
import React from 'react';
import { Apartment } from '../../../../../types/common';
import css from './CreateApplicationButton.module.scss';

type Props = {
  href: string;
  apartment: Apartment;
  showAfterApplicationLabel: boolean;
};

const CreateApplicationButton = ({ href, apartment, showAfterApplicationLabel }: Props) => {
  const { t } = useTranslation();

  return (
    <a
      href={href}
      className={`${css.createApplicationButton} hds-button hds-button--primary hds-button--small`}
    >
      <span className="hds-button__label">
        {showAfterApplicationLabel ? t('SEARCH:after-apply') : t('SEARCH:apply')}
        <span className="sr-only">
          , {t('SEARCH:apartment')} {apartment.apartment_number}
        </span>
      </span>
    </a>
  );
};

export default CreateApplicationButton;
