import React, { useEffect, useState } from 'react';
import css from './ApartmentRow.module.scss';
import { Apartment } from '../../../../types/common';
import { useTranslation } from 'react-i18next';
import { Button, IconAngleDown } from 'hds-react';

const BREAK_POINT = 768;

const ApartmentRow = ({ apartment }: { apartment: Apartment }) => {
  const { t } = useTranslation();
  const [width, setWidth] = useState(window.innerWidth);
  const [rowOpen, setRowOpen] = useState(false);

  const isDesktopSize = width > BREAK_POINT;
  const isMobileSize = width < BREAK_POINT;

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  const toggleRow = () => {
    if (isMobileSize) {
      setRowOpen(!rowOpen);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { apartment_number, apartment_structure, application_url, floor, living_area, sales_price } = apartment;

  return (
    <div className={css.container}>
      <div
        className={css.content}
        style={rowOpen ? { display: 'flex', flex: 5 } : { display: 'flex', flex: 5, margin: 0 }}
      >
        <div
          className={css.apartmentCell}
          style={rowOpen && isMobileSize ? { flex: 2, marginBottom: 24 } : { flex: 2 }}
          onClick={toggleRow}
        >
          <strong>{apartment_number}</strong>
          <div>{apartment_structure}</div>
          {isMobileSize && <IconAngleDown style={{ marginLeft: 'auto' }} size={'m'} />}
        </div>
        {(rowOpen || isDesktopSize) && (
          <>
            <div className={css.cell} style={{ flex: 1 }}>
              {isMobileSize && <span style={{ flex: 1 }}>{t('SEARCH:floor')} </span>}
              <span style={{ flex: 1 }}>{floor}</span>
            </div>
            <div className={css.cell} style={{ flex: 1 }}>
              {isMobileSize && <span style={{ flex: 1 }}>{t('SEARCH:area')}</span>}
              <span style={{ flex: 1 }}>{living_area} m²</span>
            </div>
            <div className={css.cell} style={{ flex: 1 }}>
              {isMobileSize && <span style={{ flex: 1 }}>{t('SEARCH:free-of-debt-price')}</span>}
              <span style={{ flex: 1 }}>{sales_price / 100} €</span>
            </div>
          </>
        )}
      </div>
      {/*<div className={css.cell} style={{ flex: 1 }}>
        Ei hakijoita
      </div>*/}
      {(rowOpen || isDesktopSize) && (
        <div className={css.buttons} style={{ flex: '3 3 0' }}>
          {isDesktopSize ? (
            <Button className={css.getToKnowButton} variant="supplementary" iconRight={null}>
              {t('SEARCH:info')}
            </Button>
          ) : (
            <Button className={css.getToKnowButton} variant="secondary">
              {t('SEARCH:info')}
            </Button>
          )}
          <a href={application_url || ''}>
            <Button className={css.createApplicationButton} variant={isDesktopSize ? 'secondary' : 'primary'}>
              {t('SEARCH:apply')}
            </Button>
          </a>
        </div>
      )}
    </div>
  );
};

export default ApartmentRow;
