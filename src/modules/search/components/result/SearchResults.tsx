import React from 'react';
import css from './SearchResults.module.scss';
import ProjectCard from './ProjectCard';
import { Project } from '../../../../types/common';
import { useTranslation } from 'react-i18next';
import { Button, IconMap } from 'hds-react';

type Props = {
  searchResults: Project[];
  header: string;
  openMap?: () => void;
  showSearchAlert?: boolean;
};

const SearchResults = ({ searchResults, header, openMap, showSearchAlert = false }: Props) => {
  const { t } = useTranslation();

  return (
    <div className={css.container}>
      <header>
        <div className={css.titleContainer}>
          <h1>{header}</h1>
          <div className={css.resultsCount}>
            {t('SEARCH:total')} {searchResults.length} {t('SEARCH:apartments')}
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
          <ProjectCard key={x.id} project={x} showSearchAlert={showSearchAlert} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
