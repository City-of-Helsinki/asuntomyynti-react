import React, { HTMLProps, useCallback } from 'react';
import { useEffect, useRef, useState } from 'react';
import styles from './Collapsible.module.scss';

type Props = {
  expand: boolean;
} & HTMLProps<HTMLDivElement>;

const Collapsible: React.FunctionComponent<Props> = ({ expand, children, ...rest }) => {
  const [height, setHeight] = useState(0);

  const ref = useRef<HTMLDivElement>(null);
  let timer = useRef<NodeJS.Timeout | null>(null);

  const updateHeight = useCallback(() => {
    if (expand) {
      const { clientHeight } = ref.current || {};
      setHeight(clientHeight || 0);
    } else {
      setHeight(0);
    }
  }, [expand]);

  /**
   * Debounce to prevent too much re-rendering
   */
  const handleOnResize = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      updateHeight();
    }, 250);
  }, [updateHeight]);

  // Add listener for resize event
  useEffect(() => {
    window.addEventListener('resize', handleOnResize);
    return () => {
      window.removeEventListener('resize', handleOnResize);
    };
  }, [handleOnResize]);

  // Update height when is expanded or children changes
  useEffect(() => {
    updateHeight();
  }, [expand, children, updateHeight]);

  return (
    <div {...rest}>
      <div className={styles.collapsible} style={{ height }}>
        <div ref={ref}>{children}</div>
      </div>
    </div>
  );
};

export default Collapsible;
