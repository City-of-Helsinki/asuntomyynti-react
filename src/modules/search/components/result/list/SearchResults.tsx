import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, IconMap, Tooltip } from 'hds-react';
import ProjectCard from './ProjectCard';
import { DataConfig, Project } from '../../../../../types/common';
import { calculateApartmentCount } from '../../../utils/calculateApartmentCount';
import css from './SearchResults.module.scss';

type Props = {
  config: DataConfig | undefined;
  searchResults: Project[];
  header: string;
  openMap?: () => void;
  showSubscribeButton?: boolean;
  currentLang: string;
  resultCountByProjects?: boolean;
  hideApartments?: boolean;
  tooltipText?: string;
};

const SearchResults = ({
  config,
  searchResults,
  header,
  openMap,
  showSubscribeButton = false,
  currentLang,
  resultCountByProjects = false,
  hideApartments = false,
  tooltipText = '',
}: Props) => {
  const { t } = useTranslation();

  return (
    <section className={css.container} aria-label={header}>
      <header>
        <div className={css.titleContainer}>
          <h2>
            {header}
            {tooltipText && (
              <Tooltip className={css.inlineTooltip} placement={'auto'} buttonLabel={t('SEARCH:aria-info-tooltip')}>
                {tooltipText}
              </Tooltip>
            )}
          </h2>
          <div className={css.resultsCount}>
            {t('SEARCH:total')}{' '}
            {resultCountByProjects
              ? `${searchResults.length} ${t('SEARCH:projects')}`
              : `${calculateApartmentCount(searchResults, currentLang)} ${t('SEARCH:apartments')}`}
          </div>
        </div>
        {openMap && (
          <div>
            <Button className={css.showButton} variant="secondary" onClick={openMap}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <IconMap style={{ marginRight: 20 }} aria-hidden="true" /> {t('SEARCH:show-on-map')}
              </div>
            </Button>
          </div>
        )}
      </header>
      <ul className={css.resultWrapper}>
        {searchResults.map((x) => (
          <li key={x.id}>
            <ProjectCard
              config={config}
              project={x}
              showSubscribeButton={showSubscribeButton}
              currentLang={currentLang}
              hideApartments={hideApartments}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SearchResults;
