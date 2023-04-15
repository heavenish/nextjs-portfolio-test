import React from 'react';
import Layout from '../components/Layout/Layout';
import WeatherWidget from '@/widgets/Weather/WeatherWidget';
import styles from '@/styles/weather.module.scss';

const Weather = () => {
  return (
    <div className={styles.weatherPage}>
      <h1>Weather Widget</h1>
      <WeatherWidget />
      <br />
      <p>
        The Weather Widget is a web application built using React, Next.js, and
        TypeScript. It provides users with real-time weather information based
        on their location or a user-specified location. The widget fetches data
        from a third-party API, OpenWeatherMap, and displays the current
        temperature, humidity, and other essential weather details, including
        the ability to toggle between Celsius and Fahrenheit.
      </p>
      <p>
        The Weather Widget demonstrates my ability to fetch and display weather
        data from an external API based on a user&rsquo;s location or a
        specified city. The application showcases my skills in working with
        APIs, handling user input, and creating visually appealing user
        interfaces that adapt to the fetched data.
      </p>
      <h2>Technologies Used:</h2>
      <ul>
        <li>React</li>
        <li>Next.js</li>
        <li>TypeScript</li>
        <li>OpenWeatherMap API</li>
      </ul>
    </div>
  );
};

export default Weather;
