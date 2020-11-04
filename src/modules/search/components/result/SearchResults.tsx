import React from 'react';
import css from './SearchResults.module.scss';
import ProjectCard from './ProjectCard';
import { Project } from '../../../../types/common';
import { useTranslation } from 'react-i18next';
import { Button, IconMap } from 'hds-react';

type Props = {
  searchResults: Project[];
  openMap: () => void;
};

const SearchResults = ({ searchResults, openMap }: Props) => {
  const { t } = useTranslation();

  return (
    <div className={css.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '62px 48px 32px' }}>
        <div className={css.titleContainer}>
          <h1>{t('SEARCH:free-apartments')}</h1>
          <div className={css.resultsCount}>
            {t('SEARCH:total')} {searchResults.length} {t('SEARCH:apartments')}
          </div>
        </div>
        <div>
          <Button
            style={{ height: 56, margin: '.67em 0', display: 'flex', alignItems: 'center' }}
            variant="secondary"
            onClick={openMap}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <IconMap style={{ marginRight: 20 }} /> {'SEARCH:show-on-map'}
            </div>
          </Button>
        </div>
      </div>
      <div className={css.resultWrapper}>
        {searchResults.map((x) => (
          <ProjectCard key={x.id} project={x} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
