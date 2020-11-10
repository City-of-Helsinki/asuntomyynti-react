import React, {useEffect, useState} from 'react';
import { format } from 'date-fns';
import css from './ProjectCard.module.scss';
import ApartmentRow from './ApartmentRow';
import { IconArrowDown, IconArrowUp, IconCogwheel, IconClock, Button } from 'hds-react';
import { Project } from '../../../../types/common';
import { useTranslation } from 'react-i18next';

const ProjectCard = ({ project, hideImgOnSmallScreen = false }: { project: Project, hideImgOnSmallScreen?: boolean }) => {
  const { t } = useTranslation();
  const [listOpen, setListOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [width, setWidth] = useState(window.innerWidth);

  const handleOnResize = () => {
    setWidth(window.innerWidth);
  };

  // Add listener for resize event
  useEffect(() => {
    window.addEventListener('resize', handleOnResize);
    return () => {
      window.removeEventListener('resize', handleOnResize);
    };
  }, []);

  const toggleList = () => {
    setListOpen(!listOpen);
  };

  const {
    apartments,
    street_address,
    district,
    estimated_completion,
    estimated_completion_date,
    housing_company,
    main_image_url,
    publication_end_time,
    ownership_type,
  } = project;

  const showPagination = apartments.length > 10;

  const renderPaginationButtons = () => {
    const noOfPages = Math.ceil(apartments.length / 10);
    const buttons = [];

    for (let i = 1; i <= noOfPages; i++) {
      buttons.push(
        <button
          key={i}
          className={css.paginationButton}
          onClick={() => handlePageClick(i)}
          style={i === page ? { border: '2px solid #1a1a1a' } : {}}
          value={i}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  const handlePageClick = (index: number) => {
    if (index !== page) {
      setPage(index);
    }
  };

  const displayedApartments = apartments.slice(page * 10 - 10, page * 10);
  const isSmallScreen = width < 993;

  return (
    <div className={css.container}>
      <div className={css.content}>
        <div className={css.imageContainer} style={hideImgOnSmallScreen && isSmallScreen ? {display: 'none'} : {}}>
          <img src={main_image_url} alt={housing_company + ' ' + t('SEARCH:project')} />
        </div>
        <div className={css.info}>
          <div className={css.details}>
            <div className={css.titles}>
              <h2 style={{ marginBottom: 5 }}>{housing_company}</h2>
              <div style={{ marginBottom: 5 }}>
                <b>{district},</b> {street_address}
              </div>
              <span className={css.label}>{ownership_type}</span>
            </div>
            <div className={css.deadlines}>
              <div className={css.completionTime}>
                <IconCogwheel style={{ marginRight: 10 }} role="presentation" />
                {estimated_completion} {format(new Date(estimated_completion_date), 'MM/yyyy')}
              </div>
              <div className={css.applicationTime}>
                <IconClock style={{ marginRight: 10 }} role="presentation" />
                {t('SEARCH:application-open')} {format(new Date(publication_end_time), "dd.MM.yyyy 'klo' hh.mm")}{' '}
                {t('SEARCH:until')}
              </div>
            </div>
          </div>
          <div className={css.controls}>
            <Button className={css.detailsButton} variant="secondary">
              {t('SEARCH:learn-more')}
            </Button>
            <button className={css.apartmentListButton} onClick={toggleList}>
              {apartments.length} {t('SEARCH:apartments-available')}{' '}
              {listOpen ? (
                <IconArrowDown role="presentation" style={{ marginLeft: 10 }} />
              ) : (
                <IconArrowUp role="presentation" style={{ marginLeft: 10 }} />
              )}
            </button>
          </div>
        </div>
      </div>
      {listOpen && (
        <div className={css.apartmentList}>
          <div className={css.apartmentListTable}>
            <div className={css.apartmentListHeaders}>
              <div style={{ flex: 5, display: 'flex' }}>
                <div className={css.headerCell} style={{ flex: 2 }}>
                  {t('SEARCH:apartment')}
                </div>
                <div className={css.headerCell} style={{ flex: 1 }}>
                  {t('SEARCH:floor')}
                </div>
                <div className={css.headerCell} style={{ flex: 1 }}>
                  {t('SEARCH:area')}
                </div>
                <div className={css.headerCell} style={{ flex: 1 }}>
                  {t('SEARCH:free-of-debt-price')}
                </div>
              </div>
              {/*<div className={css.headerCell} style={{ flex: 1 }}>
                {t('SEARCH:applications')}
              </div>*/}
              <div className={css.headerFiller} style={{ flex: '3 3 0' }} />
            </div>
            {displayedApartments.map((x) => (
              <ApartmentRow key={x.uuid} apartment={x} />
            ))}
          </div>
          {showPagination && (
            <div className={css.pagination}>
              <div style={{ display: 'flex' }}>{renderPaginationButtons()}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
