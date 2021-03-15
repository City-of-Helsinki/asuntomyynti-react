import React, { useEffect, useState } from 'react';
import css from './ApartmentRow.module.scss';
import { Apartment } from '../../../../types/common';
import { useTranslation } from 'react-i18next';
import { IconAngleDown } from 'hds-react';

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

  const {
    apartment_number,
    apartment_structure,
    application_url,
    floor,
    floor_max,
    living_area,
    debt_free_sales_price,
    url,
  } = apartment;

  const calculatedDebtFreeSalesPrice = debt_free_sales_price / 100;
  const formattedDebtFreeSalesPrice = `${calculatedDebtFreeSalesPrice.toLocaleString('fi-FI')} \u20AC`;

  const formattedLivingArea = `${living_area.toLocaleString('fi-FI')} m\u00b2`;

  const fullURL = (path: string) => {
    if (!path) {
      return undefined;
    }
    if (path.toLowerCase().startsWith('http')) {
      return path;
    }
    return `http://${path}`;
  };

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
              <span style={{ flex: 1 }}>
                {floor} {floor_max && ` / ${floor_max}`}
              </span>
            </div>
            <div className={css.cell} style={{ flex: 1 }}>
              {isMobileSize && <span style={{ flex: 1 }}>{t('SEARCH:area')}</span>}
              <span style={{ flex: 1 }}>{formattedLivingArea}</span>
            </div>
            <div className={css.cell} style={{ flex: 1 }}>
              {isMobileSize && <span style={{ flex: 1 }}>{t('SEARCH:free-of-debt-price')}</span>}
              <span style={{ flex: 1 }}>{formattedDebtFreeSalesPrice}</span>
            </div>
          </>
        )}
        <div className={css.cell} style={{ flex: 1 }}>
          - {/* TODO: hakijatilanne */}
        </div>
      </div>
      {(rowOpen || isDesktopSize) && (
        <div className={css.buttons} style={{ flex: '3 3 0' }}>
          <a
            href={fullURL(url) || '#'}
            className={`${css.getToKnowButton} hds-button hds-button--${
              isDesktopSize ? 'supplementary' : 'secondary'
            } hds-button--small`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('SEARCH:info')}
          </a>
          <a
            href={fullURL(application_url) || '#'}
            className={`${css.createApplicationButton} hds-button hds-button--${
              isDesktopSize ? 'secondary' : 'primary'
            } hds-button--small`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('SEARCH:apply')}
          </a>
        </div>
      )}
    </div>
  );
};

export default ApartmentRow;
