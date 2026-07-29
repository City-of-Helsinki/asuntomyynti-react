import { useTranslation } from 'react-i18next';
import { Apartment } from '../../../../../types/common';
import css from './CreateApplicationButton.module.scss';

type Props = {
  href: string;
  apartment: Apartment;
  showAfterApplicationLabel: boolean;
  showMakeReservationLabel?: boolean;
};

const CreateApplicationButton = ({
  href,
  apartment,
  showAfterApplicationLabel,
  showMakeReservationLabel = false,
}: Props) => {
  const { t } = useTranslation();

  const label = showMakeReservationLabel
    ? t('SEARCH:make-reservation')
    : showAfterApplicationLabel
    ? t('SEARCH:after-apply')
    : t('SEARCH:apply');

  return (
    <a
      href={href}
      className={`${css.createApplicationButton} hds-button hds-button--primary hds-button--small`}
    >
      <span className="hds-button__label">
        {label}
        <span className="sr-only">
          , {t('SEARCH:apartment')} {apartment.apartment_number}
        </span>
      </span>
    </a>
  );
};

export default CreateApplicationButton;
