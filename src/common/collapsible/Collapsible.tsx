import React from 'react';
import { useEffect, useRef, useState } from 'react';
import styles from './Collapsible.module.scss';

type Props = {
  expand: boolean;
  children: React.ReactElement | React.ReactElement[];
};
const Collapsible = ({ expand, children }: Props) => {
  const [height, setHeight] = useState(0);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (expand) {
      const { clientHeight } = ref.current || {};
      setHeight(clientHeight || 0);
    } else {
      setHeight(0);
    }
  }, [expand]);

  return (
    <div className={styles.collapsible} style={{ height }}>
      <div ref={ref}>{children}</div>
    </div>
  );
};

export default Collapsible;
