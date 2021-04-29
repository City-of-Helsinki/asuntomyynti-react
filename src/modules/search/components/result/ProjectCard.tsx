import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import {
  IconAngleLeft,
  IconAngleRight,
  IconArrowDown,
  IconArrowUp,
  IconCogwheel,
  IconClock,
  IconPenLine,
  Button,
} from 'hds-react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import { useTranslation } from 'react-i18next';

import { DataConfig, Project } from '../../../../types/common';
import { getLanguageFilteredApartments } from '../../utils/getLanguageFilteredApartments';
import ApartmentTable from './ApartmentTable';
import useModal from '../../../../hooks/useModal';
import SubscriptionForm from './SubscriptionForm';
import css from './ProjectCard.module.scss';
import 'pure-react-carousel/dist/react-carousel.es.css';

type Props = {
  config: DataConfig | undefined;
  project: Project;
  hideImgOnSmallScreen?: boolean;
  showSearchAlert?: boolean;
  currentLang: string;
};

const ProjectCard = ({
  config,
  project,
  hideImgOnSmallScreen = false,
  showSearchAlert = false,
  currentLang,
}: Props) => {
  const { t } = useTranslation();
  const [listOpen, setListOpen] = useState(false);
  const { openModal, closeModal, Modal } = useModal();
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

  const { apartment_application_status, user } = config || {};

  const {
    apartments,
    street_address,
    district,
    estimated_completion,
    estimated_completion_date,
    housing_company,
    image_urls,
    main_image_url,
    id,
    publication_end_time,
    ownership_type,
    url,
    possession_transfer_date,
  } = project;

  const filteredApartments = getLanguageFilteredApartments(apartments, currentLang);
  const hasApartments = !!filteredApartments.length;

  const userHasApplications = () => {
    if (!user) {
      return false;
    }
    const hasApplications = id in user.applications;
    return hasApplications;
  };

  const getUserApplications = () => {
    if (!user) {
      return undefined;
    }
    const applicationsByProjectId = user.applications[id];
    return applicationsByProjectId;
  };

  const getApplicationStatus = () => {
    if (!apartment_application_status) {
      return undefined;
    }
    const statusByProjectId = apartment_application_status[id];
    return statusByProjectId;
  };

  const fullURL = (path: string) => {
    if (!path) {
      return '#';
    }
    if (path.toLowerCase().startsWith('http')) {
      return path;
    }
    return `//${path}`;
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
              {userHasApplications() && (
                <>
                  <div className={css.applicationSent}>
                    <IconPenLine style={{ marginRight: 10 }} aria-hidden="true" />
                    <span>{t('SEARCH:user-application-project')}</span>
                  </div>
                  {possession_transfer_date && (
                    <div className={css.moveInTime}>
                      <IconClock style={{ marginRight: 10 }} aria-hidden="true" />
                      <span>
                        {t('SEARCH:move-in-date')}{' '}
                        {format(new Date(possession_transfer_date), "dd.MM.yyyy 'klo' hh.mm")}{' '}
                      </span>
                    </div>
                  )}
                </>
              )}
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
        <ApartmentTable
          apartments={filteredApartments}
          applications={getUserApplications()}
          applicationStatus={getApplicationStatus()}
        />
      )}
    </div>
  );
};

export default ProjectCard;
