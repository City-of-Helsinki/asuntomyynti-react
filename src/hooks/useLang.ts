import { useEffect } from 'react';
import {useTranslation} from "react-i18next";
import useQuery from "./useQuery";

const useLang = () => {
  const {i18n} = useTranslation();
  const query = useQuery();
  const lang = query.get('lang');

  useEffect(() => {

    i18n.changeLanguage(lang || 'fi');
  }, [lang, i18n]);
};

export default useLang;
