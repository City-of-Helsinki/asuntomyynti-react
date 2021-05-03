import React from 'react';
import { IconArrowDown, IconCross, Button } from 'hds-react';
import { useTranslation } from 'react-i18next';

import { Project } from '../../../../../types/common';
import { getLanguageFilteredApartments } from '../../../utils/getLanguageFilteredApartments';
import { fullURL } from '../../../utils/fullURL';

import css from './MapProjectPopupCard.module.scss';

type Props = {
  project: Project;
  currentLang: string;
  onCloseBtnClick: () => void;
  onApartmentsBtnClick: () => void;
};

const MapProjectPopupCard = ({ project, currentLang, onCloseBtnClick, onApartmentsBtnClick }: Props) => {
  const { t } = useTranslation();
  const { apartments, housing_company, main_image_url, ownership_type, url, state_of_sale } = project;
  const filteredApartments = getLanguageFilteredApartments(apartments, currentLang);
  const hasApartments = !!filteredApartments.length;

  return (
    <>
      {main_image_url && (
        <div className={css.mapProjectDetailImage}>
          <img src={fullURL(main_image_url)} alt={`${housing_company}, ${t('SEARCH:project-main-image')}`} />
        </div>
      )}
      <button className={css.closeIcon} onClick={() => onCloseBtnClick()} aria-label={t('SEARCH:hide-project')}>
        <IconCross aria-hidden="true" />
      </button>
      <span className={css.label}>{ownership_type}</span>
      <div className={css.projectDetails}>
        {t(`ES:${state_of_sale}`)}
        <h3>{housing_company}</h3>
      </div>

      <div className={css.buttons}>
        {url && (
          <a
            href={fullURL(url)}
            className={`${css.getToKnowButton} hds-button hds-button--secondary hds-button--small`}
          >
            {t('SEARCH:learn-more')}
          </a>
        )}
        {hasApartments && (
          <Button
            className={css.apartmentListButton}
            onClick={() => onApartmentsBtnClick()}
            variant="supplementary"
            iconRight={<IconArrowDown aria-hidden="true" />}
          >
            <span className="sr-only">{t('SEARCH:show-all')}</span> {filteredApartments.length} {t('SEARCH:apartments')}
          </Button>
        )}
      </div>
    </>
  );
};

export default MapProjectPopupCard;
