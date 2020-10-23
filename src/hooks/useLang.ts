import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useSearchParams from './useSearchParams';

const useLang = () => {
  const { i18n } = useTranslation();
  const query = useSearchParams();
  const lang = query.get('lang');

  useEffect(() => {
    i18n.changeLanguage(lang || 'fi');
  }, [lang, i18n]);
};

export default useLang;
