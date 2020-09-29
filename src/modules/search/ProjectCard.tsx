import React from 'react';
import css from './ProjectCard.module.css';
import ApartmentRow from "./ApartmentRow";
import {IconArrowDown} from "hds-react";


const ProjectCard = () => {
  return (
    <div className={css.container}>
      <div className={css.content}>
        <div className={css.imageContainer}>
          <img src={"http://placekitten.com/600/400"} />
        </div>
        <div className={css.info}>
          <div className={css.details}>
            <div className={css.titles}>
              <h2 style={{marginBottom: 5}}>Hylkeenkivi</h2>
              <div style={{marginBottom: 5}}>Herttoniemi, Hitsaajankatu 3 </div>
              <span className={css.label}>Hitas</span>
            </div>
            <div className={css.deadlines}>
              <div style={{marginBottom: 10}}>Valmistuu 06–08/2020</div>
              <div>Haku avoinna 30.5.2020 klo 12.00 asti</div>
            </div>
          </div>
          <div className={css.controls}>
            <button className={css.detailsButton}>Tutustu kohteeseen</button>
            <button className={css.apartmentListButton}>
              78 huoneistoa haettavana <IconArrowDown role="presentation" style={{marginLeft: 10}} />
            </button>
          </div>
        </div>
      </div>
      <div className={css.apartmentList}>
        <div className={css.apartmentListTable}>
          <div className={css.apartmentListHeaders}>
            <div className={css.headerCell} style={{flex: 2}}>Huoneisto</div>
            <div className={css.headerCell} style={{flex: 1}}>Kerros</div>
            <div className={css.headerCell} style={{flex: 1}}>Pinta-ala</div>
            <div className={css.headerCell} style={{flex: 1}}>Velaton hinta</div>
            <div className={css.headerCell} style={{flex: 1}}>Hakijatilanne</div>
            <div className={css.headerCell} style={{flex: 3}}></div>
          </div>
          <ApartmentRow />
        </div>
        <div className={css.pagination}></div>
      </div>
    </div>
  );
}

export default ProjectCard;
