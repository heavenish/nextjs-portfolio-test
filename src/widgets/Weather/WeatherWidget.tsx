import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import Switch from 'react-switch'; // import the react-switch library
import styles from './WeatherWidget.module.scss';

const WeatherWidget = () => {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState({
    city: '',
    country: '',
    temperature: 0,
    description: '',
    icon: '',
    errorMessage: '',
  });

  const API_KEY = '3fe743d26a7f4d849e720609230304';

  const initialWeatherData = {
    city: '',
    country: '',
    temperature: 0,
    description: '',
    icon: '',
    errorMessage: '',
  };

  const [isCelsius, setIsCelsius] = useState(true);

  useEffect(() => {
    // Get the user's location
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}`
          );
          const data = await response.json();
          if (response.ok) {
            setWeather({
              city: data.location.name,
              country: data.location.country,
              temperature: data.current.temp_c,
              description: data.current.condition.text,
              icon: data.current.condition.icon,
              errorMessage: '',
            });
            setIsCelsius(true); // set isCelsius to true since temperature is received in Celsius
          } else {
            setWeather({
              ...initialWeatherData,
              errorMessage: data.error.message,
            });
          }
        } catch (error) {
          setWeather({
            ...initialWeatherData,
            errorMessage: 'Something went wrong, please try again later',
          });
        }
      },
      (error) => {
        // If the user denies the location permission or there is some other error,
        // we'll set the default location to Austin
        getWeatherData('Austin');
      }
    );
  }, []);

  const getWeatherData = async (city: string) => {
    if (city.trim() === '') {
      setWeather({
        ...initialWeatherData,
        errorMessage: 'Please enter a city name',
      });
      return;
    }
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );
      const data = await response.json();
      if (response.ok) {
        setWeather({
          city: data.location.name,
          country: data.location.country,
          temperature: data.current.temp_c,
          description: data.current.condition.text,
          icon: data.current.condition.icon,
          errorMessage: '',
        });
      } else {
        setWeather({
          ...initialWeatherData,
          errorMessage: data.error.message,
        });
      }
    } catch (error) {
      setWeather({
        ...initialWeatherData,
        errorMessage: 'Something went wrong, please try again later',
      });
    }
  };

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = await getWeatherData(location);
    setLocation('');
  };

  const handleTemperatureToggle = () => {
    setIsCelsius(!isCelsius);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleFormSubmit}>
        <TextField
          className={styles.textField}
          label="Enter Location"
          variant="outlined"
          value={location}
          onChange={handleLocationChange}
        />
        <Button
          className={styles.submitButton}
          type="submit"
          variant="contained"
          disableElevation
        >
          Submit
        </Button>
      </form>
      <div className={styles.weatherInfoContainer}>
        {weather.errorMessage && (
          <div className={styles.errorMessage}>{weather.errorMessage}</div>
        )}
        {weather.city && (
          <>
            <div className={styles.temperatureContainer}>
              <div className={styles.weatherIcon}>
                <img src={weather.icon} alt="weather icon" />
              </div>
              <div className={styles.temperature}>
                {isCelsius
                  ? Math.round((weather.temperature * 9) / 5 + 32)
                  : weather.temperature}
                {isCelsius ? '°F' : '°C'}
              </div>
            </div>
            <label className={styles.toggleSwitch}>
              <Switch
                checked={!isCelsius}
                onChange={handleTemperatureToggle}
                offColor="#2196f3"
                onColor="#2196f3"
                uncheckedIcon={<div className={styles.switchText}>C</div>}
                checkedIcon={<div className={styles.switchText}>F</div>}
              />
              <span className={styles.switchSlider} />
            </label>
            <div className={styles.description}>{weather.description}</div>
            <div>
              {weather.city}, {weather.country}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WeatherWidget;
