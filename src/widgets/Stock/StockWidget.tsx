// src/widgets/Stock/StockWidget.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ToggleButton from '../../components/ToggleButton/ToggleButton';
import styles from './StockWidget.module.scss';

const StockWidget: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [showStocks, setShowStocks] = useState(true);
  const [showGainers, setShowGainers] = useState(true);
  const [displayedItems, setDisplayedItems] = useState(5);

  const stockApiKey = 'pk_41943de5f2b343129c6abf6bed2b04bd';

  useEffect(() => {
    if (showStocks) {
      fetchStocks();
    } else {
      fetchCryptos();
    }
  }, [showStocks]);

  useEffect(() => {
    if (showStocks) {
      fetchStocks();
    } else {
      fetchCryptos();
    }
  }, [showGainers]);

  const fetchStocks = async () => {
    try {
      const gainersLosersUrl = showGainers
        ? 'https://cloud.iexapis.com/stable/stock/market/list/gainers'
        : 'https://cloud.iexapis.com/stable/stock/market/list/losers';

      const response = await axios.get(
        `${gainersLosersUrl}?token=${stockApiKey}`
      );
      const data = response.data;

      const processedData = await Promise.all(
        data.slice(0, 10).map(async (stock: any) => {
          const newsResponse = await axios.get(
            `https://cloud.iexapis.com/stable/stock/${stock.symbol}/news/last/1?token=${stockApiKey}`
          );

          return {
            name: stock.symbol,
            changePercentage: `${(stock.changePercent * 100).toFixed(2)}%`,
            price: new Intl.NumberFormat('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 8,
            }).format(stock.latestPrice),
            priceChange: new Intl.NumberFormat('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 8,
            }).format(stock.change),
            news: newsResponse.data[0]?.url || '',
            newsHeadline: newsResponse.data[0]?.headline || '',
          };
        })
      );

      setItems(processedData);
      setDisplayedItems(5);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCryptos = async () => {
    try {
      const gainersLosersUrl =
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd';

      const response = await axios.get(gainersLosersUrl);
      const data = response.data;

      const sortedData = data.sort((a: any, b: any) =>
        showGainers
          ? b.price_change_percentage_24h - a.price_change_percentage_24h
          : a.price_change_percentage_24h - b.price_change_percentage_24h
      );

      const processedData = sortedData.slice(0, 10).map((crypto: any) => {
        return {
          name: crypto.symbol.toUpperCase(),
          changePercentage: `${crypto.price_change_percentage_24h.toFixed(2)}%`,
          price: new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 8,
          }).format(crypto.current_price),
          priceChange: new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 8,
          }).format(crypto.price_change_24h),

          news: '',
          newsHeadline: '',
        };
      });

      setItems(processedData);
      setDisplayedItems(5);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleGainers = () => {
    setShowGainers(!showGainers);
  };

  const loadMore = () => {
    setDisplayedItems(displayedItems + 5);
  };

  const toggleStockCrypto = () => {
    setShowStocks(!showStocks);
  };

  return (
    <div className={styles.stockWidget}>
      <h2 className={styles.headline}>Top Gainers & Losers</h2>
      <div className={styles.toggleContainer}>
        <ToggleButton
          labelLeft="Stock"
          labelRight="Crypto"
          initialState={true}
          onChange={toggleStockCrypto}
          useIcon={true}
        />
        <ToggleButton
          labelLeft="Gainers"
          labelRight="Losers"
          initialState={true}
          onChange={toggleGainers}
        />
      </div>
      <div className={styles.stocks}>
        {items.slice(0, displayedItems).map((item, index) => (
          <div key={index} className={styles.stock}>
            <h3 className={styles.stockName}>{item.name}</h3>
            <p className={styles.stockPrice}>
              ${item.price}(
              <span
                className={
                  parseFloat(item.priceChange) >= 0 ? styles.green : styles.red
                }
              >
                {parseFloat(item.priceChange) >= 0 ? '+' : '-'}$
                {Math.abs(parseFloat(item.priceChange))}
              </span>
              )
            </p>
            <p
              className={
                parseFloat(item.priceChange) >= 0 ? styles.green : styles.red
              }
            >
              {item.changePercentage}
            </p>
            {item.news && (
              <a
                href={item.news}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.newsLink}
              >
                {item.newsHeadline}
              </a>
            )}
          </div>
        ))}
      </div>
      {displayedItems < items.length && (
        <button className={styles.loadMore} onClick={loadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default StockWidget;
