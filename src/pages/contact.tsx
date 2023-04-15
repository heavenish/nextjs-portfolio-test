import React, { useState } from 'react';
import Layout from '@/components/Layout/Layout';
import Modal from '@/components/Modal/Modal';
import styles from '../styles/Contact.module.scss';

const Contact = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      name: { value: string };
      email: { value: string };
      message: { value: string };
    };
    const name = target.name.value;
    const email = target.email.value;
    const message = target.message.value;

    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      alert('Email sent successfully');
      closeModal();
    } catch (error) {
      alert('Failed to send email');
    }
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:lee.jungro@gmail.com';
  };

  return (
    <Layout>
      <div className={styles.contact}>
        <h1>Contact Me</h1>
        <p>
          If you&rsquo;d like to get in touch or discuss potential projects,
          please feel free to reach out through any of the following methods:
        </p>
        <ul>
          <a href="mailto:lee.jungro@gmail.com">Email</a>
          <br />
          <a
            href="https://www.linkedin.com/in/jungro-lee/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          {/* <li>GitHub: <a href="https://github.com/your_github" target="_blank" rel="noopener noreferrer">https://github.com/your_github</a></li> */}
        </ul>

        <button className={styles.contactButton} onClick={openModal}>
          Send Me a Message
        </button>
        <Modal showModal={showModal} closeModal={closeModal}>
          <h2>Contact Form</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" maxLength={2000} required />
            <button type="submit" className={styles.submitButton}>
              Send
            </button>
          </form>
        </Modal>
      </div>
    </Layout>
  );
};

export default Contact;
