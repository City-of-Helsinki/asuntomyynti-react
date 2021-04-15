import React, { useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import cx from 'classnames';
import css from './ProjectCard.module.scss';
import ApartmentRow from './ApartmentRow';
import {
  IconAngleLeft,
  IconAngleRight,
  IconArrowDown,
  IconArrowUp,
  IconCogwheel,
  IconClock,
  // IconPenLine,
  IconSortAscending,
  IconSortDescending,
  Button,
} from 'hds-react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import { Project } from '../../../../types/common';
import { useTranslation } from 'react-i18next';
import { getLanguageFilteredApartments } from '../../utils/getLanguageFilteredApartments';
import useModal from '../../../../hooks/useModal';
import SubscriptionForm from './SubscriptionForm';
import 'pure-react-carousel/dist/react-carousel.es.css';

type SortProps = {
  key: string;
  direction: string;
  alphaNumeric: boolean;
};

const UseSortableData = (items: any) => {
  const sortDefaultProps = {
    key: 'apartment_number',
    direction: 'ascending',
    alphaNumeric: true,
  };
  const [sortConfig, setSortConfig] = React.useState<SortProps | null>(sortDefaultProps);

  const sortedApartments = React.useMemo(() => {
    let sortableApartments = [...items];

    if (sortConfig !== null) {
      if (sortConfig.alphaNumeric) {
        sortableApartments.sort((a, b) => {
          const firstValue = a[sortConfig.key].split(' ').join('');
          const secondValue = b[sortConfig.key].split(' ').join('');
          if (sortConfig.direction === 'ascending') {
            return firstValue.localeCompare(secondValue, 'fi', { numeric: true });
          }
          return secondValue.localeCompare(firstValue, 'fi', { numeric: true });
        });
      } else {
        sortableApartments.sort((a, b) => {
          const firstValue = a[sortConfig.key];
          const secondValue = b[sortConfig.key];

          if (firstValue < secondValue) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (firstValue > secondValue) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        });
      }
    }
    return sortableApartments;
  }, [items, sortConfig]);

  const requestSort = (key: string, alphaNumeric: boolean) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction, alphaNumeric });
  };

  return { items: sortedApartments, requestSort, sortConfig };
};

type Props = {
  project: Project;
  hideImgOnSmallScreen?: boolean;
  showSearchAlert?: boolean;
  currentLang: string;
};

