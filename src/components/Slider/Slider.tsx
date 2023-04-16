import React, { useRef } from 'react';
import styles from './Slider.module.scss';
import CalculatorWidget from '@/widgets/Calculator/CalculatorWidget';
import WeatherWidget from '@/widgets/Weather/WeatherWidget';
import RecipeWidget from '@/widgets/Recipe/RecipeWidget';
import WhiteboardWidget from '@/widgets/Whiteboard/WhiteboardWidget';
import NewsWidget from '@/widgets/News/NewsWidget';
import StockWidget from '@/widgets/Stock/StockWidget';

const Slider: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const handlePrev = () => {
    sliderRef.current?.scrollBy({
      left: -(sliderRef.current.clientWidth - 16),
      behavior: 'smooth',
    });
  };

  const handleNext = () => {
    sliderRef.current?.scrollBy({
      left: sliderRef.current.clientWidth - 16,
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles.sliderContainer}>
      <div ref={sliderRef} className={styles.slider}>
        <div className={styles.slide}>
          <h2>Weather App</h2>
          <WeatherWidget />
        </div>
        <div className={styles.slide}>
          <h2>Calculator App</h2>
          <CalculatorWidget autoFocusInput={false} />
        </div>
        <div className={styles.slide}>
          <h2>Recipe App</h2>
          <RecipeWidget />
        </div>
        <div className={styles.slide}>
          <h2>News App</h2>
          <NewsWidget />
        </div>
      </div>
      <button className={styles.prevBtn} onClick={handlePrev}>
        &lt;
      </button>
      <button className={styles.nextBtn} onClick={handleNext}>
        &gt;
      </button>
    </div>
  );
};

export default Slider;
