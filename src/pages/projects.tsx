// pages/projects.tsx
import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import styles from '../styles/projects.module.scss';
import Modal from '../components/Modal/Modal';
import Weather from './weather';
import Recipe from './recipe';
import Calculator from './calculator';

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
