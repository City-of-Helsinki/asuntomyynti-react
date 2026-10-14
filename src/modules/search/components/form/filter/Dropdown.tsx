import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Dropdown.module.scss';
import IconByName from './IconByName';
import useOutsideClick from '../../../../../hooks/useOutsideClick';
import QueryFilter from './QueryFilter';
import { FilterConfig, FilterName } from '../../../../../types/common';
import useFilters from '../../../../../hooks/useFilters';

type Props = {
  name: FilterName;
  selectionScopeValues?: string[];
} & FilterConfig;

const normalizePropertyOption = (value: string) => value.trim().toUpperCase();

const Dropdown = ({ name, icon, selectionScopeValues, ...rest }: Props) => {
  const { t } = useTranslation();
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState<string>(name);

  const ref = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLButtonElement>(null);

  const { clearFilter, getFilters, setFilters, getFilter } = useFilters();
  const selectedValues = getFilters(name);
  const hasSelections = selectionScopeValues?.length
    ? selectedValues.some((value) =>
        selectionScopeValues
          .map(normalizePropertyOption)
          .includes(normalizePropertyOption(value))
      )
    : !!getFilter(name);

  useOutsideClick(ref, () => {
    setActive(false);
  });

  const handleClearSelection = () => {
    // Focus on button after clearing selection
    labelRef.current?.focus();

    if (selectionScopeValues?.length) {
      const scopeSet = new Set(selectionScopeValues.map(normalizePropertyOption));
      const remainingValues = selectedValues.filter((value) => !scopeSet.has(normalizePropertyOption(value)));

      if (remainingValues.length === 0) {
        clearFilter(name);
      } else {
        setFilters(name, remainingValues);
      }
    } else {
      clearFilter(name);
    }

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
          <span className="sr-only">, {t(`ES:${name}`)}</span>
        </button>
      </div>
    </div>
  );
};

export default Dropdown;
