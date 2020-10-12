import React from 'react';
import css from './SearchResults.module.scss';
import ProjectCard from './ProjectCard';
import { Project } from '../../../../types/common';
import { useTranslation } from 'react-i18next';

type Props = {
  searchResults: Project[];
};

const SearchResults = ({ searchResults }: Props) => {
  const { t } = useTranslation();

  return (
    <div className={css.container}>
      <div className={css.titleContainer}>
        <h1>{t('SEARCH:free-apartments')}</h1>
        <div className={css.resultsCount}>
          {t('SEARCH:total')} {searchResults.length} {t('SEARCH:apartments')}
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
