import React from 'react';
import css from './ApartmentCard.module.css';



const ApartmentCard = () => {
  return (
    <div className={css.container}>
      <img src={'http://placekitten.com/400/250'} alt='Kuva asunnosta' />
      <div className={css.content}>
        <div className={css.info}>
          <div className={css.price}>
            vh.
            <b> 329 875 €</b>
          </div>
          <div className={css.size}><b>85&#13217;</b></div>
        </div>
        <div className={css.details}>
          <div className={css.apartmentDetails}>
            <div>A1 | 1.kerros</div>
            <div>4h + kt + s</div>
          </div>
          <div>Vähän hakijoita</div>
        </div>
        <div className={css.controls}>
          <button>Tutustu huoneistoon</button>
          <button>Luo hakemus</button>
        </div>
      </div>
    </div>
  );
}

export default ApartmentCard;
