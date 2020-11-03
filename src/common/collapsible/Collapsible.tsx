import React, { HTMLProps } from 'react';
import { useEffect, useRef, useState } from 'react';
import styles from './Collapsible.module.scss';

type Props = {
  expand: boolean;
} & HTMLProps<HTMLDivElement>;

const Collapsible: React.FunctionComponent<Props> = ({ expand, children, ...rest }) => {
  const [height, setHeight] = useState(0);

  const ref = useRef<HTMLDivElement>(null);
  let timer: NodeJS.Timeout | null = null;

  const updateHeight = () => {
    if (expand) {
      const { clientHeight } = ref.current || {};
      setHeight(clientHeight || 0);
    } else {
      setHeight(0);
    }
  };

  /**
   * Debounce to prevent too much re-rendering
   */
  const handleOnResize = () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      updateHeight();
    }, 250);
  };

  // Add listener for resize event
  useEffect(() => {
    window.addEventListener('resize', handleOnResize);
    return () => {
      window.removeEventListener('resize', handleOnResize);
    };
    // eslint-disable-next-line
  }, []);

  // Update height when is expanded or children changes
  useEffect(() => {
    updateHeight();
    // eslint-disable-next-line
  }, [expand, children]);

  return (
    <div {...rest}>
      <div className={styles.collapsible} style={{ height }}>
        <div ref={ref}>{children}</div>
      </div>
    </div>
  );
};

export default Collapsible;
