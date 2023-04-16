import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import styles from './NewsWidget.module.scss';

const NewsWidget: React.FC = () => {
  const [interests, setInterests] = useState<string[]>([]);
  const [articles, setArticles] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [timeFrame, setTimeFrame] = useState('');

  const interestsOptions = [
    { value: 'technology', label: 'Technology' },
    { value: 'sports', label: 'Sports' },
    { value: 'business', label: 'Business' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'health', label: 'Health' },
    { value: 'science', label: 'Science' },
  ];

  const timeFrameOptions = [
    { value: '6', label: 'Last 6 hours' },
    { value: '12', label: 'Last 12 hours' },
    { value: '24', label: 'Last 24 hours' },
    { value: '168', label: 'Last week' },
    { value: '720', label: 'Last month' },
  ];

  const apiKey = 'a2ddb4b9d983483da61abceb9cc49d72';

  useEffect(() => {
    if (interests.length > 0 || searchQuery) {
      fetchNews();
    }
  }, [interests, searchQuery, timeFrame]);

  const fetchNews = async () => {
    const timeFilter = timeFrame
      ? `&from=${getDateForTimeFrame(timeFrame)}&to=${new Date().toISOString()}`
      : '';

    const url =
      interests.length > 0
        ? `https://newsapi.org/v2/top-headlines?country=us&category=${interests.join(
            ','
          )}&apiKey=${apiKey}${timeFilter}`
        : `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${apiKey}${timeFilter}&sortBy=publishedAt`;

    try {
      const response = await axios.get(url);
      let fetchedArticles = response.data.articles;

      if (interests.length > 0 && searchQuery) {
        fetchedArticles = fetchedArticles.filter((article: any) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setArticles(fetchedArticles);
    } catch (error) {
      console.error(error);
    }
  };

  const getDateForTimeFrame = (hours: string) => {
    const date = new Date();
    date.setHours(date.getHours() - parseInt(hours));
    return date.toISOString();
  };

  const handleChange = (selectedOptions: any) => {
    setInterests(selectedOptions.map((option: any) => option.value));
  };

  const handleTimeFrameChange = (selectedOption: any) => {
    setTimeFrame(selectedOption.value);
  };

  const handleSearch = () => {
    fetchNews();
  };

  return (
    <div className={styles.newsWidget}>
      <h2 className={styles.headline}>Personalized News Curator</h2>
      <div className={styles.selectContainer}>
        <Select
          options={interestsOptions}
          isMulti
          placeholder="Select your interests"
          onChange={handleChange}
        />
      </div>
      <div className={styles.searchContainer}>
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter a search query"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className={styles.timeFrameContainer}>
        <label htmlFor="timeFrame">Time frame:</label>
        <Select
          options={timeFrameOptions}
          placeholder="Select a time frame"
          onChange={handleTimeFrameChange}
        />
      </div>
      <div className={styles.articles}>
        {articles.map((article, index) => (
          <div key={index} className={styles.article}>
            <a href={article.url} target="_blank" rel="noreferrer">
              <h3 className={styles.articleTitle}>{article.title}</h3>
            </a>
            <p className={styles.articleDescription}>{article.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsWidget;
