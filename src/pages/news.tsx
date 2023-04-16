// pages/news.tsx
import React from 'react';
import NewsWidget from '../widgets/News/NewsWidget';
import styles from '../styles/news.module.scss';

const News = () => {
  return (
    <div className={styles.newsPage}>
      <h1>News Widget</h1>
      <NewsWidget />
      <br />
      <p>
        The News Widget is a clean and modern web application developed using
        React, Next.js, and TypeScript. It fetches and displays the latest news
        articles from various sources using the NewsAPI, allowing users to stay
        updated on current events. Users can filter news articles based on
        categories such as technology, business, sports, and entertainment.
      </p>
      <p>
        The News Widget demonstrates my ability to work with external APIs,
        manage application state, and create visually appealing user interfaces.
        The fetched articles are displayed in a responsive grid layout, with
        each news item showcasing the article&rsquo;s image, title, source, and
        published date. Users can click on an article to view the full story on
        the source&apos;s website.
      </p>
      <h2>Technologies Used:</h2>
      <ul>
        <li>React</li>
        <li>Next.js</li>
        <li>TypeScript</li>
        <li>NewsAPI</li>
      </ul>
    </div>
  );
};

export default News;
