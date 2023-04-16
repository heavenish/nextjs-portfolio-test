// pages/stockCrypto.tsx
import React from 'react';
import StockWidget from '../widgets/Stock/StockWidget';
import styles from '../styles/stockCrypto.module.scss';

const StockCrypto = () => {
  return (
    <div className={styles.stockCryptoPage}>
      <h1>Stock/Crypto Widget</h1>
      <StockWidget />
      <br />
      <p>
        The Stock/Crypto Widget is a versatile web application built using
        React, Next.js, and TypeScript. It displays top stock and cryptocurrency
        market gainers and losers, along with relevant news articles. The widget
        fetches data from the Alpha Vantage API for stocks and the CoinGecko API
        for cryptocurrencies, providing users with real-time market information.
      </p>
      <p>
        The Stock/Crypto Widget showcases my ability to handle complex
        application state and create a responsive user interface. Users can
        toggle between stock and crypto modes to view the top gainers and losers
        in each market. Each item displays the asset&rsquo;s name, current
        price, and percentage change. Additionally, relevant news articles for
        each asset are fetched from the NewsAPI, providing users with more
        context on market movements.
      </p>
      <h2>Technologies Used:</h2>
      <ul>
        <li>React</li>
        <li>Next.js</li>
        <li>TypeScript</li>
        <li>Alpha Vantage API</li>
        <li>CoinGecko API</li>
        <li>NewsAPI</li>
      </ul>
    </div>
  );
};

export default StockCrypto;
