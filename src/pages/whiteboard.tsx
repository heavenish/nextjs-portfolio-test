import React from 'react';
import Layout from '../components/Layout/Layout';
import WhiteboardWidget from '../widgets/Whiteboard/WhiteboardWidget';
import styles from '../styles/whiteboard.module.scss';

const Whiteboard = () => {
  return (
    <Layout>
      <div className={styles.whiteboardPage}>
        <h1 className={styles.whiteboardTitle}>Whiteboard Widget - WIP</h1>
        <WhiteboardWidget />
      </div>
    </Layout>
  );
};

export default Whiteboard;
