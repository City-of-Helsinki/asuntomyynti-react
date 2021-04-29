import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, IconMap } from 'hds-react';
import ProjectCard from './ProjectCard';
import { DataConfig, Project } from '../../../../../types/common';
import { calculateApartmentCount } from '../../../utils/calculateApartmentCount';
import css from './SearchResults.module.scss';

type Props = {
  config: DataConfig | undefined;
  searchResults: Project[];
  header: string;
  openMap?: () => void;
  showSearchAlert?: boolean;
  currentLang: string;
};

const SearchResults = ({ config, searchResults, header, openMap, showSearchAlert = false, currentLang }: Props) => {
  const { t } = useTranslation();

  return (
    <div className={css.container}>
      <header>
        <div className={css.titleContainer}>
          <h2>{header}</h2>
          <div className={css.resultsCount}>
            {t('SEARCH:total')} {calculateApartmentCount(searchResults, currentLang)} {t('SEARCH:apartments')}
          </div>
        </div>
        {openMap && (
          <div>
            <Button className={css.showButton} variant="secondary" onClick={openMap}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <IconMap style={{ marginRight: 20 }} /> {t('SEARCH:show-on-map')}
              </div>
            </Button>
          </div>
        )}
      </header>
      <div className={css.resultWrapper}>
        {searchResults.map((x) => (
          <ProjectCard
            config={config}
            key={x.id}
            project={x}
            showSearchAlert={showSearchAlert}
            currentLang={currentLang}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
