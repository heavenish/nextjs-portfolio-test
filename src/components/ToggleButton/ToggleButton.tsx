// src/components/ToggleButton/ToggleButton.tsx
import React, { useState } from 'react';
import styles from './ToggleButton.module.scss';

interface ToggleButtonProps {
  labelLeft: string;
  labelRight: string;
  initialState: boolean;
  onChange: () => void;
  useIcon?: boolean;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  labelLeft,
  labelRight,
  initialState,
  onChange,
  useIcon,
}) => {
  const [state, setState] = useState(initialState);

  const handleClick = () => {
    setState(!state);
    onChange();
  };

  if (useIcon) {
    return (
      <div className={styles.toggleButton}>
        <span className={state ? styles.activeLabel : ''}>{labelLeft}</span>
        <div className={styles.iconButton} onClick={handleClick}>
          {state ? '$' : '₿'}
        </div>
        <span className={!state ? styles.activeLabel : ''}>{labelRight}</span>
      </div>
    );
  }

  return (
    <div className={styles.toggleButton}>
      <span className={state ? styles.activeLabel : ''}>{labelLeft}</span>
      <div
        className={`${styles.sliderContainer} ${
          state ? styles.sliderGreen : styles.sliderRed
        }`}
        onClick={handleClick}
      >
        <div
          className={`${styles.sliderThumb} ${
            state ? styles.sliderThumbLeft : styles.sliderThumbRight
          }`}
        ></div>
      </div>
      <span className={!state ? styles.activeLabel : ''}>{labelRight}</span>
    </div>
  );
};

export default ToggleButton;
