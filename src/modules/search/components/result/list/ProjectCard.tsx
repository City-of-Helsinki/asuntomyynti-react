import React, { useEffect, useState } from 'react';
import { IconAngleLeft, IconAngleRight, IconArrowDown, IconArrowUp, Button } from 'hds-react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import { useTranslation } from 'react-i18next';

import { DataConfig, Project } from '../../../../../types/common';
import { getLanguageFilteredApartments } from '../../../utils/getLanguageFilteredApartments';
import { getProjectApplicationStatus } from '../../../utils/getApplicationStatus';
import { userHasApplications, getUserApplications } from '../../../utils/userApplications';
import { fullURL } from '../../../utils/fullURL';
import ApartmentTable from './ApartmentTable';
import useModal from '../../../../../hooks/useModal';
import SubscriptionForm from '../SubscriptionForm';
import ProjectInfo from '../ProjectInfo';
import css from './ProjectCard.module.scss';
import 'pure-react-carousel/dist/react-carousel.es.css';

type Props = {
  config: DataConfig | undefined;
  project: Project;
  hideImgOnSmallScreen?: boolean;
  showSearchAlert?: boolean;
  currentLang: string;
  hideApartments?: boolean;
};

const ProjectCard = ({
  config,
  project,
  hideImgOnSmallScreen = false,
  showSearchAlert = false,
  currentLang,
  hideApartments = false,
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
    housing_company,
    image_urls,
    main_image_url,
    id,
    ownership_type,
    url,
  } = project;

  const filteredApartments = getLanguageFilteredApartments(apartments, currentLang);
  const hasApartments = !!filteredApartments.length;

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
            <ProjectInfo project={project} userHasApplications={userHasApplications(user, id)} />
          </div>
          <div className={css.controls}>
            {url && (
              <a
                href={fullURL(url)}
                className={`${css.detailsButton} hds-button hds-button--secondary hds-button--small`}
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
            {!hideApartments && hasApartments && (
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
      {!hideApartments && hasApartments && listOpen && (
        <ApartmentTable
          apartments={filteredApartments}
          applications={getUserApplications(user, id)}
          applicationStatus={getProjectApplicationStatus(apartment_application_status, id)}
        />
      )}
    </div>
  );
};

export default ProjectCard;
