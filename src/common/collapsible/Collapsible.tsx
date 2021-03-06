import React, { HTMLProps, useCallback } from 'react';
import { useEffect, useRef, useState } from 'react';
import styles from './Collapsible.module.scss';

type Props = {
  expand: boolean;
  onCollapse: () => void;
} & HTMLProps<HTMLDivElement>;

const Collapsible: React.FunctionComponent<Props> = ({ expand, children, onCollapse, ...rest }) => {
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
  const handleResize = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      updateHeight();
    }, 250);
  }, [updateHeight]);

  const handleTransitionEnd = useCallback(() => {
    if (height === 0 && typeof onCollapse === 'function') {
      onCollapse();
    }
  }, [height, onCollapse]);

  // Add listener for resize event
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    window.addEventListener('transitionend', handleTransitionEnd);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, [handleResize, handleTransitionEnd]);

  // Update height when expanded or children changes
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
