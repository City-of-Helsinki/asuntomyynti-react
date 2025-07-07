import { Button, IconAngleLeft, IconAngleRight, IconArrowDown, IconArrowUp } from 'hds-react';
import { ButtonBack, ButtonNext, CarouselProvider, Slide, Slider } from 'pure-react-carousel';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DataConfig, Project } from '../../../../../types/common';
import { fullURL } from '../../../utils/fullURL';
import { getProjectApplicationStatus } from '../../../utils/getApplicationStatus';
import { getLanguageFilteredApartments } from '../../../utils/getLanguageFilteredApartments';
import { getUserApplications, userHasApplications } from '../../../utils/userApplications';
import ApartmentTable from './ApartmentTable';
// import SubscribeToProjectMailinglist from '../SubscribeToProjectMailinglist';
import Label from '../../../../../common/label/Label';
import useSessionStorageState from '../../../../../hooks/useSessionStorageState';
import ProjectInfo from '../ProjectInfo';

import 'pure-react-carousel/dist/react-carousel.es.css';
import css from './ProjectCard.module.scss';

type Props = {
  config: DataConfig | undefined;
  project: Project;
  hideImgOnSmallScreen?: boolean;
  showSubscribeButton?: boolean;
  currentLang: string;
  hideApartments?: boolean;
};

const ProjectCard = ({
  config,
  project,
  hideImgOnSmallScreen = false,
  showSubscribeButton = false,
  currentLang,
  hideApartments = false,
}: Props) => {
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

  const { t } = useTranslation();
  const [listOpen, setListOpen] = useSessionStorageState({ defaultValue: false, key: `apartmentRowOpen-${id}` });
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

  const filteredApartments = getLanguageFilteredApartments(apartments, currentLang);
  const hasApartments = !!filteredApartments.length;
  const applicationPair = config?.user?.application_project_pairs?.find((pair) => pair.project_id === id);
  const applicationId = applicationPair ? applicationPair.application_id : undefined;
  const applicationUrl = applicationId ? `/${currentLang}/application/${applicationId}` : undefined;

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
        <Slider
          role=""
          trayProps={{ role: 'listbox', 'aria-label': t('SEARCH:aria-project-carousel-title') }}
          trayTag={'div'}
        >
          {main_image_url?.length >= 1 && (
            <Slide index={0} tag={'div'}>
              <img src={fullURL(main_image_url)} alt={`${housing_company}, ${t('SEARCH:aria-project-main-image')}`} />
            </Slide>
          )}
          {otherImageCount > 0 &&
            image_urls.map((item, idx) => (
              <Slide index={idx + 1} key={idx} tag={'div'}>
                <img src={fullURL(item)} alt={`${housing_company}, ${t('SEARCH:aria-project-image')} ${idx + 2}`} />
              </Slide>
            ))}
        </Slider>
        {totalImageCount > 1 && (
          <>
            <div className={css.carouselPrevBtn}>
              <ButtonBack aria-label={t('SEARCH:aria-prev-slide')}>
                <IconAngleLeft aria-hidden="true" />
              </ButtonBack>
            </div>
            <div className={css.carouselNextBtn}>
              <ButtonNext aria-label={t('SEARCH:aria-next-slide')}>
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
              <div style={{ marginBottom: 8 }}>
                <b>{district},</b> {street_address}
              </div>
              <Label type={ownership_type}>
                <>
                  <span className="sr-only">{t('SEARCH:aria-ownership-type')}</span> {ownership_type}
                </>
              </Label>
            </div>
            <ProjectInfo
              applicationUrl={applicationUrl}
              project={project}
              userHasApplications={userHasApplications(user, id)}
            />
          </div>
          <div className={css.controls}>
            {url && (
              <a
                href={fullURL(url)}
                className={`${css.detailsButton} hds-button hds-button--secondary hds-button--small`}
              >
                <span className="hds-button__label">{t('SEARCH:learn-more')}</span>
                <span className="sr-only">, {housing_company}</span>
              </a>
            )}
            {/* Subscribing to project mailing list is commented out until we get the backend implementation */}
            {/* {showSubscribeButton && config && (
              <div className={css.subscribeButtonWrapper}>
                <SubscribeToProjectMailinglist project={project} config={config} />
              </div>
            )} */}
            {!hideApartments && hasApartments && (
              <Button
                className={css.apartmentListButton}
                onClick={toggleList}
                variant="supplementary"
                iconRight={listOpen ? <IconArrowUp aria-hidden="true" /> : <IconArrowDown aria-hidden="true" />}
                aria-expanded={listOpen ? 'true' : 'false'}
                aria-controls={`apartments-for-${id}`}
                id={`toggle-apartment-list-${id}`}
              >
                {filteredApartments.length} {t('SEARCH:apartments')}
              </Button>
            )}
          </div>
        </div>
      </div>
      {!hideApartments && hasApartments && (
        <div id={`apartments-for-${id}`}>
          {listOpen && (
            <ApartmentTable
              apartments={filteredApartments}
              applications={getUserApplications(user, id)}
              applicationStatus={getProjectApplicationStatus(apartment_application_status, id)}
              userHasApplicationForProject={userHasApplications(user, id)}
              housingCompany={housing_company}
              projectID={id}
              projectOwnershipIsHaso={ownership_type.toLowerCase() === 'haso'}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
