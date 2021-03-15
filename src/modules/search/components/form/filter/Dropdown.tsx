import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Dropdown.module.scss';
import IconByName from './IconByName';
import useOutsideClick from '../../../../../hooks/useOutsideClick';
import QueryFilter from './QueryFilter';
import { FilterConfig, FilterName } from '../../../../../types/common';
import useFilters from '../../../../../hooks/useFilters';

type Props = {
  name: FilterName;
} & FilterConfig;

const Dropdown = ({ name, icon, ...rest }: Props) => {
  const { t } = useTranslation();
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState<string>(name);

  const ref = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLButtonElement>(null);

  const { clearFilter, getFilters, getFilter } = useFilters();
  const hasSelections = !!getFilter(name);

  useOutsideClick(ref, () => {
    setActive(false);
  });

  const handleClearSelection = () => {
    // Focus on button after clearing selection
    labelRef.current?.focus();
    clearFilter(name);
    setTimeout(() => {
      // Let the user see selection disappear before closing the dropdown
      setActive(false);
    }, 50);
  };

  // Update label depending on the selection
  const handleFilter = ({ label, getLabel }: FilterConfig) => {
    const values = getFilters(name);
    setLabel(values.length > 0 ? getLabel(values) : label);
  };

  const className = `${styles.container} ${active ? styles.active : ''} ${
    !active && hasSelections ? styles.underline : ''
  }`;

  return (
    <div className={className} ref={ref}>
      <button className={styles.label} aria-expanded={active} onClick={() => setActive(!active)} ref={labelRef}>
        {icon && <IconByName name={icon} className={styles.icon} aria-hidden="true" />}
        <div className={styles.title}>{label}</div>
      </button>
      <div className={styles.content}>
        <QueryFilter name={name} onFilter={handleFilter} isWrapped {...rest} />
      </div>
      <div className={styles.footer}>
        <button onClick={handleClearSelection} disabled={!hasSelections} className={styles.clearButton}>
          {t('SEARCH:clear-selection')}
        </button>
      </div>
    </div>
  );
};

export default Dropdown;
