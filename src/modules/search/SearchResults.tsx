import React from 'react';
import css from './SearchResults.module.scss';
import ProjectCard from './ProjectCard';

const SearchResults = () => {
  return (
    <div className={css.container}>
      <div className={css.titleContainer}>
        <h1>Vapaat asunnot</h1>
        <div className={css.resultsCount}>Yhteensä 179 huoneistoa</div>
      </div>
      <div className={css.resultWrapper}>
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
    </div>
  );
};

export default SearchResults;
