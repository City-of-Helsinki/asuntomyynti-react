import React from 'react';
import css from './ProjectCard.module.css';



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
            <button className={css.apartmentListButton}>78 huoneistoa haettavana</button>
          </div>
        </div>
      </div>
      <div className={css.apartmentList}>
      </div>
    </div>
  );
}

export default ProjectCard;
