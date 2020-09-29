import React from 'react';
import css from './SearchContainer.module.css';
import ApartmentCard from "./ApartmentCard";
import ProjectCard from "./ProjectCard";

const SearchContainer = () => {
  return (
    <div className={css.App}>
      <div>Search parameters here</div>
      <div>Notification here?</div>
      <div>Search results or map here</div>
      <div>Free apartments or map here</div>
      <ProjectCard />
    </div>
  );
}

export default SearchContainer;
