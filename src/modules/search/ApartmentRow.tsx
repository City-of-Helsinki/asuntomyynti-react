import React from 'react';
import css from './ApartmentRow.module.css';



const ApartmentRow = () => {
  return (
    <div className={css.container}>
      <div className={css.cell} style={{flex: 2}}>
        <strong>A75</strong>
        <div>4h, kt, s </div>
      </div>
      <div className={css.cell} style={{flex: 1}}>7 / 7</div>
      <div className={css.cell} style={{flex: 1}}>85,0 m²</div>
      <div className={css.cell} style={{flex: 1}}>378 128 €</div>
      <div className={css.cell} style={{flex: 1}}>Ei hakijoita</div>
      <div className={css.cell} style={{flex: 3}}>
        <button className={css.getToKnowButton}>Tutustu</button>
        <button className={css.createApplicationButton}>Luo hakemus</button>
      </div>
    </div>
  );
}

export default ApartmentRow;
