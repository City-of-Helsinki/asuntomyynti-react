import React, {useState} from 'react';
import css from './ProjectCard.module.css';
import ApartmentRow from "./ApartmentRow";
import {IconArrowDown, IconArrowUp, IconCogwheel, IconClock} from "hds-react";


const ProjectCard = () => {
  const [listOpen, setListOpen] = useState(false);

  const toggleList = () => {
    setListOpen(!listOpen);
  }

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
              <div className={css.completionTime}><IconCogwheel style={{marginRight: 10}} role="presentation" />Valmistuu 06–08/2020</div>
              <div className={css.applicationTime}><IconClock style={{marginRight: 10}} role="presentation" />Haku avoinna 30.5.2020 klo 12.00 asti</div>
            </div>
          </div>
          <div className={css.controls}>
            <button className={css.detailsButton}>Tutustu kohteeseen</button>
            <button className={css.apartmentListButton} onClick={toggleList}>
              78 huoneistoa haettavana {listOpen ? <IconArrowDown role="presentation" style={{marginLeft: 10}} /> : <IconArrowUp role="presentation" style={{marginLeft: 10}} />}
            </button>
          </div>
        </div>
      </div>
      {listOpen && <div className={css.apartmentList}>
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
      </div>}
    </div>
  );
}

export default ProjectCard;
