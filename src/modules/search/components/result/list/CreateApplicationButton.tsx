import { useTranslation } from 'react-i18next';
import React from "react";
import { Apartment } from "../../../../../types/common";
import css from './CreateApplicationButton.module.scss';

type Props = {
    href: string;
    apartment: Apartment
};

const CreateApplicationButton = ({ href, apartment, }: Props) => {
    const { t } = useTranslation();

    return (
        <a
            href={href}
            className={`${css.createApplicationButton} hds-button hds-button--primary hds-button--small`}
        >
            <span className="hds-button__label">
                {apartment.project_can_apply_afterwards ? t('SEARCH:after-apply') : t('SEARCH:apply')}
                <span className="sr-only">
                    , {t('SEARCH:apartment')} {apartment.apartment_number}
                </span>
            </span>
        </a>
    )
}

export default CreateApplicationButton;