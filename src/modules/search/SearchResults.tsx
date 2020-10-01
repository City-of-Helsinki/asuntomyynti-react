import React from 'react';
import css from './SearchResults.module.scss';
import ProjectCard from './ProjectCard';
import { Project } from '../../types/common';

type Props = {
  searchResults: Project[];
};

const SearchResults = ({ searchResults }: Props) => {
  return (
    <div className={css.container}>
      <div className={css.titleContainer}>
        <h1>Vapaat asunnot</h1>
        <div className={css.resultsCount}>Yhteensä 179 huoneistoa</div>
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
