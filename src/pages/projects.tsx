// pages/projects.tsx
import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import styles from '../styles/projects.module.scss';
import Modal from '../components/Modal/Modal';
import Weather from './weather';
import Recipe from './recipe';
import Calculator from './calculator';
import News from './news';
import StockCrypto from './stockCrypto';
import WhiteboardDemo from './whiteboard-demo';

const projectsData = [
  {
    id: 1,
    title: 'Calculator Widget',
    description:
      'A sleek and intuitive calculator built with React, Next.js, and TypeScript, showcasing my proficiency in creating a user-friendly interface for performing arithmetic operations.',
    component: <Calculator />,
  },
  {
    id: 2,
    title: 'Weather Widget',
    description:
      'A dynamic weather widget that fetches and displays real-time weather information based on user location. This project highlights my ability to work with APIs and create visually appealing components that adapt to varying data.',
    component: <Weather />,
  },
  {
    id: 3,
    title: 'Recipe Widget',
    description:
      'A convenient recipe search tool that allows users to find recipes based on the ingredients they have on hand. Developed using React, Next.js, and TypeScript, this widget demonstrates my skills in working with external APIs, managing application state, and designing an engaging user experience.',
    component: <Recipe />,
  },
  {
    id: 4,
    title: 'Stock/Crypto Widget',
    description:
      'A versatile widget that displays top stock and cryptocurrency market gainers and losers with relevant news articles. Built with React, Next.js, and TypeScript, this project showcases my ability to handle complex application state and create a responsive user interface.',
    component: <StockCrypto />,
  },
  {
    id: 5,
    title: 'News Widget',
    description:
      'A clean and modern news widget that fetches and displays the latest news articles from various sources. Developed using React, Next.js, and TypeScript, this project highlights my skills in working with external APIs and designing a visually appealing user experience.',
    component: <News />,
  },
  {
    id: 6,
    title: 'Whiteboard Widget',
    description:
      'An interactive whiteboard that allows users to draw and erase shapes and text. Built with React, Next.js, and TypeScript, this project demonstrates my ability to create engaging user interfaces and handle complex user input.',
    component: <WhiteboardDemo />,
  },
];

const Projects = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  const openModal = (content: React.ReactNode) => {
    setModalContent(content);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <Layout>
      <div className={styles.projectsContainer}>
        <ul className={styles.projectList}>
          {projectsData.map((project) => (
            <li key={project.id} onClick={() => openModal(project.component)}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </li>
          ))}
        </ul>
      </div>
      <Modal showModal={showModal} closeModal={closeModal}>
        {modalContent}
      </Modal>
    </Layout>
  );
};

export default Projects;
