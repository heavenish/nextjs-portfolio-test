import React from 'react';
import Layout from '../components/Layout/Layout';
import CalculatorWidget from '@/widgets/Calculator/CalculatorWidget';
import styles from '../styles/calculator.module.scss';

const Calculator = () => {
  return (
    <div className={styles.calculatorPage}>
      <h1>Calculator Widget</h1>
      <CalculatorWidget />
      <br />
      <p>
        The Calculator Widget is a versatile and sophisticated web application
        built using React, Next.js, and TypeScript. It provides users with an
        advanced calculator that performs not only basic arithmetic operations
        but also more complex calculations, such as trigonometry, logarithms,
        and exponentiation. The calculator also supports input in both radians
        and degrees, and it maintains a history of performed calculations for
        user reference.
      </p>
      <p>
        The Calculator Widget demonstrates my ability to create a fully
        functional calculator application using React and TypeScript. The
        application showcases my skills in handling user input, performing
        arithmetic operations, and creating user-friendly interfaces with
        intuitive interactions.
      </p>
      <h2>Technologies Used:</h2>
      <ul>
        <li>React</li>
        <li>Next.js</li>
        <li>TypeScript</li>
      </ul>
    </div>
  );
};

export default Calculator;