const ProjectCard = ({ project, hideImgOnSmallScreen = false, showSearchAlert = false, currentLang }: Props) => {
  const { t } = useTranslation();
  const [listOpen, setListOpen] = useState(false);
  const [page, setPage] = useState(1);
  const { openModal, closeModal, Modal } = useModal();
  const [width, setWidth] = useState(window.innerWidth);
  const paginationScrollRef = useRef<HTMLDivElement>(null);

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
    image_urls,
    main_image_url,
    publication_end_time,
    ownership_type,
    url,
  } = project;

  const filteredApartments = getLanguageFilteredApartments(apartments, currentLang);
  const hasApartments = !!filteredApartments.length;
  const { items, requestSort, sortConfig } = UseSortableData(filteredApartments);
  const displayedApartments = items.slice(page * 10 - 10, page * 10);

  const fullURL = (path: string) => {
    if (!path) {
      return '#';
    }
    if (path.toLowerCase().startsWith('http')) {
      return path;
    }
    return `//${path}`;
  };

  const setSort = (key: string, alphaNumeric: boolean) => {
    requestSort(key, alphaNumeric);
    setPage(1);
  };

  const getSortDirectionFor = (name: string) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const apartmentSortClasses = (key: string) => {
    return cx(css.sortButton, {
      [css.activeSort]: sortConfig ? sortConfig.key === key : false,
      [css.ascending]: getSortDirectionFor(key) === 'ascending',
      [css.descending]: getSortDirectionFor(key) === 'descending',
    });
  };

  const getSortIcon = (key: string) => {
    if (!sortConfig) {
      return;
    }
    if (getSortDirectionFor(key) === 'descending') {
      return <IconSortDescending aria-hidden="true" className={css.sortArrow} />;
    }
    return <IconSortAscending aria-hidden="true" className={css.sortArrow} />;
  };

  const showPagination = filteredApartments.length > 10;

  const renderPaginationButtons = () => {
    const noOfPages = Math.ceil(filteredApartments.length / 10);
    const buttons = [];

    buttons.push(
      <button
        key={'pagination-btn-prev'}
        className={css.paginationButton}
        onClick={() => handlePageClick(page !== 1 ? page - 1 : page)}
        value={page !== 1 ? page - 1 : page}
        aria-label={t('SEARCH:previous-page')}
        disabled={page === 1}
      >
        <IconAngleLeft aria-hidden="true" />
      </button>
    );

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

    buttons.push(
      <button
        key={'pagination-btn-next'}
        className={css.paginationButton}
        onClick={() => handlePageClick(page !== noOfPages ? page + 1 : page)}
        value={page !== noOfPages ? page + 1 : page}
        aria-label={t('SEARCH:next-page')}
        disabled={page === noOfPages}
      >
        <IconAngleRight aria-hidden="true" />
      </button>
    );

    return buttons;
  };

  const paginationScroll = () => {
    if (paginationScrollRef.current) {
      paginationScrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePageClick = (index: number) => {
    if (index !== page) {
      paginationScroll();
      setPage(index);
    }
  };

  const renderImageCarousel = () => {
    let totalImageCount = 0;
    let otherImageCount = 0;

    if (main_image_url !== undefined && main_image_url.length) {
      totalImageCount = 1;
    }

    if (image_urls !== undefined && image_urls.length) {
      otherImageCount = image_urls.length;
    }

    totalImageCount += otherImageCount;

    if (totalImageCount === 0) {
      return;
    }

    return (
      <CarouselProvider
        naturalSlideWidth={383}
        naturalSlideHeight={223}
        totalSlides={totalImageCount}
        isIntrinsicHeight
        touchEnabled
        dragEnabled={false}
      >
        <Slider aria-label="carousel">
          {main_image_url.length >= 1 && (
            <Slide index={0}>
              <img src={fullURL(main_image_url)} alt={`${housing_company}, ${t('SEARCH:project-main-image')}`} />
            </Slide>
          )}
          {otherImageCount > 0 &&
            image_urls.map((item, idx) => (
              <Slide index={idx + 1} key={idx}>
                <img src={fullURL(item)} alt={`${housing_company}, ${t('SEARCH:project-image')} ${idx + 1}`} />
              </Slide>
            ))}
        </Slider>
        {totalImageCount > 1 && (
          <>
            <div className={css.carouselPrevBtn}>
              <ButtonBack>
                <IconAngleLeft aria-hidden="true" />
              </ButtonBack>
            </div>
            <div className={css.carouselNextBtn}>
              <ButtonNext>
                <IconAngleRight aria-hidden="true" />
              </ButtonNext>
            </div>
          </>
        )}
      </CarouselProvider>
    );
  };

  const isSmallScreen = width < 993;

  return (
    <div className={css.container}>
      <div className={css.content}>
        <div className={css.imageContainer} style={hideImgOnSmallScreen && isSmallScreen ? { display: 'none' } : {}}>
          {renderImageCarousel()}
        </div>
        <div className={css.info}>
          <div className={css.details}>
            <div className={css.titles}>
              <h3 style={{ marginBottom: 5 }}>{housing_company}</h3>
              <div style={{ marginBottom: 5 }}>
                <b>{district},</b> {street_address}
              </div>
              <span className={css.label}>{ownership_type}</span>
            </div>
            <div className={css.deadlines}>
              {estimated_completion_date && (
                <div className={css.completionTime}>
                  <IconCogwheel style={{ marginRight: 10 }} aria-hidden="true" />
                  <span>
                    {estimated_completion} {format(new Date(estimated_completion_date), 'MM/yyyy')}
                  </span>
                </div>
              )}
              {publication_end_time && (
                <div className={css.applicationTime}>
                  <IconClock style={{ marginRight: 10 }} aria-hidden="true" />
                  <span>
                    {t('SEARCH:application-open')} {format(new Date(publication_end_time), "dd.MM.yyyy 'klo' hh.mm")}{' '}
                    {t('SEARCH:until')}
                  </span>
                </div>
              )}
              {/* TODO
              <div className={css.applicationSent}>
                <IconPenLine style={{ marginRight: 10 }} aria-hidden="true" />
                <span>Sinulla on <a href="#">hakemus</a> tähän kohteeseen</span>
              </div>
              <div className={css.moveInTime}>
                <IconClock style={{ marginRight: 10 }} aria-hidden="true" />
                <span>Muuttopäivä 01.07.2022</span>
              </div>
              */}
            </div>
          </div>
          <div className={css.controls}>
            {url && (
              <a
                href={fullURL(url)}
                className={`${css.detailsButton} hds-button hds-button--secondary hds-button--small`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="hds-button__label">{t('SEARCH:learn-more')}</span>
              </a>
            )}
            {showSearchAlert && (
              <>
                <Modal>
                  <SubscriptionForm onClose={closeModal} project={project} />
                </Modal>
                <Button className={css.detailsButton} onClick={openModal} variant="secondary" size="small">
                  {t('SEARCH:subscribe-for-upcoming-sales')}
                </Button>
              </>
            )}
            {hasApartments && (
              <Button
                className={css.apartmentListButton}
                onClick={toggleList}
                variant="supplementary"
                iconRight={listOpen ? <IconArrowUp aria-hidden="true" /> : <IconArrowDown aria-hidden="true" />}
              >
                {filteredApartments.length} {t('SEARCH:apartments-available')}
              </Button>
            )}
          </div>
        </div>
      </div>
      {hasApartments && listOpen && (
        <div className={css.apartmentList} ref={paginationScrollRef}>
          <div className={css.apartmentListTable}>
            <div className={css.apartmentListHeaders}>
              <div className={cx(css.headerCell, css.headerCellSortable, css.headerCellApartment)}>
                <button
                  type="button"
                  onClick={() => setSort('apartment_number', true)}
                  className={apartmentSortClasses('apartment_number')}
                >
                  <span>{t('SEARCH:apartment')}</span>
                  {getSortIcon('apartment_number')}
                </button>
              </div>
              <div className={cx(css.headerCell, css.headerCellSortable, css.headerCellNarrow)}>
                <button type="button" onClick={() => setSort('floor', false)} className={apartmentSortClasses('floor')}>
                  <span>{t('SEARCH:floor')}</span>
                  {getSortIcon('floor')}
                </button>
              </div>
              <div className={cx(css.headerCell, css.headerCellSortable, css.headerCellNarrow)}>
                <button
                  type="button"
                  onClick={() => setSort('living_area', false)}
                  className={apartmentSortClasses('living_area')}
                >
                  <span>{t('SEARCH:area')}</span>
                  {getSortIcon('living_area')}
                </button>
              </div>
              <div className={cx(css.headerCell, css.headerCellSortable, css.headerCellNarrow)}>
                <button
                  type="button"
                  onClick={() => setSort('debt_free_sales_price', false)}
                  className={apartmentSortClasses('debt_free_sales_price')}
                >
                  <span>{t('SEARCH:free-of-debt-price')}</span>
                  {getSortIcon('debt_free_sales_price')}
                </button>
              </div>
              <div className={cx(css.headerCell, css.headerCellNarrow)}>{t('SEARCH:applications')}</div>
              <div className={cx(css.headerCell, css.headerCellSpacer)} />
            </div>
            {displayedApartments.map((x) => (
              <ApartmentRow key={x.uuid} apartment={x} />
            ))}
          </div>
          {showPagination && <div className={css.pagination}>{renderPaginationButtons()}</div>}
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
