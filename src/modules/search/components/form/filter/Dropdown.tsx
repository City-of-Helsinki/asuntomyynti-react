import React, { useRef, useState } from 'react';
import styles from './Dropdown.module.scss';
import IconByName from './IconByName';
import useOutsideClick from '../../../../../hooks/useOutsideClick';
import QueryFilter from './QueryFilter';
import { FilterRule, FilterType } from '../../../../../types/common';
import useFilters from '../../../../../hooks/useFilters';

type Props = {
  name: string;
} & FilterRule;

const Dropdown = ({ name, icon, ...rest }: Props) => {
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState(name);

  const ref = useRef<HTMLDivElement>(null);

  const { clearFilter, getFilters, getFilter } = useFilters();
  const hasSelections = !!getFilter(name);

  useOutsideClick(ref, () => {
    setActive(false);
  });

  const handleClearSelection = () => {
    clearFilter(name);
    setTimeout(() => {
      // Let the user see selection disappear before closing the dropdown
      setActive(false);
    }, 50);
  };

  // Update label depending on the selection
  const handleFilter = ({ label, type }: FilterRule) => {
    switch (type) {
      case FilterType.MultiSelect:
        const selected = getFilters(name);
        setLabel((selected[0] || label) + (selected.length > 1 ? `+${selected.length - 1}` : ''));
        break;

      case FilterType.Range:
        const [min, max] = getFilters(name);

        if (min && max) {
          setLabel(`${min}-${max}`);
        } else if (min && !max) {
          setLabel(`> ${min}`);
        } else if (!min && max) {
          setLabel(`< ${max}`);
        } else {
          setLabel(label);
        }
        break;

      default:
        setLabel(getFilter(name) || label);
    }
  };

  const className = `${styles.container} ${active ? styles.active : ''} ${
    !active && hasSelections ? styles.underline : ''
  }`;

  return (
    <div className={className} ref={ref}>
      <label className={styles.label} onClick={() => setActive(!active)}>
        {icon && <IconByName name={icon} className={styles.icon} />}
        <div className={styles.title}>{label}</div>
      </label>
      <div className={styles.content}>
        <QueryFilter name={name} onFilter={handleFilter} isWrapped {...rest} />
      </div>
      <div className={styles.footer}>
        <button onClick={handleClearSelection} disabled={!hasSelections} className={styles.clearButton}>
          Tyhjennä valinta
        </button>
      </div>
    </div>
  );
};

export default Dropdown;
