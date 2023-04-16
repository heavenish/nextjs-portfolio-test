import React from 'react';
import WhiteboardWidget from '@/widgets/Whiteboard/WhiteboardWidget';
import styles from '@/styles/whiteboard-demo.module.scss';

const WhiteboardPrev = () => {
  return (
    <div className={styles.whiteboardDemo}>
      <h1>Whiteboard Widget</h1>
      <WhiteboardWidget />
      <br />
      <p>
        The Whiteboard Widget is an interactive web application built using
        React, Next.js, and TypeScript. It allows users to draw and erase shapes
        and text on a virtual whiteboard. The widget showcases my ability to
        handle complex user input and create engaging user interfaces that adapt
        to user interactions.
      </p>
      <h2>Technologies Used:</h2>
      <ul>
        <li>React</li>
        <li>Next.js</li>
        <li>TypeScript</li>
        <li>Fabric.js</li>
      </ul>
    </div>
  );
};

export default WhiteboardPrev;
