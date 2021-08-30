import React from 'react';
import { IconArrowDown, IconCross, Button } from 'hds-react';
import { useTranslation } from 'react-i18next';

import { Project } from '../../../../../types/common';
import { getLanguageFilteredApartments } from '../../../utils/getLanguageFilteredApartments';
import { fullURL } from '../../../utils/fullURL';
import Label from '../../../../../common/label/Label';

import css from './MapProjectPopupCard.module.scss';

type Props = {
  project: Project;
  currentLang: string;
  hideApartments?: boolean;
  activeProject: Project | undefined;
  onCloseBtnClick: () => void;
  onApartmentsBtnClick: () => void;
};

const MapProjectPopupCard = ({
  project,
  currentLang,
  hideApartments = false,
  activeProject,
  onCloseBtnClick,
  onApartmentsBtnClick,
}: Props) => {
  const { t } = useTranslation();
  const { apartments, id, housing_company, main_image_url, ownership_type, url, state_of_sale } = project;
  const filteredApartments = getLanguageFilteredApartments(apartments, currentLang);
  const hasApartments = !!filteredApartments.length;

  return (
    <>
      <div className={css.mapProjectDetailImage} aria-hidden="true">
        {main_image_url && <img src={fullURL(main_image_url)} alt="" />}
      </div>
      <button
        className={css.closeIcon}
        onClick={() => onCloseBtnClick()}
        aria-label={t('SEARCH:aria-hide-project-popup')}
      >
        <IconCross aria-hidden="true" />
      </button>
      <div className={css.labelWrap}>
        <Label type={ownership_type}>
          <>
            <span className="sr-only">{t('SEARCH:aria-ownership-type')}</span> {ownership_type}
          </>
        </Label>
      </div>
      <div className={css.projectDetails}>
        <span className="sr-only">{t('SEARCH:aria-state-of-sale')}, </span>
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
            <span className="sr-only">, {housing_company}</span>
          </a>
        )}
        {!hideApartments && hasApartments && (
          <Button
            className={css.apartmentListButton}
            onClick={() => onApartmentsBtnClick()}
            variant="supplementary"
            iconRight={<IconArrowDown aria-hidden="true" />}
            aria-haspopup="true"
            aria-controls={`map-project-popup-${id}`}
            aria-expanded={activeProject?.id === id ? true : false}
          >
            <span className="sr-only">{t('SEARCH:show-all')}</span> {filteredApartments.length} {t('SEARCH:apartments')}
          </Button>
        )}
      </div>
    </>
  );
};

export default MapProjectPopupCard;
