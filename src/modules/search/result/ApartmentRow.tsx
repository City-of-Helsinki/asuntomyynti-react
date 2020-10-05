import React from 'react';
import css from './ApartmentRow.module.scss';
import {Apartment} from "../../../types/common";

const ApartmentRow = ({apartment}: {apartment: Apartment}) => {
  const {
    apartment_number,
    apartment_structure,
    application_url,
    floor,
    living_area,
    sales_price
  } = apartment;

  return (
    <div className={css.container}>
      <div className={css.cell} style={{ flex: 2 }}>
        <strong>{apartment_number}</strong>
        <div>{apartment_structure}</div>
      </div>
      <div className={css.cell} style={{ flex: 1 }}>
        {floor}
      </div>
      <div className={css.cell} style={{ flex: 1 }}>
        {living_area} m²
      </div>
      <div className={css.cell} style={{ flex: 1 }}>
        {sales_price / 100} €
      </div>
      <div className={css.cell} style={{ flex: 1 }}>
        Ei hakijoita
      </div>
      <div className={css.cell} style={{ flex: 3 }}>
        <button className={css.getToKnowButton}>Tutustu</button>
        <a href={application_url || ""}>
          <button className={css.createApplicationButton}>Luo hakemus</button>
        </a>
      </div>
    </div>
  );
};

export default ApartmentRow;
