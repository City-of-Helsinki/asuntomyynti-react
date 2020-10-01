import React, { useEffect, useRef, useState } from 'react';
import styles from './Dropdown.module.scss';
import QueryList from '../QueryList/QueryList';
import Label from '../Label';
import useQuery from '../../hooks/useQuery';
import { useHistory } from 'react-router-dom';
import useConfig from '../../hooks/useConfig';
import IconByName from '../IconByName';

type Props = {
  name: string;
};

const Dropdown = ({ name }: Props) => {
  const [active, setActive] = useState(false);
  const { items, label } = useConfig(name);
  const ref = useRef<HTMLDivElement>(null);
  const history = useHistory();

  const searchParams = useQuery();
  const hasSelections = !!searchParams.get(name);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      // Is the click outside this component
      if (ref.current && !ref.current.contains(event.target as Node)) {
        // Close the dropdown
        setActive(false);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });

  const handleClearSelection = () => {
    searchParams.delete(name);
    history.push(`?${searchParams.toString()}`);
    setActive(false);
  };

  const className = `${styles.container} ${active ? styles.active : ''} ${
    !active && hasSelections ? styles.underline : ''
  }`;

  const dynamicLabel =
    (searchParams.get(name) || label) +
    (searchParams.getAll(name).length > 1 ? `+${searchParams.getAll(name).length}` : '');

  return (
    <div className={className} ref={ref}>
      <Label onClick={() => setActive(!active)}>
        <IconByName name={name} className={styles.icon} />
        <div className={styles.title}>{dynamicLabel}</div>
        <div className={styles.arrow} />
      </Label>
      <div className={styles.content}>
        <QueryList name={name} items={items} />
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
