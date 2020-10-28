import React, { useState } from 'react';
import { Button, Checkbox, TextInput } from 'hds-react';
import { useTranslation } from 'react-i18next';
import styles from './SubscriptionForm.module.scss';
import axios from 'axios';
import { Project } from '../../../../types/common';

type Props = {
  onSubscribe?: () => void;
  onCancel?: () => void;
  project: Project;
};

const SubscriptionForm = ({ onSubscribe, onCancel, project }: Props) => {
  const [email, setEmail] = useState('');
  const [subscribeToNewsLetter, setSubscribeToNewsLetter] = useState(false);

  const { t } = useTranslation();

  const handleSubscribe = async () => {
    try {
      await axios.post('/search-alert', {
        email,
        projects: [project.id],
        subscribeToNewsLetter,
      });
    } catch (e) {
      console.log(e.message);
    }
    typeof onSubscribe === 'function' && onSubscribe();
  };

  const handleCancel = () => {
    typeof onCancel === 'function' && onCancel();
  };

  const { housing_company, district, street_address } = project;

  return (
    <div>
      <h1 className={styles.header}>{t('SEARCH:save-search-alert')}</h1>
      <div className={styles.fieldWrapper}>
        <p>
          <strong>{housing_company}</strong> {district}, {street_address}
        </p>
      </div>
      <div className={styles.fieldWrapper}>
        <TextInput
          id="email"
          label={t('SEARCH:email')}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          helperText={t('SEARCH:search-alert-helper-text')}
        />
      </div>
      <div className={styles.fieldWrapper}>
        <Checkbox
          id="subscribe-newsletter"
          checked={subscribeToNewsLetter}
          onClick={() => setSubscribeToNewsLetter(!subscribeToNewsLetter)}
          label={t('SEARCH:subscribe-to-newsletter')}
        />
      </div>
      <div className={styles.buttonWrapper}>
        <Button onClick={handleCancel} variant="secondary">
          {t('SEARCH:cancel')}
        </Button>
        <Button onClick={handleSubscribe}>{t('SEARCH:save-search-alert')}</Button>
      </div>
    </div>
  );
};

export default SubscriptionForm;
