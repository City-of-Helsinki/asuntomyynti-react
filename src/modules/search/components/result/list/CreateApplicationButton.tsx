import { useTranslation } from 'react-i18next';
import { Apartment } from '../../../../../types/common';
import css from './CreateApplicationButton.module.scss';

export type CreateApplicationButtonVariant = 'apply' | 'after-apply' | 'make-reservation';

type Props = {
  href: string;
  apartment: Apartment;
  variant: CreateApplicationButtonVariant;
};

const LABEL_KEYS: Record<CreateApplicationButtonVariant, string> = {
  apply: 'SEARCH:apply',
  'after-apply': 'SEARCH:after-apply',
  'make-reservation': 'SEARCH:make-reservation',
};

const CreateApplicationButton = ({ href, apartment, variant }: Props) => {
  const { t } = useTranslation();

  return (
    <a href={href} className={`${css.createApplicationButton} hds-button hds-button--primary hds-button--small`}>
      <span className="hds-button__label">
        {t(LABEL_KEYS[variant])}
        <span className="sr-only">
          , {t('SEARCH:apartment')} {apartment.apartment_number}
        </span>
      </span>
    </a>
  );
};

export default CreateApplicationButton;
