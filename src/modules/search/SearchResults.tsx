import React from 'react';
import css from './SearchResults.module.scss';
import ProjectCard from './ProjectCard';
import { Project } from '../../types/common';
import {useTranslation} from "react-i18next";

type Props = {
  searchResults: Project[];
};

const SearchResults = ({ searchResults }: Props) => {
  const {t} = useTranslation();

  return (
    <div className={css.container}>
      <div className={css.titleContainer}>
        <h1>Vapaat asunnot</h1>
        <h2>{t('SEARCH:Welcome to React')}</h2>
        <div className={css.resultsCount}>Yhteensä {searchResults.length} huoneistoa</div>
      </div>
      <div className={css.resultWrapper}>
        {searchResults.map((x) => (
          <ProjectCard project={x} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
