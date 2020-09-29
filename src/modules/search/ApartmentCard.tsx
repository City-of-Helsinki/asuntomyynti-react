import React from 'react';
import css from './ApartmentCard.module.css';



const ApartmentCard = () => {
  return (
    <div className={css.container}>
      <img src={'http://placekitten.com/400/250'} alt='Kuva asunnosta' width="387" height="223" />
      <div className={css.content}>
        <div className={css.info}>
          <div className={css.price}>
            vh.
            <b> 329 875 €</b>
          </div>
          <div className={css.size}><b>84 &#13217;</b></div>
        </div>
        <div className={css.details}>
          <div className={css.apartmentDetails}>
            <div>A1 | 1.kerros</div>
            <div>4h + kt + s</div>
          </div>
          <div className={css.applicants}>Vähän hakijoita</div>
        </div>
        <div className={css.controls}>
          <button className={css.readMoreButton}>Tutustu huoneistoon</button>
          <button className={css.applyButton}>Luo hakemus</button>
        </div>
      </div>
    </div>
  );
}

export default ApartmentCard;
